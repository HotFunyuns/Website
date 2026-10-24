import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryListing, { categoryListingMetadata } from '@/components/blog/CategoryListing';
import { getCategory, type CategoryId } from '@/data/apps';
import { blogCategories, getPostsByCategory, pageCount } from '@/lib/blog';

export const dynamicParams = false;

/** Pages 2…N of each category's reading list. Page 1 is the category URL itself. */
export function generateStaticParams() {
  return blogCategories().flatMap((category) => {
    const pages = pageCount(getPostsByCategory(category.id));
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
      category: category.id,
      page: String(i + 2),
    }));
  });
}

function resolve(params: { category: string; page: string }) {
  const category = getCategory(params.category as CategoryId);
  const page = Number(params.page);
  if (!category || !Number.isInteger(page) || page < 2) return null;
  if (page > pageCount(getPostsByCategory(category.id))) return null;
  return { category, page };
}

export function generateMetadata({ params }: { params: { category: string; page: string } }): Metadata {
  const found = resolve(params);
  return found ? categoryListingMetadata(found.category, found.page) : {};
}

export default function BlogCategoryPagedPage({ params }: { params: { category: string; page: string } }) {
  const found = resolve(params);
  if (!found) notFound();
  return <CategoryListing category={found.category} page={found.page} />;
}
