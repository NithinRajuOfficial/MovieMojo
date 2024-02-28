/* eslint-disable react/prop-types */
export default function HorizontalCard({ data }) {
  return (
    <div className="flex-shrink-0 w-[17%] rounded-lg overflow-hidden shadow-2xl bg-zinc-900">
      <img
        className="h-[50%] object-cover mb-1 hover:scale-105 duration-300 hover:cursor-pointer"
        src={`https://image.tmdb.org/t/p/original/${
          data?.backdrop_path || data?.profile_path
        }`}
        alt=""
      />
      <div className="p-2 h-[50%]">
        <h1 className="font-semibold text-gray-200 hover:cursor-pointer">
          {data?.title ||
            data?.name ||
            data?.original_name ||
            data?.original_title}
        </h1>
        <small className=" font-extralight text-gray-300 mb-2">
          {data?.overview.slice(0, 50)}
          <span className="text-zinc-600 text-sm font-semibold">...more</span>
        </small>
      </div>
    </div>
  );
}
