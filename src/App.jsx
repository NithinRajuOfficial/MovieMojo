import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Trending = lazy(() => import("./components/Trending"));

function App() {
  return (
    <div className="w-screen h-screen bg-mainBg">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
