import { gql } from "@apollo/client";

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
    }
  }
`;

export const TEAM_QUERY = gql`
  query MyQuery4($id: Int!) {
  Team(where: {Participants: {id: {_eq: $id}}, event_id: {_eq: 47}}) {
    name
    Leader {
      email
    }
  }
}
`;

export const INSERT_FEEDBACK = gql`
  mutation MyMutation2($team_id: Int, $Idea_user_Id: Int, $remarks: String) {
    insert_feedbacks_one(
      object: {
        team_id: $team_id
        Idea_user_Id: $Idea_user_Id
        remarks: $remarks
      }
    ) {
      id
    }
  }
`;
