import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

interface SingleViewModalProps {
  modal: boolean;
  toggle: any;
  selectedMovieData: any;
}

const SingleViewModal: React.FC<SingleViewModalProps> = ({ modal, toggle, selectedMovieData }) => {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>{selectedMovieData?.title}</ModalHeader>
      <ModalBody >
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
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default SingleViewModal;
