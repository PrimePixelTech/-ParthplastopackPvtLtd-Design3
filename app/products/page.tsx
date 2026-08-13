import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import ProductsCatalogClient from '@/components/products/ProductsCatalogClient';
import { getProducts } from '@/actions/product.actions';
import { getCategories } from '@/actions/category.actions';

export const metadata: Metadata = {
  title: 'Our Products | Parth Plasto Pack Pvt. Ltd.',
  description: 'Explore our comprehensive catalog of high-quality pharmaceutical and nutraceutical plastic packaging solutions, including HDPE jars, PET bottles, and CRC caps.',
  keywords: ['plastic packaging products', 'pharma packaging', 'hdpe jars', 'pet bottles', 'effervescent tubes', 'Parth Plasto Pack'],
  openGraph: {
    title: 'Our Products | Parth Plasto Pack Pvt. Ltd.',
    description: 'Explore our comprehensive catalog of high-quality pharmaceutical and nutraceutical plastic packaging solutions.',
    url: 'https://www.parthplastopack.com/products',
    siteName: 'Parth Plasto Pack Pvt. Ltd.',
    images: [
      {
        url: 'https://www.parthplastopack.com/images/hero-1.webp',
        width: 1200,
        height: 630,
        alt: 'Parth Plasto Pack Products',
      }
    ],
    type: 'website',
  },
};

export default async function ProductsPage() {
  const [productData, categoryData] = await Promise.all([
    getProducts(),
    getCategories()
  ]);
  
  // Map Categories
  const mappedCats = categoryData
    .filter((c: any) => c.isActive)
    .map((c: any) => ({
      id: c._id.toString(),
      label: c.title,
      icon: c.image || '📁'
    }));
    
  const dbCategories = [{ id: 'all', label: 'All Products', icon: '📦' }, ...mappedCats];

  // Map Products
  const activeProducts = productData.filter((p: any) => p.status === 'ACTIVE');
  const mappedProducts = activeProducts.map((p: any) => {
    const catId = p.category?._id?.toString() || (typeof p.category === 'string' ? p.category : 'other');
    const catLabel = p.category?.title || 'Other';
    
    return {
      id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      categoryId: catId,
      categoryLabel: catLabel,
      image: p.images?.[0] || '/images/products/placeholder.webp',
      badge: p.isFeatured ? 'Featured' : p.isTrending ? 'Trending' : '',
      material: p.specifications?.material || 'N/A',
      overFlowVolume: p.specifications?.overFlowVolume || 'N/A',
      capFitting: p.specifications?.capFitting || 'N/A',
    };
  });

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-[#F9FAFB] min-h-screen">
        <ProductsCatalogClient initialProducts={mappedProducts} categories={dbCategories} />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
