// ── Authoritative Inventory Data (Reconciled across script.js, content/*.txt, and assets/images/*) ──
const FEATURED_BUILDS = [
  {
    title: 'RX 9070 XT, 4TB NVMe SSD, Ryzen 5 7600X, 16GB DDR5, WiFi — Liquid Cooled Gaming PC',
    price: '$1,499',
    description: 'Up next for sale is a PC designed to crush 4K gaming with maximum settings. Equipped with the beastly 16GB RX 9070 XT and the Ryzen 5 7600X, this system has the raw performance to handle anything you throw at it.',
    components: [
      'GPU: ASRock Radeon RX 9070 XT 16GB',
      'CPU: AMD Ryzen 5 7600X (6C/12T)',
      'RAM: TeamGroup Delta RGB 16GB DDR5 6000 MT/S',
      'Storage: 4TB M.2 NVMe SSD',
      'Cooler: Thermalright Aqua V3 360MM AIO',
    ],
    images: [
      'assets/images/featured/9070White_FRONT.png',
      'assets/images/featured/9070White_SIDE.png',
      'assets/images/featured/9070White_BACK.png',
    ],
  },
  {
    title: 'RTX 5080, Ryzen 7 7800X3D, 32GB DDR5, 2TB NVMe SSD, WiFi — 4K Gaming PC',
    price: '$2,050',
    description: 'Up next for sale is a PC designed to crush 4K gaming with maximum settings. Equipped with the beastly 16GB RTX 5080 and the Ryzen 7 7800X3D, this system has the raw performance to handle anything you throw at it.',
    components: [
      'GPU: PNY NVIDIA GeForce RTX 5080 16GB',
      'CPU: AMD Ryzen 7 7800X3D (8C/16T)',
      'RAM: 32GB DDR5 6400 MT/S',
      'Storage: 2TB M.2 NVMe SSD',
      'Cooler: Thermalright Frozen Notte 240MM AIO',
    ],
    images: [
      'assets/images/featured/5080White_FRONT.png',
      'assets/images/featured/5080White_SIDE.png',
      'assets/images/featured/5080White_BACK.png',
    ],
  },
  {
    title: 'RTX 5070 Ti, Ryzen 7 7800X3D, 32GB DDR5, 2TB NVMe SSD, WiFi — High End 4K Gaming PC',
    price: '$1,870',
    description: 'Up next for sale is a PC designed to crush 4K gaming with maximum settings. Equipped with the beastly newly released 16GB RTX 5070 Ti and the Ryzen 7 7800X3D.',
    components: [
      'GPU: Zotac SOLID GeForce RTX 5070 Ti 16GB GDDR7',
      'CPU: AMD Ryzen 7 7800X3D (8C/16T)',
      'RAM: Corsair Vengeance RGB 32GB DDR5 6000 MT/s',
      'Storage: 2TB M.2 NVMe SSD',
    ],
    images: [
      'assets/images/featured/5070White_FRONT.png',
      'assets/images/featured/5070White_SIDE.png',
      'assets/images/featured/5070White_BACK.png',
    ],
  },
  {
    title: 'RTX 3080, Ryzen 5 7500F, 32GB DDR5, 1TB NVMe SSD, WiFi — Custom Gaming PC',
    price: '$1,150',
    description: 'Up next for sale is a PC designed to crush 1440p gaming with high FPS. Equipped with the beastly RTX 3080 and the Ryzen 5 7500F, this system not only has the raw performance to handle almost anything you throw at it, but can also easily be upgraded down the line.',
    components: [
      'GPU: EVGA FTW3 GeForce RTX 3080 (Used)',
      'CPU: AMD Ryzen 5 7500F (6C/12T)',
      'RAM: Corsair Vengeance RGB 32GB DDR5 6000 MT/s',
      'Storage: 1TB M.2 NVMe SSD',
      'Cooler: Thermalright Aqua Elite V4 360mm AIO',
      'PSU: High Power HP1 850W 80+ Gold (Tier B)',
      'Motherboard: Gigabyte B650M Gaming Plus WiFi',
      'Case: DIYPC N1 (Black)',
    ],
    images: [
      'assets/images/featured/3080Black_FRONT.png',
      'assets/images/featured/3080Black_SIDE.png',
      'assets/images/featured/3080Black_BACK.png',
    ],
  },
  {
    title: 'RTX 3080, Ryzen 7 3700X, 32GB DDR4, 1TB NVMe SSD, WiFi — Custom Gaming PC',
    price: '$970',
    description: 'Up next for sale is a PC designed to crush 1440p gaming with high FPS. Equipped with the beastly RTX 3080 and the 8 core Ryzen 7 3700X, this system has the raw performance to handle almost anything you throw at it.',
    components: [
      'GPU: Dell GeForce RTX 3080 (Used)',
      'CPU: AMD Ryzen 7 3700X (8C/16T)',
      'RAM: 32GB DDR4 3200 MT/S',
      'Storage: 1TB M.2 NVMe SSD',
    ],
    images: [
      'assets/images/featured/3080White_FRONT.png',
      'assets/images/featured/3080White_SIDE.png',
      'assets/images/featured/3080White_BACK.png',
    ],
  },
  {
    title: 'RTX 3070, Ryzen 5 5500, 16GB DDR4, 2TB Storage, WiFi — Custom Gaming PC',
    price: '$875',
    description: 'Up next for sale is a PC designed to crush 1080p and 1440p gaming. Equipped with the 8GB RTX 3070 and the Ryzen 5 5500, this system has the raw performance to handle almost any game you throw at it.',
    components: [
      'GPU: GeForce RTX 3070 8GB Founders Edition (Used)',
      'CPU: AMD Ryzen 5 5500 (6C/12T)',
      'RAM: 16GB DDR4 3200 MT/s (Dual Channel)',
      'Storage: 200GB Intel SSD + 2TB HDD',
      'Cooler: Gamdias GL240 AIO (Black)',
      'PSU: Thermaltake GX2 600W 80+ Gold (Tier C)',
      'Motherboard: Gigabyte B550M Gaming X WiFi',
      'Case: DarkFlash DB330M (Black)',
      'Extra: 3X ARGB Fans',
    ],
    images: [
      'assets/images/featured/3070Black_FRONT.png',
      'assets/images/featured/3070Black_SIDE.png',
      'assets/images/featured/3070Black_BACK.png',
    ],
  },
  {
    title: 'RTX 3080, Ryzen 7 3700X, 32GB DDR4, 1TB NVMe SSD, WiFi — Liquid Cooled Gaming PC',
    price: '$1,150',
    description: 'Up next for sale is a PC designed to crush 1440p gaming with high FPS. Equipped with the beastly RTX 3080 and the 8 core Ryzen 7 3700X, this system has the raw performance to handle almost anything you throw at it.',
    components: [
      'GPU: Dell GeForce RTX 3080 (Used)',
      'CPU: AMD Ryzen 7 3700X (8C/16T)',
      'RAM: 32GB DDR4 3200 MT/S (Dual Channel)',
      'Storage: WD 1TB M.2 NVMe SSD (Used)',
      'Cooler: Rise Mode 360mm AIO Liquid Cooler',
      'PSU: PowerSpec PS750GFM 80+ Gold (Tier B)',
      'Motherboard: Gigabyte B550M Gaming X WiFi 6',
      'Case: DIYPC M1 (Black)',
      'Extra: Okinos Black Cable Extensions',
      'Extra: 7X ARGB Fans',
    ],
    images: [
      'assets/images/featured/3080_2Black_FRONT.png',
      'assets/images/featured/3080_2Black_SIDE.png',
      'assets/images/featured/3080_2Black_SIDE2.png',
      'assets/images/featured/3080_2Black_BACK.png',
    ],
  },
  {
    title: 'RTX 5070, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi — Liquid Cooled Gaming PC',
    price: '$1,330',
    description: 'Up next for sale is a PC designed to crush 1440p gaming and productivity workloads. Equipped with the beastly RTX 5070 and the 8 core Ryzen 7 5700X, this system has the raw performance to handle nearly anything you throw at it, whether that be ray tracing or video editing.',
    components: [
      'GPU: NVIDIA GeForce RTX 5070 12GB GDDR7 (Used)',
      'CPU: AMD Ryzen 7 5700X (8C/16T)',
      'RAM: 32GB DDR4 3200 MT/S (Dual Channel)',
      'Storage: 1TB M.2 NVMe SSD',
      'Cooler: Redragon HL360 ARGB AIO (White)',
      'PSU: High Power HP1 700W 80+ Gold (Tier B+, Used)',
      'Motherboard: ASRock B550M Pro4',
      'Case: Aerocool D302A (White)',
      'Extra: 9X ARGB Fans',
    ],
    images: [
      'assets/images/featured/5070_FRONT.png',
      'assets/images/featured/5070_SIDE.png',
      'assets/images/featured/5070_SIDE2.png',
      'assets/images/featured/5070_BACK.png',
    ],
  },
  {
    title: 'RX 6900 XT, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD, WiFi — Custom Gaming PC',
    price: '$780',
    description: 'Up next for sale is a PC designed to crush 1440p and 4K gaming. Equipped with the beastly 16GB RX 6900 XT and the 6 core Ryzen 5 5600, this system has the raw performance to handle almost anything you throw at it.',
    components: [
      'GPU: AMD Radeon RX 6900XT Red Devil 16GB (Used)',
      'CPU: AMD Ryzen 5 5600 (6C/12T)',
      'RAM: G.Skill Ripjaws 16GB DDR4 3200 MT/S',
      'Storage: 1TB M.2 NVMe SSD',
      'Cooler: Thermalright Assassin X120 (Black)',
      'PSU: EVGA 650GT 80+ Gold (Used)',
      'Motherboard: MSI B550M Pro-VDH WiFi',
      'Case: BitFenix Nova Mesh ARGB (Black)',
    ],
    images: [
      'assets/images/featured/6900XT_FRONT.png',
      'assets/images/featured/6900XT_SIDE.png',
      'assets/images/featured/6900XT_SIDE2.png',
      'assets/images/featured/6900XT_BACK.png',
    ],
  },
];

