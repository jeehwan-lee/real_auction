import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import AWS from "aws-sdk";

const AuctionImageUpload = forwardRef((props, ref) => {
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
        Key: `image/auction/${name}`,
        Body: imageFile,
      },
    });

    const IMAGE_URL = await upload.promise().then((res) => res.Location);

    return IMAGE_URL;
  };

  useImperativeHandle(ref, () => ({
    uploadImageFile,
  }));

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
        className="rounded-lg w-full h-[220px] object-cover hover:cursor-pointer"
        src={
          imageFile
            ? URL.createObjectURL(imageFile)
            : "https://real-auction.s3.ap-southeast-2.amazonaws.com/upload/1719932369672"
        }
        onClick={fileHandler}
      />
    </>
  );
});

export default AuctionImageUpload;
