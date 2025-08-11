import { Link } from "react-router";
import type { Route } from "./+types/products";

const limit = 6;
export async function loader(args: Route.LoaderArgs) {
  const { request } = args;
  // Create an URL object to easily get the URL parameters from the search parameters
  const url = new URL(request.url);
  const start = url.searchParams.get("start") || "1";

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  );
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
          <li
            key={product.id}
            className="list-row flex flex-col hover:bg-base-200"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/products?start=0" className="btn btn-primary">
          Previous
        </Link>
        <Link to="/products?start=5" className="btn btn-secondary ml-2">
          Next
        </Link>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: { id: string; title: string } }) {
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <h2 className="card-title">{product.title}</h2>
      <div className="card-actions justify-end">
        <Link to={`/products/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
        <Link to={`/products/${product.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  );
}