// ── Refurbished Hardware Inventory (All 44 Files in assets/images/refurb_hardware/) ──
const REFURB_HARDWARE_FILES = [
  '(Mixed Brands) 256GB M.2 NVMe SSD - Sold for $20 Each.heic',
  '16GB DDR4 HyperX Fury 2133 MT:S - Sold for $15.png',
  'AMD Ryzen 5 5500 + MSI B550M Pro-VDH COMBO - Sold for $120.heic',
  'AMD Ryzen 5 7500F CPU - Sold for $120.heic',
  'AMD Ryzen 7 2700 CPU - Sold for $40.HEIC',
  'AMD Ryzen 7 5700X - Sold for $145 Each.heic',
  'ASUS ROG Gaming Laptop - i7-4710HQ, GTX 860M, 16GB RAM, 1TB SATA SSD - Sold for $300.png',
  'ASUS TUF GeForce RTX 3080 10GB GPU - Sold for $300.heic',
  'Apple Mac Mini 2018 (8th Gen i5, 8GB RAM, 256GB SSD) - Sold 3x for $250 Each.png',
  'Colorful GeForce RTX 3060 Ti (Missing IO Plate) - Sold for $160.heic',
  'Core i7 12700K + ASRock Z690 LGA1700 Motherboard COMBO - Sold for $200.png',
  'Corsair Vengeance RGB 16GB DDR4 3200 - Sold for $25.HEIC',
  'Custom Painted AMD Wraith Cooler - Sold 2x for $10 Each.HEIC',
  'Custom Painted EVGA XC3 RTX 3070 8GB GPU - Sold for $220.heic',
  'Dell GeForce RTX 3090 24GB GPU - Sold 3x for $700 Each.png',
  'Dell RX 6500XT 4GB GDDR6 OEM GPU - Sold for $69 .png',
  'EVGA GeForce GTX 1070 Ti 8G GPU (w: Original Box) - Sold for $110.png',
  'EVGA XC3 RTX 3070 8GB GPU - Sold for $230.heic',
  'Founders Edition GTX 1070 8GB GPU - Sold for $95.heic',
  'Founders Edition GTX Titan X Pascal 12GB GPU - Sold 2x for $180 Each.heic',
  'G-Skill Ripjaws 16GB DDR4 3200 (Red) - Sold for $20.heic',
  'GeForce GT 630 GPU - Sold for $5.heic',
  'Gigabyte B550M-K Motherboard - Sold for $50.heic',
  'Gigabyte GTX 1080 Ti 11GB GPU - Sold for $169.heic',
  'Gigabyte Vision GeForce RTX 3070 Ti - Sold for $359.JPG',
  'Intel Core i3-4160 CPU - Sold for $0.50.png',
  'Intel Core i3-7100 CPU - Sold for $0.50.png',
  'Intel Core i7 7700 + HP Stock Cooler Combo - Sold for $76.png',
  'Intel NUC8i3BEH | 1TB Storage, 8GB RAM, Intel i3, Windows 11 Pro | PC Desktop - Sold 10x for $130 Each.png',
  'Killsre 16GB DDR4 3200 - Sold for $20.heic',
  'Lenovo Blower RTX 2080 8GB GPU - Sold for $195.heic',
  'Lenovo Thinkpad - i7-6600U, GeForce GTX 930M, 24GB RAM, 1TB NVMe SSD - Sold for $240.png',
  'Machinist B450M AM4 Motherboard - Sold for $35.heic',
  'OEM GeForce RTX 3070 8GB GPU - Sold for $240.HEIC',
  'PNY GeForce GTX 1060 6GB GPU - Sold for $55.heic',
  'ROG Strix GTX 1080 Ti 11GB GPU - Sold for $169.heic',
  'SK Hynix 16GB DDR3 1600 Non-ECC RAM - Sold for $15.png',
  'Sapphire Nitro RX 6700XT 12GB GPU - Sold for $270.png',
  'Sapphire Pulse RX 5700 XT 8GB GPU - Sold for $149.HEIC',
  'Seagate 2TB SATA HDD - Sold 5x for $30 Each.heic',
  'Trident Z RGB 16GB DDR4 3200 - Sold for $25.HEIC',
  'XFX AMD Radeon RX 6700 10GB GPU - Sold for $215.png',
  'XPG 16GB DDR4 3200 - Sold for $20.heic',
  'i9-13900K + Z790 Gaming WiFi DDR5 Motherboard Bundle - Sold for $420.png',
];

const FEATURED_REFURB_FILENAMES = [
  'Dell GeForce RTX 3090 24GB GPU - Sold 3x for $700 Each.png',
  'i9-13900K + Z790 Gaming WiFi DDR5 Motherboard Bundle - Sold for $420.png',
  'Gigabyte Vision GeForce RTX 3070 Ti - Sold for $359.JPG',
  'ASUS TUF GeForce RTX 3080 10GB GPU - Sold for $300.heic',
  'ASUS ROG Gaming Laptop - i7-4710HQ, GTX 860M, 16GB RAM, 1TB SATA SSD - Sold for $300.png',
  'Sapphire Nitro RX 6700XT 12GB GPU - Sold for $270.png',
  'Apple Mac Mini 2018 (8th Gen i5, 8GB RAM, 256GB SSD) - Sold 3x for $250 Each.png',
  'Lenovo Thinkpad - i7-6600U, GeForce GTX 930M, 24GB RAM, 1TB NVMe SSD - Sold for $240.png',
  'Core i7 12700K + ASRock Z690 LGA1700 Motherboard COMBO - Sold for $200.png',
];

