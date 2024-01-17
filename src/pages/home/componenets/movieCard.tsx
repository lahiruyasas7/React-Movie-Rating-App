import {
  Label,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const MovieCard = ({ movieData }: any) => {
  //console.log("movieData", movieData);
  return (
    <div style={{cursor: 'pointer'}}>
      <Card className="" style={{ width: "300px", height: "400px" }}>
        <img
          className="w-full object-fill rounded"
          style={{ height: "250px" }}
          alt="Sample"
          src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
        />
        <CardBody>
          <CardTitle tag="h5">{movieData?.title}</CardTitle>

          <Label>{`Release data ${movieData?.release_date}`}</Label>
          <Row>
            <Col>
              <h6>{`Ratings ${movieData?.vote_average}`}</h6>
            </Col>
            <Col>
              <h6>{`Vote Count ${movieData?.vote_count}`}</h6>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieCard;
