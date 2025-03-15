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
          gender
        }
      }
      Leader {
        name
        college
      }
      feedbacks_from_idea {
        metric_score
        totalscore
        Idea_USER {
          roles
          type
        }
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
    $domain: String
    $type: EvaluatorTypes_enum
    $metadata: jsonb
  ) {
    insert_Idea_USERS_one(
      object: {
        email: $email
        name: $name
        password: $password
        phone_no: $phone_no
        roles: $roles
        domain: $domain
        type: $type
        metadata: $metadata
      }
    ) {
      name
      password
      phone_no
      roles
      email
      domain
      type
      metadata
    }
  }
`;

export const EVALUATOR_QUERY = gql`
  query EvaluatorQuery {
    Team(order_by: { id: asc }) {
      id
      name
      approved
      submissions
      Participants {
        id
        user_id
        more_details
        User {
          photo_url
          name
          gender
        }
      }
      feedbacks_from_idea {
        Idea_USER {
          id
          roles
          name
          domain
          type
        }
      }
    }
    Idea_USERS(where: { roles: { _in: [evaluator, mentor] } }) {
      id
      name
      roles
      domain
      type
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

export const EDIT_TEAM = gql`
  mutation EditTeam($old_user_Id: Int, $team_id: Int, $Idea_user_Id: Int) {
    update_feedbacks(
      where: { Idea_user_Id: { _eq: $old_user_Id }, team_id: { _eq: $team_id } }
      _set: { Idea_user_Id: $Idea_user_Id }
    ) {
      affected_rows
    }
  }
`;

export const STATS_QUERY = gql`
  query StatsQuery {
    Team(where: { event_id: { _eq: 47 } }, order_by: { id: asc }) {
      approved
      submissions
      name
      Participants {
        more_details
        User {
          id
          gender
        }
      }
      Leader {
        id
        name
        college
      }
      feedbacks_from_idea {
        metric_score
        totalscore
        Idea_USER {
          roles
        }
      }
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
  }
`;

export const SUBMISSIONS_QUERY = gql`
  mutation MyMutation2($submissions: jsonb, $id: Int!) {
    update_Team_by_pk(
      pk_columns: { id: $id }
      _set: { submissions: $submissions }
    ) {
      id
    }
  }
`;

export const PanelDataQueryEval1 = gql`
  query MyQuery {
    feedbacks(
      where: {
        Idea_USER: { roles: { _eq: judges }, for: { _eq: evaluation1 } }
      }
    ) {
      team_id
      team_info_from_eventio {
        name
        leader_id
        Leader {
          name
          gender
          college
        }
        Participants {
          User {
            gender
            is_somaiya_student
            name
          }
        }
      }
      metric_score
      totalscore
      Idea_USER {
        name
      }
    }
  }
`;

export const PanelDataQueryEval2 = gql`
  query MyQuery {
    feedbacks(
      where: {
        Idea_USER: { roles: { _eq: judges }, for: { _eq: evaluation2 } }
      }
    ) {
      team_id
      team_info_from_eventio {
        name
        leader_id
        Leader {
          name
          gender
          college
        }
        Participants {
          User {
            gender
            is_somaiya_student
            name
          }
        }
      }
      metric_score
      totalscore
      Idea_USER {
        name
      }
    }
  }
`;

export const Eval1Scores = gql`
  query MyQuery {
  feedbacks(where: {Idea_USER: {roles: {_eq: judges}, for: {_eq: evaluation1}}}) {
    id
    team_id
    totalscore
    team_info_from_eventio {
      name
      Leader {
        name
        college
      }
    }
  }
}
`;
export const Eval2Scores = gql`
  query MyQuery {
  feedbacks(where: {Idea_USER: {roles: {_eq: judges}, for: {_eq: evaluation2}}}) {
    id
    team_id
    totalscore
    team_info_from_eventio {
      name
      Leader {
        name
        college
      }
    }
  }
}
`;
