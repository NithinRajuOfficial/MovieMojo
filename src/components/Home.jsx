import MainSpace from "./MainSpace";
import SideBar from "./SideBar";

export default function Home() {
  return (
    <div className="h-[100%] flex">
      <SideBar />
      <MainSpace />
    </div>
  );
}
