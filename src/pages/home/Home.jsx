import React from "react";
import Herobanner from "./heroBanner/Herobanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

import "./style.scss";

const Home = () => {
  return (
    <div className="homePage">
      <Herobanner />
      <div style={{ marginTop: "20px", height: "20px" }}> </div>
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
