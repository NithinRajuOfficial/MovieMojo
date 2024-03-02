import { useEffect, useState } from "react";
import { asyncLoadPerson } from "../store/actions/personActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removePersonData } from "../store/reducers/personSlice";
import Loader from "../utils/Loader";
import HorizontalCard from "./HorizontalCard";
import DropDown from "./DropDown";

export default function PersonDetails() {
  const { id } = useParams();
  const navigate = useNavigate(-1);
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    asyncLoadPerson(id, dispatch);
    return () => dispatch(removePersonData());
  }, [id]);
  console.log(info, "///");

  return (
    <>
      {info ? (
        <div
          className={`w-screen ${
            info?.details?.biography.length > 400 ? "h-[150vh]" : "h-[140vh]"
          } opacity-80 px-[10%] py-[2%] bg-mainBg`}
        >
          {/* navbar*/}
          <nav className="flex justify-start items-center gap-10 text-primary text-3xl">
            <Link href="" className=" hover:cursor-pointer hover:scale-110">
              <i
                className="ri-arrow-left-double-line"
                onClick={() => navigate(-1)}
              ></i>
            </Link>
            <a
              target="_blank"
              href={`https://www.imdb.com/name/${info?.externalIds?.imdb_id}/`}
              className="hover:cursor-pointer hover:scale-110"
            >
              imdb
            </a>
          </nav>

          {/* profile details */}
          <div className="flex mt-10 gap-14 ">
            <div className="w-[20%]">
              <img
                className="w-full h-[44vh] object-fit rounded-lg border-2 hover:border-gray-700 border-gray-900   shadow-2xl duration-300"
                src={`https://image.tmdb.org/t/p/original/${
                  info?.details?.poster_path || info?.details?.profile_path
                }`}
                alt="profile img"
              />
              <hr className="mt-10 mb-5  rounded-lg bg-gray-700" />

              {/* social media links */}
              <div className="flex justify-center items-start gap-10 text-2xl font-extralight mb-5 text-primary">
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${info?.externalIds?.wikidata_id}`}
                >
                  <i className="ri-earth-line hover:cursor-pointer"></i>
                </a>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${info?.externalIds?.wikidata_id?.facebook_id}`}
                >
                  <i className="ri-facebook-box-fill hover:cursor-pointer"></i>
                </a>
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${info?.externalIds?.wikidata_id?.instagram_id}`}
                >
                  <i className="ri-instagram-line hover:cursor-pointer"></i>
                </a>
                <a
                  target="_blank"
                  href={`https://www.twitter.com/${info?.externalIds?.wikidata_id?.twitter_id}`}
                >
                  <i className="ri-twitter-x-fill hover:cursor-pointer"></i>
                </a>
              </div>

              {/* personal details */}
              <div className="text-primary flex flex-col gap-2">
                <h1 className="text-2xl mb-3 font-bold ">Personal Info</h1>
                <div>
                  <h1 className="text-md font-semibold">Known for</h1>
                  <h1 className="text-sm">
                    {info?.details?.known_for_department}
                  </h1>
                </div>
                <div>
                  <h1 className="text-md font-semibold">Gender</h1>
                  <h1 className="text-sm">
                    {info?.details?.gender === 1 ? "Women" : "Male"}
                  </h1>
                </div>
                <div>
                  <h1 className="text-md font-semibold">Birthday</h1>
                  <h1 className="text-sm">{info?.details?.birthday}</h1>
                </div>
                <div>
                  <h1 className="text-md font-semibold">Deathday</h1>
                  <h1 className="text-sm">
                    {info?.details?.deathday
                      ? `${info?.details?.deathday}`
                      : "Still alive"}
                  </h1>
                </div>
                <div>
                  <h1 className="text-md font-semibold">Place of Birth</h1>
                  <h1 className="text-sm">{info?.details?.place_of_birth}</h1>
                </div>
              </div>
            </div>

            {/* right side user details */}
            <div className="w-[80%] text-primary">
              <h1 className="text-4xl font-bold mb-4">{info?.details?.name}</h1>
              <h2 className="text-xl font-semibold mb-1">Biography</h2>
              <p className="text-sm mb-5">{info?.details?.biography}</p>
              <h3 className="text-xl font-semibold mb-2">Known for</h3>

              <div className="flex gap-14 overflow-x-auto overflow-hidden">
                {info?.combinedCredits?.cast.map((data) => (
                  <HorizontalCard key={data.id} data={data} />
                ))}
              </div>
              {/* category listing */}
              <div className="flex justify-between mt-10">
                <h1 className="text-xl font-semibold">Acting</h1>
                <DropDown
                  title={"Category"}
                  options={["tv", "movie"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="list-disc h-[40vh] mt-3 p-4 shadow-xl shadow-gray-800 rounded-lg overflow-x-hidden overflow-y-auto border-2 border-gray-800">
                {info[category + "Credits"]?.cast.map((elm) => (
                  <li
                    key={elm.id + 1}
                    className="mb-2 hover:text-white duration-300 hover:scale-100"
                  >
                    <Link
                      to={`/${
                        category === "movie" ? "movies" : "tv_shows"
                      }/${category}/details/${elm.id}`}
                    >
                      <span>
                        {category === "movie" ? "Movie:" : "Tv:"}{" "}
                        {elm?.title ||
                          elm?.name ||
                          elm?.original_name ||
                          elm?.original_title}
                      </span>
                      <span className="block">
                        Character Name : {elm?.character}
                      </span>
                    </Link>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
