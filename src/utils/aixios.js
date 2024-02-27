import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRiOWJhNjU2MzJjNzU2Zjg5NjE0MTA2N2MwMDFhNSIsInN1YiI6IjY1ZGNkMTFiMDNiZjg0MDE4NGIwMzc5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VxPddBRM7r7UQlcSEStIRgWCcVpsnrmSbDSP9mPIxXM",
  },
});
