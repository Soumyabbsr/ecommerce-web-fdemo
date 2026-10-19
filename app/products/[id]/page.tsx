import { redirect, notFound } from "next/navigation";
import { getProductById, getProductBySlug, getProducts, slugify } from "@/lib/db";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function LegacyProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = (await getProductById(id)) || (await getProductBySlug(id));

  if (!product) {
    redirect("/");
  }

  redirect(`/product/${product.slug || slugify(product.name)}`);
}
