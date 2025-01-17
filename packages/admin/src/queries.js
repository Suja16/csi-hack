import { gql } from "@apollo/client";

export const TEAM_QUERY = gql`
  query TeamQuery {
    Team(where: { event_id: { _eq: 47 } }, order_by: { id: asc }) {
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
