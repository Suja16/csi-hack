import { useLazyQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2, width: '300px' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, width: '300px' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ width: '300px' }}>
          Login
        </Button>
      </form>
      {message && <p>{message}</p>}
    </Box>
  );
}

export default Login;