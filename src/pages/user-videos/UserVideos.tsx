import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { RootState } from "../../redux/reducers";
import { getVideosByUserId } from "../../redux/actions";
import { Video } from "react-feather";
import VideoCard from "./components/VideoCard";

function UserVideos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDetails, userVideos } = useSelector(
    (state: RootState) => state.reducer,
  );

  useEffect(() => {
    if (userDetails) {
      console.log("aaaa");
      dispatch(getVideosByUserId(userDetails.userId));
    }
  }, [userDetails]);

  return (
    <div className="min-h-screen">
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
      <div className="px-6 py-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">🎬 My Videos</h1>
        {!userVideos && (
          <h3 className="flex justify-center items-center">No Videos Found</h3>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {userVideos?.map((video: any) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserVideos;
