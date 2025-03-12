import { useContext, useState, useEffect, useMemo } from "react";
import { Outlet, Navigate, useNavigate } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { APPROVED_TEAMS } from "../queries";
import UserDataContext from "../contexts/userDataContext";
import TeamsContext from "../contexts/teamsContext";

export default function LoginLayout() {
  const { userData } = useContext(UserDataContext);
  const [allTeams, setAllTeams] = useState({});
  // const [firstLoad, isFirstLoad] = useState(false);
  // const navigate = useNavigate();

  const evaluatedTeams = useMemo(() => {
    const d = {};
    Object.keys(allTeams).forEach((teamId) => {
      if (allTeams[teamId].totalscore !== null) {
        d[teamId] = allTeams[teamId];
      }
    });
    return d;
  }, [allTeams]);

  const nonEvaluatedTeams = useMemo(() => {
    const d = {};
    Object.keys(allTeams).forEach((teamId) => {
      if (allTeams[teamId].totalscore === null) {
        d[teamId] = allTeams[teamId];
      }
    });
    // if (!firstLoad) {
    //   isFirstLoad(false);
    //   navigate(`/teams/${Object.keys(d)[0]}`);
    // }
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
        evaluatedTeams,
        nonEvaluatedTeams,
        refetch: () => getTeamsData({ variables: { _userID: userData.id } }),
      }}
    >
      <Outlet />
    </TeamsContext.Provider>
  );
}
