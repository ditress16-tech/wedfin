import React, { useState } from 'react';
import { Box, Typography, Button, Divider, FormControl, Select, MenuItem, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router';

import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'vendor_photography'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userTypes = [
    { value: 'wedding_planner', label: 'Wedding Planner' },
    { value: 'vendor_photography', label: 'Photography Vendor' },
    { value: 'vendor_makeup', label: 'Makeup Artist' },
    { value: 'vendor_catering', label: 'Catering Service' },
    { value: 'vendor_venue', label: 'Wedding Venue' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id || e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // In demo mode, just show success and redirect
    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/auth/login');
    }, 1500);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

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
        <Box>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="userType">User Type</CustomFormLabel>
            <FormControl fullWidth>
              <Select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                variant="outlined"
              >
                {userTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <CustomTextField 
              id="name" 
              variant="outlined" 
              fullWidth 
              value={formData.name}
              onChange={handleChange}
              required
            />
            <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
            <CustomTextField 
              id="email" 
              variant="outlined" 
              fullWidth 
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField 
              id="password" 
              variant="outlined" 
              fullWidth 
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
            />
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
