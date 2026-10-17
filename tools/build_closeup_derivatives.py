#!/usr/bin/env python3
"""Build audited, uncropped sRGB close-up derivatives with stable manifest IDs.

Requires Pillow with LittleCMS/WebP and the existing checked-in manifest.
Never renumbers established photos from filename sorting. Valid existing outputs
are retained byte for byte. New originals require an explicit audited ID/copy map.
"""
from pathlib import Path
import copy
import hashlib
import io
import json
from PIL import Image, ImageCms, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / 'assets/images/closeups'
DEST = ROOT / 'assets/images/webp/closeups'
MANIFEST = DEST / 'manifest.json'
QA = ROOT / 'tools/qa'
SRGB_PATH = Path('/System/Library/ColorSync/Profiles/sRGB Profile.icc')
SRGB = ImageCms.ImageCmsProfile(str(SRGB_PATH)) if SRGB_PATH.exists() else ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB'))
SRGB_BYTES = SRGB.tobytes()
ORDER = ['closeup-01', 'closeup-07', 'closeup-05', 'closeup-08',
         'closeup-03', 'closeup-04', 'closeup-02', 'closeup-06']
AUDITED_ADDITIONS = {
    'assets/images/closeups/Screenshot 2026-10-17 at 1.44.52\u202fPM.png': {
        'id': 'closeup-07',
        'alt': 'Blue illuminated cooling fan beside two Corsair memory modules in a dark PC interior.',
        'caption': 'Fan light and memory details.',
    },
    'assets/images/closeups/Screenshot 2026-10-17 at 1.45.23\u202fPM.png': {
        'id': 'closeup-08',
        'alt': 'Blue illuminated EVGA GeForce RTX lettering below exposed graphics-card heatsink fins and a black backplate.',
        'caption': 'Heatsink fins and blue light.',
    },
}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def valid_outputs(item):
    for key, edge in [('thumbnail', 640), ('fullImage', 1280)]:
        record = item.get(key, {})
        expected = f'assets/images/webp/closeups/{item["id"]}-{edge}.webp'
        if record.get('path') != expected:
            return False
        output = ROOT / expected
        if not output.exists() or digest(output) != record.get('sha256'):
            return False
        with Image.open(output) as image:
            image.load()
            if image.size != (record.get('width'), record.get('height')):
                return False
    return True

def build_item(source, identifier, alt, caption):
    with Image.open(source) as original:
        original.load()
        orientation = int(original.getexif().get(274, 1))
        image = ImageOps.exif_transpose(original)
        if 'A' in image.getbands() and image.getchannel('A').getextrema() != (255, 255):
            raise ValueError(f'Unexpected transparency needs a visual audit: {source.name}')
        embedded = image.info.get('icc_profile')
        if embedded:
            profile = ImageCms.ImageCmsProfile(io.BytesIO(embedded))
            source_profile = ImageCms.getProfileDescription(profile).strip()
            image = ImageCms.profileToProfile(image.convert('RGB'), profile, SRGB,
                                             outputMode='RGB', renderingIntent=0)
            color_action = 'ICC managed conversion to sRGB (perceptual)'
        else:
            source_profile = 'Unspecified / sRGB assumed'
            image = image.convert('RGB')
            color_action = 'sRGB assumed; no embedded source profile'
        item = {'id': identifier, 'source': source.relative_to(ROOT).as_posix(),
                'sourceSHA256': digest(source), 'sourceBytes': source.stat().st_size,
                'sourceWidth': image.width, 'sourceHeight': image.height,
                'sourceProfile': source_profile, 'exifOrientation': orientation,
                'orientationApplied': True, 'colorSpace': 'sRGB',
                'colorConversion': color_action, 'crop': None,
                'alt': alt, 'caption': caption}
        for key, edge, quality in [('thumbnail', 640, 82), ('fullImage', 1280, 87)]:
            resized = image.copy()
            resized.thumbnail((edge, edge), Image.Resampling.LANCZOS)
            output = DEST / f'{identifier}-{edge}.webp'
            resized.save(output, 'WEBP', quality=quality, method=6, icc_profile=SRGB_BYTES)
            with Image.open(output) as verify:
                verify.verify()
            item[key] = {'path': output.relative_to(ROOT).as_posix(),
                         'width': resized.width, 'height': resized.height,
                         'bytes': output.stat().st_size, 'sha256': digest(output)}
        return item

