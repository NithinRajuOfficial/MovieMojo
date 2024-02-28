import { useEffect, useState } from "react";
import { instance } from "../utils/aixios";
import MovieCard from "./HorizontalCard";
import DropDown from "./DropDown";

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [category, setCategory] = useState("all");

  const getTrendingMovies = async () => {
    try {
      const {
        data: { results: result },
      } = await instance.get(`/trending/${category}/day`);
      setTrendingMovies(result);
    } catch (error) {
      console.error("Failed to get trending movies ERROR:", error);
    }
  };

  useEffect(() => {
    console.log(category);
    getTrendingMovies();
    console.log(trendingMovies);
  }, [category]);

  return (
    <div className="w-full  px-3 py-1">
      <div className="flex justify-between">
        <h1 className="text-primary text-2xl font-semibold mb-1">Trending</h1>
        <DropDown
          title={"Filter"}
          options={["tv", "movie", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="w-full flex gap-3 overflow-x-scroll">
        {trendingMovies &&
          trendingMovies.map((elm) => <MovieCard key={elm.id} data={elm} />)}
      </div>
    </div>
  );
}
