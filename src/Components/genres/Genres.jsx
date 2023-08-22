import React, { useEffect, useState } from "react";
import "./Genres.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  
  const { genres } = useSelector((state) => state.home);
    // const [data] = useState();

  // useEffect(() =>{
  //     console.log( JSON.stringify(genres));
  // },[genres])


  return (
      <div className="genres">
        {/* {data?.map((g,index) => {
            if (genres[g]?.name) return;
            return (
              <div key={index} className="genre">
                {genres[g]?.name}
              </div>
            );
          })} */}
      </div>
  );
};

export default Genres;

{/* <div className="genres">
{data?.map((g) => {
    if (!genres[g]?.name) return;
    return (
        <div key={g} className="genre">
            {genres[g]?.name}
        </div>
    );
})}
</div> */}

