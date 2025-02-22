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
    Team(where: { Participants: { id: { _eq: $id } }, event_id: { _eq: 47 } }) {
      name
    }
  }
`;
