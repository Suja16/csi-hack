import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router";
import UserDataContext from "../contexts/userDataContext";

import Header from "../components/Header";

function AllDone() {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);

  const handleScan = (result) => {
    console.log(result);
    navigate("/feedback/" + result[0].rawValue);
  };

  return (
    <Box padding={2}>
      <Header />
      <Typography variant="h6" align="center" marginY={2}>
        Welcome, {userData.name}
      </Typography>
      <Box marginY={2}>
        <Scanner onScan={handleScan} />
      </Box>
      <Typography variant="h5" align="center" style={{ marginTop: "20px" }}>
        Scan a QR code to get started
      </Typography>
    </Box>
  );
}

export default AllDone;
