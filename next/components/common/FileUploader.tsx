import { Button } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import UserImg from "@/components/common/UserImg";
import dayjs from "dayjs";
import RStack from "@/components/common/RStack";

const FileUploader = ({
  image,
  setFile,
  setImage,
}: {
  image: string;
  setFile: Dispatch<SetStateAction<File | null>>;
  setImage: Dispatch<SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState("");

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImage(dayjs().format("YYYYMMDDHHmmss") + selectedFile.name);

    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      setUploadedImage(ev.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <RStack gap={3}>
      <UserImg src={uploadedImage} fileName={image} size="70" />
      <Button onClick={() => inputRef.current?.click()}>
        画像を選択
        <FileUploadIcon />
      </Button>
      <input onChange={fileSelected} type="file" hidden ref={inputRef} />
    </RStack>
  );
};

export default FileUploader;
