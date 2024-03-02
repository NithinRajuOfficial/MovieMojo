import { instance } from "../../utils/aixios";
import { loadPersonData } from "../reducers/personSlice";

export const asyncLoadPerson = async (id, dispatch) => {
  try {
    const { data: details } = await instance.get(`/person/${id}`);
    const { data: externalIds } = await instance.get(
      `/person/${id}/external_ids`
    );
    const { data: combinedCredits } = await instance.get(
      `/person/${id}/combined_credits`
    );
    const { data: movieCredits } = await instance.get(
      `/person/${id}/movie_credits`
    );
    const { data: tvCredits } = await instance.get(`/person/${id}/tv_credits`);

    let ultimateData = {
      details,
      externalIds,
      combinedCredits,
      movieCredits,
      tvCredits,
    };
    dispatch(loadPersonData(ultimateData));
  } catch (error) {
    console.error("Failed to get Person details ERROR:", error);
  }
};
