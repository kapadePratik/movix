import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import { fetchDataFromApi } from "./Utlis/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration,getGenres } from "./store/homeSlice";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from './Pages/home/Home';
import SearchResult from "./Pages/searchResult/SearchResult";
import Explore from "./Pages/explore/Explore";
import Details from "./Pages/details/Details";
import Pagenotfound from "./Pages/404/Pagesnotfound";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach( (url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));

    });
    const data = await Promise.all(promises);
    console.log(data);
    data.map (({genres}) => {
      return genres.map((item) => (allGenres[item.id] =item))
    });

    dispatch(getGenres(allGenres));
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:mediaType/:id" element={<Details />} />
        <Route exact path="/search/:query" element={<SearchResult />} />
        <Route exact path="/explore/:mediaType" element={<Explore />} />
        <Route exact path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
