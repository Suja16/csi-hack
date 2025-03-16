import { useContext, useState, useEffect, useMemo } from "react";
import { Outlet, Navigate } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { APPROVED_TEAMS } from "../queries";
import UserDataContext from "../contexts/userDataContext";
import TeamsContext from "../contexts/teamsContext";

export default function LoginLayout() {
  const { userData } = useContext(UserDataContext);
  const [allTeams, setAllTeams] = useState({});

  const evaluation1 = useMemo(() => {
    const d = {};
    Object.keys(allTeams).forEach((teamId) => {
      if (
        allTeams[teamId].feedbacks_from_idea.find(
          (feedback) => feedback.Idea_USER.for === "evaluation1",
        )
      ) {
        d[teamId] = allTeams[teamId];
      }
    });
    return d;
  }, [allTeams]);

  const evaluation2 = useMemo(() => {
    const d = {};
    Object.keys(allTeams).forEach((teamId) => {
      if (
        allTeams[teamId].feedbacks_from_idea.find(
          (feedback) => feedback.Idea_USER.for === "evaluation2",
        )
      ) {
        d[teamId] = allTeams[teamId];
      }
    });
    return d;
  }, [allTeams]);

  const [getTeamsData] = useLazyQuery(APPROVED_TEAMS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const d = {};
      data.Team.forEach((team) => {
        d[team.id] = team;
      });
      setAllTeams(d);
    },
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  useEffect(() => {
    if (userData) {
      getTeamsData({ variables: { _userID: userData.id } });
    }
  }, [userData, getTeamsData]);

  if (!userData) {
    return <Navigate to="/login" />;
  }
  return (
    <TeamsContext.Provider
      value={{
        allTeams,
        evaluation1,
        evaluation2,
        refetch: () => getTeamsData(),
      }}
    >
      <Outlet />
    </TeamsContext.Provider>
  );
}
