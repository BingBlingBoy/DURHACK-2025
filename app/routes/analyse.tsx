import type { Route } from "./+types/home2";
import Analyse2Page from "~/page_contents/analysing_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function analyse() {
  return <Analyse2Page/>;
}
