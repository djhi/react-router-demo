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
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const title = formData.get("title");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${productId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Response("Failed to update product", { status: 500 });
    }
    return redirect("/products");
  }
  if (request.method === "DELETE") {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Response("Failed to update product", { status: 500 });
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

export default function EditProduct(props: Route.ComponentProps) {
  const { product } = props.loaderData;
  return (
    <Form className="container mx-auto p-4" method="patch">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input
          type="text"
          name="title"
          className="input"
          defaultValue={product.title}
        />
      </fieldset>
      <div className="my-4 flex gap-4">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="submit" formMethod="delete" className="btn btn-error">
          Delete
        </button>
      </div>
    </Form>
  );
}
