import type { Route } from "./+types/home2";
import Analyse2Page from "~/page_contents/analysing_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iceberg" },
    { name: "description", content: "Welcome to Iceberg!" },
  ];
}

export default function analyse() {
  return <Analyse2Page/>;
}
