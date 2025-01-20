import { useLazyQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_QUERY } from '../queries';

function Login({ setIsAuthenticated }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [login, { data, loading, error }] = useLazyQuery(LOGIN_QUERY, {
    variables: { name, password },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      setMessage('Please enter both name and password');
      return;
    }

    try {
      await login();
      if (loading) {
        console.log('Loading...');
        return;
      }
      console.log(data.Idea_USERS[0].email)
      if (error) {
        console.error('Query error:', error);
        setMessage('An error occurred during login.');
        return;
      }

      if (data.Idea_USERS[0].roles === "admin") {
        setMessage('Access granted');
        setIsAuthenticated(true); // Update the state in AppRouter
        navigate('/allteams');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      backgroundColor: '#f5f5f5',
      overflow: 'hidden', // Disable scrollbar
    }}
  >
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      {message && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Paper>
  </Box>
  );
}

export default Login;