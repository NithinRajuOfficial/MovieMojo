/* eslint-disable react-hooks/rules-of-hooks */
import { instance } from "../../utils/aixios";
import { loadMovieData } from "../reducers/movieSlice";

export const asyncLoadMovie = async (id,dispatch) => {
  try {
    const { data: details } = await instance.get(`/movie/${id}`);
    const { data: externalIds } = await instance.get(
      `/movie/${id}/external_ids`
    );
    const {
      data: { results: recommendations },
    } = await instance.get(`/movie/${id}/recommendations`);
    const {
      data: { results: similar },
    } = await instance.get(`/movie/${id}/similar`);
    const {
        data: { translations },
      } = await instance.get(`/movie/${id}/translations`);
    const {
      data: { results: videos },
    } = await instance.get(`/movie/${id}/videos`);
    const {
      data: { results: watchProviders },
    } = await instance.get(`/movie/${id}/watch/providers`);

    const ultimateData = {
        details,
        externalIds,
        recommendations,
        similar,
        translations,
        videos : videos.find(v => v.type === "Trailer"),
        watchProviders: watchProviders.IN
    }
    console.log(ultimateData)
    dispatch(loadMovieData(ultimateData))
  } catch (error) {
    console.error("Failed to get the movie details ERROR:", error);
  }
};
