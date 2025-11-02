import type { Route } from "./+types/home2";
import Home2Page from "~/page_contents/home_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iceberg" },
    { name: "description", content: "Welcome to Iceberg" },
  ];
}

export default function nav() {
  return <Home2Page/>;
}
