import React, { useState, useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import html2canvas from "html2canvas-pro";

// Replace with actual paths to icons
import RecordIcon from "../assets/record.svg";
import PhotoIcon from "../assets/photo-camera.svg";
import ARIcon from "../assets/ar.svg";

const MediaViewPanel = () => {
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const mediaStreamRef = useRef(null);

  // Function to capture the screenshot of the DOM (not the video)
  const captureDOMScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const a = document.createElement("a");
      a.href = image;
      a.download = `SurgiCom_${timestamp}.png`;
      a.click();
    });
  };

  // Effect hook to trigger the download after the mediaBlobUrl is set
  useEffect(() => {
    if (mediaBlobUrl) {
      const a = document.createElement("a");
      a.href = mediaBlobUrl;
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      a.download = `SurgiCom_${timestamp}.webm`;
      a.click();
    }
  }, [mediaBlobUrl]); // Trigger when mediaBlobUrl changes

  // Listen for stream end event to download the video when screen sharing stops
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
      <div className="flex gap-4 bg-white px-4 py-2 rounded-md items-center">
        {/* Screen Recording with ReactMediaRecorder */}
        <ReactMediaRecorder
          screen
          render={({
            startRecording,
            stopRecording,
            mediaBlobUrl: blobUrl,
            status,
            mediaStream,
          }) => {
            // Set mediaBlobUrl and listen for stream end
            useEffect(() => {
              if (
                status === "recording" &&
                mediaStream &&
                mediaStream !== mediaStreamRef.current
              ) {
                mediaStreamRef.current = mediaStream;
                mediaStream.getTracks().forEach((track) => {
                  track.onended = handleStreamEnd; // Detect when stream ends
                });
              }
            }, [status, mediaStream]); // Ensure this runs once when the media stream is available

            // Set mediaBlobUrl when recording stops
            useEffect(() => {
              if (status === "stopped" && blobUrl && blobUrl !== mediaBlobUrl) {
                setMediaBlobUrl(blobUrl); // Set the mediaBlobUrl when the recording stops
              }
            }, [status, blobUrl]); // Ensure this runs once when the blobUrl is available

            return (
              <button
                onClick={() => {
                  if (status === "recording") {
                    stopRecording(); // Stop recording if currently recording
                  } else {
                    startRecording(); // Start recording if not recording
                  }
                }}
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

        {/* Capture DOM Screenshot */}
        <button
          className="flex items-center gap-2 group"
          onClick={captureDOMScreenshot}
        >
          <img src={PhotoIcon} alt="Capture" className="w-6 h-6" />
          <span className="text-sm text-black group-hover:underline">
            Capture
          </span>
        </button>

        {/* AR View button */}
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
