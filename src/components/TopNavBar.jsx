import React from "react";
import { ChevronDown, Share2, UserCircle2, FileText } from "lucide-react";

export default function TopNavBar() {
  return (
    <div className="w-full h-14 bg-white border-b flex items-center justify-between px-4">
      {/* Left side: Logo + File Info */}
      <div className="flex items-center space-x-4">
        <div className="text-blue-500 font-bold text-lg">PSE</div>
        <div className="text-gray-700 font-semibold">SurgiCom</div>
        <div className="ml-4 border px-2 py-1 rounded text-sm text-gray-600 bg-gray-100">
          File Name
        </div>
      </div>

      {/* Right side: Controls */}
      <div className="flex items-center space-x-4">
        <button className="text-sm text-gray-600 hover:underline flex items-center">
          <FileText className="w-4 h-4 mr-1" />
          View
        </button>
        <button className="text-sm text-gray-600 hover:underline flex items-center">
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </button>
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <UserCircle2 key={i} className="w-6 h-6 text-gray-400" />
          ))}
        </div>
        <button className="flex items-center border px-3 py-1 rounded text-sm bg-blue-50 text-blue-600 hover:bg-blue-100">
          Order <ChevronDown className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
