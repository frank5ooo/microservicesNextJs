import { services } from "@/lib/services";

export default async function ProductsPage() {
  const products = await services.products.get();
  return (
    <ul>
      {products.map(({ name }, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
