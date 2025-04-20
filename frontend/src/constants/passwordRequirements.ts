import { PasswordRequirements } from "../types/PasswordRequirements";

export type ConfigPasswordRequirement = {
  key: keyof PasswordRequirements;
  message: string;
}

export const PASSWORD_REQUIREMENTS: ConfigPasswordRequirement[] = [
  {
    key: "isMinLength",
    message: "Must be at least 8 characters long",
  },
  {
    key: "isLetterTyped",
    message: "Must include at least 1 letter",
  },
  {
    key: "isNumberTyped",
    message: "Must include at least 1 number",
  },
];