import {
    type RouteConfig,
    index,
    route,
    layout,
    prefix
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("home2" , "./routes/home2.tsx")
] satisfies RouteConfig;
