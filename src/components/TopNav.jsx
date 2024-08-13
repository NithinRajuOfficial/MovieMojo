import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../utils/aixios";
import { noImg } from "../assets/constants.js";
import { useDispatch } from "react-redux";
import { isSideBar } from "../store/reducers/SidebarSlice.jsx";

export default function TopNav() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const dispatch = useDispatch()
  const handleSearch = async () => {
    try {
      const { data } = await instance.get(`/search/multi?query=${query}`);
      setSearchData(data.results);
    } catch (error) {
      console.error("Failed to get the search results ERROR:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setSearchData("");
  };

  const openDrawer = () => dispatch(isSideBar(true));

  return (
    <>
      <div className="h-[8vh] p-2 text-2xl relative text-primary flex justify-start items-center md:ml-[20%]">
      <i className="ri-menu-3-line md:invisible self-center hover:cursor-pointer sm:ml-2 sm:mr-10" onClick={openDrawer}></i>
        <i
          className={`ri-search-2-line hover:cursor-pointer hover:scale-110 ${
            !query && "invisible"
          }`}
          onClick={handleSearch}
        ></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search here..."
          className="md:w-[50%] w-[70%] sm:p-4 text-xl  outline-none border-none bg-transparent"
        />
        {query && (
          <i
            className="ri-close-line hover:cursor-pointer hover:scale-110"
            onClick={handleClose}
          ></i>
        )}
        <div className="md:w-[50%] w-[96%] max-h-[50vh] bg-gray-200 absolute top-[100%] rounded-sm overflow-auto z-10">
          {searchData &&
            searchData.map((elm) => {
              let prefix = "";
              if (elm.media_type.includes("tv")) {
                prefix = "tv_shows";
              } else if (elm.media_type.includes("movie")) {
                prefix = "popular";
              
              } else if (elm.media_type.includes("trending")) {
                prefix = "trending";
              } else if (elm.media_type.includes("person")) {
                prefix = "peoples";
              }
              return (
                <Link
                  to={`${prefix}/${elm.media_type}/details/${elm.id}`}
                  key={elm.id}
                  className="bg-gray-300 w-[100%] p-6 flex justify-start items-center border-b-2 border-gray-400 cursor-default"
                >
                  <img
                    src={
                      elm.poster_path || elm.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            elm.poster_path || elm.profile_path
                          }`
                        : noImg
                    }
                    alt="poster"
                    className="w-[30%] h-36 object-contain rounded-md mr-5 hover:scale-105 duration-300 cursor-pointer shadow-md shadow-slate-700 hover:shadow-lg hover:shadow-slate-900"
                  />
                  <span className="text-lg text-gray-600 font-semibold hover:text-gray-900 duration-300 cursor-pointer">
                    {elm.title ||
                      elm.name ||
                      elm.original_name ||
                      elm.original_title}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
