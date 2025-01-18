import { Suspense } from "react";
import DataGridDemo from "../components/TeamTableDatagrid";

const AllTeams = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <DataGridDemo />
      </Suspense>
    </>
  );
};

export default AllTeams;
