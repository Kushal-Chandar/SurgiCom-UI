import React, { useState, useEffect } from "react";
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

const mainTools = [
  { icon: Top1, label: "Top 1", onClick: () => console.log("Top1 clicked") },
  { icon: Top2, label: "Top 2", onClick: () => console.log("Top2 clicked") },
  { icon: Top3, label: "Subtools", toggle: true },
  { icon: Top4, label: "Top 4", onClick: () => console.log("Top4 clicked") },
];

const subtools = [
  { icon: T3_1, onClick: () => console.log("Tool1 clicked") },
  { icon: T3_2, onClick: () => console.log("Tool2 clicked") },
  { icon: T3_3, onClick: () => console.log("Tool3 clicked") },
  { icon: T3_4, onClick: () => console.log("Tool4 clicked") },
  { icon: T3_5, onClick: () => console.log("Tool5 clicked") },
  { icon: T3_6, onClick: () => console.log("Tool6 clicked") }, // Subtool 6
  { icon: T3_7, onClick: () => console.log("Tool7 clicked") },
  { icon: T3_8, onClick: () => console.log("Tool8 clicked") },
];

export default function SideToolbar() {
  const [showSubtools, setShowSubtools] = useState(false);
  const [activeSub, setActiveSub] = useState(null);
  const [laserPointerActive, setLaserPointerActive] = useState(false);

  const handleSubClick = (idx, tool) => {
    const newActiveSub = activeSub === idx ? null : idx;
    setActiveSub(newActiveSub);
    tool.onClick();

    // Control laser pointer based on Subtool 6 (index 5) active state
    if (idx === 5) {
      // Toggle laser pointer when clicking Subtool 6
      setLaserPointerActive((prev) => !prev);
    } else {
      // Turn off laser pointer when any other subtool is clicked
      setLaserPointerActive(false);
    }
  };

  // Turn off laser pointer when subtools menu is closed
  useEffect(() => {
    if (!showSubtools) {
      setLaserPointerActive(false);
      setActiveSub(null);
    }
  }, [showSubtools]);

  useEffect(() => {
    // If laser pointer is active, apply custom cursor styles
    if (laserPointerActive) {
      // Hide the default mouse pointer when laser is active
      document.body.style.cursor = "none"; // Hide default cursor

      // Using a CSS-based red dot cursor
      const cursorStyle = `
        .laser-cursor {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 10px red; /* Glowing effect */
          animation: trail 0.5s ease-out;
        }

        .laser-trail {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: red;
          border-radius: 50%;
          pointer-events: none;
          animation: trail 0.5s ease-out;
          opacity: 0.5;
        }

        @keyframes trail {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `;

      // Dynamically add CSS to the document
      const styleTag = document.createElement("style");
      styleTag.innerHTML = cursorStyle;
      document.head.appendChild(styleTag);

      // Create a red dot element (laser cursor)
      const cursorElement = document.createElement("div");
      cursorElement.classList.add("laser-cursor");

      // Create a trail effect element
      const trailElement = document.createElement("div");
      trailElement.classList.add("laser-trail");

      document.body.appendChild(cursorElement);
      document.body.appendChild(trailElement);

      const trailEffect = (e) => {
        // Position the cursor dot where the mouse is
        cursorElement.style.left = `${e.pageX - 7}px`; // Center the dot
        cursorElement.style.top = `${e.pageY - 7}px`; // Center the dot

        // Position the trail element to follow the cursor
        trailElement.style.left = `${e.pageX - 2}px`;
        trailElement.style.top = `${e.pageY - 2}px`;
      };

      document.body.addEventListener("mousemove", trailEffect);

      return () => {
        document.body.removeEventListener("mousemove", trailEffect);
        document.head.removeChild(styleTag); // Cleanup styles
        document.body.removeChild(cursorElement); // Remove custom cursor element
        document.body.removeChild(trailElement); // Remove trail element
      };
    } else {
      // Reset the cursor to default when the laser pointer is turned off
      document.body.style.cursor = "default"; // Reset cursor to default
    }
  }, [laserPointerActive]);

  return (
    <div className="w-18 bg-white h-full flex flex-col justify-between items-center py-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-2">
        {/* PSE Logo - Standalone Image */}
        <div className="w-10 h-10 flex items-center justify-center mb-2">
          <img
            src={PSELogo}
            alt="PreSurgE Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Main Tools */}
        {mainTools.map((tool, idx) => {
          const { icon, label, onClick, toggle } = tool;
          return (
            <div key={idx} className="relative group">
              <button
                type="button"
                className={`w-14 h-14 flex items-center justify-center focus:outline-none ${toggle && showSubtools ? "bg-gray-200 rounded-full" : ""}`}
                onClick={
                  toggle ? () => setShowSubtools((prev) => !prev) : onClick
                }
                aria-label={label}
              >
                <img
                  src={icon}
                  alt={label}
                  className="w-full h-full object-contain"
                />
              </button>
              <div className="pointer-events-none absolute left-full ml-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {label}
              </div>
            </div>
          );
        })}

        {/* Subtools dropdown */}
        {showSubtools && (
          <div className="absolute left-20 top-50 z-50 bg-white shadow-lg border rounded px-2 py-2">
            {subtools.map((tool, i) => {
              const isSubActive = activeSub === i;
              return (
                <React.Fragment key={i}>
                  <button
                    type="button"
                    className={`w-10 h-10 flex items-center justify-center mb-1 focus:outline-none ${isSubActive ? "bg-gray-200 rounded-full" : ""}`}
                    onClick={() => handleSubClick(i, tool)}
                    aria-label={`Subtool ${i + 1}`}
                  >
                    <img
                      src={tool.icon}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                  {(i === 2 || i === 5) && (
                    <div className="w-full border-t border-gray-300 my-2" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Icons */}
      <button
        type="button"
        className="w-14 h-auto mb-2 flex items-center justify-center focus:outline-none"
        onClick={() => console.log("Bottom clicked")}
        aria-label="Bottom group"
      >
        <img
          src={BottomGroup}
          alt=""
          className="w-full h-full object-contain"
        />
      </button>
    </div>
  );
}
