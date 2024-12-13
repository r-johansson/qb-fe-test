import React, { useState } from "react";

const ToggleButton = ({ onToggle, className = "", label = "" }: { onToggle: (isOn: boolean) => void, className?: string, label?: string }) => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={handleClick}
        className={`relative inline-flex items-center w-12 h-6 rounded-full focus:outline-none ${
          isOn ? "bg-blue-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 transform bg-white rounded-full shadow-md transition ${
            isOn ? "translate-x-6" : ""
          }`}
        ></span>
      </button>
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default ToggleButton;
