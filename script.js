// ── Featured Builds ──────────────────────────────────────────────────────────
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
      'assets/images/featured/6900XT_BACK.png',
    ],
  },
];

// ── Refurbished Items ─────────────────────────────────────────────────────────
const REFURB_ITEMS = [
  {
    title: '2016 Lenovo Thinkpad: Core i7-6600U, 24GB DDR4, GeForce GTX 930M',
    image: 'assets/images/refurbished/refurbLenovoThinkpad.png',
  },
  {
    title: 'EVGA GeForce GTX 1070 Ti 8GB: Repasted, Repadded, Cleaned',
    image: 'assets/images/refurbished/refurbGPU_1070Ti.png',
  },
  {
    title: 'Blower GeForce RTX 3070: Repasted, Repadded, Cleaned',
    image: 'assets/images/refurbished/refurbGPU_3070.png',
  },
  {
    title: 'COMBO: ASRock Z690 Phantom Gaming + Intel Core i7-12700K',
    image: 'assets/images/refurbished/refurbCOMBO_12700k:z690.png',
  },
];

// ── Archive Files ─────────────────────────────────────────────────────────────
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

// ── Reviews ───────────────────────────────────────────────────────────────────
const FEATURED_REVIEWS = [
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
  {
    user: 'Joe',
    date: 'March 21, 2025',
    text: 'Incredible overall experience. The computer I purchased was in perfect condition, with all of the software necessary for it to run well already installed. The seller was also very responsive and communicative throughout the whole process. Would certainly buy from again, thank you so much!',
  },
  {
    user: 'Kunal',
    date: 'September 23, 2024',
    text: 'This was one of the greatest purchases I ever did on FB Marketplace. Great config and well setup at a reasonable price. Smooth communication and super helpful. Definitely recommend going for it if you are happy with the config! This one runs games smoothly on high settings at 2K resolution. Thanks a lot man for this, you rock.',
  },
  {
    user: 'Restored-Jawa#1251',
    date: 'August 8, 2025',
    text: 'Bober Electronics was stellar! They messaged me first off letting me know if I had any questions or concerns I could let them know directly. They gave regular updates, answered all my questions, and the PC was double-packed securely for shipping. They did everything a professional custom workshop should be doing and made a completely seamless experience. Highly recommended.',
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

// ── Helpers ───────────────────────────────────────────────────────────────────
function encodeImagePath(path) {
  return path.split('/').map(s => encodeURIComponent(s)).join('/');
}

function fileToTitle(filename) {
  return filename.replace(/\.[^/.]+$/, '').replace(/^\d+\s*[-–]\s*/, '').trim();
}

function getGpuTier(filename) {
  if (/^(RTX 5|RX 9)/i.test(filename)) return 1;
  if (/^RTX 4/i.test(filename))         return 2;
  if (/^RX [67]/i.test(filename))        return 3;
  if (/^RTX 3/i.test(filename))          return 4;
  if (/^RTX 2/i.test(filename))          return 5;
  if (/^RX /i.test(filename))            return 6;
  if (/^GTX/i.test(filename))            return 7;
  return 8;
}

function isLegacyCPU(filename) {
  if (/\bXeon\b/i.test(filename)) return true;
  // Bare "i3/i5/i7" with no model number (e.g. "Core i7" not followed by digits)
  if (/\b(?:Core\s+)?i[3579](?![-\s]*\d)/i.test(filename)) return true;
  // Intel 4th gen or older: 3-digit model (1st gen) or 4-digit starting 2–4 (2nd–4th gen)
  if (/\bi[3579]-([2-4]\d{3}|\d{3})[A-Za-z]*\b/i.test(filename)) return true;
  return false;
}

function createReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <p class="review-text">&ldquo;${review.text}&rdquo;</p>
    <div class="review-meta">
      <span class="review-author">— ${review.user}</span>
      ${review.date ? `<span class="review-date">${review.date}</span>` : ''}
    </div>`;
  return card;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
let activeBuildIndex = 0;
let activeImageIndex = 0;

function openModal(index) {
  activeBuildIndex = index;
  activeImageIndex = 0;
  const build = FEATURED_BUILDS[index];

  document.getElementById('modal-title').textContent = build.title;
  document.getElementById('modal-price').textContent = build.price;
  document.getElementById('modal-desc').textContent = build.description;
  document.getElementById('modal-comps').innerHTML = build.components.map(c => `<li>${c}</li>`).join('');

  const mainImg = document.getElementById('modal-main-img');
  mainImg.src = encodeImagePath(build.images[0]);
  mainImg.alt = build.title;

  const thumbs = document.getElementById('modal-thumbs');
  thumbs.innerHTML = '';
  const labels = ['Front', 'Side', 'Back'];
  build.images.forEach((imgPath, i) => {
    const btn = document.createElement('button');
    btn.className = 'thumb-btn' + (i === 0 ? ' active' : '');
    btn.innerHTML = `<img src="${encodeImagePath(imgPath)}" alt="${labels[i]}"><span>${labels[i]}</span>`;
    btn.addEventListener('click', () => {
      activeImageIndex = i;
      mainImg.src = encodeImagePath(build.images[i]);
      document.querySelectorAll('.thumb-btn').forEach((b, j) => b.classList.toggle('active', j === i));
    });
    thumbs.appendChild(btn);
  });

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ── Renderers ─────────────────────────────────────────────────────────────────
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  FEATURED_BUILDS.forEach((build, i) => {
    const card = document.createElement('div');
    card.className = 'build-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${encodeImagePath(build.images[0])}" alt="${build.title}" loading="lazy">
        <div class="card-overlay"><span>View Details</span></div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${build.title}</h3>
        <p class="card-price">${build.price}</p>
      </div>`;
    card.addEventListener('click', () => openModal(i));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(i); });
    grid.appendChild(card);
  });
}

