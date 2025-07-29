import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/product";

export async function loader(args: Route.LoaderArgs) {
  const { params } = args;
  const productId = params.id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${productId}`
  );
  if (response.status === 404) {
    return redirect("/404");
  }
  if (!response.ok) {
    throw new Response("Failed to fetch product", { status: 500 });
  }

  const product = await response.json();
  return { product };
}

export async function action(args: Route.ActionArgs) {
  const { params, request } = args;
  const productId = params.id;
  if (request.method === "DELETE") {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Response("Failed to delete product", { status: 500 });
    }
    return redirect("/products");
  }
}

export function meta(args: Route.MetaArgs) {
  const { product } = args.data ?? {};

  return [
    {
      title: product?.title,
    },
    { description: "" },
  ];
}

export default function Product(props: Route.ComponentProps) {
  const { product } = props.loaderData;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <p>{product.body}</p>
      <div className="my-4">
        <Link to={`/products/${product.id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  );
}
