import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryListing, { categoryListingMetadata } from '@/components/blog/CategoryListing';
import { getCategory, type CategoryId } from '@/data/apps';
import { blogCategories, getPostsByCategory } from '@/lib/blog';

export const dynamicParams = false;

/** Only categories that actually hold a published article get a page, so the
 *  site never ships an empty listing for crawlers to index. */
export function generateStaticParams() {
  return blogCategories().map((category) => ({ category: category.id }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategory(params.category as CategoryId);
  if (!category) return {};
  return categoryListingMetadata(category, 1);
}

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category as CategoryId);
  if (!category || getPostsByCategory(category.id).length === 0) notFound();
  return <CategoryListing category={category} page={1} />;
}
