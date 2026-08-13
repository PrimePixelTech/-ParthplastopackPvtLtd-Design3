import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { getProductBySlug, getProducts } from '@/actions/product.actions';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dbProduct = await getProductBySlug(params.slug);
  
  if (!dbProduct) {
    return {
      title: 'Product Not Found | Parth Plasto Pack',
      description: 'The product you are looking for does not exist.',
    };
  }

  const title = `${dbProduct.name} | Parth Plasto Pack Pvt. Ltd.`;
  const description = dbProduct.description || dbProduct.shortDescription || `Discover the high-quality ${dbProduct.name} manufactured by Parth Plasto Pack Pvt. Ltd.`;
  const imageUrl = dbProduct.images?.[0] || 'https://www.parthplastopack.com/images/products/placeholder.webp';

  return {
    title,
    description,
    keywords: [dbProduct.name, dbProduct.category?.title, 'plastic packaging', 'pharma packaging', 'nutraceutical packaging', 'Parth Plasto Pack'],
    openGraph: {
      title,
      description,
      url: `https://www.parthplastopack.com/products/${dbProduct.slug}`,
      siteName: 'Parth Plasto Pack Pvt. Ltd.',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: dbProduct.name,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const dbProduct = await getProductBySlug(params.slug);
  
  if (!dbProduct) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 bg-light min-h-screen">
          <div className="section-container text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <h1 className="text-2xl font-bold text-dark">Product Not Found</h1>
            <p className="text-gray-500 mt-2">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="btn-primary mt-6 inline-flex py-3 px-6 text-sm">
              <ArrowLeft size={16} /> Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Map DB schema to frontend schema
  const mappedProduct = {
    id: dbProduct._id.toString(),
    name: dbProduct.name,
    slug: dbProduct.slug,
    categoryId: dbProduct.category?._id?.toString() || 'other',
    categoryLabel: dbProduct.category?.title || 'Other',
    image: dbProduct.images?.[0] || '/images/products/placeholder.webp',
    gallery: dbProduct.images?.length ? dbProduct.images : ['/images/products/placeholder.webp'],
    badge: dbProduct.isFeatured ? 'Featured' : dbProduct.isTrending ? 'Trending' : '',
    description: dbProduct.description || dbProduct.shortDescription || 'No description available.',
    overFlowVolume: dbProduct.specifications?.overFlowVolume || '',
    heightOfContainer: dbProduct.specifications?.heightOfContainer || '',
    neckSize: dbProduct.specifications?.neckSize || '',
    maximumDiaOfContainer: dbProduct.specifications?.maximumDiaOfContainer || '',
    wallThickness: dbProduct.specifications?.wallThickness || '',
    capFitting: dbProduct.specifications?.capFitting || '',
    labelType: dbProduct.specifications?.labelType || '',
    weightOfContainer: dbProduct.specifications?.weightOfContainer || '',
    powderVolume: dbProduct.specifications?.powderVolume || '',
    material: dbProduct.specifications?.material || '',
    moq: dbProduct.moq || 1000,
    features: dbProduct.features || [],
    applications: dbProduct.applications || [],
  };

  // Fetch related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p: any) => p.status === 'ACTIVE' && p._id.toString() !== dbProduct._id.toString() && p.category?._id?.toString() === dbProduct.category?._id?.toString())
    .slice(0, 4)
    .map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      categoryId: p.category?._id?.toString() || 'other',
      categoryLabel: p.category?.title || 'Other',
      image: p.images?.[0] || '/images/products/placeholder.webp',
      badge: p.isFeatured ? 'Featured' : p.isTrending ? 'Trending' : '',
      material: p.specifications?.material || 'N/A',
      overFlowVolume: p.specifications?.overFlowVolume || 'N/A',
      capFitting: p.specifications?.capFitting || 'N/A',
    }));

  // JSON-LD Product Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: dbProduct.name,
    image: mappedProduct.gallery,
    description: mappedProduct.description,
    brand: {
      '@type': 'Brand',
      name: 'Parth Plasto Pack Pvt. Ltd.'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://www.parthplastopack.com/products/${dbProduct.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-24 pb-20 bg-light min-h-screen">
        <ProductDetailClient product={mappedProduct} relatedProducts={relatedProducts} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
