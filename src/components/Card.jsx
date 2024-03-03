import { Link } from "react-router-dom";
import { noImg } from "../assets/constants";

/* eslint-disable react/prop-types */
export default function Card({ data, isRated, title }) {
  return (
    <>
      {data?.map((elm, i) => (
        <Link
          to={`${data.media_type || title}/details/${elm.id}`}
          key={i}
          className=" relative w-[15%]  h-[40vh] mb-32"
        >
          <img
            className=" min-h-[45vh] hover:scale-105 object-cover rounded-lg border-2 hover:border-gray-700 border-gray-900   shadow-2xl duration-300 hover:shadow-purple-600"
            src={
              elm?.backdrop_path || elm?.profile_path || elm?.poster_path
                ? `https://image.tmdb.org/t/p/original/${
                  elm?.backdrop_path || elm?.profile_path || elm?.poster_path
                  }`
                : noImg
            }
            alt="poster img"
          />
          <h1 className="font-bold text-xl text-primary mt-2">
            {elm?.title ||
              elm?.name ||
              elm?.original_name ||
              elm?.original_title}
          </h1>
          <div
            className={`text-xl font-semibold bg-yellow-500 w-12 h-12 text-center rounded-full flex justify-center items-center absolute bottom-[-8%] right-[-8%] opacity-70 border-2 border-gray-100 ${
              isRated === false && "hidden"
            }`}
          >
            <h1>
              {(elm?.vote_average * 10 || Math.random() * 100).toFixed()}
              <sup className="text-xs">%</sup>
            </h1>
          </div>
        </Link>
      ))}
    </>
  );
}
