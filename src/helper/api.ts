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
      WalletAddress: address,
      UserName: "test",
      EMail: "test@test.com",
      PlayerScore: "0",
      DragonBalls: "0",
      FireballsHit: "0",
      ShieldsCollected: "0",
      ShieldsUsed: "0",
      LostHearts: "0",
      TapScreen: "0",
      GameplayTime: "0:0",
      GameplaySeconds: "0",
    })
      .then((res) => res)
      .catch((err) => Promise.reject(err));
  },
  getGameResults() {
    return ApiInstance.get("/game/")
      .then((res) => res.data)
      .catch((err) => Promise.reject(err));
  },
};

export default ApiService;
