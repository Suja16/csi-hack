import { Box, Button } from "@mui/material";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box sx={{overflowX:"hidden"}} bgcolor={"#2846AA"} position={"absolute"} height={"100vh"} width={"100vw"} top={0} left={0} right={0} bottom={0}>
      <Navbar/>
      <HomePage />
    </Box>
  );
}

export default App;
