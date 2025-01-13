import { useQuery } from "@apollo/client";
import "./App.css";
import { TEAM_QUERY } from "./queries";

function App() {
  const { loading, error, data } = useQuery(TEAM_QUERY);
  console.log(data);
  return (
    <>
      <h1>Team</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

export default App;
