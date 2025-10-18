import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTvSeries } from "../../redux/actions";
import TvSeriesCard from "./components/TvSeriesCard";
import SingleViewModal from "../home/componenets/singleViewModal";

interface TvSeriesData {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

function TvSeries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTvSeriesData, setSelectedTvSeriesData] = useState({});
  const { tvSeriesList } = useSelector((state: any) => state.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTvSeries());
  }, []);

  const selectedCardHandler = (data: any) => {
    setSelectedTvSeriesData(data);
    setIsModalOpen(!isModalOpen);
  };

  console.log("", tvSeriesList);
  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-wrap gap-12 p-5 justify-center">
        {tvSeriesList &&
          tvSeriesList.results.map((data: TvSeriesData) => (
            <div
              key={data.id}
              onClick={() => {
                selectedCardHandler(data);
              }}
            >
              {" "}
              <TvSeriesCard key={data.id} tvSeriesData={data} />
            </div>
          ))}
      </div>
      <SingleViewModal
        modal={isModalOpen}
        toggle={selectedCardHandler}
        selectedMovieData={selectedTvSeriesData}
      />
    </div>
  );
}

export default TvSeries;
