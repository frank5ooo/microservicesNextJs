import { getProducts } from "@/actions/order-services";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "1rem",
            fontSize: "3rem",
          }}
        >
          Respuesta
        </h1>
        <pre
          style={{
            backgroundColor: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
            color: "#000",
            maxWidth: "80%",
          }}
        >
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </div>
  );
}
