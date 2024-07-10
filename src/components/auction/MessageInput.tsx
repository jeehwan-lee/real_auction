import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface MessageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameProps?: string;
}

function MessageInput({ classNameProps, ...props }: MessageInputProps) {
  return (
    <div>
      <input
        {...props}
        className={`py-2 px-4 h-[32px] w-full absolute right-[19px] bottom-1 rounded-lg resize-none overflow-y-hidden focus:outline-none focus:ring-2 focus:border-blue-500 ${classNameProps}`}
      />
    </div>
  );
}

export default MessageInput;
