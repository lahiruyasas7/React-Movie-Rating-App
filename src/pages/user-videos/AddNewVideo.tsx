import React, { useEffect, useRef, useState } from "react";
import { Video } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { createVideo, updateVideo, updateVideoType } from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { useSearchParams } from "react-router-dom";
import { getOneVideoByVideoId } from "../../redux/actions";

const AddNewVideo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { userDetails, oneVideo } = useSelector(
    (state: RootState) => state.reducer
  );

  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("videoId");
  console.log("add video id", videoId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videoId) {
      dispatch(getOneVideoByVideoId(videoId));
      setIsUpdating(true);
    }
  }, [videoId]);

  useEffect(() => {
    if (oneVideo) {
    }
  }, [oneVideo]);
  console.log("isUpdating", isUpdating);
  console.log("oneVideo", oneVideo);
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke old preview URL to prevent memory leaks and stale previews
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }

      const newPreviewURL = URL.createObjectURL(file);
      setVideoFile(file);
      setPreviewURL(newPreviewURL);
    }
  };

  useEffect(() => {
    if (isUpdating && oneVideo) {
      setName(oneVideo.name || "");
      setDescription(oneVideo.description || "");
      setPreviewURL(oneVideo.s3Url || null);
    }
  }, [isUpdating, oneVideo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUpdating && (!videoFile || !name || !description)) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (isUpdating && videoId) {
        const payload: updateVideoType = {
          name,
          description,
        };
        if (videoFile) {
          payload.video = videoFile;
        }

        dispatch(updateVideo(videoId, payload));
      } else if (userDetails?.userId && !isUpdating && videoFile) {
        const payload = {
          name,
          description,
          video: videoFile,
        };
        dispatch(createVideo(payload, userDetails.userId));
      }

      if (!isUpdating) {
        setName("");
        setDescription("");
        setVideoFile(null);
        setPreviewURL(null);
      }
    } catch (error) {
      setMessage("Failed to upload video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 rounded-xl shadow-lg text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Upload a Video</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Video File</label>
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            className="w-full"
            onChange={handleVideoChange}
          />
        </div>

        <div className="mt-4 w-full rounded border-2 border-dashed border-zinc-700 bg-zinc-800 flex items-center justify-center aspect-video relative">
          {previewURL ? (
            <video
              key={previewURL}
              controls
              className="w-full h-full object-contain rounded"
            >
              <source src={previewURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-400">
              <Video size={60} />
              <p className="text-center text-sm">Upload your video here</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Video Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Enter description"
          ></textarea>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {isUpdating ? "Update Video" : "Upload Video"}
        </Button>

        {message && (
          <p className="text-sm text-center mt-2 text-yellow-400">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddNewVideo;
