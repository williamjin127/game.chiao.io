import React from "react";
import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import Loading from "./components/Loading";
import { Header } from "./views/Header";


const Home = lazy(() => import("./views/Home"));

function App() {
  return (
    <>
      <Box>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route path="/" exact>
              <Home />
            </Route>
          </Suspense>
        </Switch>
      </Box>
      <Header />
    </>
  );
}

export default App;
