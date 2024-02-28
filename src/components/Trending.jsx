import { lazy, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/aixios";
const TopNav = lazy(() => import("./TopNav"));
const DropDown = lazy(() => import("./DropDown"));
const Card = lazy(() => import("./Card"));

export default function Trending() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const getTrendingData = async () => {
    try {
      const {
        data: { results: result },
      } = await instance.get(`/trending/${category}/${duration}`, {
        params: { page: pageNo },
      });
      setTrending((prev) => [...prev, ...result]);
      setPageNo(pageNo + 1);
    } catch (error) {
      console.error(
        "Failed to get trending data in Trending Page ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    getTrendingData();
  }, [category, duration]);

  return (
    <div
      id="scrollableDiv"
      className="w-screen h-screen px-4 py-4 z-10 overflow-y-auto scroll-smooth "
    >
      <div className="w-full h-[10vh] flex ">
        <div className="flex items-center justify-center">
          <i
            className="ri-arrow-left-double-line text-gray-500 text-3xl font-semibold mt-2 hover:text-secondary hover:cursor-pointer hover:scale-110"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-primary text-3xl font-bold">Trending</h1>
        </div>
        <div className="w-full flex justify-end items-center gap-2">
          <span className="w-full">
            <TopNav />
          </span>
          <DropDown
            title={"Filter"}
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <DropDown
            title={"Duration"}
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending?.length}
        loader={<h1>Loading....</h1>}
        hasMore={true}
        next={getTrendingData}
        scrollableTarget="scrollableDiv"
      >
        <div className=" w-full mt-10 flex ml-2 flex-wrap gap-7 bg-[#1F1E24]">
          <Card data={trending} />
        </div>
      </InfiniteScroll>
    </div>
  );
}
