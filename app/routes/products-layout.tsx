import { Form, Link, Outlet, redirect } from "react-router";
import type { Route } from "./+types/products-layout";

export async function loader(args: Route.LoaderArgs) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/categories}`
//   );
//   if (response.status === 404) {
//     return redirect("/404");
//   }
//   if (!response.ok) {
//     throw new Response("Failed to fetch product", { status: 500 });
//   }

//   const categories = await response.json();
  const categories = [{ id: "1", title: "Category 1" }, { id: "2", title: "Category 2" }];
  return { categories };
}

export default function Categories(props: Route.ComponentProps) {
  const { categories } = props.loaderData;
  return (
    <div className="flex gap-4">
        <ul className="list min-w-xs">
            {categories.map((category: { id: string; title: string }) => (
            <li key={category.id} className="list-row flex flex-col hover:bg-base-200">
                <Link to={`/products?category=${category.id}`}>
                {category.title}
                </Link>
            </li>
            ))}
        </ul>
        <Outlet />
    </div>
  );
}