def contact_sheet(items):
    columns, width, image_height, row_height = 4, 450, 290, 330
    rows = (len(items) + columns - 1) // columns
    canvas = Image.new('RGB', (columns * width, rows * row_height), (15, 15, 15))
    draw = ImageDraw.Draw(canvas)
    font_path = Path('/System/Library/Fonts/Helvetica.ttc')
    font = ImageFont.truetype(str(font_path), 14) if font_path.exists() else ImageFont.load_default()
    for index, item in enumerate(items):
        with Image.open(ROOT / item['fullImage']['path']) as source:
            image = source.convert('RGB')
        image.thumbnail((width - 10, image_height - 5))
        x, y = (index % columns) * width, (index // columns) * row_height
        canvas.paste(image, (x + (width - image.width) // 2, y + 4))
        draw.text((x + 8, y + image_height + 4), item['id'] + ' / ' + item['caption'],
                  font=font, fill=(230, 230, 230))
    canvas.save(QA / 'closeups-contact.jpg', quality=94)

def main():
    if not MANIFEST.exists():
        raise FileNotFoundError('The existing close-up manifest is required to preserve established photo IDs. Restore that manifest before rebuilding.')
    manifest = json.loads(MANIFEST.read_text())
    existing = manifest['items']
    if len({item['id'] for item in existing}) != len(existing) or len({item['source'] for item in existing}) != len(existing):
        raise ValueError('Duplicate IDs or sources in existing close-up manifest.')
    by_source = {item['source']: item for item in existing}
    supplied = {source.relative_to(ROOT).as_posix(): source for source in SOURCE_DIR.glob('*.png')}
    missing = set(by_source) - set(supplied)
    unknown = set(supplied) - set(by_source) - set(AUDITED_ADDITIONS)
    if missing or unknown:
        raise ValueError(f'Changed close-up sources require a visual audit. Missing: {sorted(missing)}; unaudited additions: {sorted(unknown)}')
    DEST.mkdir(parents=True, exist_ok=True)
    QA.mkdir(parents=True, exist_ok=True)
    items, retained = [], 0
    for path, source in supplied.items():
        old = by_source.get(path)
        if old:
            if digest(source) != old['sourceSHA256']:
                raise ValueError(f'Changed original needs a visual audit before rebuilding: {path}')
            if valid_outputs(old):
                items.append(copy.deepcopy(old))
                retained += 1
                continue
            metadata = old
        else:
            metadata = AUDITED_ADDITIONS[path]
            if any(item['id'] == metadata['id'] for item in existing):
                raise ValueError(f'Audited new ID is already assigned: {metadata["id"]}')
        items.append(build_item(source, metadata['id'], metadata['alt'], metadata['caption']))
    items.sort(key=lambda item: item['id'])
    if sorted(ORDER) != sorted(item['id'] for item in items):
        raise ValueError('The slideshow order must include every established photo ID once.')
    manifest.update({'originalsReadOnly': True, 'recipe': 'tools/build_closeup_derivatives.py',
                     'recommendedOrder': ORDER, 'items': items})
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    contact_sheet(items)
    print(f'Close-ups: {len(items)} originals, {len(items) * 2} outputs; retained {retained * 2} existing outputs without rewriting.')
    print('Total output bytes:', sum(item[key]['bytes'] for item in items for key in ('thumbnail', 'fullImage')))
    for item in items:
        if item['id'] in ('closeup-07', 'closeup-08'):
            print(item['id'], item['thumbnail'], item['fullImage'])

if __name__ == '__main__':
    main()