// ── Custom PC Archive Files (All 131 Files in assets/images/archive/) ──
const ARCHIVE_FILES = [
  'GTX 1060, i7-4770, 16GB DDR3, 512GB SSD - Budget Gaming PC, Sold for $380.png',
  'GTX 1070 Ti, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $480 .png',
  'GTX 1070, 1TB SSD, i7-4770, 16GB DDR3 - Custom Gaming PC, Sold for $390.png',
  'GTX 1070, Ryzen 5 1600, 16GB DDR4, 512GB SSD - Gaming PC, Sold for $400 .png',
  'GTX 1070, Ryzen 5 2600, 16GB DDR4, 512GB NVMe SSD - Budget Gaming PC, Sold for $449.png',
  'GTX 1070, Ryzen 5 2600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $430.png',
  'GTX 1070, Ryzen 5 2600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $450.png',
  'GTX 1070, Ryzen 5 3600, 16GB DDR4, 512GB SSD, WiFi - Custom Gaming PC, Sold for $375.png',
  'GTX 1070, i7-3930K, 32GB RAM, 512GB SSD - Budget Gaming PC, Sold for $500.png',
  'GTX 1080 Ti, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $530.png',
  'GTX 1080, Ryzen 5 2600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold 2x at $399 Each.png',
  'GTX 1080, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD, WiFi - Value Gaming PC, Sold for $485.png',
  'GTX 1650 Super, i3-8100, 16GB RAM, 512GB SSD - Budget Gaming PC, Sold for $300.png',
  'GTX 745, i5-2400, 8GB DDR3, 1TB HDD - Media PC, Sold for $100.png',
  'GTX 980 Ti, i7-875K, 16GB DDR3 - Ultra-Budget PC, Sold for $190.png',
  'GTX Titan Xp, i7-4770, 16GB DDR3, 1TB SSD - Gaming PC, Sold for $500.png',
  'RTX 2060 Super, Ryzen 5 2600, 16GB DDR4, 1TB NVMe SSD, WiFi - Gaming PC, Sold for $510.png',
  'RTX 2060 Super, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $599.png',
  'RTX 2060 Super, Ryzen 5 5600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $600.png',
  'RTX 2070 Super, 2.25TB Storage, Xeon E3, Windows 11 - Custom Gaming PC, Sold for $480 .png',
  'RTX 2070 Super, Ryzen 5 3500X, 16GB DDR4, 2TB Storage, WiFi - Custom Gaming PC, Sold 2x for $580 Each.png',
  'RTX 2070 Super, i7-7700K, 16GB DDR4, 4TB Storage - White Gaming PC, Sold for $580.png',
  'RTX 2070, i7-4770, 16GB DDR3, 1TB SSD, WiFi - Gaming PC, Sold for $500.png',
  'RTX 2080 Super, Ryzen 5 3600, 16GB DDR4, 2TB Storage, WiFi - Custom Gaming PC, Sold for $850.png',
  'RTX 2080 Ti, Ryzen 5 3600, 16GB DDR4, 2TB Storage, WiFi - Custom Gaming PC, Sold for $750.png',
  'RTX 2080 Ti, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $650.png',
  'RTX 2080, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $600.png',
  'RTX 2080, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - White Gaming PC, Sold for $570.png',
  'RTX 2080, Ryzen 5 3600, 16GB DDR4, 2TB Storage, WiFi - Custom Gaming PC, Sold for $720.png',
  'RTX 2080, Ryzen 5 5500, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $620.png',
  'RTX 2080, i7-4770, 16GB DDR3, 1TB Storage, WiFi - Gaming PC, Sold for $600.png',
  'RTX 2080, i7-7700, 16GB RAM, 500GB SSD - Gaming PC, Sold for $500.png',
  'RTX 3050, i5-6600, 16GB DDR4, 512GB NVMe SSD, WiFi - Budget Gaming PC, Sold 2x for $300 Each.png',
  'RTX 3050, i5-9400F, 16GB DDR4, 1TB SSD - Custom Gaming PC, Sold for $350.png',
  'RTX 3060 Ti, Core i7, 1TB SSD - Custom Gaming PC, Sold for $580.png',
  'RTX 3060 Ti, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $640.png',
  'RTX 3060 Ti, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Gaming PC, Sold for $530.png',
  'RTX 3060 Ti, Ryzen 5 3600, 16GB DDR4, 1TB SSD - Gaming PC, Sold 2x at $620 Each.png',
  'RTX 3060 Ti, Ryzen 5 5500, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $680.png',
  'RTX 3060 Ti, Ryzen 5 5500, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $700.png',
  'RTX 3060 Ti, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $530.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $700.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $799.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $650.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $700.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $680.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $875.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 2TB Storage, WiFi - Custom Gaming PC, Sold for $720.png',
  'RTX 3070, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD, WiFi - Sold for $530.png',
  'RTX 3070, Ryzen 5 5500, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $725.png',
  'RTX 3070, Ryzen 5 5500, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $875.png',
  'RTX 3070, Ryzen 5 5500, 16GB DDR4, 1TB NVMe SSD, WiFi - White Gaming PC, Sold for $725.png',
  'RTX 3070, Ryzen 5 5500, 16GB DDR4, 2TB Storage, WiFi - Liquid Cooled Gaming PC, Sold for $875.png',
  'RTX 3070, Ryzen 5 5500, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $805.png',
  'RTX 3070, Ryzen 5 5500, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $875.png',
  'RTX 3070, Ryzen 5 5500, 32GB DDR4, 1TB NVMe SSD, WiFi - Sold for $875.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Black:White Gaming PC, Sold for $700.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $700.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $750.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $780.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $799.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $700.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Sold 2x at $700 Each.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD, WiFI - Custom Gaming PC, Sold for $700.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $809.png',
  'RTX 3070, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $849.png',
  'RTX 3070, Ryzen 5 5600, 32GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $750.png',
  'RTX 3070, Ryzen 5 5600, 32GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $820.png',
  'RTX 3070, Ryzen 5 7500F, 16GB DDR5, 1TB NVMe SSD - Custom Gaming PC, Sold for $780.png',
  'RTX 3070, i5-10400, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $750.png',
  'RTX 3080, Ryzen 5 5600, 32GB DDR4, 1TB NVMe SSD - Liquid Cooled Gaming PC, Sold for $1050.png',
  'RTX 3080, Ryzen 5 7500F, 32GB DDR5, 1TB NVMe SSD - Liquid Cooled Gaming PC, Sold for $1150.png',
  'RTX 3080, Ryzen 5 7500F, 32GB DDR5, 1TB NVMe SSD, WiFi - Gaming PC, Sold for $1185.png',
  'RTX 3080, Ryzen 7 3700X, 32GB DDR4, 1TB NVMe SSD, Liquid Cooling - Gaming PC, Sold for $980.png',
  'RTX 3080, Ryzen 7 3700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold 2x at $970 Each.png',
  'RTX 3080, Ryzen 7 3700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1080.png',
  'RTX 3080, Ryzen 7 3700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Liquid Cooled Gaming PC, Sold for $1150.png',
  'RTX 3080, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $950.png',
  'RTX 3080, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFI - Custom Gaming PC, Sold for $1080.png',
  'RTX 3080, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1035.png',
  'RTX 3080, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Gaming PC, Sold for $1020.png',
  'RTX 3080, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Liquid Cooled Gaming PC, Sold for $1175.png',
  'RTX 3080, Ryzen 7 5800X, 32GB DDR4, 1TB NVMe SSD - Liquid Cooled Gaming PC, Sold for $950.png',
  'RTX 3080, Ryzen 7 5800X, 32GB DDR4, 1TB NVMe SSD, Liquid Cooling - Custom Gaming PC, Sold for $950.png',
  'RTX 3080, Ryzen 7 7700, 16GB DDR5, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $950 .png',
  'RTX 3080, i5-12600K, 32GB DDR4, 1TB NVMe SSD - Liquid Cooled Gaming PC, Sold for $1085.png',
  'RTX 3080, i7 10700K, 32GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $950.png',
  'RTX 3090, Ryzen 5 7500F, 32GB DDR5, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1350.png',
  'RTX 3090, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1200.png',
  'RTX 4060 Ti, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $680.png',
  'RTX 4070 Ti, Ryzen 7 7700X, 32GB DDR5, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1380.png',
  'RTX 4070, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1120.png',
  'RTX 4070, Ryzen 7 5800XT, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $950.png',
  'RTX 4080, Ryzen 7 7700X, 32GB DDR5, 1TB NVMe SSD, WiFi - High End Gaming PC, Sold for $2150.png',
  'RTX 5060 Ti, Ryzen 7 3700X, 16GB DDR4, 2.5TB Storage, WiFi - Custom Gaming PC, Sold for $940.png',
  'RTX 5060, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $720.png',
  'RTX 5060, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $820.png',
  'RTX 5070 Ti, Ryzen 7 7800X3D, 32GB DDR5, 2TB NVMe SSD - Liquid Cooled Gaming PC, Sold for $2055.png',
  'RTX 5070 Ti, Ryzen 7 7800X3D, 32GB DDR5, 2TB NVMe SSD, WiFi - High End Gaming PC, Sold for $1870.png',
  'RTX 5070, Ryzen 5 8400F, 32GB DDR5, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1250.png',
  'RTX 5070, Ryzen 5 9600X, 32GB DDR5, 2TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1440.png',
  'RTX 5070, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $1350.png',
  'RTX 5070, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Liquid Cooled Gaming PC, Sold for $1330.png',
  'RTX 5080, Ryzen 7 7800X3D, 32GB DDR5, 2TB NVMe SSD, WiFi - High End Gaming PC, Sold for $2050.png',
  'RX 5600XT, i5-10400F, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $750.png',
  'RX 5700 XT, 16GB DDR3, Xeon E3 - Custom Gaming PC, Sold for $490.png',
  'RX 5700, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $520.png',
  'RX 5700XT, Ryzen 5 2600, 16GB DDR4, 512GB NVMe SSD - Custom Gaming PC, Sold for $549.png',
  'RX 5700XT, Ryzen 5 3600, 1.25TB Storage, 16GB DDR4 - Gaming PC, Sold for $650.png',
  'RX 5700XT, Ryzen 5 3600, 16GB DDR4, 1.25TB Storage, WiFi - Custom Gaming PC, Sold for $630.png',
  'RX 5700XT, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $480.png',
  'RX 5700XT, Ryzen 5 3600, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $580 .png',
  'RX 5700XT, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $530.png',
  'RX 5700XT, Ryzen 5 3600, 16GB DDR4, 512GB NVMe SSD - Value Gaming PC, Sold for $450.png',
  'RX 5700XT, Xeon E3, 16GB DDR3 - Custom Gaming PC, Sold for $540.png',
  'RX 5700XT, Xeon E3, 16GB DDR3, 1TB HDD - Custom Gaming PC, Sold for $450.png',
  'RX 5700XT, Xeon E5, 64GB RAM, 1TB SSD - Custom PC, Sold for $540.png',
  'RX 5700XT, Xeon E5, 64GB RAM, 1TB SSD - Value Gaming PC, Sold for $300.png',
  'RX 5700XT, i5-10400F, 16GB DDR4, 1TB NVMe SSD - Gaming PC, Sold for $600.png',
  'RX 580, Xeon E3, 16GB DDR3, 256GB SSD - Ultra-Budget Gaming PC, Sold for $105.png',
  'RX 6400, i5-6600, 16GB DDR4, 512GB NVMe SSD, WiFi - Starter Gaming PC, Sold for $220.png',
  'RX 6600, Ryzen 5 2600, 16GB DDR4, 512GB NVMe SSD - Gaming PC, Sold for $520 3.01.06 PM.png',
  'RX 6700XT, i7-10700K, 32GB DDR4, 512GB SSD, WiFi - Custom Gaming PC, Sold for $1050.png',
  'RX 6800, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $799.png',
  'RX 6800, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Custom Gaming PC, Sold for $875.png',
  'RX 6800, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD - Value Gaming PC, Sold for $849.png',
  'RX 6800, Ryzen 7 5700X, 32GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $970.png',
  'RX 6900 XT, Ryzen 5 5600, 16GB DDR4, 1TB NVMe SSD, WiFi - Custom Gaming PC, Sold for $780.png',
  'RX 7700XT, Ryzen 5 5600, 32GB DDR4, 1TB NVMe SSD - Value Gaming PC, Sold for $875.png',
  'RX 9070 XT, 4TB NVMe SSD, Ryzen 5 7600X, 16GB DDR5, WiFi - Custom Gaming PC, Sold for $1499.png',
  'Refurb. Lenovo Thinkpad 2016 (i7-6600U, 24GB DDR4, GTX 930M), Sold for $160  .png',
];

