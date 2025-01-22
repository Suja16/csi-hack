import { useContext, useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { TEAMS_QUERY } from "../queries";
import UserDataContext from "../contexts/userDataContext";
import TeamsContext from "../contexts/teamsContext";

export default function LoginLayout() {
  console.log("INSIDE LOGIN LAYOUT");
  const { userData } = useContext(UserDataContext);
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [getTeamsData, { loading }] = useLazyQuery(TEAMS_QUERY, {
    onCompleted: (data) => {
      console.log(data);
      const formattedData = data.feedbacks.map((feedback) => ({
        id: feedback.team_info_from_eventio.id,
        name: feedback.team_info_from_eventio.name,
        ppt: feedback.team_info_from_eventio.submissions.ppt,
        youtube: feedback.team_info_from_eventio.submissions.video,
      }));
      setTeams(formattedData);
      setSelectedTeam(formattedData[0]);
    },
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  useEffect(() => {
    console.log(userData);
    if (userData) {
      getTeamsData({ variables: { _userID: userData.id } });
    }
  }, [userData, getTeamsData]);

  useEffect(() => {
    console.log(teams);
  }, [teams]);

  if (!userData) {
    return <Navigate to="/login" />;
  }
  return (
    <TeamsContext.Provider
      value={{
        teams,
        setTeams,
        selectedTeam,
        setSelectedTeam,
      }}
    >
      <Outlet />
    </TeamsContext.Provider>
  );
}
