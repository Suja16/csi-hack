import * as yup from "yup";

const teamAssignSchema = yup.object({
  team_id: yup.number().required("Team ID is required"),

  mentor: yup.number(),

  evaluator1: yup.number(),

  evaluator2: yup.number(),
});

export default teamAssignSchema;