// ── Verbatim Customer Reviews ─────────────────────────────────────────────────
const FEATURED_REVIEWS = [
  {
    user: 'Restored-Jawa#1251',
    date: 'August 8, 2025',
    text: 'Bober Electronics was stellar! They messaged me first off letting me know if I had any questions or concerns I could let them know directly. They gave regular updates, answered all my questions, and the PC was double-packed securely for shipping. They did everything a professional custom workshop should be doing and made a completely seamless experience. Highly recommended.',
  },
  {
    user: 'Kunal',
    date: 'September 23, 2024',
    text: 'This was one of the greatest purchases I ever did on FB Marketplace. Great config and well setup at a reasonable price. Smooth communication and super helpful. Definitely recommend going for it if you are happy with the config! This one runs games smoothly on high settings at 2K resolution. Thanks a lot man for this, you rock.',
  },
  {
    user: 'Joe',
    date: 'March 21, 2025',
    text: 'Incredible overall experience. The computer I purchased was in perfect condition, with all of the software necessary for it to run well already installed. The seller was also very responsive and communicative throughout the whole process. Would certainly buy from again, thank you so much!',
  },
  {
    user: 'Carson',
    date: 'October 7, 2025',
    text: 'Very professional with good communication and punctuality. Everything was just as it was listed and PC has been running great. Would definitely recommend!',
  },
  {
    user: 'Daniel',
    date: 'September 16, 2025',
    text: 'My purchase went extremely smoothly. Communication was on point and the PC has been functioning perfectly with no issues.',
  },
];

const STANDARD_REVIEWS = [
  { user: 'Tyrell', date: 'September 7, 2025', text: 'Product came out just as described. They even tested it to make sure it works for me. Very much appreciated! Thanks again!' },
  { user: 'Sergio', date: 'August 23, 2025', text: 'Purchase exactly as described. Very nice and reliable person. Definitely will recommend to others who are searching for built gaming PCs! :)' },
  { user: 'Amanda', date: 'August 12, 2025', text: 'Great product, works well. Very kind and communicative. Would buy from him again!' },
  { user: 'Luke', date: 'May 22, 2025', text: 'Product was exactly as shown in the images and worked amazingly when I got it home! Build is super clean, very fast and amazingly quiet. Seller was quick to reply, punctual and professional. Very excited to use it!!' },
  { user: 'Christian', date: 'April 12, 2025', text: 'Todo excelente, mucha comunicación, dudas aclaradas. 100% recomendado!' },
  { user: 'Gerardo', date: 'September 25, 2024', text: 'Great seller, very nice and informative.' },
  { user: 'Manon', date: 'August 26, 2024', text: 'Purchase as described and went over anything I asked and more! Very passionate and kind seller. Can contact them in the future if anything happens.' },
  { user: 'Cooper', date: 'June 18, 2024', text: 'The PC is exactly as advertised, and runs great. Easy to reach the seller who is very knowledgeable and manages to keep you in the loop about your PC whenever needed or requested. Would definitely recommend the product and seller to anyone looking for a great value and/or a great build.' },
  { user: 'Josh', date: 'March 19, 2024', text: 'Great experience, computer was as it stated and the price was very reasonable. The seller was informative on the item, and when I had a small configuration setup issue on my end, the seller took the time to walk me through getting it resolved. Highly recommend and I will be purchasing my next computer through this seller!' },
  { user: 'Aawaj', date: 'February 21, 2024', text: 'I bought the PC, it was really great for a great price.' },
  { user: 'Cliveton', date: 'February 18, 2024', text: 'Respectful seller, very friendly and informative.' },
  { user: 'Michael', date: 'January 25, 2024', text: 'Very pleasant interaction and very informative, would definitely recommend buying from here.' },
  { user: 'Luis', date: 'December 31, 2023', text: 'Great communication, very nice and respectful. PC works great! Thank you.' },
  { user: 'Obadiah', date: 'September 27, 2023', text: 'This wholesome family who sells PCs exactly as described did a great job on the PC I bought from them. I traveled two hours to pick up this beast of a machine and it was worth every minute as it works exactly as intended and looks great. Also it was very generously priced, definitely got more than I paid for with my setup. They gave great help on setting things up after the purchase and checked in to confirm everything was in working order. They are very helpful and informative.' },
  { user: 'Detachable-Jawa#1121', date: 'May 13, 2026', text: 'You should definitely consider buying from Bober Electronics. They make incredible PCs at affordable prices while building them well with good quality parts. Also very fast to respond and easy to talk with. 10/10 would buy from again!' },
  { user: 'Illustrious-Jawa#5954', date: 'January 16, 2026', text: 'Everything was perfect! Thank you!' },
  { user: 'Friendly-Jawa#2533', date: 'January 13, 2026', text: 'Works out of the box, no issues found during games. Would recommend!' },
  { user: 'Revolutionary-Jawa#8815', date: 'September 18, 2025', text: 'Best purchase I made in a while. 10/10 service and phenomenal build speeds!' },
  { user: 'Tantalizing-Jawa#7650', date: 'August 28, 2025', text: 'Very helpful, easy unboxing, and incredibly quick shipping.' },
  { user: 'Trusting-Jawa#3551', date: 'August 28, 2025', text: '10/10 experience! Was very easy to reach out and get in contact with when there were some slight shipping carrier delays. Everything works great and the build is amazing! Very helpful and kind! If I ever need a new build, I know exactly where to go.' },
  { user: 'Honest-Jawa#1963', date: 'August 23, 2025', text: 'If you want a great product and awesome support, this is the place. Product arrived as expected and working flawlessly. Great communication from shipping updates to checking in about customer satisfaction. I haven\'t had a great customer experience like this in a long time. Highly recommend. I have a very happy 14-year-old son!' },
  { user: 'Seamless-Jawa#5437', date: 'July 16, 2025', text: 'Very fast and easy process! Works great!' },
  { user: 'Shmoolio', date: 'June 9, 2025', text: 'I would greatly recommend buying from this seller if it\'s your first PC build! He has outstanding support and great knowledge about computers.' },
  { user: 'Bir Bir Patapim', date: 'May 8, 2025', text: 'Came fast, PC runs great for a good price, and the seller was very helpful when I was setting it up. Would absolutely recommend this seller.' },
  { user: 'Effectual-Jawa#0051', date: 'May 7, 2025', text: 'Professional, great communication, and helpful. First PC purchase and it was a very smooth process. Highly recommend this seller.' },
  { user: 'Legacy', date: 'April 20, 2025', text: 'This was my first PC I ever got and it works great. I was on a tight budget so I\'m very grateful I was able to find this high-quality option from a great builder.' },
  { user: 'Fragrant-Jawa#0646', date: 'February 22, 2025', text: 'Professional. Good communication. Helpful. Everything was smooth sailing. This is my first time buying here, so I\'m happy Bober Electronics was a part of it.' },
  { user: 'Dynamic-Jawa#3995', date: 'January 29, 2025', text: 'They were so helpful and knowledgeable, and for the price, I got an absolutely amazing computer!' },
  { user: 'Admiring-Jawa#0695', date: 'December 2, 2024', text: 'Great customer service with thorough updates, texts, and technical setup notes.' },
  { user: 'Profound-Jawa#5468', date: 'July 20, 2024', text: 'Great communication with the buyer, highly recommend 10/10.' },
  { user: 'Shiny-Jawa#2910', date: 'June 27, 2024', text: 'Seller is very nice and helpful, also very professional and replies quickly! It shipped very fast, everything came exactly as described, and it arrived with really secure packaging.' },
  { user: 'Omega Point PCs', date: 'January 19, 2024', text: 'Quick shipping, excellent custom packaging, and the item arrived exactly as described. Would certainly buy from again.' },
  { user: 'Upscale-Jawa#8489', date: 'August 2, 2023', text: 'Friendly and quick shipper! Would definitely recommend to anyone looking for components or builds.' },
  { user: 'pcgr_37 (eBay)', date: '', text: 'Exactly as described, worked perfectly, and arrived right on time.' },
  { user: 'shop.herman (eBay)', date: '', text: 'Great seller, hardware came working perfectly. Packaging was top tier. Seller responded to messages quickly and even benchmarked the components before shipping. 10/10, what a guy!' },
  { user: 'sland 4239 (eBay)', date: '', text: 'Very good packaging, seller made sure my package was secure and came in the mail in perfect condition.' },
  { user: 'necompncsinc (eBay)', date: '', text: 'What a great system. Works perfectly! Thank you.' },
  { user: 'stevesutfi 0 (eBay)', date: '', text: 'Arrived on time and exactly as described. Great responsiveness to messages as well!' },
];

