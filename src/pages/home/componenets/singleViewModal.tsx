import React from "react";
import { Calendar, Globe, Star } from "react-feather";
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
  console.log("selectedMovieData", selectedMovieData);
  return (
    // <Modal isOpen={modal} toggle={toggle} centered size="lg">
    //   <ModalHeader toggle={toggle}>{selectedMovieData?.title}</ModalHeader>
    //   <ModalBody>
    //     <Row>
    //       <Col lg={6}>
    //         <img
    //           className="w-full object-fill rounded"
    //           style={{ height: "auto" }}
    //           alt="Sample"
    //           src={`https://image.tmdb.org/t/p/w500${selectedMovieData?.poster_path}`}
    //         />
    //       </Col>
    //       <Col lg={6}>
    //         <h5>{selectedMovieData?.overview}</h5>
    //         <Rating
    //           initialValue={selectedMovieData?.vote_average}
    //           readonly
    //           iconsCount={10}
    //           size={25}
    //           allowFraction
    //           SVGstyle={{ display: "inline" }}
    //         />
    //         <div className="d-flex gap-2 mt-2 items-center">
    //           <h4>{Number(selectedMovieData?.vote_average).toFixed(1)}</h4>
    //           <h5>({selectedMovieData?.vote_count})</h5>
    //         </div>
    //       </Col>
    //     </Row>
    //   </ModalBody>
    // </Modal>
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle} className="font-semibold text-lg">
        {selectedMovieData?.title}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={6}>
            <img
              className="w-full object-cover rounded-lg"
              style={{ height: "auto" }}
              alt={selectedMovieData?.title}
              src={`https://image.tmdb.org/t/p/w500${selectedMovieData?.poster_path}`}
            />
          </Col>
          <Col lg={6} className="space-y-3">
            <h5 className="text-gray-800 font-medium leading-relaxed">
              {selectedMovieData?.overview}
            </h5>

            {/* Rating */}
            <div className="mt-2">
              <Rating
                initialValue={selectedMovieData?.vote_average}
                readonly
                iconsCount={10}
                size={25}
                allowFraction
                SVGstyle={{ display: "inline" }}
              />
              <div className="flex items-center gap-3 mt-1">
                <Star className="text-yellow-500 w-5 h-5" />
                <span className="text-lg font-bold">
                  {Number(selectedMovieData?.vote_average).toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({selectedMovieData?.vote_count} votes)
                </span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 mt-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Release Date:</strong>{" "}
                  {selectedMovieData?.release_date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span>
                  <strong>Language:</strong>{" "}
                  {selectedMovieData?.original_language?.toUpperCase()}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default SingleViewModal;
