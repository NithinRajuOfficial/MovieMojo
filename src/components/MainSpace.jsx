import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import { instance } from "../utils/aixios";
import Header from "./Header";
import TrendingMovies from "./TreandingMovies";

export default function MainSpace() {
  const [wallpaper, setWallpaper] = useState(null);

  const headerWallpaper = async () => {
    try {
      const {
        data: { results: result },
      } = await instance.get("/trending/all/day");
      const randomWallpaper = result[Math.floor(Math.random() * result.length)];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.error("Failed to get the header wallpaper ERROR:", error);
    }
  };

  useEffect(() => {
    !wallpaper && headerWallpaper();
  }, [wallpaper]);

  return (
    <div className="w-[80%] h-full overflow-x-auto">
      <TopNav />
      <Header data={wallpaper} />
      <TrendingMovies/>
    </div>
  );
}
