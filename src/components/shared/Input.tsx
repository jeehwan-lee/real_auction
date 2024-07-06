import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameProps?: string;
}

function Input({ classNameProps, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`py-2 px-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 ${classNameProps}`}
    />
  );
}

export default Input;
