export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  material: string;
  capacity: string;
  color: string;
  features: string[];
  description: string;
  applications: string[];
  image: string;
  gallery?: string[];
  price?: string;
  badge?: string;
  dimensions?: string;
  weight?: string;
  moq?: string;
}

export const categories = [
  { id: 'all', label: 'All Products', icon: '📦' },
  { id: 'protein-containers', label: 'Protein Powder Containers', icon: '💪' },
  { id: 'hdpe-containers', label: 'HDPE Containers', icon: '🏭' },
  { id: 'medicine-jars', label: 'Medicine Jars', icon: '💊' },
  { id: 'plastic-caps', label: 'Plastic Caps & Closures', icon: '🔩' },
  { id: 'pet-bottles', label: 'PET Bottles', icon: '🧴' },
  { id: 'tablet-containers', label: 'Tablet Containers', icon: '💉' },
  { id: 'tubes', label: 'Effervescent Tubes', icon: '🧪' },
  { id: 'accessories', label: 'Spoons & Funnels', icon: '🥄' },
];

export const products: Product[] = [
  {
    id: 1,
    slug: 'protein-powder-container-1kg',
    name: '1 KG Protein Powder Container',
    category: 'protein-containers',
    categoryLabel: 'Protein Powder Containers',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '1000ml / 1 Litre',
    color: 'White, Black, Transparent',
    features: ['Food Grade Material', 'Airtight Seal', 'Wide Mouth Opening', 'Tamper Evident', 'UV Protection', 'Custom Labeling'],
    description: 'Premium 1KG protein powder container with wide mouth opening, airtight seal, and tamper-evident closure. Made from food-grade HDPE material ensuring product freshness and safety.',
    applications: ['Protein Powder', 'Mass Gainer', 'BCAA', 'Pre-Workout', 'Creatine'],
    image: '/images/products/jar1.webp',
    gallery: ['/images/products/jar1.webp', '/images/products/jar2.webp', '/images/products/jar3.webp'],
    dimensions: '120mm × 120mm × 180mm',
    weight: '85g',
    moq: '500 pieces',
    badge: 'Best Seller',
  },
  {
    id: 2,
    slug: 'protein-container-2kg',
    name: '2 KG Protein Container',
    category: 'protein-containers',
    categoryLabel: 'Protein Powder Containers',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '2000ml / 2 Litre',
    color: 'White, Black',
    features: ['Food Grade', 'Leak Proof', 'Wide Mouth', 'Stackable Design', 'Custom Colors Available'],
    description: 'Large 2KG capacity protein container with robust construction and stackable design for efficient storage and shipping.',
    applications: ['Protein Powder', 'Mass Gainer', 'Weight Gainer', 'Sports Nutrition'],
    image: '/images/products/jar2.webp',
    gallery: ['/images/products/jar2.webp', '/images/products/jar3.webp'],
    dimensions: '150mm × 150mm × 230mm',
    weight: '120g',
    moq: '500 pieces',
  },
  {
    id: 3,
    slug: 'hdpe-wide-mouth-jar-500cc',
    name: 'HDPE Wide-Mouth Container 500cc',
    category: 'hdpe-containers',
    categoryLabel: 'HDPE Containers',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '500cc',
    color: 'White, Natural, Amber',
    features: ['Optimal Moisture Barrier', 'Airtight Threaded Neck', 'Virgin Material', 'FDA Compliant'],
    description: 'Wide-mouth HDPE container with optimal moisture vapor barrier and airtight threaded neck finish for pharmaceutical and nutraceutical products.',
    applications: ['Pharmaceuticals', 'Nutraceuticals', 'Ayurvedic Products', 'Health Supplements'],
    image: '/images/white_black_jars.png',
    gallery: ['/images/white_black_jars.png', '/images/products/Large_j_1.webp', '/images/products/Large_j_2.webp'],
    dimensions: '95mm × 95mm × 145mm',
    weight: '55g',
    moq: '1000 pieces',
    badge: 'Popular',
  },
  {
    id: 4,
    slug: 'pharma-grade-pet-amber-bottle',
    name: 'Pharma Grade PET Amber Bottles',
    category: 'pet-bottles',
    categoryLabel: 'PET Bottles',
    material: 'PET (Polyethylene Terephthalate)',
    capacity: '30ml - 250ml',
    color: 'Amber',
    features: ['High UV Barrier', 'Pharmaceutical Grade', 'Crystal Clear Finish', 'Lightweight', 'Recyclable'],
    description: 'Premium PET amber bottles with high UV barrier protection. Pharmaceutical grade raw material ensures product safety and compliance.',
    applications: ['Liquid Medicines', 'Syrups', 'Eye Drops', 'Essential Oils', 'Homeopathy'],
    image: '/images/amber_jars.png',
    gallery: ['/images/amber_jars.png'],
    dimensions: 'Various sizes available',
    weight: '15g - 45g',
    moq: '2000 pieces',
  },
  {
    id: 5,
    slug: 'effervescent-tablet-tube',
    name: 'Effervescent Tablet Tubes',
    category: 'tubes',
    categoryLabel: 'Effervescent Tubes',
    material: 'PP Tube with Desiccant Cap',
    capacity: '10 - 20 tablets',
    color: 'White, Orange, Green, Custom',
    features: ['Desiccant Silica Gel Stopper', 'Shock-Absorbing Spring', 'Moisture Protection', 'Child Safe'],
    description: 'Specialized effervescent tablet tubes with built-in desiccant cap and shock-absorbing spiral spring to protect tablets during shipping.',
    applications: ['Effervescent Tablets', 'Vitamin C Tablets', 'Electrolyte Tablets', 'Calcium Tablets'],
    image: '/images/bhutani_tubes.png',
    gallery: ['/images/bhutani_tubes.png', '/images/products/tube1.webp', '/images/products/tube2.webp'],
    dimensions: '28mm × 28mm × 105mm',
    weight: '12g',
    moq: '5000 pieces',
    badge: 'New',
  },
  {
    id: 6,
    slug: 'child-resistant-crc-caps',
    name: 'Child-Resistant CRC Caps',
    category: 'plastic-caps',
    categoryLabel: 'Plastic Caps & Closures',
    material: 'Double-Wall PP (Outer/Inner)',
    capacity: '22mm, 28mm, 33mm',
    color: 'White, Black, Custom',
    features: ['Child Safety Lock', 'Push-Turn Mechanism', 'Tamper Evident Band', 'Senior Friendly'],
    description: 'Precision-engineered child-resistant caps with push-turn mechanism meeting strict international safety compliance standards.',
    applications: ['Pharmaceutical', 'Cannabis', 'Chemical', 'Household Products'],
    image: '/images/caps_closures.png',
    gallery: ['/images/caps_closures.png', '/images/products/Cap.webp'],
    dimensions: '22mm - 33mm diameter',
    weight: '3g - 6g',
    moq: '10000 pieces',
  },
  {
    id: 7,
    slug: 'medicine-jar-100cc',
    name: 'Medicine Jar 100cc',
    category: 'medicine-jars',
    categoryLabel: 'Medicine Jars',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '100cc',
    color: 'White',
    features: ['Pharma Grade', 'Leak Proof', 'Light Weight', 'Chemical Resistant'],
    description: 'Compact 100cc medicine jar perfect for tablet and capsule packaging. Made from pharma-grade HDPE with excellent chemical resistance.',
    applications: ['Tablets', 'Capsules', 'Ayurvedic Medicine', 'Homeopathic Products'],
    image: '/images/products/medium_j_1.webp',
    gallery: ['/images/products/medium_j_1.webp', '/images/products/medium_j_2.webp', '/images/products/medium_j_3.webp'],
    dimensions: '50mm × 50mm × 80mm',
    weight: '18g',
    moq: '2000 pieces',
  },
  {
    id: 8,
    slug: 'medicine-jar-200cc',
    name: 'Medicine Jar 200cc',
    category: 'medicine-jars',
    categoryLabel: 'Medicine Jars',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '200cc',
    color: 'White, Natural',
    features: ['FDA Compliant', 'Airtight Seal', 'Moisture Barrier', 'Stackable'],
    description: 'Medium-sized 200cc medicine jar with superior moisture barrier properties. Ideal for pharmaceutical packaging.',
    applications: ['Pharmaceuticals', 'Vitamins', 'Dietary Supplements', 'Herbal Products'],
    image: '/images/products/medium_j_4.webp',
    gallery: ['/images/products/medium_j_4.webp', '/images/products/medium_j_5.webp', '/images/products/medium_j_6.webp'],
    dimensions: '65mm × 65mm × 100mm',
    weight: '25g',
    moq: '2000 pieces',
  },
  {
    id: 9,
    slug: 'large-hdpe-jar-1000cc',
    name: 'Large HDPE Jar 1000cc',
    category: 'hdpe-containers',
    categoryLabel: 'HDPE Containers',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '1000cc',
    color: 'White, Black',
    features: ['Heavy Duty', 'Wide Mouth', 'Food Grade', 'Impact Resistant'],
    description: 'Large capacity 1000cc HDPE jar with heavy-duty construction for bulk pharmaceutical and nutraceutical packaging.',
    applications: ['Bulk Powder Packaging', 'Protein Powder', 'Health Supplements', 'Industrial Chemicals'],
    image: '/images/products/Large_j_3.webp',
    gallery: ['/images/products/Large_j_3.webp', '/images/products/Large_j_4.webp', '/images/products/Large_j_5.webp'],
    dimensions: '110mm × 110mm × 170mm',
    weight: '75g',
    moq: '500 pieces',
  },
  {
    id: 10,
    slug: 'securipack-tamper-evident-cap',
    name: 'Securipack Tamper-Evident Closures',
    category: 'plastic-caps',
    categoryLabel: 'Plastic Caps & Closures',
    material: 'PP (Polypropylene)',
    capacity: '28mm, 33mm, 38mm',
    color: 'White, Black, Blue, Custom',
    features: ['Push-Turn Mechanism', 'Tamper-Evident Band', 'Multiple Sizes', 'Custom Colors'],
    description: 'Advanced tamper-evident closures with push-turn mechanism and security band providing visible evidence of opening.',
    applications: ['Pharmaceutical Bottles', 'Supplement Bottles', 'Chemical Containers'],
    image: '/images/products/Cap.webp',
    gallery: ['/images/products/Cap.webp'],
    dimensions: '28mm - 38mm diameter',
    weight: '2g - 5g',
    moq: '10000 pieces',
  },
  {
    id: 11,
    slug: 'tablet-container-300cc',
    name: 'Tablet Container 300cc',
    category: 'tablet-containers',
    categoryLabel: 'Tablet Containers',
    material: 'HDPE (High Density Polyethylene)',
    capacity: '300cc',
    color: 'White',
    features: ['Pharma Grade', 'Tamper Evident', 'Child Resistant Option', 'Induction Seal Compatible'],
    description: 'Specialized 300cc tablet container designed for pharmaceutical tablet and capsule packaging with induction seal compatibility.',
    applications: ['Tablets', 'Capsules', 'Softgels', 'Lozenges'],
    image: '/images/products/jar5.webp',
    gallery: ['/images/products/jar5.webp', '/images/products/jar6.webp', '/images/products/jar7.webp'],
    dimensions: '75mm × 75mm × 115mm',
    weight: '35g',
    moq: '1000 pieces',
  },
  {
    id: 12,
    slug: 'small-effervescent-tube',
    name: 'Small Effervescent Tube',
    category: 'tubes',
    categoryLabel: 'Effervescent Tubes',
    material: 'PP with Desiccant',
    capacity: '10 tablets',
    color: 'White, Custom',
    features: ['Compact Design', 'Travel Friendly', 'Moisture Seal', 'Snap-On Cap'],
    description: 'Compact effervescent tube for 10-tablet capacity with travel-friendly design and superior moisture protection.',
    applications: ['Vitamins', 'Energy Tablets', 'Electrolytes', 'Travel Supplements'],
    image: '/images/products/smtube1.webp',
    gallery: ['/images/products/smtube1.webp', '/images/products/smtube2.webp', '/images/products/smtube3.webp'],
    dimensions: '25mm × 25mm × 85mm',
    weight: '8g',
    moq: '5000 pieces',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(currentId: number, category: string, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.features.some((f) => f.toLowerCase().includes(q))
  );
}
