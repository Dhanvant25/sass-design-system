import * as yup from "yup";

export const inviteClientSchema = yup.object().shape({
  clientName: yup.string().required("Client name is required"),
  clientEmail: yup
    .string()
    .email("Invalid email")
    .required("Client email is required"),
  selectedPlan: yup.string().required("Please select a plan"),
});
