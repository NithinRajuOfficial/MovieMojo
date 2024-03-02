import { Link } from "react-router-dom";
import { noImg } from "../assets/constants.js";

/* eslint-disable react/prop-types */
export default function HorizontalCard({ data }) {
  return (
    <Link
      to={`/${data?.media_type ? "trending" : "tv_shows"}/${
        data?.media_type ? data?.media_type : "tv"
      }/details/${data?.id}`}
      className="h-[220px] w-[200px] flex-shrink-0 rounded-lg overflow-hidden shadow-2xl hover:scale-105 duration-300 hover:rounded-lg hover:bg-gray-900"
    >
      <img
        className="w-full h-[60%] object-cover bg-gray-300"
        src={
          data?.backdrop_path || data?.profile_path || data?.poster_path
            ? `https://image.tmdb.org/t/p/original/${
                data.backdrop_path || data.profile_path || data.poster_path
              }`
            : noImg
        }
        alt=""
      />
      <div className="px-2 py-1">
        <h1 className="text-base font-semibold text-gray-200 hover:cursor-pointer">
          {data?.title ||
            data?.name ||
            data?.original_name ||
            data?.original_title}
        </h1>
        {data?.details?.overview?.length !== 0 && (
          <small className="text-xs font-extralight text-gray-300 leading-tight">
            {data?.overview.slice(0, 50)}
            <span className={`text-zinc-900 text-xs font-semibold`}>
              {data?.media_type === "tv" && "...more"}
            </span>
          </small>
        )}
      </div>
    </Link>
  );
}
