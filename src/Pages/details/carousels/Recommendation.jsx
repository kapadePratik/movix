import React, { useEffect } from "react";
import Carousel from "../../../Components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ RecommediaType, Recommedid }) => {
  
  const [recomdata, loading] = useFetch(`${RecommediaType}/${Recommedid}/recommendations`);

  return (
    <Carousel
      title="Recommendations"
      data={recomdata?.results}
      loading={loading}
      endpoint={RecommediaType}
    />
  );
};
export default Recommendation;