function renderFeaturedReviews() {
  const container = document.getElementById('featured-reviews-list');
  FEATURED_REVIEWS.forEach(review => container.appendChild(createReviewCard(review)));
}

function renderRefurb() {
  const grid = document.getElementById('refurb-grid');
  REFURB_ITEMS.forEach(item => {
    const el = document.createElement('div');
    el.className = 'refurb-card';
    el.innerHTML = `
      <div class="refurb-img-wrap">
        <img src="${encodeImagePath(item.image)}" alt="${item.title}" loading="lazy">
      </div>
      <p class="refurb-title">${item.title}</p>`;
    grid.appendChild(el);
  });
}

function renderArchive() {
  const list = document.getElementById('archive-list');
  const sorted = [...ARCHIVE_FILES].sort((a, b) => {
    const legacyDiff = (isLegacyCPU(a) ? 1 : 0) - (isLegacyCPU(b) ? 1 : 0);
    if (legacyDiff !== 0) return legacyDiff;
    const tierDiff = getGpuTier(a) - getGpuTier(b);
    return tierDiff !== 0 ? tierDiff : b.localeCompare(a, undefined, { numeric: true });
  });
  sorted.forEach(filename => {
    const title = fileToTitle(filename);
    const row = document.createElement('div');
    row.className = 'archive-row';
    row.innerHTML = `
      <div class="archive-info">
        <span class="sold-tag">SOLD</span>
        <p class="archive-title">${title}</p>
      </div>
      <div class="archive-img-wrap">
        <img src="${encodeImagePath('assets/images/archive/' + filename)}" alt="${title}" loading="lazy">
      </div>`;
    list.appendChild(row);
  });
}

function renderStandardReviews() {
  const container = document.getElementById('more-reviews-list');
  STANDARD_REVIEWS.forEach(review => container.appendChild(createReviewCard(review)));
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderFeaturedReviews();
  renderRefurb();
  renderArchive();
  renderStandardReviews();

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('.nav-links').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    });
  });

  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });
});
