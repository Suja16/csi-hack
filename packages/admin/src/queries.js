import { gql } from "@apollo/client";

export const TEAM_QUERY = gql`
  query MyQuery {
    Team {
      submissions
      name
      leader_id
      invite_code
      id
      approved
    }
    Team_aggregate {
      aggregate {
        count
      }
    }
    Participant_aggregate(where: { team_id: { _is_null: false } }) {
      aggregate {
        count
      }
    }
  }
`;
