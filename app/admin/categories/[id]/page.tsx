import CategoryForm from '@/components/admin/CategoryForm';
import { getCategory } from '@/actions/category.actions';

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="space-y-6">
      <CategoryForm initialData={category} />
    </div>
  );
}
