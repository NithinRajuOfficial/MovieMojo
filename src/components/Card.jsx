import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Card({ data }) {
  return (
    <>
      {data?.map((elm, i) => (
        <Link key={i} className="w-[15%] h-[40vh] mb-20">
          <img
            className=" hover:scale-105 rounded-sm border-2 shadow-2xl duration-300 hover:shadow-purple-600"
            src={`https://image.tmdb.org/t/p/original/${
              elm?.poster_path || elm?.backdrop_path
            }`}
            alt=""
          />
          <h1 className="font-bold text-xl text-primary mt-2">
            {elm?.title ||
              elm?.name ||
              elm?.original_name ||
              elm?.original_title}
          </h1>
        </Link>
      ))}
    </>
  );
}
