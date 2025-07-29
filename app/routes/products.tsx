import { Link } from "react-router";
import type { Route } from "./+types/products";

export async function loader(args: Route.LoaderArgs) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Response("Failed to fetch products", { status: 500 });
  }

  const products = await response.json();
  return { products };
}

export default function Products(props: Route.ComponentProps) {
  const { products } = props.loaderData;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="list bg-base-300 rounded-box shadow-md">
        {products.map((product: { id: string; title: string }) => (
          <li key={product.id} className="list-row flex flex-col hover:bg-base-200">
            <Link to={`/products/${product.id}`}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
