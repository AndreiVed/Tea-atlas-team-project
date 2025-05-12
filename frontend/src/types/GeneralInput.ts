import { PasswordRequirements } from "./PasswordRequirements";

export type GeneralInput = {
  type: "text" | "email" | "password";
  title: string;
  placeholder: string;
  required?: boolean;
  name: string;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  onFocus?: () => void;
  onBlur? : () => void;
  onPasswordRequirementsChange?: (requirements: PasswordRequirements) => void;
  validate?: (value: string) => string | undefined;
  showPasswordRequirements?: boolean;
  disabled?: boolean;
}