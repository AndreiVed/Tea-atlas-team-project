import { PasswordRequirements } from "../types/PasswordRequirements";
import { RegistrationForm } from "../types/RegistrationForm";
import { SelectedFilters } from "../types/SelectedFilters";
import { UserInfo } from "../types/UserInfo";

export const registrationFormDefaults: RegistrationForm = {
  first_name: "",
  last_name: "",
  email: "",
  password1: "",
  password2: "",
};

export const registrationFormErrorDefaults = { ...registrationFormDefaults };

export const passwordRequirementsDefaults: PasswordRequirements = {
  isLettersTyped: false,
  isMinLength: false,
  isNumberTyped: false,
};

export const userInfoDefaults: UserInfo = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
};

export const selectedFiltersDefaults: SelectedFilters = {
  country: [],
  impact: [],
  fermentation: [],
  type: [],
};

export const contactFormDefaults = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export const urlFiltersDefaults: SelectedFilters & { name: string } = {
  country: [],
  impact: [],
  fermentation: [],
  type: [],
  name: "",
};

// export grouped
export const formDefaults = {
  registrationFormDefaults,
  registrationFormErrorDefaults,
  passwordRequirementsDefaults,
  userInfoDefaults,
  selectedFiltersDefaults,
  contactFormDefaults,
  urlFiltersDefaults,
};