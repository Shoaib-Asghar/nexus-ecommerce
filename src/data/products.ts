import type { Product } from '../types';

export const mockProducts: Product[] = [
  // ELECTRONICS
  {
    id: 'prod_1',
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5',
    price: 398,
    brand: 'Sony',
    category: 'Electronics',
    description: 'Industry-leading noise cancellation optimized to you. Magnificent sound, engineered to perfection. Crystal clear hands-free calling with 4 beamforming microphones.',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
      'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 1245,
    stock: 45,
    sku: 'SNY-WH1000XM5-BLK',
    tags: ['headphones', 'audio', 'noise-cancelling', 'wireless'],
    variations: [{ name: 'Color', options: ['Black', 'Silver', 'Midnight Blue'] }],
    specifications: { 'Battery Life': 'Up to 30 hours', 'Weight': '250g', 'Connectivity': 'Bluetooth 5.2' },
    createdAt: new Date(Date.now() - 10000000).toISOString(),
    isFeatured: true
  },
  {
    id: 'prod_2',
    name: 'Apple MacBook Pro 14"',
    slug: 'apple-macbook-pro-14',
    price: 1999,
    salePrice: 1899,
    brand: 'Apple',
    category: 'Electronics',
    description: 'Supercharged for pros. The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro or M2 Max chip, you get groundbreaking performance and amazing battery life.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 890,
    stock: 12,
    sku: 'APP-MBP14-M2P',
    tags: ['laptop', 'macbook', 'apple', 'pro'],
    variations: [{ name: 'Color', options: ['Space Gray', 'Silver'] }, { name: 'Storage', options: ['512GB', '1TB'] }],
    specifications: { 'Processor': 'M2 Pro', 'Memory': '16GB', 'Display': '14.2" Liquid Retina XDR' },
    createdAt: new Date(Date.now() - 20000000).toISOString(),
    isFeatured: true
  },
  {
    id: 'prod_3',
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    slug: 'keychron-k2',
    price: 99,
    brand: 'Keychron',
    category: 'Electronics',
    description: 'A superb typing experience. K2 is a super tactile wireless or wired keyboard giving you all the keys and function you need while keeping it compact, with the largest battery seen in a mechanical keyboard.',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 432,
    stock: 89,
    sku: 'KEY-K2-V2',
    tags: ['keyboard', 'mechanical', 'wireless', 'accessories'],
    variations: [{ name: 'Switch Type', options: ['Red (Linear)', 'Brown (Tactile)', 'Blue (Clicky)'] }],
    specifications: { 'Layout': '75%', 'Connection': 'Bluetooth / Type-C', 'Switches': 'Gateron G Pro' },
    createdAt: new Date(Date.now() - 50000000).toISOString(),
    isFeatured: false
  },
  
  // FASHION
  {
    id: 'prod_4',
    name: 'Minimalist Cotton Overshirt',
    slug: 'minimalist-cotton-overshirt',
    price: 85,
    brand: 'Everlane',
    category: 'Fashion',
    description: 'The perfect layering piece. Made from premium heavyweight cotton, this overshirt offers a relaxed fit that looks effortlessly put together.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 156,
    stock: 120,
    sku: 'EVR-OVR-CTN',
    tags: ['clothing', 'mens', 'shirt', 'cotton'],
    variations: [{ name: 'Size', options: ['S', 'M', 'L', 'XL'] }, { name: 'Color', options: ['Olive', 'Navy', 'Sand'] }],
    specifications: { 'Material': '100% Organic Cotton', 'Fit': 'Relaxed', 'Care': 'Machine wash cold' },
    createdAt: new Date(Date.now() - 15000000).toISOString(),
    isFeatured: true
  },
  {
    id: 'prod_5',
    name: 'Classic White Sneakers',
    slug: 'classic-white-sneakers',
    price: 130,
    salePrice: 95,
    brand: 'Veja',
    category: 'Fashion',
    description: 'Timeless design meets sustainable materials. These sneakers are crafted with wild rubber and organic cotton, providing comfort that you can feel good about.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 642,
    stock: 34,
    sku: 'VEJ-ESP-WHT',
    tags: ['shoes', 'sneakers', 'sustainable', 'casual'],
    variations: [{ name: 'Size', options: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'] }],
    specifications: { 'Material': 'Vegan Leather', 'Sole': 'Wild Rubber', 'Origin': 'Made in Brazil' },
    createdAt: new Date(Date.now() - 35000000).toISOString(),
    isFeatured: false
  },

  // HOME & LIVING
  {
    id: 'prod_6',
    name: 'Ceramic Pour-Over Coffee Maker',
    slug: 'ceramic-pour-over',
    price: 45,
    brand: 'Hario',
    category: 'Home & Living',
    description: 'Brew the perfect cup every time. The V60 ceramic dripper is the gold standard for manual coffee brewing, offering excellent heat retention and a clean cup.',
    images: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 2104,
    stock: 200,
    sku: 'HAR-V60-CER',
    tags: ['coffee', 'kitchen', 'brewing', 'ceramic'],
    variations: [{ name: 'Color', options: ['White', 'Red', 'Matte Black'] }],
    specifications: { 'Material': 'Ceramic', 'Capacity': '1-4 Cups', 'Filter': 'Size 02 Paper' },
    createdAt: new Date(Date.now() - 40000000).toISOString(),
    isFeatured: false
  },
  {
    id: 'prod_7',
    name: 'Mid-Century Lounge Chair',
    slug: 'mid-century-lounge-chair',
    price: 899,
    salePrice: 799,
    brand: 'Herman Miller',
    category: 'Home & Living',
    description: 'An icon of modern design. This lounge chair combines unparalleled comfort with striking aesthetics, featuring molded plywood and premium leather.',
    images: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 312,
    stock: 5,
    sku: 'HM-EAM-LOU',
    tags: ['furniture', 'chair', 'leather', 'living-room'],
    variations: [{ name: 'Wood Finish', options: ['Walnut', 'Rosewood', 'Ebony'] }, { name: 'Leather', options: ['Black', 'White'] }],
    specifications: { 'Materials': 'Molded Plywood, Leather', 'Dimensions': '32"H x 32.75"W x 32.75"D', 'Assembly': 'Pre-assembled' },
    createdAt: new Date(Date.now() - 100000000).toISOString(),
    isFeatured: true
  },

  // BEAUTY
  {
    id: 'prod_8',
    name: 'Advanced Night Repair Serum',
    slug: 'advanced-night-repair',
    price: 115,
    brand: 'Estée Lauder',
    category: 'Beauty',
    description: 'Wake up to beautiful skin. This deep- and fast-penetrating serum reduces the look of multiple signs of aging caused by the environmental assaults of modern life.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 3450,
    stock: 85,
    sku: 'EST-ANR-50ML',
    tags: ['skincare', 'serum', 'anti-aging', 'face'],
    variations: [{ name: 'Size', options: ['30ml', '50ml', '75ml'] }],
    specifications: { 'Skin Type': 'All Skin Types', 'Formulation': 'Serum', 'Key Ingredient': 'Hyaluronic Acid' },
    createdAt: new Date(Date.now() - 5000000).toISOString(),
    isFeatured: true
  },
  
  // WATCHES
  {
    id: 'prod_9',
    name: 'Classic Automatic Chronograph',
    slug: 'classic-automatic-chronograph',
    price: 4500,
    brand: 'Omega',
    category: 'Watches',
    description: 'A timeless masterpiece of precision engineering. Features a self-winding chronograph movement, tachymeter bezel, and a durable stainless steel case.',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 124,
    stock: 8,
    sku: 'OMG-SPM-PRO',
    tags: ['luxury', 'watch', 'automatic', 'chronograph'],
    variations: [{ name: 'Strap', options: ['Steel Bracelet', 'Leather', 'NATO'] }],
    specifications: { 'Movement': 'Automatic Chronometer', 'Water Resistance': '50m', 'Case Material': 'Stainless Steel' },
    createdAt: new Date(Date.now() - 80000000).toISOString(),
    isFeatured: true
  },
  
  // SPORTS
  {
    id: 'prod_10',
    name: 'Ultralight Running Shoes',
    slug: 'ultralight-running-shoes',
    price: 160,
    salePrice: 129,
    brand: 'Nike',
    category: 'Sports',
    description: 'Designed for speed and comfort. These ultralight running shoes feature responsive cushioning and a breathable mesh upper for your longest runs.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 890,
    stock: 230,
    sku: 'NKE-ZMX-UL',
    tags: ['running', 'shoes', 'athletics', 'performance'],
    variations: [{ name: 'Size', options: ['US 8', 'US 9', 'US 10', 'US 11'] }, { name: 'Color', options: ['Red/Black', 'Volt/Black', 'All White'] }],
    specifications: { 'Drop': '8mm', 'Weight': '210g', 'Use': 'Road Running' },
    createdAt: new Date(Date.now() - 25000000).toISOString(),
    isFeatured: false
  },

  // ACCESSORIES
  {
    id: 'prod_11',
    name: 'Slim Leather Wallet',
    slug: 'slim-leather-wallet',
    price: 79,
    brand: 'Bellroy',
    category: 'Accessories',
    description: 'Slim your pocket. This premium leather wallet holds all your essentials without the bulk, featuring RFID protection and quick-access card slots.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 512,
    stock: 145,
    sku: 'BEL-SLM-LTH',
    tags: ['wallet', 'leather', 'everyday-carry', 'mens'],
    variations: [{ name: 'Color', options: ['Caramel', 'Black', 'Navy'] }],
    specifications: { 'Material': 'Premium Eco-tanned Leather', 'Capacity': '4-12 cards', 'Dimensions': '102 x 80mm' },
    createdAt: new Date(Date.now() - 45000000).toISOString(),
    isFeatured: true
  }
];
