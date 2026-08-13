export interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    step: '01',
    title: 'Consultation',
    description: 'We understand your packaging requirements, product specifications, regulatory needs, and volume projections through detailed consultation.',
    icon: '💬',
  },
  {
    id: 2,
    step: '02',
    title: 'Design & Engineering',
    description: 'Our engineering team creates precise CAD models and technical drawings tailored to your product, considering material selection and tooling requirements.',
    icon: '✏️',
  },
  {
    id: 3,
    step: '03',
    title: 'Prototype Development',
    description: 'We produce physical prototypes for your evaluation, including stability testing samples and compatibility trials before mass production.',
    icon: '🔬',
  },
  {
    id: 4,
    step: '04',
    title: 'Manufacturing',
    description: 'State-of-the-art injection blow moulding and extrusion blow moulding in our ISO-certified cleanroom facility ensures zero-defect production.',
    icon: '🏭',
  },
  {
    id: 5,
    step: '05',
    title: 'Quality Inspection',
    description: 'Rigorous multi-point quality checks including dimensional accuracy, leak testing, drop testing, and MVTR analysis on every production batch.',
    icon: '✅',
  },
  {
    id: 6,
    step: '06',
    title: 'Packaging & Delivery',
    description: 'Secure packaging, batch documentation, and reliable logistics ensuring safe delivery across 20+ states in India and international markets.',
    icon: '🚚',
  },
];

export const industries = [
  {
    id: 1,
    title: 'Pharmaceutical',
    description: 'FDA-compliant containers and closures for tablets, capsules, syrups, and injectable packaging.',
    icon: '💊',
    image: '/images/products/jar8.webp',
  },
  {
    id: 2,
    title: 'Nutraceutical',
    description: 'Premium protein powder containers, vitamin bottles, and supplement packaging solutions.',
    icon: '💪',
    image: '/images/products/jar1.webp',
  },
  {
    id: 3,
    title: 'Ayurveda & Herbal',
    description: 'Traditional medicine packaging with modern quality standards and child-resistant features.',
    icon: '🌿',
    image: '/images/products/medium_j_2.webp',
  },
  {
    id: 4,
    title: 'FMCG & Personal Care',
    description: 'Bottles and containers for cosmetics, personal care products, and consumer goods.',
    icon: '🧴',
    image: '/images/products/jar4.webp',
  },
  {
    id: 5,
    title: 'Food & Beverages',
    description: 'Food-grade containers for spices, dry foods, beverages, and specialty food products.',
    icon: '🍯',
    image: '/images/products/Large_j_1.webp',
  },
  {
    id: 6,
    title: 'Chemical & Industrial',
    description: 'Durable HDPE containers for chemicals, laboratory reagents, and industrial applications.',
    icon: '🧪',
    image: '/images/products/Large_j_4.webp',
  },
];
