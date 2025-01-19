import { gql } from "@apollo/client";

export const TEAM_QUERY = gql`
  query TeamQuery($approved: Boolean, $search: String) {
    Team(
      where: {
        event_id: { _eq: 47 }
        approved: { _eq: $approved }
        _or: [{ name: { _ilike: $search } }]
      }
      order_by: { id: asc }
    ) {
      id
      name
      leader_id
      approved
      submissions
      invite_code
      Participants {
        id
        user_id
        more_details
        User {
          photo_url
          name
        }
      }
      Leader {
        name
      }
    }
  }
`;

export const ADD_EVALUATOR = gql`
  mutation MyMutation(
    $email: String
    $name: String
    $password: String
    $phone_no: numeric
    $roles: Roles_enum
  ) {
    insert_Idea_USERS_one(
      object: {
        email: $email
        name: $name
        password: $password
        phone_no: $phone_no
        roles: $roles
      }
    ) {
      name
      password
      phone_no
      roles
      email
    }
  }
`;

export const EVALUATOR_QUERY = gql`
  query MyQuery {
    Team(order_by: { id: asc }) {
      id
      name
      feedbacks_from_idea {
        Idea_USER {
          id
          roles
          name
        }
      }
    }
    Idea_USERS(where: { roles: { _in: [evaluator, mentor] } }) {
      id
      name
      roles
    }
  }
`;

export const ASSIGN_TEAM = gql`
  mutation MyMutation($Idea_user_Id: Int, $team_id: Int) {
    insert_feedbacks_one(
      object: { Idea_user_Id: $Idea_user_Id, team_id: $team_id }
    ) {
      Idea_user_Id
      team_id
    }
  }
`;
