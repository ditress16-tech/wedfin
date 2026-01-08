import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router';

import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';

import AuthSocialButtons from './AuthSocialButtons';
import { useAuth } from 'src/context/AuthContext';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState('vendor_photography');
  const [email, setEmail] = useState('photo@vendor.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);

  const userTypes = [
    { value: 'wedding_planner', label: 'Wedding Planner', email: 'planner@wedding.com' },
    { value: 'vendor_photography', label: 'Photography Vendor', email: 'photo@vendor.com' },
    { value: 'vendor_makeup', label: 'Makeup Artist', email: 'makeup@vendor.com' },
    { value: 'vendor_catering', label: 'Catering Service', email: 'catering@vendor.com' },
    { value: 'vendor_venue', label: 'Wedding Venue', email: 'venue@vendor.com' }
  ];

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    const selectedUser = userTypes.find(u => u.value === selectedType);
    if (selectedUser) {
      setEmail(selectedUser.email);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const success = login(userType);
    if (success) {
      if (userType === 'wedding_planner') {
        navigate('/dashboards/vendor/photography');
      } else if (userType === 'vendor_photography') {
        navigate('/dashboards/vendor/photography');
      } else if (userType === 'vendor_makeup') {
        navigate('/dashboards/vendor/makeup');
      } else if (userType === 'vendor_catering') {
        navigate('/dashboards/vendor/catering');
      } else if (userType === 'vendor_venue') {
        navigate('/dashboards/vendor/venue');
      }
    } else {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
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
            or sign in with
          </Typography>
        </Divider>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack mt={2}>
          <Box mb={2}>
            <CustomFormLabel htmlFor="userType">User Type</CustomFormLabel>
            <FormControl fullWidth>
              <Select
                id="userType"
                value={userType}
                onChange={handleUserTypeChange}
                variant="outlined"
              >
                {userTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
            <CustomTextField 
              id="username" 
              variant="outlined" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField 
              id="password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              required
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomCheckbox 
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                  />
                }
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>

      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Demo Mode: Select user type and use any password to login
        </Typography>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthLogin;
