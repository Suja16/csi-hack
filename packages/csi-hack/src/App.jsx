import { Box, Button } from "@mui/material";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import BottomBar from "./components/bottom_bar";
function App() {
  return (
    <Box
      sx={{ overflowX: "hidden", scrollbarWidth: "none" }}
      bgcolor={"#2846AA"}
      position={"absolute"}
      height={"100vh"}
      width={"100vw"}
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      <Navbar />
      <Box position={"relative"} marginTop={15} height={"100vh"} maxHeight={"800px"} >
        <HomePage />
      </Box>
      <BottomBar />
    </Box>
  );
}

export default App;
