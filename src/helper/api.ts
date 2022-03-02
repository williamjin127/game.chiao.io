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

const ApiService = {
  registerUser(address) {
    return ApiInstance.post(`/game/`, {
      WalletAddress: address.toLowerCase(),
      UserName: address.toLowerCase(),
      EMail: address.toLowerCase(),
      PlayerScore: 0,
      DragonBalls: "0",
      FireballsHit: "0",
      ShieldsCollected: "0",
      ShieldsUsed: "0",
      LostHearts: "0",
      TapScreen: "0",
      GameplayTime: "0:0",
      GameplaySeconds: "0",
      ActiveTimes: "0",
    })
      .then((res) => res)
      .catch((err) => Promise.reject(err));
  },
  getGameResults(page, query) {
    return ApiInstance.get("/game/", {
      params: { page, ...query },
    })
      .then((res) => res.data)
      .catch((err) => Promise.reject(err));
  },
  findByAddress(address, query) {
    return ApiInstance.get("/game/", {
      params: {
        address,
        ...query
      },
    })
      .then((res) => res.data)
      .catch((err) => Promise.reject(err));
  },
};

export default ApiService;
