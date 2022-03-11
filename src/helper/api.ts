import axios from "axios";
import { config } from "../config";

const ApiInstance = axios.create({
  headers: {
    contentType: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Origin-Url": window.location.href,
  },
  baseURL: config.BACKEND_URL,
});

const getRanking = (data) => {
  data.results = data.results.map((row, index) => {
    row.ranking = (data.page - 1) * data.page_size + index + 1;
    return row;
  });
  return data;
}

const ApiService = {
  registerUser(address) {
    return ApiInstance.post(`/game/`, {
      WalletAddress: address.toLowerCase(),
      UserName: address.toLowerCase(),
      EMail: address.toLowerCase(),
      PlayerScore: 0,
      DragonBalls: 0,
      FireballsHit: 0,
      ShieldsCollected: 0,
      ShieldsUsed: 0,
      LostHearts: 0,
      TapScreen: 0,
      GameplayTime: "0:0",
      GameplaySeconds: 0,
      ActiveTimes: "0",
    })
      .then((res) => res)
      .catch((err) => Promise.reject(err));
  },
  getATHResults(page, query) {
    return ApiInstance.get("/game/", {
      params: { page, ...query },
    })
      .then((res) => getRanking(res.data))
      .catch((err) => Promise.reject(err));
  },
  findATHByAddress(address, query) {
    return ApiInstance.get("/game/", {
      params: {
        address,
        ...query,
      },
    })
      .then((res) => getRanking(res.data))
      .catch((err) => Promise.reject(err));
  },
  getCompetitionResults(page, query) {
    return ApiInstance.get("/competition/", {
      params: { page, ...query },
    })
      .then((res) => getRanking(res.data))
      .catch((err) => Promise.reject(err));
  },
  findCompetitionByAddress(address, query) {
    return ApiInstance.get("/competition/", {
      params: {
        address,
        ...query,
      },
    })
      .then((res) => getRanking(res.data))
      .catch((err) => Promise.reject(err));
  },
};

export default ApiService;
