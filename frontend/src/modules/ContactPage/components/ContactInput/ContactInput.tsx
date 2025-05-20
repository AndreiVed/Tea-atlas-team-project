import { GeneralInput } from "@/components/GeneralInput";
import { updateContactForm } from "@/features/contact/contactSlice";
import { useAppDispatch } from "@/store/hooks";
import { GeneralInput as GeneralInputType } from "@/types/GeneralInput";
import { FC } from "react";

export const ContactInput: FC<Omit<GeneralInputType, "onChange">> = (props) => {
  const dispatch = useAppDispatch();

  const handleChange = (fieldName: string, value: string) => {
    dispatch(updateContactForm({ [fieldName]: value }));
  };

  return <GeneralInput {...props} onChange={handleChange} />;
};