import ProductForm from '@/components/admin/ProductForm';
import { getProduct } from '@/actions/product.actions';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <ProductForm initialData={product} />
    </div>
  );
}
