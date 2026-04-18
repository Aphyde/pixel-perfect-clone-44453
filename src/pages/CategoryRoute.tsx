import { Navigate, useParams } from "react-router-dom";
import CategoryPageTemplate from "@/components/CategoryPageTemplate";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { categories, findCategory, toProductPageData } from "@/data/products";

const CategoryRoute = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  if (!categorySlug) return <Navigate to="/" replace />;

  const category = findCategory(categorySlug);
  if (!category) return <Navigate to="/" replace />;

  // Single-product category → render ProductPageTemplate directly.
  if (category.singleProduct) {
    const others = categories
      .filter((c) => c.slug !== category.slug)
      .slice(0, 2)
      .map((c) => ({
        title: c.label,
        image: c.image,
        link: `/${c.slug}`,
      }));
    return <ProductPageTemplate data={toProductPageData(category.singleProduct, others)} />;
  }

  // Category with subproducts → render CategoryPageTemplate.
  const otherCategories = categories
    .filter((c) => c.slug !== category.slug)
    .slice(0, 3)
    .map((c) => ({
      label: c.label,
      image: c.image,
      link: `/${c.slug}`,
    }));

  return <CategoryPageTemplate category={category} otherCategories={otherCategories} />;
};

export default CategoryRoute;
