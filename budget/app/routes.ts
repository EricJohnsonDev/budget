import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("add", "routes/add.tsx"),
  route("view", "routes/view.tsx"),
] satisfies RouteConfig;
