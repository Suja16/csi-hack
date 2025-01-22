import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($email: String, $password: String) {
    Idea_USERS(
      where: { email: { _eq: $email }, password: { _eq: $password } }
    ) {
      id
      name
      email
      roles
    }
  }
`;

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
  mutation MyMutation($objects: [feedbacks_insert_input!]!) {
    insert_feedbacks(objects: $objects) {
      affected_rows
    }
  }
`;
// queries.js

export const STATS_QUERY = gql`
  query TeamQuery {
    Team_aggregate {
      aggregate {
        count(columns: id)
        count_submissions: count(columns: submissions, distinct: true)
      }
    }
    Team(where: {}) {
      id
      submissions
    }
    Idea_USERS_aggregate(where: { roles: { _eq: evaluator } }) {
      aggregate {
        count
      }
    }
    feedbacks_aggregate(where: { totalscore: { _is_null: false } }) {
      aggregate {
        count
      }
    }
    maleCount: Participant_aggregate(
      where: { User: { gender: { _eq: "MALE" } }, Event: { id: { _eq: 47 } } }
    ) {
      aggregate {
        count
      }
    }
    femaleCount: Participant_aggregate(
      where: { User: { gender: { _eq: "FEMALE" } }, Event: { id: { _eq: 47 } } }
    ) {
      aggregate {
        count
      }
    }
    female_team_count: Team_aggregate(
      where: { Participants: { User: { gender: { _eq: "FEMALE" } } } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
