import React from "react";
import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import Loading from "./components/Loading";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { styled } from "@mui/material/styles";

const AppContent = styled(Box)({
  width: "100%",
  minHeight: "calc(100vh - 132px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundImage:
    "radial-gradient(at center center, rgb(57, 24, 68) 0%, rgb(32, 14, 38) 100%)",
  padding: "100px 0 30px",
});

const Home = lazy(() => import("./views/Home"));
const Play = lazy(() => import("./views/Play"));
const Leaderboard = lazy(() => import("./views/Leaderboard"));

function App() {
  return (
    <>
      <Header />
      <AppContent>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/play" exact>
              <Play />
            </Route>
            <Route path="/leaderboard" exact>
              <Leaderboard />
            </Route>
          </Suspense>
        </Switch>
      </AppContent>
      <Footer />
    </>
  );
}

export default App;