// ── Path & Parsing Helpers ────────────────────────────────────────────────────
function encodeImagePath(path) {
  return path.split('/').map(s => encodeURIComponent(s)).join('/');
}

function getFeaturedWebpPath(pngPath, variant = 'thumb') {
  const match = pngPath.match(/^assets\/images\/featured\/(.+)\.png$/);
  if (!match) return '';
  return encodeImagePath(`assets/images/webp/featured/${match[1]}_${variant}.webp`);
}

function getArchiveWebpPath(filename) {
  const base = filename.replace(/\.[^/.]+$/, '');
  return encodeImagePath(`assets/images/webp/archive/${base}.webp`);
}

function getRefurbImagePaths(filename) {
  const base = filename.replace(/\.[^/.]+$/, '');
  const ext = (filename.split('.').pop() || '').toLowerCase();
  const webpPath = encodeImagePath(`assets/images/webp/refurb_hardware/${base}.webp`);
  const origPath = encodeImagePath(`assets/images/refurb_hardware/${filename}`);
  return {
    webp: webpPath,
    fallback: ext === 'heic' ? webpPath : origPath,
  };
}

function getAngleLabel(imgPath, index) {
  if (/_FRONT\.png$/i.test(imgPath)) return 'Front';
  if (/_SIDE2\.png$/i.test(imgPath)) return 'Angle 2';
  if (/_SIDE\.png$/i.test(imgPath))  return 'Side';
  if (/_BACK\.png$/i.test(imgPath))  return 'Back';
  return `View ${index + 1}`;
}

function parseBuildSummary(build) {
  const [specPart, descriptorPart] = build.title.split(/\s*—\s*/);
  const parts = specPart.split(',').map(s => s.trim());

  const gpuPart = parts.find(p => /^(RTX|RX|GTX)\b/i.test(p)) || parts[0] || '';
  const cpuPart = parts.find(p => /^(Ryzen|Core|i[3579]|Xeon)\b/i.test(p)) || parts[1] || '';
  const ramPart = parts.find(p => /\b(DDR\d|RAM)\b/i.test(p)) || '';
  const storagePart = parts.find(p => /\b(SSD|NVMe|Storage|HDD|TB|GB)\b/i.test(p) && p !== ramPart && p !== gpuPart) || '';

  return {
    headline: [gpuPart, cpuPart].filter(Boolean).join(' \u00B7 '),
    subSpecs: [ramPart, storagePart].filter(Boolean).join(' \u00B7 '),
    descriptor: descriptorPart || 'Custom Gaming PC',
  };
}

function parseSaleFilename(filename) {
  const base = filename
    .replace(/\.[^/.]+$/, '')
    .replace(/\s+\d+\.\d+\.\d+\s*(?:AM|PM)?$/i, '')
    .trim();

  const saleMatch = base.match(/^(.*?)(?:,\s*|\s+-\s+)Sold(?:\s+(\d+)x)?\s+(?:for|at)\s+\$([\d,]+(?:\.\d+)?)(\s*Each)?$/i);
  if (!saleMatch) {
    return {
      rawTitle: base,
      title: base,
      headline: base,
      subSpecs: '',
      buildType: 'Archived Sale',
      qty: 1,
      priceNum: 0,
      priceDisplay: 'Sold',
      qtyBadge: 'SOLD',
    };
  }

  const cleanSpec = saleMatch[1]
    .trim()
    .replace(/MT:S/gi, 'MT/s')
    .replace(/w:\s*/gi, 'w/ ')
    .replace(/Black:White/gi, 'Black/White');
  const qty = saleMatch[2] ? parseInt(saleMatch[2], 10) : 1;
  const hasEach = Boolean(saleMatch[4]) || qty > 1;
  const priceNum = parseFloat(saleMatch[3].replace(/,/g, ''));
  const formattedPrice = priceNum % 1 === 0 ? '$' + priceNum.toLocaleString('en-US') : '$' + priceNum.toFixed(2);

  let headline = cleanSpec;
  let subSpecs = '';
  let buildType = 'Custom PC';

  if (cleanSpec.includes(' | ')) {
    const pipeParts = cleanSpec.split(' | ').map(s => s.trim());
    headline = pipeParts[0];
    subSpecs = pipeParts[1] || '';
    buildType = pipeParts[2] || 'Restored System';
  } else {
    const dashParts = cleanSpec.split(/\s+-\s+/);
    const mainSpec = dashParts[0].trim();
    if (dashParts.length > 1) {
      buildType = dashParts.slice(1).join(' \u00B7 ').trim();
    }

    const parenMatch = mainSpec.match(/^(.+?)\s*\((.+)\)$/);
    if (parenMatch) {
      headline = parenMatch[1].trim();
      subSpecs = parenMatch[2].split(',').map(s => s.trim()).join(' \u00B7 ');
    } else if (dashParts.length === 2 && dashParts[1].includes(',')) {
      headline = dashParts[0].trim();
      subSpecs = dashParts[1].split(',').map(s => s.trim()).join(' \u00B7 ');
      buildType = 'Restored System';
    } else {
      const commaParts = mainSpec.split(',').map(s => s.trim()).filter(Boolean);
      if (commaParts.length >= 3) {
        const gpu = commaParts[0];
        const cpu = commaParts.find((p, idx) => idx > 0 && /\b(Ryzen|Core|i[3579]|Xeon)\b/i.test(p)) || commaParts[1];
        const rest = commaParts.filter(p => p !== gpu && p !== cpu);
        headline = `${gpu} \u00B7 ${cpu}`;
        subSpecs = rest.join(' \u00B7 ');
      } else {
        headline = mainSpec;
      }
    }
  }

  return {
    rawTitle: base,
    title: cleanSpec,
    headline,
    subSpecs,
    buildType,
    qty,
    priceNum,
    priceDisplay: hasEach ? `${formattedPrice} ea` : formattedPrice,
    qtyBadge: qty > 1 ? `SOLD \u00B7 ${qty}\u00D7` : 'SOLD',
  };
}

// ── Custom PC Archive Sorting (Original Tier Order + Within-Gen Model Rank + Xeon/<=4th-Gen i7 Bottom) ──
function getGpuTier(filename) {
  if (/^(RTX\s*5|RX\s*9)/i.test(filename)) return 1;
  if (/^RTX\s*4/i.test(filename))          return 2;
  if (/^RX\s*[67]/i.test(filename))        return 3;
  if (/^RTX\s*3/i.test(filename))          return 4;
  if (/^RTX\s*2/i.test(filename))          return 5;
  if (/^RX\s*/i.test(filename))            return 6;
  if (/^GTX/i.test(filename))              return 7;
  return 8;
}

function getGpuModelScore(filename) {
  const head = filename.split(',')[0].trim().toUpperCase();
  const table = [
    // Tier 1: RTX 50 & RX 9000
    [/^RTX\s*5090/, 590],
    [/^RTX\s*5080/, 580],
    [/^RTX\s*5070\s*TI/, 575],
    [/^RX\s*9070\s*XT/, 572],
    [/^RX\s*9070\b/, 570],
    [/^RTX\s*5070\b/, 568],
    [/^RTX\s*5060\s*TI/, 565],
    [/^RTX\s*5060\b/, 560],
    // Tier 2: RTX 40
    [/^RTX\s*4090/, 490],
    [/^RTX\s*4080\s*SUPER/, 485],
    [/^RTX\s*4080\b/, 480],
    [/^RTX\s*4070\s*TI\s*SUPER/, 478],
    [/^RTX\s*4070\s*TI/, 475],
    [/^RTX\s*4070\s*SUPER/, 472],
    [/^RTX\s*4070\b/, 470],
    [/^RTX\s*4060\s*TI/, 465],
    [/^RTX\s*4060\b/, 460],
    // Tier 3: RX 6000 & 7000
    [/^RX\s*7900\s*XTX/, 395],
    [/^RX\s*7900\s*XT/, 390],
    [/^RX\s*6950\s*XT/, 385],
    [/^RX\s*6900\s*XT/, 380],
    [/^RX\s*7800\s*XT/, 378],
    [/^RX\s*6800\s*XT/, 375],
    [/^RX\s*6800\b/, 372],
    [/^RX\s*7700\s*XT/, 370],
    [/^RX\s*6750\s*XT/, 368],
    [/^RX\s*6700\s*XT/, 365],
    [/^RX\s*6700\b/, 362],
    [/^RX\s*6650\s*XT/, 358],
    [/^RX\s*6600\s*XT/, 355],
    [/^RX\s*6600\b/, 350],
    [/^RX\s*6500\s*XT/, 345],
    [/^RX\s*6400\b/, 340],
    // Tier 4: RTX 30
    [/^RTX\s*3090\s*TI/, 295],
    [/^RTX\s*3090\b/, 290],
    [/^RTX\s*3080\s*TI/, 285],
    [/^RTX\s*3080\b/, 280],
    [/^RTX\s*3070\s*TI/, 275],
    [/^RTX\s*3070\b/, 270],
    [/^RTX\s*3060\s*TI/, 265],
    [/^RTX\s*3060\b/, 260],
    [/^RTX\s*3050\b/, 250],
    // Tier 5: RTX 20
    [/^RTX\s*2080\s*TI/, 190],
    [/^RTX\s*2080\s*SUPER/, 185],
    [/^RTX\s*2080\b/, 180],
    [/^RTX\s*2070\s*SUPER/, 175],
    [/^RTX\s*2070\b/, 170],
    [/^RTX\s*2060\s*SUPER/, 165],
    [/^RTX\s*2060\b/, 160],
    // Tier 6: Older RX
    [/^RX\s*5700\s*XT/, 140],
    [/^RX\s*5700\b/, 135],
    [/^RX\s*5600\s*XT/, 130],
    [/^RX\s*580\b/, 110],
    // Tier 7: GTX
    [/^GTX\s*TITAN\s*XP/, 95],
    [/^GTX\s*TITAN\s*X/, 92],
    [/^GTX\s*1080\s*TI/, 90],
    [/^GTX\s*1080\b/, 85],
    [/^GTX\s*1070\s*TI/, 80],
    [/^GTX\s*1070\b/, 75],
    [/^GTX\s*980\s*TI/, 72],
    [/^GTX\s*1660/, 68],
    [/^GTX\s*1650\s*SUPER/, 65],
    [/^GTX\s*1060\b/, 60],
    [/^GTX\s*745\b/, 20],
  ];
  for (const [re, score] of table) {
    if (re.test(head)) return score;
  }
  return 0;
}

