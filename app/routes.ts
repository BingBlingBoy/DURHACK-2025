import {
    type RouteConfig,
    index,
    route,
    layout,
    prefix
} from "@react-router/dev/routes";

export default [
    index("./routes/home2.tsx"),
    // route("home2" , "./routes/home2.tsx"),
    route("analyse" , "./routes/analyse.tsx"),
    route("result" , "./routes/result.tsx")
] satisfies RouteConfig;
