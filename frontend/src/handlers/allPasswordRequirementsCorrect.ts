import { PasswordRequirements } from "../types/PasswordRequirements";

export const allPasswordRequirementsCorrect = (
  requirements: PasswordRequirements
): boolean => {
  return Object.values(requirements).every((req) => req);
};
