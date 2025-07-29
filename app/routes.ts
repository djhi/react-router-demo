import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/products-layout.tsx", [
    route("/products", "routes/products.tsx"),
    route("/products/:id", "routes/product.tsx"),
    route("/products/:id/edit", "routes/edit-product.tsx"),
  ]),
] satisfies RouteConfig;
