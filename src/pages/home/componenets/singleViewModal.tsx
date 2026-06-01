import React from "react";
import { Calendar, Globe, Star } from "react-feather";
import { Rating } from "react-simple-star-rating";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { MovieData } from "../../../types/types";

interface SingleViewModalProps {
  modal: boolean;
  toggle: any;
  selectedMovieData: MovieData | null;
}

const SingleViewModal: React.FC<SingleViewModalProps> = ({
  modal,
  toggle,
  selectedMovieData,
}) => {
  //    when the modal opens before data is ready
  if (!selectedMovieData) return null;

  const PLACEHOLDER_IMG = "/placeholder-image.png";

  //Safe poster URL — handles null poster_path instead of producing "...w500undefined"
  const posterSrc = selectedMovieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(selectedMovieData.poster_path)}`
    : PLACEHOLDER_IMG;
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      centered
      size="lg"
      aria-labelledby="modal-title"
      aria-describedby="modal-overview"
    >
      <div className="bg-gradient-to-br from-gray-800 via-zinc-900 to-black text-white rounded-lg">
        <ModalHeader
          id="modal-title"
          toggle={toggle}
          className="border-0 text-white [&_button]:text-white [&_button]:opacity-75 hover:[&_button]:opacity-100"
        >
          {selectedMovieData?.title}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={6}>
              <img
                className="w-full object-cover rounded-lg"
                style={{ height: "auto" }}
                alt={selectedMovieData?.title}
                src={posterSrc}
              />
            </Col>
            <Col lg={6} className="space-y-3">
              <h5
                id="modal-overview"
                className="text-gray-300 font-medium leading-relaxed"
              >
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
                  <span className="text-sm text-gray-400">
                    ({selectedMovieData?.vote_count} votes)
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mt-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-100" />
                  <span>
                    <strong>Release Date:</strong>{" "}
                    {selectedMovieData?.release_date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-100" />
                  <span>
                    <strong>Language:</strong>{" "}
                    {selectedMovieData?.original_language?.toUpperCase()}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default SingleViewModal;
