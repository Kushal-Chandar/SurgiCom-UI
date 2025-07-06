import React, { useState } from "react";
import PSELogo from "../assets/PreSurgE.svg";
import Top1 from "../assets/top1.svg";
import Top2 from "../assets/top2.svg";
import Top3 from "../assets/top3.svg";
import Top4 from "../assets/top4.svg";
import BottomGroup from "../assets/left-bottom.svg";

// Subtool SVGs
import T3_1 from "../assets/top3-1.svg";
import T3_2 from "../assets/top3-2.svg";
import T3_3 from "../assets/top3-3.svg";
import T3_4 from "../assets/top3-4.svg";
import T3_5 from "../assets/top3-5.svg";
import T3_6 from "../assets/top3-6.svg";
import T3_7 from "../assets/top3-7.svg";
import T3_8 from "../assets/top3-8.svg";

const subtools = [
  { icon: T3_1, label: "Tool 1" },
  { icon: T3_2, label: "Tool 2" },
  { icon: T3_3, label: "Tool 3" },
  { icon: T3_4, label: "Tool 4" },
  { icon: T3_5, label: "Tool 5" },
  { icon: T3_6, label: "Tool 6" },
  { icon: T3_7, label: "Tool 7" },
  { icon: T3_8, label: "Tool 8" },
];

export default function SideToolbar() {
  const [showSubtools, setShowSubtools] = useState(false);

  return (
    <div className="w-18 bg-white h-full flex flex-col justify-between items-center py-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-2">
        <img src={PSELogo} alt="PSE Logo" className="w-9 h-9" />
        <img src={Top1} alt="Top 1" className="w-14 h-14 cursor-pointer" />
        <img src={Top2} alt="Top 2" className="w-14 h-14 cursor-pointer" />

        {/* Toggleable Tool with Submenu */}
        <div className="relative">
          <img
            src={Top3}
            alt="Top 3"
            className="w-18 h-18 cursor-pointer"
            onClick={() => setShowSubtools(!showSubtools)}
          />

          {/* Subtools dropdown */}
          {showSubtools && (
            <div className="absolute left-25 top-5 z-50 bg-white shadow-lg border rounded px-2 py-2">
              {subtools.map((tool, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <div className="w-14 h-14 mb-1 flex items-center justify-center rounded">
                    <img
                      src={tool.icon}
                      alt={tool.label}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  {(i === 2 || i === 5) && (
                    <div className="w-full border-t border-gray-300 my-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <img src={Top4} alt="Top 4" className="w-14 h-14 cursor-pointer" />
      </div>

      {/* Bottom Icons */}
      <img
        src={BottomGroup}
        alt="Bottom Icons"
        className="w-14 h-auto mb-2 cursor-pointer"
      />
    </div>
  );
}
