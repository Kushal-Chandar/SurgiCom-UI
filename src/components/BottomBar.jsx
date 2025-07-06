import React from "react";
import { Camera, Video, Rotate3D } from "lucide-react";

export default function BottomBar() {
  return (
    <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-6 py-2 bg-white border-t">
      {/* Left: Capture Controls */}
      <div className="flex space-x-4">
        <button className="flex items-center px-3 py-1 border rounded text-sm text-red-600 hover:bg-red-50">
          <Video className="w-4 h-4 mr-1" />
          Record
        </button>
        <button className="flex items-center px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
          <Camera className="w-4 h-4 mr-1" />
          Capture
        </button>
        <button className="flex items-center px-3 py-1 border rounded text-sm text-blue-600 hover:bg-blue-50">
          <Rotate3D className="w-4 h-4 mr-1" />
          AR View
        </button>
      </div>

      {/* Right: View Modes */}
      <div className="flex space-x-2">
        {["Coronal", "Axial", "Sagittal"].map((mode) => (
          <button
            key={mode}
            className="px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100"
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