function isLegacyCPU(filename) {
  if (/\bXeon\b/i.test(filename)) return true;
  if (/\b(?:Core\s+)?i7(?![-\s]*\d)/i.test(filename)) return true;
  if (/\bi7-([1-4]\d{3}|\d{3})[A-Za-z]*\b/i.test(filename)) return true;
  return false;
}

function getSortedArchiveFiles() {
  return [...ARCHIVE_FILES].sort((a, b) => {
    const legA = isLegacyCPU(a) ? 1 : 0;
    const legB = isLegacyCPU(b) ? 1 : 0;
    if (legA !== legB) return legA - legB;

    const tierA = getGpuTier(a);
    const tierB = getGpuTier(b);
    if (tierA !== tierB) return tierA - tierB;

    const modelA = getGpuModelScore(a);
    const modelB = getGpuModelScore(b);
    if (modelA !== modelB) return modelB - modelA;

    const priceA = parseSaleFilename(a).priceNum;
    const priceB = parseSaleFilename(b).priceNum;
    if (priceA !== priceB) return priceB - priceA;

    return a.localeCompare(b, undefined, { numeric: true });
  });
}

// ── Refurbished Hardware Categorization & Sorting ────────────────────────────
function getRefurbCategory(filename) {
  if (/\b(COMBO|Bundle)\b/i.test(filename)) return { id: 'combo', label: 'CPU + Board Bundle', rank: 2 };
  if (/\b(Laptop|Thinkpad|Mac Mini|NUC8i3BEH)\b/i.test(filename)) return { id: 'system', label: 'Restored System', rank: 3 };
  if (/\b(GPU|GeForce|Radeon|RTX\s*\d+|GTX\s*\d+|GTX\s*Titan|RX\s*\d+|GT\s*\d+)\b/i.test(filename)) return { id: 'gpu', label: 'Graphics Card', rank: 1 };
  if (/\b(CPU|Ryzen|Core\s+i[3579]|i[3579]-\d+|Motherboard)\b/i.test(filename)) return { id: 'cpu-mobo', label: 'CPU / Motherboard', rank: 4 };
  return { id: 'memory-storage', label: 'Memory / Storage / Cooling', rank: 5 };
}

function getSortedRefurbFiles() {
  return [...REFURB_HARDWARE_FILES].sort((a, b) => {
    const catA = getRefurbCategory(a).rank;
    const catB = getRefurbCategory(b).rank;
    if (catA !== catB) return catA - catB;
    const priceA = parseSaleFilename(a).priceNum;
    const priceB = parseSaleFilename(b).priceNum;
    if (priceA !== priceB) return priceB - priceA;
    return a.localeCompare(b, undefined, { numeric: true });
  });
}

// ── Modal Logic ───────────────────────────────────────────────────────────────
let modalImages = [];
let activeImageIndex = 0;

function updateModalImage(index) {
  if (!modalImages.length) return;
  activeImageIndex = (index + modalImages.length) % modalImages.length;
  const imgObj = modalImages[activeImageIndex];

  const mainWebp = document.getElementById('modal-main-webp');
  const mainImg = document.getElementById('modal-main-img');
  if (mainWebp) mainWebp.srcset = imgObj.webp || '';
  mainImg.src = imgObj.fallback;
  mainImg.alt = imgObj.alt;

  const counter = document.getElementById('modal-counter');
  if (counter) {
    counter.textContent = `${activeImageIndex + 1} / ${modalImages.length}`;
  }

  document.querySelectorAll('.thumb-btn').forEach((b, j) => {
    b.classList.toggle('active', j === activeImageIndex);
  });
}

function openModal(index) {
  const build = FEATURED_BUILDS[index];
  if (!build) return;
  const summary = parseBuildSummary(build);

  const modalContent = document.getElementById('modal-content');
  modalContent.classList.remove('single-image');

  document.getElementById('modal-subtitle').textContent = summary.descriptor;
  document.getElementById('modal-title').textContent = build.title;
  document.getElementById('modal-price').textContent = build.price;
  document.getElementById('modal-desc').textContent = build.description;

  const compsSection = document.getElementById('modal-specs-section');
  compsSection.hidden = false;
  const compsContainer = document.getElementById('modal-comps');
  compsContainer.innerHTML = build.components.map(c => {
    const colonIdx = c.indexOf(':');
    if (colonIdx !== -1) {
      const key = c.slice(0, colonIdx).trim();
      const val = c.slice(colonIdx + 1).trim();
      return `<div class="modal-spec-row"><dt class="modal-spec-key">${key}</dt><dd class="modal-spec-val">${val}</dd></div>`;
    }
    return `<div class="modal-spec-row"><dt class="modal-spec-key">Spec</dt><dd class="modal-spec-val">${c}</dd></div>`;
  }).join('');

  modalImages = build.images.map((imgPath, i) => ({
    webp: getFeaturedWebpPath(imgPath, 'full'),
    thumbWebp: getFeaturedWebpPath(imgPath, 'thumb'),
    fallback: encodeImagePath(imgPath),
    label: getAngleLabel(imgPath, i),
    alt: `${build.title} — ${getAngleLabel(imgPath, i)}`,
  }));

  const thumbs = document.getElementById('modal-thumbs');
  thumbs.innerHTML = '';
  modalImages.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'thumb-btn' + (i === 0 ? ' active' : '');
    btn.innerHTML = `
      <picture>
        ${item.thumbWebp ? `<source srcset="${item.thumbWebp}" type="image/webp">` : ''}
        <img src="${item.fallback}" alt="${item.label}" loading="lazy" decoding="async">
      </picture>
      <span>${item.label}</span>`;
    btn.addEventListener('click', () => updateModalImage(i));
    thumbs.appendChild(btn);
  });

  updateModalImage(0);

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close').focus();
}

function openSingleItemModal({ subtitle, title, price, description, specs, webp, fallback }) {
  const modalContent = document.getElementById('modal-content');
  modalContent.classList.add('single-image');

  document.getElementById('modal-subtitle').textContent = subtitle;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-price').textContent = price;
  document.getElementById('modal-desc').textContent = description;

  const compsSection = document.getElementById('modal-specs-section');
  const compsContainer = document.getElementById('modal-comps');
  if (specs && specs.length) {
    compsSection.hidden = false;
    compsContainer.innerHTML = specs.map(([k, v]) => (
      `<div class="modal-spec-row"><dt class="modal-spec-key">${k}</dt><dd class="modal-spec-val">${v}</dd></div>`
    )).join('');
  } else {
    compsSection.hidden = true;
    compsContainer.innerHTML = '';
  }

  modalImages = [{ webp, fallback, label: 'Front', alt: title }];
  document.getElementById('modal-thumbs').innerHTML = '';
  updateModalImage(0);

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ── Featured Custom PCs Renderer ──────────────────────────────────────────────
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  grid.innerHTML = '';

  FEATURED_BUILDS.forEach((build, i) => {
    const summary = parseBuildSummary(build);
    const frontPng = build.images[0];
    const frontWebp = getFeaturedWebpPath(frontPng, 'thumb');

    const card = document.createElement('article');
    card.className = 'build-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${build.title} — ${build.price}`);
    card.innerHTML = `
      <div class="card-img-wrap">
        <picture>
          ${frontWebp ? `<source srcset="${frontWebp}" type="image/webp">` : ''}
          <img src="${encodeImagePath(frontPng)}" alt="${build.title}" loading="lazy" decoding="async">
        </picture>
      </div>
      <div class="card-body">
        <div class="card-top-row">
          <h3 class="card-headline">${summary.headline}</h3>
          <span class="card-price">${build.price}</span>
        </div>
        <p class="card-specs-line">${summary.subSpecs}</p>
        <div class="card-footer-row">
          <span class="card-descriptor">${summary.descriptor}</span>
          <span class="card-inspect-link">Specifications &rarr;</span>
        </div>
      </div>`;
    card.addEventListener('click', () => openModal(i));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(i);
      }
    });
    grid.appendChild(card);
  });
}

