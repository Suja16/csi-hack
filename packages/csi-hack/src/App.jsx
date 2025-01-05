import { Box } from "@mui/material";
import About from "./components/About";
import ProblemStatements from "./components/ProblemStatements";

function App() {
  return (
    <Box sx={{overflowX:"hidden"}} bgcolor={"#2846AA"} position={"absolute"} height={"100vh"} width={"100vw"} top={0} left={0} right={0} bottom={0}>
      <About/>
      <ProblemStatements />
    </Box>
  );
}

export default App;