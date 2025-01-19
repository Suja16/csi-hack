import { Suspense } from "react";
import TeamDetails from "../components/TeamDetailsEvaluator";

const AllTeams = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        {/* <DataGridDemo /> */}
        <TeamDetails/>
      </Suspense>
    </>
  );
};

export default AllTeams;
