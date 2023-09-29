import { useState, useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { HiOutlineLocationMarker } from "react-icons/hi";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    fetchApiConfig();
    genreCall();
  }, []);
  const fetchApiConfig = () => {
    fetchDataFromAPI("/configuration").then((res) => {
      // console.log(res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genreCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(fetchDataFromAPI(promises[0]));
    // console.log(data);
    data?.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
