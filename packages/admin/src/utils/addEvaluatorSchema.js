import * as yup from "yup";

const teamAssignSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup.string().required("Password is required"),

  phone_number: yup.string().required("Phone number is required"),
});

export default teamAssignSchema;
