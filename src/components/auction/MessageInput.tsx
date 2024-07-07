import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface MessageInputProps extends HTMLAttributes<HTMLTextAreaElement> {
  classNameProps?: string;
}

function MessageInput({ classNameProps, ...props }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // height를 auto로 설정하여 높이를 재설정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // scrollHeight에 맞게 높이 설정
    }
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={onChange}
      ref={textareaRef}
      {...props}
      className={`py-2 px-4 h-[32px] w-full absolute right-[19px] bottom-1 rounded-lg resize-none overflow-y-hidden focus:outline-none focus:ring-2 focus:border-blue-500 ${classNameProps}`}
    />
  );
}

export default MessageInput;
