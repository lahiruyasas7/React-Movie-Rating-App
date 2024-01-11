import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const MovieCard = ({ movieData }: any) => {
  console.log("movieData", movieData);
  return (
    <div>
      <Card className="w-1/4">
        <img alt="Sample" src='"/bkpPTZUdq31UGDovmszsg2CchiI.jpg"' />
        <CardBody>
          <CardTitle tag="h5">{movieData?.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Card subtitle
          </CardSubtitle>
          <CardText>
          {movieData?.overview}
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieCard;
