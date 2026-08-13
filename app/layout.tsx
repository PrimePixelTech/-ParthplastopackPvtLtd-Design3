import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import SplashScreen from '@/components/shared/SplashScreen';
import AuthProvider from '@/components/shared/AuthProvider';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Parth Plasto Pack Pvt. Ltd. | Premium Pharma & Nutraceutical Packaging Manufacturer',
    template: '%s | Parth Plasto Pack Pvt. Ltd.',
  },
  description:
    'Leading manufacturer of premium pharmaceutical & nutraceutical plastic packaging products. HDPE containers, PET bottles, medicine jars, plastic caps, child-resistant closures. ISO certified, food grade, export quality. 25+ years experience.',
  keywords: [
    'pharma packaging manufacturer',
    'plastic containers',
    'HDPE bottles',
    'PET bottles',
    'medicine jars',
    'nutraceutical packaging',
    'plastic caps',
    'child resistant caps',
    'pharmaceutical packaging',
    'protein powder containers',
    'tablet containers',
    'Ahmedabad',
    'Gujarat',
    'India',
    'Parth Plasto Pack',
  ],
  authors: [{ name: 'Parth Plasto Pack Pvt. Ltd.' }],
  creator: 'Parth Plasto Pack Pvt. Ltd.',
  publisher: 'Parth Plasto Pack Pvt. Ltd.',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.parthplastopack.com',
    siteName: 'Parth Plasto Pack Pvt. Ltd.',
    title: 'Parth Plasto Pack Pvt. Ltd. | Premium Pharma Packaging',
    description:
      'Leading manufacturer of premium pharmaceutical & nutraceutical plastic packaging. 25+ years, 500+ products, 1000+ clients across 20+ states.',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Parth Plasto Pack — Premium Pharma Packaging Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parth Plasto Pack Pvt. Ltd.',
    description: 'Leading manufacturer of premium pharmaceutical packaging solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Parth Plasto Pack Pvt. Ltd.',
  description: 'Manufacturer of Pharma & Nutraceutical Plastic Packaging Products',
  url: 'https://www.parthplastopack.com',
  logo: 'https://www.parthplastopack.com/images/logo.webp',
  foundingDate: '1998',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '156'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11, Swagat Ind. Park-2, Indore - Ahmedabad Highway, Nr. Bhavda Patiya, Kuha',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382433',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
  },
  sameAs: [
    'https://www.linkedin.com/company/parth-plasto-pack-pvt-ltd',
    'https://www.facebook.com/parthplastopack'
  ],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-light text-dark font-sans antialiased overflow-x-hidden transition-colors duration-300">
        <AuthProvider>
          {/* Subtle noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />
          <SplashScreen />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
