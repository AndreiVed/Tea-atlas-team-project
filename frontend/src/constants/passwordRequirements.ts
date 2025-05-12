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
<<<<<<< HEAD
    key: "isLetterTyped",
    message: "Must include at least 1 letter",
=======
    key: "isLettersTyped",
    message: "Must include at least 2 letters",
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
  },
  {
    key: "isNumberTyped",
    message: "Must include at least 1 number",
  },
];