// ── Featured Refurbished Hardware Renderer ────────────────────────────────────
function openRefurbItemModal(filename) {
  const parsed = parseSaleFilename(filename);
  const cat = getRefurbCategory(filename);
  const paths = getRefurbImagePaths(filename);
  const specs = [
    ['Category', cat.label],
    ['Hardware', parsed.headline],
  ];
  if (parsed.subSpecs) {
    specs.push(['Specifications', parsed.subSpecs]);
  }
  specs.push(['Sale Status', parsed.qty > 1 ? `Sold (${parsed.qty} Units)` : 'Sold']);
  specs.push(['Sale Price', parsed.priceDisplay]);

  openSingleItemModal({
    subtitle: `Refurbished Hardware \u00B7 ${cat.label}`,
    title: parsed.title,
    price: parsed.priceDisplay,
    description: 'Cleaned, tested, and verified hardware from the Bober Electronics workshop.',
    specs,
    webp: paths.webp,
    fallback: paths.fallback,
  });
}

function renderFeaturedRefurb() {
  const grid = document.getElementById('refurb-featured-grid');
  if (!grid) return;
  grid.innerHTML = '';

  FEATURED_REFURB_FILENAMES.forEach(filename => {
    const parsed = parseSaleFilename(filename);
    const cat = getRefurbCategory(filename);
    const paths = getRefurbImagePaths(filename);

    const card = document.createElement('article');
    card.className = 'build-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${parsed.title} — ${parsed.priceDisplay}`);
    card.innerHTML = `
      <div class="card-img-wrap">
        <picture>
          <source srcset="${paths.webp}" type="image/webp">
          <img src="${paths.fallback}" alt="${parsed.title}" loading="lazy" decoding="async">
        </picture>
      </div>
      <div class="card-body">
        <div class="card-top-row">
          <h3 class="card-headline">${parsed.headline}</h3>
          <span class="card-price">${parsed.priceDisplay}</span>
        </div>
        <p class="card-specs-line">${parsed.subSpecs || cat.label}</p>
        <div class="card-footer-row">
          <span class="card-descriptor">${cat.label} &middot; ${parsed.qtyBadge}</span>
          <span class="card-inspect-link">Details &rarr;</span>
        </div>
      </div>`;
    card.addEventListener('click', () => openRefurbItemModal(filename));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openRefurbItemModal(filename);
      }
    });
    grid.appendChild(card);
  });
}

// ── Custom PC Archive Renderer (Search, GPU Filters, View Toggle, Progressive Loading) ──
const PC_ARCHIVE_SORTED = getSortedArchiveFiles();
let pcArchiveFilter = 'all';
let pcArchiveSearch = '';
let pcArchiveView = 'grid';
let pcArchiveVisibleCount = 16;

function matchesPcFilter(filename, filterId) {
  if (filterId === 'all') return true;
  const legacy = isLegacyCPU(filename);
  if (filterId === 'legacy') return legacy;
  if (legacy) return false;
  const tier = getGpuTier(filename);
  if (filterId === 'tier-1') return tier === 1;
  if (filterId === 'tier-2') return tier === 2;
  if (filterId === 'tier-3') return tier === 3;
  if (filterId === 'tier-4') return tier === 4;
  if (filterId === 'tier-5') return tier === 5;
  if (filterId === 'tier-67') return tier === 6 || tier === 7 || tier === 8;
  return true;
}

function openArchivePcModal(filename) {
  const parsed = parseSaleFilename(filename);
  const webp = getArchiveWebpPath(filename);
  const fallback = encodeImagePath('assets/images/archive/' + filename);
  const [specStr, buildType] = parsed.title.split(/\s+-\s+/);
  const parts = (specStr || parsed.title).split(',').map(s => s.trim()).filter(Boolean);
  const specs = parts.map((p, idx) => {
    if (idx === 0) return ['GPU / System', p];
    if (/\b(Ryzen|Core|i[3579]|Xeon)\b/i.test(p)) return ['Processor', p];
    if (/\b(DDR\d|RAM)\b/i.test(p)) return ['Memory', p];
    if (/\b(SSD|NVMe|HDD|Storage)\b/i.test(p)) return ['Storage', p];
    return ['Feature', p];
  });
  specs.push(['Sale Status', `${parsed.qtyBadge} (${parsed.priceDisplay})`]);

  openSingleItemModal({
    subtitle: `Archived Build \u00B7 ${buildType || 'Custom Gaming PC'}`,
    title: parsed.title,
    price: parsed.priceDisplay,
    description: 'Completed and stress-tested custom system from the Bober Electronics archive.',
    specs,
    webp,
    fallback,
  });
}

function renderArchive() {
  const list = document.getElementById('archive-list');
  const countBadge = document.getElementById('pc-archive-count');
  const pagination = document.getElementById('pc-archive-pagination');
  const loadMoreBtn = document.getElementById('pc-load-more');
  const showAllBtn = document.getElementById('pc-show-all');

  const query = pcArchiveSearch.trim().toLowerCase();
  const filtered = PC_ARCHIVE_SORTED.filter(filename => {
    if (!matchesPcFilter(filename, pcArchiveFilter)) return false;
    if (!query) return true;
    return filename.toLowerCase().includes(query);
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'System' : 'Systems'}`;
  }

  list.className = pcArchiveView === 'grid' ? 'archive-grid' : 'archive-list-mode';
  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `<div class="archive-empty">No archived PC builds match your current search or filter.</div>`;
    if (pagination) pagination.hidden = true;
    return;
  }

  const visibleItems = filtered.slice(0, pcArchiveVisibleCount);

  visibleItems.forEach(filename => {
    const parsed = parseSaleFilename(filename);
    const webp = getArchiveWebpPath(filename);
    const fallback = encodeImagePath('assets/images/archive/' + filename);

    if (pcArchiveView === 'grid') {
      const card = document.createElement('article');
      card.className = 'archive-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('title', parsed.title);
      card.setAttribute('aria-label', `${parsed.title} — ${parsed.priceDisplay}`);
      card.innerHTML = `
        <div class="archive-card-img-wrap">
          <picture>
            <source srcset="${webp}" type="image/webp">
            <img src="${fallback}" alt="${parsed.title}" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="archive-card-body">
          <div class="archive-card-top">
            <h3 class="archive-card-headline">${parsed.headline}</h3>
            <span class="archive-price-tag">${parsed.priceDisplay}</span>
          </div>
          ${parsed.subSpecs ? `<p class="archive-card-subspecs">${parsed.subSpecs}</p>` : ''}
          <div class="archive-card-footer">
            <span class="sold-tag">${parsed.qtyBadge}</span>
            <span class="archive-card-type">${parsed.buildType}</span>
          </div>
        </div>`;
      card.addEventListener('click', () => openArchivePcModal(filename));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openArchivePcModal(filename);
        }
      });
      list.appendChild(card);
    } else {
      const row = document.createElement('div');
      row.className = 'archive-row';
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.innerHTML = `
        <div class="archive-info">
          <span class="sold-tag">${parsed.qtyBadge}</span>
          <p class="archive-title">${parsed.title}</p>
          <span class="archive-row-price">${parsed.priceDisplay}</span>
        </div>
        <div class="archive-img-wrap">
          <picture>
            <source srcset="${webp}" type="image/webp">
            <img src="${fallback}" alt="${parsed.title}" loading="lazy" decoding="async">
          </picture>
        </div>`;
      row.addEventListener('click', () => openArchivePcModal(filename));
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openArchivePcModal(filename);
        }
      });
      list.appendChild(row);
    }
  });

  if (pagination) {
    const remaining = filtered.length - visibleItems.length;
    pagination.hidden = remaining <= 0;
    if (remaining > 0) {
      loadMoreBtn.textContent = `Load More (${remaining} Remaining)`;
      showAllBtn.textContent = `Show All ${filtered.length}`;
    }
  }
}

// ── Refurbished Hardware Archive Renderer ─────────────────────────────────────
const REFURB_ARCHIVE_SORTED = getSortedRefurbFiles();
let refurbArchiveFilter = 'all';
let refurbArchiveSearch = '';
let refurbArchiveView = 'grid';
let refurbArchiveVisibleCount = 12;

function renderRefurbArchive() {
  const list = document.getElementById('refurb-archive-list');
  const countBadge = document.getElementById('refurb-archive-count');
  const pagination = document.getElementById('refurb-archive-pagination');
  const loadMoreBtn = document.getElementById('refurb-load-more');
  const showAllBtn = document.getElementById('refurb-show-all');
  if (!list) return;

  const query = refurbArchiveSearch.trim().toLowerCase();
  const filtered = REFURB_ARCHIVE_SORTED.filter(filename => {
    const cat = getRefurbCategory(filename);
    if (refurbArchiveFilter !== 'all' && cat.id !== refurbArchiveFilter) return false;
    if (!query) return true;
    return filename.toLowerCase().includes(query) || cat.label.toLowerCase().includes(query);
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'Item' : 'Items'}`;
  }

  list.className = refurbArchiveView === 'grid' ? 'archive-grid' : 'archive-list-mode';
  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `<div class="archive-empty">No refurbished hardware items match your current search or filter.</div>`;
    if (pagination) pagination.hidden = true;
    return;
  }

  const visibleItems = filtered.slice(0, refurbArchiveVisibleCount);

  visibleItems.forEach(filename => {
    const parsed = parseSaleFilename(filename);
    const cat = getRefurbCategory(filename);
    const paths = getRefurbImagePaths(filename);

    if (refurbArchiveView === 'grid') {
      const card = document.createElement('article');
      card.className = 'archive-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('title', parsed.title);
      card.setAttribute('aria-label', `${parsed.title} — ${parsed.priceDisplay}`);
      card.innerHTML = `
        <div class="archive-card-img-wrap">
          <picture>
            <source srcset="${paths.webp}" type="image/webp">
            <img src="${paths.fallback}" alt="${parsed.title}" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="archive-card-body">
          <div class="archive-card-top">
            <h3 class="archive-card-headline">${parsed.headline}</h3>
            <span class="archive-price-tag">${parsed.priceDisplay}</span>
          </div>
          ${parsed.subSpecs ? `<p class="archive-card-subspecs">${parsed.subSpecs}</p>` : ''}
          <div class="archive-card-footer">
            <span class="sold-tag">${parsed.qtyBadge}</span>
            <span class="archive-card-type">${cat.label}</span>
          </div>
        </div>`;
      card.addEventListener('click', () => openRefurbItemModal(filename));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openRefurbItemModal(filename);
        }
      });
      list.appendChild(card);
    } else {
      const row = document.createElement('div');
      row.className = 'archive-row';
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.innerHTML = `
        <div class="archive-info">
          <span class="sold-tag">${parsed.qtyBadge}</span>
          <p class="archive-title">${parsed.title}</p>
          <span class="archive-row-price">${parsed.priceDisplay}</span>
        </div>
        <div class="archive-img-wrap">
          <picture>
            <source srcset="${paths.webp}" type="image/webp">
            <img src="${paths.fallback}" alt="${parsed.title}" loading="lazy" decoding="async">
          </picture>
        </div>`;
      row.addEventListener('click', () => openRefurbItemModal(filename));
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openRefurbItemModal(filename);
        }
      });
      list.appendChild(row);
    }
  });

  if (pagination) {
    const remaining = filtered.length - visibleItems.length;
    pagination.hidden = remaining <= 0;
    if (remaining > 0) {
      loadMoreBtn.textContent = `Load More (${remaining} Remaining)`;
      showAllBtn.textContent = `Show All ${filtered.length}`;
    }
  }
}

