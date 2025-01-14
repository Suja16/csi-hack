import * as yup from "yup";

const registrationSchema =
  yup.object({
    phone_number: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),

    gender: yup
      .string()
      .is(["MALE", "FEMALE"], "Invalid Gender.")
      .required("Gender is required"),

    year: yup
      .number()
      .typeError("Graduation year must be a number")
      .required("Graduation year is required"),

    branch: yup
      .string()
      .required("Branch is required")
      .test("is-valid-branch", "Branch is required", (value) => {
        return value !== "BRANCH";
      }),

    college: yup.string().required("College is required").min(6, "College name must be at least 6 characters"),

    degree: yup.string().required("Degree is required"),

    state: yup.string().required("State is required"),

    city: yup.string().required("City is required"),

    pin_code: yup.string().required("Pin code is required").matches(/^\d{6}$/, "Pin code must be 6 digits"),

    linkedin: yup.string().required("LinkedIn is required"),
          // .matches(
          //   /^https?:\/\/((www|\w\w)\.)?linkedin\.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$/,
          //   "Please enter a valid LinkedIn URL",
          // ),


    github: yup.string().required("GitHub is required"),
          // .matches(
          //   /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]{1,25}$/gim,
          //   "Please enter a valid GitHub URL",
          // ),

    tech_stack: yup.string().required("Tech Stack is required"),
          // .test(
          //   "is-valid-tech-stack",
          //   "Each item must be a non-empty string separated by commas",
          //   (value) => {
          //     if (!value) return false; // Required validation
          //     const tags = value.split(",").map((tag) => tag.trim());
          //     return tags.every((tag) => tag.length > 0 && !tag.includes(" "));
          //   },
          // ),

    why_this_hackathon: yup.string().notRequired(),

    resume: yup.mixed().required("Resume is required")
          .test("minimumFiles", "Resume is required", (value) => {
            return value.length > 0 && value[0];
          })
          .test("fileType", "Only PDF files are allowed", (value) => {
            return (
              value.length > 0 &&
              value[0] &&
              value[0].type === "application/pdf"
            );
          })
          .test("fileSize", "File size must be less than 2MB", (value) => {
            return (
              value.length > 0 && value[0] && value[0].size <= 2 * 1024 * 1024
            ); // 2MB in bytes
          }),

    photo_id: yup.mixed().required("Photo ID is required")
          .test("minimumFiles", "Photo ID is required", (value) => {
            return value.length > 0 && value[0];
          })
          .test("fileType", "Only Image files are allowed", (value) => {
            return (
              value.length > 0 &&
              value[0] &&
              value[0].type.startsWith("image/")
            );
          })
          .test("fileSize", "File size must be less than 2MB", (value) => {
            return (
              value.length > 0 && value[0] && value[0].size <= 2 * 1024 * 1024
            ); // 2MB in bytes
          }),

    // resume: yup.string().required("Resume is required"),

    team_choice: yup.string().required("Team choice is required")
          .oneOf(
            ["create", "join"],
            "Team choice must be either 'create' or 'join'",
          ),

    team_name: yup.string().when(["team_choice"], {
      is: (team_choice) =>
        team_choice === "create",
      then: (schema) =>
        schema
          .required("Team name is required")
          .min(3, "Team name must be at least 3 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),

    invite_code: yup.string().when(["team_choice"], {
      is: (team_choice) =>
        team_choice === "join",
      then: (schema) =>
        schema
          .required("Invite code is required")
          .min(5, "Invite code must be at least 5 characters")
          .max(5, "Invite code must be at most 5 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

export default registrationSchema;
