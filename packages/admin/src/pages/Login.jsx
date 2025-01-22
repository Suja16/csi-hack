import { useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_QUERY } from "../queries";
import { failure } from "../utils/snackbar";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
    variables: { email, password },
    onCompleted: (data) => {
      console.log("Query completed:", data);
      if (data.Idea_USERS[0].roles === "admin") {
        setIsAuthenticated(true); // Update the state in AppRouter
        navigate("/allteams");
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
        justifyContent: "center",
        alignItems: "center",
        paddingY: 4,
        overflow: "hidden",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
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
      </Paper>
    </Box>
  );
}

export default Login;
