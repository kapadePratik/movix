import React, { useEffect, useState } from "react";
import "./Trending.scss";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import Switchtabs from "../../../Components/switchtabs/Switchtab";
import useFetch from "../../../hooks/useFetch";

import getData from "../../../hooks/useFetch";

import Carousel from "../../../Components/carousel/Carousel";
import { Swiper,SwiperSlide } from 'swiper/react';

const Trending = () => {
  
  const [endpoint, setEndpoint] = useState("day");
  const [data, loading] = useFetch(`trending/movie/${endpoint}`);

  // useEffect(() => {
  //   console.log("my trending movie" + JSON.stringify(data));
  // }, [data]);
  
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <Switchtabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
