import { gql } from "@apollo/client";

// export const EVAL1_QUERY = gql`
//   query Teams {
//     Team(where: { approved: { _eq: true } }) {
//       id
//       name
//       feedbacks_from_idea(where: { Idea_USER: { for: { _eq: evaluation1 } } }) {
//         id
//         Idea_user_Id
//         metric_score
//         totalscore
//       }
//     }
//   }
// `;

// export const EVAL2_QUERY = gql`
//   query Teams {
//     Team(where: { approved: { _eq: true } }) {
//       id
//       name
//       feedbacks_from_idea(where: { Idea_USER: { for: { _eq: evaluation2 } } }) {
//         id
//         Idea_user_Id
//         metric_score
//         totalscore
//       }
//     }
//   }
// `;

export const LOGIN_QUERY = gql`
  query Login($email: String, $password: String) {
    Idea_USERS(
      where: { email: { _eq: $email }, password: { _eq: $password } }
    ) {
      id
      name
      email
      password
      roles
      type
      for
    }
  }
`;

export const APPROVED_TEAMS = gql`
  query Teams {
    Team(where: { approved: { _eq: true } }) {
      id
      name
      domain: submissions(path: "domain")
      feedbacks_from_idea {
        id
        Idea_user_Id
        Idea_USER {
          name
          roles
          for
        }
        metric_score
        totalscore
        remarks
      }
    }
  }
`;

export const UPDATE_SCORES = gql`
  mutation UpdateScores($id: Int!, $metric_score: jsonb, $totalscore: Int) {
    update_feedbacks_by_pk(
      pk_columns: { id: $id }
      _set: { metric_score: $metric_score, totalscore: $totalscore }
    ) {
      id
    }
  }
`;

export const INSERT_SCORES = gql`
  mutation INSERTSCORES(
    $team_id: Int
    $metric_score: jsonb
    $totalscore: Int
    $user_Id: Int
    $remarks: String
  ) {
    insert_feedbacks_one(
      object: {
        team_id: $team_id
        metric_score: $metric_score
        totalscore: $totalscore
        Idea_user_Id: $user_Id
        remarks: $remarks
      }
    ) {
      id
    }
  }
`;
