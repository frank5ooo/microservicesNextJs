import { getProducts } from "@/actions/products-services";

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <ul>
      {products.map(({ name }, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
