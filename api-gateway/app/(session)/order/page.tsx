import { getProducts } from "@/actions/order-services";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Respuesta</h1>
      <p>{JSON.stringify(products, null, 2)}</p>
    </div>
  );
}
