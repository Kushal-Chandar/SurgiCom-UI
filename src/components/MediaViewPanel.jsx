
import React, { useState, useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

// Replace with actual paths to icons
import RecordIcon from "../assets/record.svg";
import PhotoIcon from "../assets/photo-camera.svg";
import ARIcon from "../assets/ar.svg";

const MediaViewPanel = ({ onCaptureClick }) => {
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const mediaStreamRef = useRef(null);

  // Auto-download video when mediaBlobUrl is available
  useEffect(() => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      a.download = `SurgiCom_${timestamp}.webm`;
      a.click();
    }
  }, [mediaBlobUrl]);

  // Handle screen sharing manually ended by user
  const handleStreamEnd = () => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      a.download = `SurgiCom_${timestamp}.webm`;
      a.click();
    }
  };

  return (
    <div className="flex justify-center items-center py-4 font-satoshi font-medium">
      <div className="flex gap-4 bg-white px-4 py-2 rounded-md items-center shadow-md">
        {/* Screen Recorder */}
        <ReactMediaRecorder
          screen
          render={({
            startRecording,
            stopRecording,
            mediaBlobUrl: blobUrl,
            status,
            mediaStream,
          }) => {
            // Detect new stream and attach end handler
            useEffect(() => {
              if (
                status === "recording" &&
                mediaStream &&
                mediaStream !== mediaStreamRef.current
              ) {
                mediaStreamRef.current = mediaStream;
                mediaStream.getTracks().forEach((track) => {
                  track.onended = handleStreamEnd;
                });
              }
            }, [status, mediaStream]);

            // Capture blob URL when recording stops
            useEffect(() => {
              if (status === "stopped" && blobUrl && blobUrl !== mediaBlobUrl) {
                setMediaBlobUrl(blobUrl);
              }
            }, [status, blobUrl]);

            return (
              <button
                onClick={() =>
                  status === "recording" ? stopRecording() : startRecording()
                }
                className="flex items-center gap-2 group"
              >
                <img src={RecordIcon} alt="Record" className="w-6 h-6" />
                <span className="text-sm text-black group-hover:underline">
                  {status === "recording" ? "Stop" : "Record"}
                </span>
              </button>
            );
          }}
        />

        {/* Screenshot Capture Button (calls Viewer capture handler) */}
        <button
          onClick={onCaptureClick}
          className="flex items-center gap-2 group"
        >
          <img src={PhotoIcon} alt="Capture" className="w-6 h-6" />
          <span className="text-sm text-black group-hover:underline">
            Capture
          </span>
        </button>

        {/* AR View (dummy) */}
        <button className="flex items-center gap-2 group">
          <img src={ARIcon} alt="AR View" className="w-6 h-6" />
          <span className="text-sm text-black group-hover:underline">
            AR View
          </span>
        </button>
      </div>
    </div>
  );
};

export default MediaViewPanel;

