import React from "react";
import TopNavBar from "./components/TopNavBar";
import SideToolbar from "./components/SideToolBar";
import RightPanel from "./components/RightPanel";
import BottomBar from "./components/BottomBar";
import Viewer from "./components/Viewer";

export default function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <TopNavBar />
      <div className="flex flex-1">
        <SideToolbar />
        <div className="flex-1 relative bg-gray-50">
          <Viewer />
          <BottomBar />
        </div>
        <RightPanel />
      </div>
    </div>
  );
}
