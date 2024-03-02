import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const DynamicListPageCom = lazy(() =>
  import("./components/DynamicListPageCom")
);
const Details = lazy(() => import("./components/Details"));
import Loader from "./utils/Loader";
import PersonDetails from "./components/personDetails";
function App() {
  return (
    <div className="w-screen  bg-mainBg">
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/trending"
            element={<DynamicListPageCom val={"trending"} initialCat={"all"} />}
          />
          <Route path="/trending/:name/details/:id" element={<Details />} />
          <Route
            path="/popular"
            element={
              <DynamicListPageCom val={"popular"} initialCat={"movie"} />
            }
          />
          <Route path="/popular/:name/details/:id" element={<Details />} />
          <Route
            path="/movies"
            element={
              <DynamicListPageCom val={"movie's"} initialCat={"upcoming"} />
            }
          />
          <Route path="/movies/:name/details/:id" element={<Details />} />

          <Route
            path="/tv_shows"
            element={
              <DynamicListPageCom
                val={"tv Show's"}
                initialCat={"airing_today"}
              />
            }
          />
          <Route path="/tv_shows/:name/details/:id" element={<Details />} />
          <Route
            path="/peoples"
            element={
              <DynamicListPageCom
                val={"people's"}
                initialCat={"popular"}
                rating={false}
              />
            }
          />
          <Route path="/peoples/:name/details/:id" element={<PersonDetails />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
