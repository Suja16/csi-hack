import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import UserDataContext from "../contexts/userDataContext";
import idea from "../assets/idea.png";

function Header() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setUserData(null);
    navigate("/login");
  };
  return (
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
  );
}

export default Header;
