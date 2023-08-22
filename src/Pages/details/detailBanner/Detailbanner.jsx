import React, { useState, useEffect } from "react";
import "./Detailbanner.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import Genres from "../../../Components/genres/Genres";
import CircleRating from "../../../Components/circleRating/CircleRating";
import Img from "../../../Components/lazyLoadImg/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../../details/PlayBtn";
import VideoPopup from "../../../Components/videoPopup/VideoPopup";

const Detailbanner = ({ video, crew }) => {

  const  [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);


  const { mediaType, id } = useParams();
  const [data, loading] = useFetch(`${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useEffect(() => {
    // console.log("pass array" + JSON.stringify(data));
  }, [data]);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}>
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:{""}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                    </div>

                    <div className="info">
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:{""}</span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="info">
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:{""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Director:{""}
                        </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}> 
                              {d.name}
                              {director.length -1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

            {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Writer:{""}
                        </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}> 
                              {d.name}
                              {writer.length -1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}


                {data.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Creator:{""}
                        </span>
                        <span className="text">
                          {data.created_by?.map((d, i) => (
                            <span key={i}> 
                              {d.name}
                              {data.created_by.length -1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup 
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId
                }
                />
              </ContentWrapper>
             
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default Detailbanner;