import { lazy } from "react";

const MainSpace = lazy(() => import("./MainSpace"));
const SideBar = lazy(() => import("./SideBar"));

export default function Home() {
  return (
    <div className="h-[100%] flex scroll-smooth">
      <SideBar />
      <MainSpace />
    </div>
  );
}
