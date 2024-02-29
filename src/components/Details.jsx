import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie } from "../store/actions/movieActions";
import { removeMovieData } from "../store/reducers/movieSlice";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  console.log(info, "ppppppp");
  useEffect(() => {
    asyncLoadMovie(id, dispatch);
    return () => dispatch(removeMovieData());
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${info?.details?.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen opacity-80 px-[10%] py-[2%] "
    >
      <nav className="flex justify-start items-center gap-10 text-white text-3xl">
        <Link href="" className=" hover:cursor-pointer hover:scale-110">
          <i
            className="ri-arrow-left-double-line"
            onClick={() => navigate(-1)}
          ></i>
        </Link>
        <a
          target="_blank"
          href={`${info?.details?.homepage}`}
          className="hover:cursor-pointer hover:scale-110"
        >
          <i className="ri-share-box-fill "></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info?.externalIds?.wikidata_id}`}
          className="hover:cursor-pointer hover:scale-110"
        >
          <i className="ri-crosshair-2-fill "></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info?.externalIds?.imdb_id}/`}
          className="hover:cursor-pointer hover:scale-110"
        >
          imdb
        </a>
      </nav>

      <div className="flex gap-20">
        <div className=" max-w-[20%] flex flex-col  items-start py-14 ">
          <img
            className=" w-full h-full rounded-lg border-2 hover:border-gray-700 border-gray-900   shadow-2xl duration-300"
            src={`https://image.tmdb.org/t/p/original/${info?.details?.poster_path}`}
            alt="poster img"
          />
          {info?.watchProviders?.flatrate && (
            <div className="flex w-[80%] items-center gap-4 md:text-2xl text:md text-white mt-4">
              <h1>Available On</h1>
              {info?.watchProviders?.flatrate?.map((elm, i) => (
                <img
                  key={i}
                  className=" w-[20%] md:rounded-lg rounded-sm"
                  src={`https://image.tmdb.org/t/p/original/${elm?.logo_path}`}
                  alt="logo"
                />
              ))}
            </div>
          )}
        </div>

        {/* right side  */}
        <div className="py-14 text-white">
          <div className="flex items-end mb-4">
            <h1 className="font-extrabold text-5xl ">
              {info?.details?.title ||
                info?.details?.name ||
                info?.details?.original_name ||
                info?.details?.original_title}
            </h1>
            <span className="text-2xl font-semibold ml-1">
              ({info?.details?.release_date.slice(0, 4)})
            </span>
          </div>

          <div className="flex items-center gap-5 font-semibold">
            <div
              className={`text-xl text-black font-semibold bg-yellow-500 w-12 h-12 text-center rounded-full flex justify-center items-center  border-2 border-gray-100 mt-4 "}`}
            >
              <h1>
                {(
                  info?.details?.vote_average * 10 || Math.random() * 100
                ).toFixed()}
                <sup className="text-xs">%</sup>
              </h1>
            </div>
            <span className="font-semibold text-xl mt-2">
              {info?.details?.release_date}
            </span>
            <div>
              {info?.details?.genres.map((elm) => (
                <span className="mr-4 text-xl" key={elm.id}>
                  {elm.name}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-xl font-bold mt-4 mb-4 text-white">
            {info?.details?.tagline}
          </h1>
          <h1 className="text-3xl mt-10">Overview</h1>
          <h1 className="text-xl">{info?.details?.overview}</h1>
          <h1 className="text-3xl mt-10">Languages</h1>
          <div className="flex flex-wrap gap-2 text-xl">
            {info?.translations.map((elm) => (
              <span key={elm.iso_639_1}>{elm.english_name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
