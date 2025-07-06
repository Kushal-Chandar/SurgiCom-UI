import React from "react";
import {
  Keyboard,
  PenTool,
  Layers,
  MessageSquare,
  Activity,
  Edit,
  Grid3x3,
} from "lucide-react";

const tools = [
  { icon: <Keyboard />, label: "Keyboard" },
  { icon: <PenTool />, label: "Pen Tool" },
  { icon: <Layers />, label: "Layers" },
  { icon: <MessageSquare />, label: "Comments" },
  { icon: <Activity />, label: "Analytics" },
  { icon: <Edit />, label: "Draw" },
  { icon: <Grid3x3 className="text-red-600" />, label: "Grid", active: true },
];

export default function SideToolbar() {
  return (
    <div className="w-12 bg-white border-r h-full flex flex-col items-center py-4 space-y-6">
      {tools.map((tool, index) => (
        <div
          key={index}
          className={`p-2 rounded-md cursor-pointer ${
            tool.active ? "bg-red-100" : "hover:bg-gray-100"
          }`}
          title={tool.label}
        >
          {React.cloneElement(tool.icon, { className: "w-5 h-5" })}
        </div>
      ))}
    </div>
  );
}
