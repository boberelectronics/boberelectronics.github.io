#!/usr/bin/env python3
"""Build uncropped, oriented sRGB WebPs for the supplied hardware archive.

Requires Pillow (with LittleCMS/WebP) and `heif-convert` (libheif) for HEIC.
Only reads originals. Generates 640px thumbnails and 1440px full frames.
Stable IDs are reused from the existing manifest; new paths receive new IDs.
EXIF/XMP, including camera location metadata, is omitted from public derivatives.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import hashlib
import io
import json
import shutil
import subprocess
from PIL import Image, ImageCms, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / 'assets/images/refurb_hardware'
DEST = ROOT / 'assets/images/webp/refurb_hardware'
QA = ROOT / 'tools/qa'
DECODED = QA / 'hardware-decoded'
MANIFEST = DEST / 'manifest.json'
# Preserve the existing photo IDs when supplied originals are renamed to add
# sale quantities, so product cards and saved links remain stable.
SOURCE_ID_ALIASES = {
    'assets/images/refurb_hardware/(Mixed Brands) 256GB M.2 NVMe SSD - Sold 5x for $20 Each.heic': 'hardware-001',
    'assets/images/refurb_hardware/AMD Ryzen 7 5700X - Sold 3x for $145 Each.heic': 'hardware-006',
}
SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB'))
SRGB_BYTES = SRGB.tobytes()

def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def make_item(pair):
    source, identifier = pair
    source_hash = sha256(source)
    profile_action = 'assumed sRGB (no embedded profile)'
    decode_path = source
    decoder = 'Pillow'
    if source.suffix.lower() == '.heic':
        program = shutil.which('heif-convert')
        if not program:
            raise RuntimeError('HEIC files require heif-convert from libheif.')
        decode_path = DECODED / f'{identifier}.png'
        # libheif applies the HEIF display transform and preserves its ICC profile.
        subprocess.run([program, '--quiet', '--codec-threads', '2', '--tile-threads', '2',
                        '--png-compression-level', '1', str(source), str(decode_path)],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        decoder = 'libheif heif-convert'
    with Image.open(decode_path) as original:
        original.load()
        raw_size = original.size
        exif_orientation = int(original.getexif().get(274, 1))
        image = ImageOps.exif_transpose(original)
        source_profile = 'Unspecified / sRGB assumed'
        embedded = image.info.get('icc_profile')
        if embedded:
            profile = ImageCms.ImageCmsProfile(io.BytesIO(embedded))
            source_profile = ImageCms.getProfileDescription(profile).strip()
            image = ImageCms.profileToProfile(image.convert('RGB'), profile, SRGB,
                                             outputMode='RGB', renderingIntent=0)
            profile_action = 'ICC managed conversion to sRGB (perceptual)'
        else:
            image = image.convert('RGB')
            if 'srgb' in original.info:
                source_profile = 'sRGB PNG declaration'
                profile_action = 'sRGB source preserved'
        # Reject silent codec failures; the supplied photographs are not blank frames.
        extrema = image.getextrema()
        if all(low == high for low, high in extrema):
            raise RuntimeError(f'Decoder produced a uniform frame: {source.name}')
        width, height = image.size
        result = {
            'id': identifier, 'source': source.relative_to(ROOT).as_posix(),
            'sourceSHA256': source_hash, 'sourceBytes': source.stat().st_size,
            'sourceWidth': width, 'sourceHeight': height,
            'decodedWidthBeforeExif': raw_size[0], 'decodedHeightBeforeExif': raw_size[1],
            'exifOrientation': exif_orientation, 'orientationApplied': True,
            'decoder': decoder, 'sourceProfile': source_profile,
            'colorSpace': 'sRGB', 'colorConversion': profile_action, 'crop': None,
        }
        for key, suffix, edge, quality in [('thumbnail', 'thumb', 640, 78),
                                           ('fullImage', 'full', 1440, 85)]:
            resized = image.copy()
            resized.thumbnail((edge, edge), Image.Resampling.LANCZOS)
            output = DEST / f'{identifier}_{suffix}.webp'
            resized.save(output, 'WEBP', quality=quality, method=6,
                         icc_profile=SRGB_BYTES)
            with Image.open(output) as verify:
                verify.verify()
            result[key] = {'path': output.relative_to(ROOT).as_posix(),
                           'width': resized.width, 'height': resized.height,
                           'bytes': output.stat().st_size, 'sha256': sha256(output)}
        return result

def contact_sheets(items):
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 13)
    for page, start in enumerate(range(0, len(items), 24), 1):
        subset = items[start:start + 24]
        columns, cell_width, image_height, cell_height = 4, 360, 250, 312
        rows = (len(subset) + columns - 1) // columns
        canvas = Image.new('RGB', (columns * cell_width, rows * cell_height), (18, 18, 18))
        draw = ImageDraw.Draw(canvas)
        for offset, item in enumerate(subset):
            with Image.open(ROOT / item['fullImage']['path']) as source:
                image = source.convert('RGB')
            image.thumbnail((cell_width - 14, image_height - 8))
            x, y = (offset % columns) * cell_width, (offset // columns) * cell_height
            canvas.paste(image, (x + (cell_width - image.width) // 2, y + 4))
            label = f'{item["id"]} {Path(item["source"]).stem}'
            for line in range(3):
                draw.text((x + 6, y + image_height + line * 18),
                          label[line * 47:(line + 1) * 47], font=font, fill=(230, 230, 230))
        canvas.save(QA / f'hardware-contact-{page}.jpg', quality=92)

def main():
    DEST.mkdir(parents=True, exist_ok=True)
    DECODED.mkdir(parents=True, exist_ok=True)
    existing = json.loads(MANIFEST.read_text())['items'] if MANIFEST.exists() else []
    ids = {item['source']: item['id'] for item in existing}
    last_id = max([int(item['id'].split('-')[-1]) for item in existing] + [0])
    files = sorted(p for p in SOURCES.iterdir() if p.suffix.lower() in {'.png', '.jpg', '.jpeg', '.heic'})
    pairs = []
    for source in files:
        path = source.relative_to(ROOT).as_posix()
        if path in ids:
            identifier = ids[path]
        elif path in SOURCE_ID_ALIASES:
            identifier = SOURCE_ID_ALIASES[path]
        else:
            last_id += 1
            identifier = f'hardware-{last_id:03d}'
        pairs.append((source, identifier))
    with ThreadPoolExecutor(max_workers=3) as pool:
        items = list(pool.map(make_item, pairs))
    manifest = {'version': 1, 'originalsReadOnly': True,
                'recipe': 'tools/build_hardware_derivatives.py',
                'thumbnailMaxEdge': 640, 'fullImageMaxEdge': 1440,
                'items': items}
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    contact_sheets(items)
    # Decode files are generated QA intermediates; originals stay read only.
    shutil.rmtree(DECODED)
    print(f'Built {len(items)} hardware records, {len(items)*2} uncropped sRGB WebPs.')
    for key in ('thumbnail', 'fullImage'):
        print(f'{key}: {sum(item[key]["bytes"] for item in items):,} bytes; '
              f'max {max(item[key]["bytes"] for item in items):,} bytes')
    print('Manifest:', MANIFEST.relative_to(ROOT))

if __name__ == '__main__':
    main()
