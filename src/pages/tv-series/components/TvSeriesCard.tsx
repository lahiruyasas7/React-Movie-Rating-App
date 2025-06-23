import React from "react";
import { Star } from "react-feather";
import { Card, CardBody, CardTitle, Col, Label, Row } from "reactstrap";

function TvSeriesCard({tvSeriesData}:any) {
  return (
    <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
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
          alt={tvSeriesData?.title}
          src={`https://image.tmdb.org/t/p/w500${tvSeriesData?.poster_path}`}
        />

        <CardBody className="px-4 pt-3 pb-2 text-gray-900">
          <CardTitle
            tag="h5"
            className="font-semibold text-base truncate"
            title={tvSeriesData?.title}
          >
            🎬 {tvSeriesData?.title}
          </CardTitle>

          <Label className="text-sm text-white block mb-2">
            📅 Release: {tvSeriesData?.release_date}
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
