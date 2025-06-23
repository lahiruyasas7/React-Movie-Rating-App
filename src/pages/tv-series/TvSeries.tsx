import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTvSeries } from "../../redux/actions";
import TvSeriesCard from "./components/TvSeriesCard";

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
  const { tvSeriesList } = useSelector((state: any) => state.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTvSeries());
  }, []);

  console.log("", tvSeriesList);
  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-wrap gap-12 p-5 justify-center">
        {tvSeriesList &&
          tvSeriesList.results.map((data: TvSeriesData) => (
            <div key={data.id}>
              {" "}
              <TvSeriesCard key={data.id} tvSeriesData={data} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default TvSeries;
