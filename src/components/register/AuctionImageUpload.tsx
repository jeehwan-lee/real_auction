import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import AWS from "aws-sdk";
import { FaRegImages } from "react-icons/fa";
import Flex from "../shared/Flex";

const AuctionImageUpload = forwardRef((props, ref) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File>();

  const blobImageURL = useMemo(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      return url;
    }
  }, [imageFile]);

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
      {imageFile ? (
        <img
          className="rounded-lg w-full h-[220px] object-cover hover:cursor-pointer"
          src={blobImageURL}
          onClick={fileHandler}
        />
      ) : (
        <Flex
          direction="flex-col"
          justify="justify-center"
          classNameProps="rounded-lg bg-white w-full h-[220px] hover:cursor-pointer"
          onClick={fileHandler}
        >
          <FaRegImages size={90} />
        </Flex>
      )}
    </>
  );
});

export default AuctionImageUpload;
