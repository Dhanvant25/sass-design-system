import * as yup from "yup";

export const createPlanSchema = yup.object().shape({
  name: yup.string().required("Plan name is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Price must be a number")
    .positive("Price must be positive"),
  features: yup.string().required("At least one feature is required"),
});
