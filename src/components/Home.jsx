import { lazy } from "react";

const MainSpace = lazy(() => import("./MainSpace"));
const SideBar = lazy(() => import("./SideBar"));

export default function Home() {
  return (
    <div className="h-screen flex scroll-smooth">
      <SideBar />
      <MainSpace />
    </div>
  );
}
