import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  label: string;
}

function Button({ color, label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`text-white bg-${color}-500 hover:bg-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
    >
      {label}
    </button>
  );
}

export default Button;
