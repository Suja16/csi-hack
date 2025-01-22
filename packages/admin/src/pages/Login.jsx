import { useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_QUERY } from "../queries";
import { failure } from "../utils/snackbar";
import UserDataContext from "../contexts/userDataContext";
import ideaLogo from "../assets/idea.png";
import csiKJSCE from "../assets/csiKJSCE.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserDataContext);

  const navigate = useNavigate();

  const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
    variables: { email, password },
    onCompleted: (data) => {
      console.log("Query completed:", data);
      if (!data.Idea_USERS[0]) {
        failure("Invalid credentials");
        return;
      }
      if (data.Idea_USERS[0].roles === "admin") {
        setUserData(data.Idea_USERS[0]);
        navigate("/");
      } else {
        failure("Invalid credentials");
      }
    },
    onError: (error) => {
      console.error("Query error:", error);
      failure("An error occurred during login.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      failure("Please enter both name and password");
      return;
    }
    login();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        height: "90vh",
      }}
    >
      <Box
        position="fixed"
        top={0}
        left="50%"
        sx={{
          transform: "translateX(-50%)",
        }}
        display="flex"
        justifyContent="center"
        gap={2}
        marginTop={4}
      >
        <img src={ideaLogo} alt="iDEA Logo" height="100" />
        <img src={csiKJSCE} alt="CSI KJSCE" height="100" />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login as Evaluator
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading}
          sx={{ mt: 2 }}
        >
          Login
        </LoadingButton>
      </form>
    </Box>
  );
}

export default Login;
