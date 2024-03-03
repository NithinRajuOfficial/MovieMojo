import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeSideBar } from "../store/reducers/SidebarSlice";

export default function SideBar() {
  const isOpen = useSelector((state) => state.sideBar.open);
  const dispatch = useDispatch();

  const toggleHamburg = () => {
    dispatch(removeSideBar());
  };

  return (
    <>
      <Drawer open={isOpen} onClose={open} className=" bg-mainBg md:hidden ">
        <div
          className={`w-[100%] h-full border-r-2 border-gray-600 text-primary p-10`}
        >
          <i
            className="text-3xl ri-menu-3-line mr-2 hover:cursor-pointer"
            onClick={toggleHamburg}
          ></i>
          <h1 className="text-3xl font-bold">
            <span>
              <i className="ri-tv-line mr-2 text-secondary"></i>
            </span>
            <span className="text-[#B3C5FF]">Movie</span>
            <span className="text-[#CCCCCC]">Mojo</span>
          </h1>
          <nav className="flex flex-col text-xl font-extralight mb-10">
            <h2 className="text-2xl font-normal text-primary mt-10 mb-5">
              News Feed
            </h2>
            <Link
              to={"/trending"}
              className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
            >
              <i className="ri-fire-line mr-1"></i>Trending
            </Link>
            <Link
              to={"/popular"}
              className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
            >
              <i className="ri-bard-line mr-2"></i>Popular
            </Link>
            <Link
              to={"/movies"}
              className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
            >
              <i className="ri-movie-2-line mr-2"></i>Movies
            </Link>
            <Link
              to={"tv_shows"}
              className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
            >
              <i className="ri-tv-2-line mr-2"></i>Tv Shows
            </Link>
            <Link
              to={"/peoples"}
              className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
            >
              <i className="ri-team-line mr-2"></i>People
            </Link>
          </nav>
          <hr className="border-none  h-[1.5px] rounded-full bg-gray-600" />
          <nav className="flex flex-col font-extralight text-xl">
            <h2 className="text-2xl font-normal text-primary mt-10 mb-5">
              Website Info
            </h2>
            <Link className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1">
              <i className="ri-tv-2-line mr-2"></i>Contact
            </Link>
            <Link className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1">
              <i className="ri-team-line mr-2"></i>About
            </Link>
          </nav>
        </div>
      </Drawer>

{/* mobile view ends here */}
      <div
        className={` hidden md:block md:min-w-[20%] h-full border-r-2 border-gray-600 text-primary p-10`}
      >
        <h1 className="text-3xl font-bold">
          <span>
            <i className="ri-tv-line mr-2 text-secondary"></i>
          </span>
          <span className="text-[#B3C5FF]">Movie</span>
          <span className="text-[#CCCCCC]">Mojo</span>
        </h1>
        <nav className="flex flex-col text-xl font-extralight mb-10">
          <h2 className="text-2xl font-normal text-primary mt-10 mb-5">
            News Feed
          </h2>
          <Link
            to={"/trending"}
            className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
          >
            <i className="ri-fire-line mr-1"></i>Trending
          </Link>
          <Link
            to={"/popular"}
            className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
          >
            <i className="ri-bard-line mr-2"></i>Popular
          </Link>
          <Link
            to={"/movies"}
            className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
          >
            <i className="ri-movie-2-line mr-2"></i>Movies
          </Link>
          <Link
            to={"tv_shows"}
            className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
          >
            <i className="ri-tv-2-line mr-2"></i>Tv Shows
          </Link>
          <Link
            to={"/peoples"}
            className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1"
          >
            <i className="ri-team-line mr-2"></i>People
          </Link>
        </nav>
        <hr className="border-none  h-[1.5px] rounded-full bg-gray-600" />
        <nav className="flex flex-col font-extralight text-xl">
          <h2 className="text-2xl font-normal text-primary mt-10 mb-5">
            Website Info
          </h2>
          <Link className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1">
            <i className="ri-tv-2-line mr-2"></i>Contact
          </Link>
          <Link className="hover:bg-secondary hover:scale-105 rounded-lg duration-300 p-2 mb-1">
            <i className="ri-team-line mr-2"></i>About
          </Link>
        </nav>
      </div>
    </>
  );
}
