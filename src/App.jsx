import React from "react";
import SideToolbar from "./components/SideToolBar";
import Viewer from "./components/Viewer";

export default function App() {
  return (
    <div className="w-full h-screen flex">
      <SideToolbar />

      <div className="flex flex-1 flex-col">
        <div className="flex-1 relative bg-gray-50 overflow-hidden">
          <Viewer />
        </div>
      </div>
    </div>
  );
}
