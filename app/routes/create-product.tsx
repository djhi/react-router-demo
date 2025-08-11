import { Form, redirect } from "react-router";
import type { Route } from "./+types/product";

export async function action(args: Route.ActionArgs) {
  const { request } = args;
  if (request.method === "POST") {
    const formData = await request.formData();
    const title = formData.get("title");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Response("Failed to create product", { status: 500 });
    }
    return redirect("/products");
  }
}

export default function CreateProduct(props: Route.ComponentProps) {
  return (
    <Form className="container mx-auto p-4" method="post">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input
          type="text"
          name="title"
          className="input"
        />
      </fieldset>
      <div className="my-4 flex gap-4">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </Form>
  );
}
