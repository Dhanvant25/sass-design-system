import * as yup from "yup";

export const agencyInfoSchema = yup.object().shape({
  name: yup.string().required("Agency name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Contact email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s\-()]+$/, "Invalid phone number")
    .required("Phone number is required"),
  website: yup
    .string()
    .url("Invalid website URL")
    .required("Website is required"),
  address: yup.string().required("Address is required"),
});
