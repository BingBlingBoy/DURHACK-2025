import type { Route } from "./+types/home2";
import Result2Page from "~/page_contents/result_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function analyse() {
  return <Result2Page/>;
}
