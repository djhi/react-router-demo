import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/products", "routes/products.tsx"),
  route("/products/:id", "routes/product.tsx"),
  route("/products/:id/edit", "routes/edit-product.tsx"),
  route("/products/create", "routes/create-product.tsx"),
] satisfies RouteConfig;
