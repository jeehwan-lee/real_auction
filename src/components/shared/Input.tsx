import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
    />
  );
}

export default Input;
