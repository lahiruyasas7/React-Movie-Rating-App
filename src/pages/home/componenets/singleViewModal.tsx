import React from "react";
import { Rating } from "react-simple-star-rating";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

interface SingleViewModalProps {
  modal: boolean;
  toggle: any;
  selectedMovieData: any;
}

const SingleViewModal: React.FC<SingleViewModalProps> = ({
  modal,
  toggle,
  selectedMovieData,
}) => {
  // const convertedRating = selectedMovieData?.vote_average / 2;
  // console.log("converted", convertedRating);
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>{selectedMovieData?.title}</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={6}>
            <img
              className="w-full object-fill rounded"
              style={{ height: "auto" }}
              alt="Sample"
              src={`https://image.tmdb.org/t/p/w500${selectedMovieData?.poster_path}`}
            />
          </Col>
          <Col lg={6}>
            <h5>{selectedMovieData?.overview}</h5>
            <Rating
              initialValue={selectedMovieData?.vote_average}
              readonly
              iconsCount={10}
              size={25}
              allowFraction
              SVGstyle={{ display: "inline" }}
            />
            <div className="d-flex gap-2 mt-2 items-center">
              <h4>{selectedMovieData?.vote_average}</h4>
              <h5>({selectedMovieData?.vote_count})</h5>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default SingleViewModal;
