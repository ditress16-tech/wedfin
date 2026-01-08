import React, { useState } from 'react';
import { Button, Stack, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router';

import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';

const AuthForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // In demo mode, just show success message
    setSuccess('Password reset link has been sent to your email!');
    setTimeout(() => {
      navigate('/auth/login');
    }, 2000);
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="reset-email">Email Address</CustomFormLabel>
          <CustomTextField 
            id="reset-email" 
            variant="outlined" 
            fullWidth 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <Button 
            color="primary" 
            variant="contained" 
            size="large" 
            fullWidth 
            type="submit"
          >
            Send Reset Link
          </Button>
          <Button 
            color="primary" 
            size="large" 
            fullWidth 
            component={Link} 
            to="/auth/login"
          >
            Back to Login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AuthForgotPassword;
