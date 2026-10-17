#!/usr/bin/env python3
"""Build reproducible WebP derivatives from original Bober Electronics photos.

Uses Pillow. Originals are read only. Archive and refurbished assets are resized
with their full original frame; no crop, retouching, color change, or AI imagery.
"""
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / 'assets/images'
EDITORIAL = IMAGES / 'editorial'
manifest = []
manifest_path = EDITORIAL / 'manifest.json'
previous_manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else []


def preserve_missing_source_entries(previous, generated, root):
    """Keep proven derivative metadata when an owner has removed its original.

    Missing inputs are never reconstructed or silently relabeled. A retained
    output keeps its prior source identity and is explicitly marked historical.
    """
    outputs = {entry['output'] for entry in generated}
    preserved = []
    for entry in previous:
        if (entry['output'] not in outputs and
                not (root / entry['source']).exists() and
                (root / entry['output']).is_file()):
            preserved.append({**entry, 'sourceMissing': True, 'preservedFromPriorManifest': True})
    return generated + preserved


def derivative(source, target, max_width, *, quality=85, crop=None, max_height=None, caption=None):
    image = ImageOps.exif_transpose(Image.open(ROOT / source)).convert('RGB')
    original_size = image.size
    if crop:
        image = image.crop(crop)
    image.thumbnail((max_width, max_height or 100000), Image.Resampling.LANCZOS)
    path = ROOT / target
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = path.with_name(path.name + '.tmp')
    image.save(temporary_path, 'WEBP', quality=quality, method=6)
    temporary_path.replace(path)
    manifest.append({
        'source': str(source), 'output': str(target),
        'sourceWidth': original_size[0], 'sourceHeight': original_size[1],
        'width': image.width, 'height': image.height, 'bytes': path.stat().st_size,
        'crop': list(crop) if crop else None, 'quality': quality, 'caption': caption,
    })


hero = 'assets/images/featured/9070White_FRONT.png'
for width in (800, 1600):
    derivative(hero, f'assets/images/editorial/hero-9070-{width}.webp', width,
               quality=88, caption='RX 9070 XT / Ryzen 5 7600X — full original three-quarter photograph')

editorials = [
    ('black', '3080_2Black_SIDE2.png', (800, 1440), None,
     'RTX 3080 / Ryzen 7 3700X — Rise Mode pump, GeForce RTX heatsink and black sleeved power cables'),
    ('white', '5070_SIDE2.png', (800, 1440), None,
     'RTX 5070 / Ryzen 7 5700X — Redragon AIO block, white coolant tubes and GPU power cabling'),
    ('red', '6900XT_SIDE2.png', (800, 1440), None,
     'RX 6900 XT / Ryzen 5 5600 — Red Devil GPU, exposed heatsink fins and red case fans'),
    ('cooling', '9070White_SIDE.png', (800, 1200), (300, 140, 1500, 840),
     'RX 9070 XT / Ryzen 5 7600X — three radiator fans, Thermalright AIO block, illuminated RAM and cable routing'),
]
for name, filename, widths, crop, caption in editorials:
    for width in widths:
        derivative(f'assets/images/featured/{filename}',
                   f'assets/images/editorial/detail-{name}-{width}.webp', width,
                   quality=88, crop=crop, caption=caption)
derivative('assets/images/featured/3080_2Black_SIDE2.png',
           'assets/images/editorial/hero-detail-black-640.webp', 640,
           quality=86, caption=editorials[0][4])

for category in ('archive', 'refurbished'):
    for source in sorted((IMAGES / category).glob('*.png')):
        for variant, edge, quality in (('thumb', 640, 77), ('full', 1440, 85)):
            derivative(str(source.relative_to(ROOT)),
                       f'assets/images/webp/{category}/{source.stem}_{variant}.webp',
                       edge, max_height=edge, quality=quality)

EDITORIAL.mkdir(parents=True, exist_ok=True)
generated_count = len(manifest)
manifest = preserve_missing_source_entries(previous_manifest, manifest, ROOT)
temporary_manifest = manifest_path.with_name(manifest_path.name + '.tmp')
temporary_manifest.write_text(json.dumps(manifest, indent=2) + '\n')
temporary_manifest.replace(manifest_path)
if len(manifest) > generated_count:
    print(f'Preserved {len(manifest) - generated_count} historical derivative entries with missing originals; no original was restored.')
for category in ('editorial', 'archive', 'refurbished'):
    entries = [item for item in manifest if f'/{category}/' in item['output']]
    print(f'{category}: {len(entries)} files; {sum(item["bytes"] for item in entries):,} bytes')
for item in manifest:
    if '/editorial/' in item['output']:
        print(f'{item["output"]}: {item["width"]}x{item["height"]}, {item["bytes"]:,} bytes')
