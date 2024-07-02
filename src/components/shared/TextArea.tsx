import React, { InputHTMLAttributes } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({ ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className="py-2 px-4 w-full h-24 rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-blue-500"
    />
  );
}

export default TextArea;
