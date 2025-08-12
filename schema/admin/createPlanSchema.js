import * as yup from "yup";

export const createPlanSchema = yup.object().shape({
  name: yup.string().required("Plan name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  features: yup.string().required("At least one feature is required"),
});
