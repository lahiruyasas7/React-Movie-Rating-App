import React from "react";
import { Star } from "react-feather";
import { Card, CardBody, CardTitle, Col, Label, Row } from "reactstrap";
import { tvSeriesCardType } from "../../../types/types";

function TvSeriesCard({ tvSeriesData }: { tvSeriesData: tvSeriesCardType }) {
  const PLACEHOLDER_IMG = "/placeholder-image.png";

  const posterSrc = tvSeriesData.poster_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(tvSeriesData.poster_path)}`
    : PLACEHOLDER_IMG;

  return (
    <div
      className="transition-transform transform hover:scale-105 duration-300 ease-in-out"
      role="button"
      aria-label={`View details for ${tvSeriesData.name}`}
    >
      <Card
        className="movie-card bg-gradient-to-br from-gray-800 via-zinc-900 to-black 
             hover:from-gray-700 hover:via-gray-800 hover:to-black 
              backdrop-blur-md 
             text-white shadow-xl rounded-2xl transition-transform 
             transform hover:scale-105 duration-300 ease-in-out"
        style={{ width: "300px", height: "380px", cursor: "pointer" }}
      >
        <img
          className="w-full h-[250px] object-fill rounded-t-2xl"
          alt={tvSeriesData?.name}
          src={posterSrc}
          //onError fallback — prevents broken image icon if URL 404s
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMG;
            e.currentTarget.onerror = null; // prevents infinite loop
          }}
        />

        <CardBody className="px-4 pt-3 pb-2 text-gray-900">
          <CardTitle
            tag="h5"
            className="font-semibold text-base truncate"
            title={tvSeriesData?.name}
          >
            🎬 {tvSeriesData?.name}
          </CardTitle>

          <Label className="text-sm text-white block mb-2">
            📅 Release: {tvSeriesData?.first_air_date}
          </Label>

          <Row className="text-sm text-white font-medium">
            <Col className="flex items-center space-x-1">
              <Star className="text-yellow-400 w-4 h-4" />
              <span>{Number(tvSeriesData?.vote_average).toFixed(1)}</span>
            </Col>
            <Col className="text-right">
              <span>🗳 {tvSeriesData?.vote_count} votes</span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default TvSeriesCard;
