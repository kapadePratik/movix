import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import Switchtabs from "../../../Components/switchtabs/Switchtab";
import useFetch from "../../../hooks/useFetch";

import getData from "../../../hooks/useFetch";

import Carousel from "../../../Components/carousel/Carousel";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const [data, loading] = useFetch(`/${endpoint}/top_rated`);

  // useEffect(() => {
  //   console.log("my trending movie" + JSON.stringify(data));
  // }, [data]);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movies" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <Switchtabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;