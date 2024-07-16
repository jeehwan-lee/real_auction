import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import AWS from "aws-sdk";

const ProfileImageUpload = forwardRef((props: { imageUrl: string }, ref) => {
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
      return null;
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
        Key: `image/profile/${name}`,
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
        className="rounded-full w-[160px] h-[160px] hover:cursor-pointer"
        src={imageFile ? blobImageURL : props.imageUrl}
        onClick={fileHandler}
      />
    </>
  );
});

export default ProfileImageUpload;
