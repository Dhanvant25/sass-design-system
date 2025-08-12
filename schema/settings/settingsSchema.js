import * as yup from "yup";

export const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  company: yup.string().required("Company is required"),
  role: yup.string().required("Role is required"),
  bio: yup.string().required("Bio is required"),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const preferencesSchema = yup.object().shape({
  language: yup.string().required("Language is required"),
  timezone: yup.string().required("Timezone is required"),
  dateFormat: yup.string().required("Date format is required"),
});
