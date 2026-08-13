import { MetadataRoute } from 'next';
import { getProducts } from '@/actions/product.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.parthplastopack.com';

  const staticPages = [
    '', '/about', '/products', '/industries',
    '/infrastructure', '/quality', '/gallery', '/contact',
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  try {
    const allProducts = await getProducts();
    const activeProducts = allProducts.filter((p: any) => p.status === 'ACTIVE');

    const products: MetadataRoute.Sitemap = activeProducts.map((product: any) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...pages, ...products];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return pages;
  }
}
