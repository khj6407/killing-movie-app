// axios를 통해서 영화 데이터를 가져오는 function을 만듦
// baseURL : https://api.themoviedb.org/3/
// get : movie/popular
// params : api_key=23e8f945f9e2c5bc7936eb1c9e9c16ff
// params : language=en-US

import axios from "axios";

// axios에게 설정을 준다.
// 1) 기본 URL
// 2) params

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { api_key: "23e8f945f9e2c5bc7936eb1c9e9c16ff", language: "en-US" }
});

export const movies = {
  getPopular: () => api.get("movie/popular"),
  getNowPlaying: () => api.get("movie/now_playing")
};
