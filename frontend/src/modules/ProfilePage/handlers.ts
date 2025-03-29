import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleFileSelect = (
  e: ChangeEvent<HTMLInputElement>,
  setUserAvatarSrc: Dispatch<SetStateAction<string | null>>
) => {
  const file = e.target.files?.item(0);

  setUserAvatarSrc(file ? URL.createObjectURL(file) : null);
};
