import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

function UserVideos() {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <Row className="mt-4">
        <Col className="flex justify-end items-center">
          <Button
            onClick={() => {
              navigate("/add-new-video");
            }}
          >
            Add New Video
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default UserVideos;
