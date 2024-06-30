import React, { useRef, useState } from "react";
import AWS from "aws-sdk";

interface ProfileImageUloadProps {
  imageUrl: string;
}

function ProfileImageUload({ imageUrl }: ProfileImageUloadProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File>();

  const fileHandler = () => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file);
  };

  const uploadImageFile = async () => {
    if (!imageFile) {
      alert("선택된 이미지가 없습니다.");
      return;
    }

    const name = Date.now();

    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Bucket: process.env.REACT_APP_AWS_NAME,
        Key: `upload/${name}`,
        Body: imageFile,
      },
    });

    const IMAGE_URL = await upload.promise().then((res) => res.Location);

    console.log(IMAGE_URL);
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="file"
        ref={inputElement}
        onChange={handleFileChange}
        className="hidden"
      />
      <img
        className="rounded-full w-[160px] h-[160px] hover:cursor-pointer"
        src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
        onClick={fileHandler}
      />
      <button onClick={uploadImageFile}>전송</button>
    </>
  );
}

export default ProfileImageUload;
