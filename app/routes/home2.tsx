import type { Route } from "./+types/home";
import Home2Page from "~/page_contents/home_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function nav() {
  return <Home2Page/>;
}