// ── Reviews Renderers (100% Verbatim Preservation) ───────────────────────────
function createReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <p class="review-text">&ldquo;${review.text}&rdquo;</p>
    <div class="review-meta">
      <span class="review-author">${review.user}</span>
      ${review.date ? `<span class="review-date">${review.date}</span>` : ''}
    </div>`;
  return card;
}

function renderFeaturedReviews() {
  const container = document.getElementById('featured-reviews-list');
  container.innerHTML = '';
  FEATURED_REVIEWS.forEach(review => container.appendChild(createReviewCard(review)));
}

let showAllStandardReviews = false;

function renderStandardReviews() {
  const container = document.getElementById('more-reviews-list');
  const toggleBtn = document.getElementById('reviews-toggle-btn');
  container.innerHTML = '';

  const visible = showAllStandardReviews ? STANDARD_REVIEWS : STANDARD_REVIEWS.slice(0, 12);
  visible.forEach(review => container.appendChild(createReviewCard(review)));

  if (toggleBtn) {
    toggleBtn.textContent = showAllStandardReviews
      ? 'Show Fewer Reviews'
      : `Show All ${STANDARD_REVIEWS.length} Archived Reviews`;
  }
}

// ── Init & Event Listeners ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderFeaturedReviews();
  renderFeaturedRefurb();
  renderArchive();
  renderRefurbArchive();
  renderStandardReviews();

  // Hero Flagship Showcase Trigger
  const heroTrigger = document.getElementById('hero-featured-trigger');
  if (heroTrigger) {
    heroTrigger.addEventListener('click', () => openModal(1));
    heroTrigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(1);
      }
    });
  }

  // PC Archive Controls
  const pcSearchInput = document.getElementById('pc-archive-search');
  if (pcSearchInput) {
    pcSearchInput.addEventListener('input', e => {
      pcArchiveSearch = e.target.value;
      pcArchiveVisibleCount = 16;
      renderArchive();
    });
  }

  document.querySelectorAll('#pc-filter-tabs .filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#pc-filter-tabs .filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pcArchiveFilter = btn.dataset.filter;
      pcArchiveVisibleCount = 16;
      renderArchive();
    });
  });

  const pcViewGrid = document.getElementById('pc-view-grid');
  const pcViewList = document.getElementById('pc-view-list');
  if (pcViewGrid && pcViewList) {
    pcViewGrid.addEventListener('click', () => {
      pcArchiveView = 'grid';
      pcViewGrid.classList.add('active');
      pcViewGrid.setAttribute('aria-pressed', 'true');
      pcViewList.classList.remove('active');
      pcViewList.setAttribute('aria-pressed', 'false');
      renderArchive();
    });
    pcViewList.addEventListener('click', () => {
      pcArchiveView = 'list';
      pcViewList.classList.add('active');
      pcViewList.setAttribute('aria-pressed', 'true');
      pcViewGrid.classList.remove('active');
      pcViewGrid.setAttribute('aria-pressed', 'false');
      renderArchive();
    });
  }

  document.getElementById('pc-load-more')?.addEventListener('click', () => {
    pcArchiveVisibleCount += 16;
    renderArchive();
  });
  document.getElementById('pc-show-all')?.addEventListener('click', () => {
    pcArchiveVisibleCount = PC_ARCHIVE_SORTED.length;
    renderArchive();
  });

  // Refurbished Hardware Archive Controls
  const refurbSearchInput = document.getElementById('refurb-archive-search');
  if (refurbSearchInput) {
    refurbSearchInput.addEventListener('input', e => {
      refurbArchiveSearch = e.target.value;
      refurbArchiveVisibleCount = 12;
      renderRefurbArchive();
    });
  }

  document.querySelectorAll('#refurb-filter-tabs .filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#refurb-filter-tabs .filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      refurbArchiveFilter = btn.dataset.filter;
      refurbArchiveVisibleCount = 12;
      renderRefurbArchive();
    });
  });

  const refurbViewGrid = document.getElementById('refurb-view-grid');
  const refurbViewList = document.getElementById('refurb-view-list');
  if (refurbViewGrid && refurbViewList) {
    refurbViewGrid.addEventListener('click', () => {
      refurbArchiveView = 'grid';
      refurbViewGrid.classList.add('active');
      refurbViewGrid.setAttribute('aria-pressed', 'true');
      refurbViewList.classList.remove('active');
      refurbViewList.setAttribute('aria-pressed', 'false');
      renderRefurbArchive();
    });
    refurbViewList.addEventListener('click', () => {
      refurbArchiveView = 'list';
      refurbViewList.classList.add('active');
      refurbViewList.setAttribute('aria-pressed', 'true');
      refurbViewGrid.classList.remove('active');
      refurbViewGrid.setAttribute('aria-pressed', 'false');
      renderRefurbArchive();
    });
  }

  document.getElementById('refurb-load-more')?.addEventListener('click', () => {
    refurbArchiveVisibleCount += 12;
    renderRefurbArchive();
  });
  document.getElementById('refurb-show-all')?.addEventListener('click', () => {
    refurbArchiveVisibleCount = REFURB_ARCHIVE_SORTED.length;
    renderRefurbArchive();
  });

  // Reviews Toggle
  document.getElementById('reviews-toggle-btn')?.addEventListener('click', () => {
    showAllStandardReviews = !showAllStandardReviews;
    renderStandardReviews();
  });

  // Modal Controls
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-prev').addEventListener('click', () => updateModalImage(activeImageIndex - 1));
  document.getElementById('modal-next').addEventListener('click', () => updateModalImage(activeImageIndex + 1));

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  document.addEventListener('keydown', e => {
    const isModalOpen = document.getElementById('modal-overlay').classList.contains('active');
    if (!isModalOpen) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') updateModalImage(activeImageIndex - 1);
    if (e.key === 'ArrowRight') updateModalImage(activeImageIndex + 1);
  });

  // Smooth Anchor Navigation & Mobile Menu
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('.nav-links').classList.remove('open');
      const hb = document.getElementById('hamburger');
      hb.classList.remove('open');
      hb.setAttribute('aria-expanded', 'false');
    });
  });

  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => {
    const isOpen = document.querySelector('.nav-links').classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 24);
  });
});
