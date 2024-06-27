import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={`text-white bg-blue-500 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full`}
    >
      {label}
    </button>
  );
}

export default Button;
