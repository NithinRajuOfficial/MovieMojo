/* eslint-disable react/prop-types */
import React, { lazy, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/aixios";
const TopNav = lazy(() => import("./TopNav"));
const DropDown = lazy(() => import("./DropDown"));
const Card = lazy(() => import("./Card"));

export default function Trending({ val, initialCat, rating }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialCat);
  const [duration, setDuration] = useState("day");
  const [current, setCurrent] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const pageData = React.useMemo(() => {
    return [
      {
        name: "trending",
        url: `/trending/${category}/${duration}`,
        options: ["tv", "movie", "all"],
      },
      {
        name: "popular",
        url: `${category}/popular`,
        options: ["tv", "movie"],
      },
      {
        name: "movie's",
        url: `/movie/${category}`,
        options: ["now_playing", "popular", "top_rated", "upcoming"],
      },
      {
        name: "tv Show's",
        url: `/tv/${category}`,
        options: ["airing_today", "popular", "on_the_air", "top_rated"],
      },
      {
        name: "people's",
        url: `/person/${category}`,
      },
    ].filter((elm) => elm.name === val);
  }, [val]);

  const title = useMemo(() => {
    return (
      (pageData[0]?.name.includes("tv") && "tv") ||
      (pageData[0]?.name.includes("movie") && "movie") ||
      (pageData[0]?.name.includes("people") && "people") ||
      category
    );
  }, [pageData, category]);

  const getCurrentData = async (refetch) => {
    try {
      const {
        data: { results: result },
      } = await instance.get(pageData[0].url, {
        params: { page: pageNo },
      });
      refetch ? setCurrent((prev) => [...prev, ...result]) : setCurrent(result);
      setPageNo(pageNo + 1);
    } catch (error) {
      console.error("Failed to get current data in Current Page ERROR:", error);
    }
  };

  useEffect(() => {
    getCurrentData();
  }, [category, duration]);

  return (
    <div
      id="scrollableDiv"
      className="w-screen h-screen px-4 z-10 overflow-y-auto scroll-smooth "
    >
      <div className="w-full min-h-[10vh] flex sticky top-0 bg-[#1F1E24] z-10">
        <div className="flex items-center justify-center">
          <i
            className="ri-arrow-left-double-line text-gray-500 text-3xl font-semibold mt-2 hover:text-secondary hover:cursor-pointer hover:scale-110"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-primary text-3xl font-bold">
            {pageData[0]?.name.charAt(0).toUpperCase() +
              pageData[0]?.name.slice(1)}
          </h1>
        </div>
        <div className="w-full flex justify-end items-center gap-2">
          <span className="w-full">
            <TopNav />
          </span>
          <DropDown
            title={"Filter"}
            options={pageData[0]?.options}
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
        dataLength={current?.length}
        loader={<h1>Loading....</h1>}
        hasMore={true}
        next={() => getCurrentData(true)}
        scrollableTarget="scrollableDiv"
      >
        <div className="w-full mt-10 flex ml-2 flex-wrap gap-7 bg-[#1F1E24]">
          <Card data={current} isRated={rating} title={title} />
        </div>
      </InfiniteScroll>
    </div>
  );
}
