import * as yup from "yup";

const registrationSchema = (currentStep) =>
  yup.object({
    phone_number: yup
      .string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),

    gender: yup
      .string()
      .is(["MALE", "FEMALE"], "Gender is required.")
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

    college: yup.string().required("College is required"),

    degree: yup.string().required("Degree is required"),

    linkedin: yup.string().when([], {
      is: () => currentStep === "OtherDetails",
      then: (schema) =>
        schema
          .required("LinkedIn is required")
          .matches(
            /^https?:\/\/((www|\w\w)\.)?linkedin\.com\/((in\/[^/]+\/?)|(pub\/[^/]+\/((\w|\d)+\/?){3}))$/,
            "Please enter a valid LinkedIn URL",
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

    github: yup.string().when([], {
      is: () => currentStep === "OtherDetails",
      then: (schema) =>
        schema
          .required("GitHub is required")
          .matches(
            /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim,
            "Please enter a valid GitHub URL",
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

    category: yup.string().when([], {
      is: () => currentStep === "OtherDetails",
      then: (schema) =>
        schema
          .required("Category is required")
          .is(["SOFTWARE", "HARDWARE"], "Category is required."),
      otherwise: (schema) => schema.notRequired(),
    }),

    tech_stack: yup.string().when([], {
      is: () => currentStep === "OtherDetails",
      then: (schema) =>
        schema
          .required("Tech Stack is required")
          .test(
            "is-valid-tech-stack",
            "Each item must be a non-empty string and must not contain spaces or commas",
            (value) => {
              if (!value) return false; // Required validation
              const tags = value.split(",").map((tag) => tag.trim());
              return tags.every((tag) => tag.length > 0 && !tag.includes(" "));
            },
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

    why_this_hackathon: yup.string().when([], {
      is: () => currentStep === "OtherDetails",
      then: (schema) =>
        schema
          .required("'Why this hackathon' is required")
          .min(100, "At least 100 characters are required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    resume: yup.mixed().when([], {
      is: () => currentStep === "OtherDetails",
      then: (schema) =>
        schema
          .required("Resume is required")
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
      otherwise: (schema) => schema.notRequired(),
    }),

    team_choice: yup.string().when([], {
      is: () => currentStep === "TeamDetails",
      then: (schema) =>
        schema
          .required("Team choice is required")
          .oneOf(
            ["create", "join"],
            "Team choice must be either 'create' or 'join'",
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

    team_name: yup.string().when(["team_choice"], {
      is: (team_choice) =>
        currentStep === "TeamDetails" && team_choice === "create",
      then: (schema) =>
        schema
          .required("Team name is required")
          .min(3, "Team name must be at least 3 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),

    invite_code: yup.string().when(["team_choice"], {
      is: (team_choice) =>
        currentStep === "TeamDetails" && team_choice === "join",
      then: (schema) =>
        schema
          .required("Invite code is required")
          .min(5, "Invite code must be at least 5 characters")
          .max(5, "Invite code must be at most 5 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

export default registrationSchema;
