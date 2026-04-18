import { useParams } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import NotFound from "@/pages/NotFound";
import { categories, findCategory, findProduct, toProductPageData } from "@/data/products";

const ProductRoute = () => {
  const { categorySlug, productSlug } = useParams<{
    categorySlug: string;
    productSlug: string;
  }>();
  if (!categorySlug || !productSlug) return <NotFound />;

  const category = findCategory(categorySlug);
  const product = findProduct(categorySlug, productSlug);
  if (!category || !product) return <NotFound />;

  // Other products in same category, plus a fallback to other categories.
  const siblings = category.products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 2)
    .map((p) => ({
      title: p.label,
      image: p.image,
      link: `/${category.slug}/${p.slug}`,
    }));

  const others =
    siblings.length >= 2
      ? siblings
      : [
          ...siblings,
          ...categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 2 - siblings.length)
            .map((c) => ({ title: c.label, image: c.image, link: `/${c.slug}` })),
        ];

  return <ProductPageTemplate data={toProductPageData(product, others)} />;
};

export default ProductRoute;
