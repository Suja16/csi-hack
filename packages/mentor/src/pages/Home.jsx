import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router";
import UserDataContext from "../contexts/userDataContext";
import idea from "../assets/idea.png";

function AllDone() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setUserData(null);
    navigate("/login");
  };

  const handleScan = (result) => {
    console.log(result);
    navigate("/feedback/" + result[0].rawValue);
  };

  return (
    <Box padding={2}>
      <Box display="flex">
        <img src={idea} alt="idea" style={{ width: "50%", height: "auto" }} />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Typography variant="h5" align="center" marginY={1}>
        Welcome, Mentor!
      </Typography>
      <Box marginY={2}>
        <Scanner onScan={handleScan} />
      </Box>
      <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
        Scan a QR code to get started
      </Typography>
    </Box>
  );
}

export default AllDone;
