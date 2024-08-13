import { lazy, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie } from "../store/actions/movieActions";
import { removeMovieData } from "../store/reducers/movieSlice";
const Loader = lazy(() => import("../utils/Loader.jsx"));
const HorizontalCard = lazy(() => import("./HorizontalCard"));
const Trailer = lazy(() => import("./Trailer"));

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { pathname } = useLocation();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUrlName = () => {
    if (pathname.includes("movie")) {
      return "movie";
    } else if (pathname.includes("tv")) {
      return "tv";
    }
  };

  useEffect(() => {
    const current = currentUrlName();
    asyncLoadMovie(id, dispatch, current);
    return () => dispatch(removeMovieData());
  }, [id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {info ? (
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${info?.details?.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className={`w-screen opacity-80 px-[10%] py-[2%] bg-mainBg`}
        >
          <nav className="flex justify-start items-center gap-10 text-white text-xl sm:text-3xl">
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

          <div className="flex flex-col sm:flex-row sm:gap-20">
            <div className="sm:max-w-[20%] flex flex-col items-start py-14 ">
              <img
                className=" min-w-[50%] min-h-[50%] rounded-lg border-2 hover:border-gray-700 border-gray-900   shadow-2xl duration-300"
                src={`https://image.tmdb.org/t/p/original/${info?.details?.poster_path}`}
                alt="poster img"
              />
              {info?.watchProviders?.flatrate && (
                <div className="flex justify-center items-center gap-4 text-white mt-4">
                  <h1 className="text-sm">Available On</h1>
                  {info?.watchProviders?.flatrate?.map((elm, i) => (
                    <img
                      key={i}
                      className=" w-[12%] sm:w-[16%]  sm:rounded-lg rounded-lg"
                      src={`https://image.tmdb.org/t/p/original/${elm?.logo_path}`}
                      alt="logo"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* right side  */}
            <div className="sm:py-14 text-white">
              <div className="">
                <h1 className="font-extrabold text-3xl sm:text-5xl ">
                  {info?.details?.title ||
                    info?.details?.name ||
                    info?.details?.original_name ||
                    info?.details?.original_title}
                    <span className="text-lg sm:text-2xl font-semibold ml-1">
                  (
                  {info?.details?.release_date?.slice(0, 4) ||
                    info?.details?.first_air_date?.slice(0, 4)}
                  )
                </span>
                </h1>

                
              </div>

              <div className="flex items-center gap-3 sm:gap-5 font-semibold">
                <div
                  className={`text-xl text-black font-semibold bg-yellow-500 h-9 w-12 sm:h-12 text-center rounded-full flex justify-center items-center  border-2 border-gray-100 mt-4 "}`}
                >
                  <h1>
                    {(
                      info?.details?.vote_average * 10 || Math.random() * 100
                    ).toFixed()}
                    <sup className="text-xs">%</sup>
                  </h1>
                </div>
                <span className="font-semibold text-xs sm:text-xl mt-2">
                  {info?.details?.release_date || info?.details?.first_air_date}
                </span>
                <div>
                  {info?.details?.genres?.map((elm) => (
                    <span className="mr-2 sm:mr-4 text-sm sm:text-xl" key={elm.id + 1}>
                      {elm.name}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="text-lg sm:text-xl font-bold mt-4 mb-4 text-white">
                {info?.details?.tagline}
              </h1>
              <h1 className="text-2xl sm:text-3xl mt-4 sm:mt-8">Overview</h1>
              <h1 className="text-base">{info?.details?.overview}</h1>
              <h1 className="text-2xl sm:text-3xl mt-3">Languages</h1>
              <div className="flex flex-wrap gap-2 text-base">
                {info?.translations?.map((elm) => (
                  <span key={elm.iso_639_1 + 1}>{elm.english_name}</span>
                ))}
              </div>
              {info?.videos && (
                <button
                  className="px-2 py-1 mt-2 mb-2 sm:mb-0 text-base sm:text-xl bg-secondary rounded-lg hover:scale-105 border-2 duration-300"
                  onClick={toggleModal}
                >
                  <i className="ri-play-fill"></i>Play Trailer
                </button>
              )}
              <Trailer isOpen={isModalOpen} onClose={toggleModal} />
            </div>
          </div>

          {info?.details?.seasons ? (
            <div className="text-2xl font-semibold text-white duration-300 mb-16 ">
              <>
                <h1>Seasons</h1>
                <div className="flex gap-14 overflow-x-auto overflow-hidden">
                  {info?.details?.seasons?.map((data) => (
                    <HorizontalCard key={data.id + 1} data={data} />
                  ))}
                </div>
              </>
            </div>
          ) : (
            <h1
              className={`text-xl text-white mt-20 ${
                pathname?.includes("movie") && "hidden"
              }`}
            >
              Sorry, No Seasons are available on this content.
            </h1>
          )}

          {info?.recommendations?.length > 0 || info?.similar?.length > 0 ? (
            <div className="text-2xl font-semibold text-white duration-300">
              {info?.recommendations ? (
                <>
                  <h1>Recommendations</h1>
                  <div className="flex gap-14 overflow-x-auto overflow-hidden">
                    {info?.recommendations.map((data) => (
                      <HorizontalCard key={data.id + 1} data={data} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1>Similar</h1>
                  <div className="flex gap-14 overflow-x-auto shadow-2xl">
                    {info?.similar.map((data) => (
                      <HorizontalCard key={data.id + 1} data={data} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <h1
              className={`text-xl text-white ${
                info?.recommendations?.length > 0 && "mt-20"
              } `}
            >
              Sorry, No Recommendations or Similar Videos are available on this
              content.
            </h1>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}




// className={`w-screen ${
//   pathname.includes("tv") && info?.recommendations.length > 0
//     ? "h-[170vh]"
//     : "h-[140vh]"
// } opacity-80 px-[10%] py-[2%] bg-mainBg`}
// >