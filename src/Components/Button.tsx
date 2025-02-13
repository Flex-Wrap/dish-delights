import React from "react";

interface ButtonProps {
  text: string;
  color?: string; // Accepts any hex color
  onClick?: () => void;
  className?: string; // Allows additional styling
}

const Button: React.FC<ButtonProps> = ({ text, color = "#1E40AF", onClick, className }) => {
  return (
    <button
      className={`px-6 py-2 font-semibold rounded-lg transition duration-300 hover:opacity-80 ${className}`}
      style={{ backgroundColor: color, color: "#FFFFFF" }} // Set background dynamically
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
