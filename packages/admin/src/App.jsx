// import { useQuery } from "@apollo/client";
import "./App.css";
import DashboardLayoutBasic from "./sidebar";
// import { TEAM_QUERY } from "./queries";

function App() {
  // const { loading, error, data } = useQuery(TEAM_QUERY);
  // console.log(data);
  return (
    <div>
      {/* <h1>Team</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      <DashboardLayoutBasic />
    </div>
  );
}

export default App;
