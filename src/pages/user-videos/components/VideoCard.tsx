import React from "react";

export interface Video {
  id: string;
  name: string;
  description: string;
  s3Url: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userId: string;
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div
      key={video.id}
      className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      <video
        src={video.s3Url}
        controls
        className="w-full h-48 object-cover bg-black"
      ></video>

      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{video.name}</h2>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
          {video.description}
        </p>
        <p className="text-xs text-gray-500">
          Uploaded: {new Date(video.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="px-4 pb-4 flex justify-between">
        <button
          className="text-sm px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 transition"
          //onClick={() => handleDelete(video.id)}
        >
          Delete
        </button>
        <button
          className="text-sm px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
          //onClick={() => handleEdit(video.id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default VideoCard;
