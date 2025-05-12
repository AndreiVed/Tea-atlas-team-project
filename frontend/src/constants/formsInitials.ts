import { PasswordRequirements } from "../types/PasswordRequirements";
import { RegistrationForm } from "../types/RegistrationForm";
<<<<<<< HEAD
=======
import { SelectedFilters } from "../types/SelectedFilters";
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import { UserInfo } from "../types/UserInfo";

export const registrationFormDefaults: RegistrationForm = {
  first_name: "",
  last_name: "",
  email: "",
  password1: "",
  password2: "",
};

export const registrationFormErrorDefaults = registrationFormDefaults;

export const passwordRequirementsDefaults: PasswordRequirements = {
<<<<<<< HEAD
  isLetterTyped: false,
=======
  isLettersTyped: false,
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
  isMinLength: false,
  isNumberTyped: false,
};

export const userInfoDefaults: UserInfo = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
<<<<<<< HEAD
=======
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
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
}
