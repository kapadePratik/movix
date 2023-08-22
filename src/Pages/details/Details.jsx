import React, { useEffect } from "react";
import "./details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Detailbanner from "./detailBanner/Detailbanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {

  const { mediaType, id } = useParams();

  const [data, loading] = useFetch(`${mediaType}/${id}/videos`);
  const [credits,creditsLoading] = useFetch(`${mediaType}/${id}/credits`);


  return (
    <div>
      <Detailbanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast creditdata={credits?.cast} creditloading={creditsLoading}/>
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation RecommediaType={mediaType} Recommedid={id}/>

    </div>
  );
};

export default Details;
