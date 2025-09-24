import { getOrderNest } from "@/actions/order-services";
export default async function ProductsPage() {
  const products = await ();
  return (
    <ul>
      {products.map(({ name }, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
