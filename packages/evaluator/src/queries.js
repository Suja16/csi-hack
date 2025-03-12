import { gql } from "@apollo/client";

export const TEAMS_QUERY = gql`
  query Teams($_userID: Int) {
    feedbacks(where: { Idea_user_Id: { _eq: $_userID } }) {
      team_info_from_eventio {
        submissions
        id
        name
      }
      metric_score
      totalscore
      id
    }
  }
`;

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
    }
  }
`;

export const APPROVED_TEAMS = gql`
  query ApprovedTeams {
    Team(where: { approved: { _eq: true } }) {
      id
      name
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
  ) {
    insert_feedbacks_one(
      object: {
        team_id: $team_id
        metric_score: $metric_score
        totalscore: $totalscore
        Idea_user_Id: $user_Id
      }
    ) {
      id
    }
  }
`;
