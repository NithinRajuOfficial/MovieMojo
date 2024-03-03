import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Header({ data }) {
  console.log(data,"lll")
  return (
    <div className="w-full h-[56vh] relative">
      <img
        className="w-full h-full object-cover opacity-60"
        src={`https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path
        }`}
        alt=""
      />
      <div className="absolute  bottom-6 left-8 p-2">
        <h1 className=" text-3xl font-bold text-gray-200 mb-2">
          {data?.title ||
            data?.name ||
            data?.original_name ||
            data?.original_title}
        </h1>
        <p className="max-w-[50%] text-md font-light text-gray-300 mb-1">
          {data?.overview.slice(0, 250)}
          <Link
            to={`/trending/${data?.media_type}/details/${data?.id}`}
            className="text-blue-400 text-sm font-semibold"
          >
            ...more
          </Link>
        </p>
        <div className="flex gap-5">
          <small className="flex text-md font-semibold mb-4 text-purple-50">
            <i className="ri-megaphone-line mr-1 text-yellow-300"></i>
            {data?.first_air_date || "Releasing soon..."}
          </small>
          <small className="flex text-md font-semibold mb-4 text-purple-50">
            <i className="ri-movie-line mr-1 text-red-400"></i>
            {data?.media_type.toUpperCase()}
          </small>
          <small className="flex text-md font-semibold mb-4 text-purple-50">
            <i className="ri-earth-line mr-1 text-purple-500"></i>
            {data?.original_language.toUpperCase()}
          </small>
        </div>
        <Link to={`/trending/${data?.media_type}/details/${data?.id}`} className=" text-gray-600 px-2 py-1 font-bold rounded-lg bg-gradient-to-r from-indigo-900 from-10% via-sky-200 via-30% to-emerald-200 to-90% border-2 border-">
          Watch Trailer
        </Link>
      </div>
    </div>
  );
}
