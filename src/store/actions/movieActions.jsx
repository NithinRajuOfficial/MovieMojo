/* eslint-disable react-hooks/rules-of-hooks */
import { instance } from "../../utils/aixios";
import { loadMovieData } from "../reducers/movieSlice";

export const asyncLoadMovie = async (id, dispatch, name) => {
  try {
    const { data: details } = await instance.get(`/${name}/${id}`);
    const { data: externalIds } = await instance.get(
      `/${name}/${id}/external_ids`
    );
    const {
      data: { results: recommendations },
    } = await instance.get(`/${name}/${id}/recommendations`);
    const {
      data: { results: similar },
    } = await instance.get(`/${name}/${id}/similar`);
    const {
      data: { translations },
    } = await instance.get(`/${name}/${id}/translations`);
    const {
      data: { results: videos },
    } = await instance.get(`/${name}/${id}/videos`);
    const {
      data: { results: watchProviders },
    } = await instance.get(`/${name}/${id}/watch/providers`);

    const ultimateData = {
      details,
      externalIds,
      recommendations,
      similar,
      translations,
      videos: videos.find((v) => v.type === "Trailer" || "Teaser"),
      watchProviders: watchProviders.IN,
    };
    console.log(ultimateData, "pppp");
    dispatch(loadMovieData(ultimateData));
  } catch (error) {
    console.error("Failed to get the movie details ERROR:", error);
  }
};
