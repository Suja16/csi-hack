import { useState, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { LOGIN_QUERY } from "../queries";
import { failure } from "../utils/snackbar";
import UserDataContext from "../contexts/userDataContext";
import ideaLogo from "../assets/idea.png";
import csiKJSCE from "../assets/csiKJSCE.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
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
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      failure("Please enter both email and password");
      return;
    }
    login({ variables: { email, password } });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img
            src={ideaLogo || "/placeholder.svg"}
            alt="iDEA Logo"
            height="60"
            style={{ marginRight: "16px" }}
          />
          <img
            src={csiKJSCE || "/placeholder.svg"}
            alt="CSI KJSCE"
            height="60"
          />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 3 }}
        >
          Login as Admin
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="password"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>
        </form>
        {/* <Link href="#" variant="body2" sx={{ mt: 2 }}> */}
        {/*   Forgot password? */}
        {/* </Link> */}
        <Divider sx={{ width: "100%", mt: 3, mb: 2 }} />
        {/* <Typography variant="body2" color="text.secondary" align="center"> */}
        {/*   &copy; {new Date().getFullYear()} iDEA KJSCE. All rights reserved. */}
        {/* </Typography> */}
      </Paper>
    </Box>
  );
}

export default Login;
