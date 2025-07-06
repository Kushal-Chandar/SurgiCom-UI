import React from "react";
import { Eye, EyeOff, X, File, Ruler, RotateCcw, Square } from "lucide-react";

const layers = [
  { name: "Skull.stl", type: "file", visible: true },
  { name: "Length01", value: "12mm", type: "length", visible: true },
  { name: "Angle01", value: "17°", type: "angle", visible: true },
  { name: "Volume01", value: "121 mm³", type: "volume", visible: true },
];

const iconForType = {
  file: File,
  length: Ruler,
  angle: RotateCcw,
  volume: Square,
};

export default function RightPanel() {
  return (
    <div className="w-64 bg-white border-l h-full p-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-gray-700">Layers</h2>
          <button className="text-gray-400 hover:text-red-500">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {layers.map((layer, index) => {
            const Icon = iconForType[layer.type] || File;
            return (
              <div
                key={index}
                className="flex justify-between items-center text-sm text-gray-700 border px-2 py-1 rounded hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span>{layer.name}</span>
                  {layer.value && (
                    <span className="text-gray-400 text-xs ml-1">
                      ({layer.value})
                    </span>
                  )}
                </div>
                <button>
                  {layer.visible ? (
                    <Eye size={16} className="text-gray-500" />
                  ) : (
                    <EyeOff size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
