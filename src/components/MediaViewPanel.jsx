import React, { useRef, useState } from "react";

// Replace with actual paths to icons
import RecordIcon from "../assets/record.svg";
import PhotoIcon from "../assets/photo-camera.svg";
import ARIcon from "../assets/ar.svg";

const MediaViewPanel = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [chunks, setChunks] = useState([]);

  const startStream = async () => {
    if (!mediaStream) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setMediaStream(stream);
      return stream;
    }
    return mediaStream;
  };

  const startRecording = async () => {
    const stream = await startStream();
    const recorder = new MediaRecorder(stream);
    const localChunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) localChunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(localChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      a.href = url;
      a.download = `SurgiCom_${timestamp}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const captureScreenshot = async () => {
    const stream = await startStream();
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL("image/png");
      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const a = document.createElement("a");
      a.href = image;
      a.download = `SurgiCom_${timestamp}.png`;
      a.click();
    };
  };

  return (
    <div className="flex justify-center items-center py-4 font-satoshi font-medium]">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <video ref={videoRef} style={{ display: "none" }} />

      <div className="flex gap-4 bg-white px-4 py-2 rounded-md items-center">
        <button
          className="flex items-center gap-2 group"
          onClick={recording ? stopRecording : startRecording}
        >
          <img src={RecordIcon} alt="Record" className="w-6 h-6" />
          <span className="text-sm text-black group-hover:underline">
            {recording ? "Stop" : "Record"}
          </span>
        </button>

        <button
          className="flex items-center gap-2 group"
          onClick={captureScreenshot}
        >
          <img src={PhotoIcon} alt="Capture" className="w-6 h-6" />
          <span className="text-sm text-black group-hover:underline">
            Capture
          </span>
        </button>

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
