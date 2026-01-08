import React, { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  MenuItem
} from '@mui/material';
import {
  IconLock,
  IconBell,
  IconShield,
  IconLanguage,
  IconPalette
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    language: 'en',
    theme: 'light',
    timezone: 'America/New_York'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked !== undefined ? event.target.checked : event.target.value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Changing password');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <PageContainer title="Account Settings" description="Manage account settings">
      <Box>
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard
              title="Security"
              subtitle="Manage your password and security settings"
            >
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <IconLock size={24} />
                <Typography variant="h6">Change Password</Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                />
                <TextField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  helperText="Minimum 8 characters"
                />
                <TextField
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                >
                  Change Password
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <IconShield size={24} />
                <Typography variant="h6">Two-Factor Authentication</Typography>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleSettingChange('twoFactorAuth')}
                  />
                }
                label="Enable two-factor authentication"
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                Add an extra layer of security to your account
              </Typography>
            </DashboardCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard
              title="Notifications"
              subtitle="Manage how you receive notifications"
            >
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <IconBell size={24} />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleSettingChange('emailNotifications')}
                    />
                  }
                  label="Email Notifications"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                  Receive notifications via email
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={handleSettingChange('smsNotifications')}
                    />
                  }
                  label="SMS Notifications"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                  Receive notifications via SMS
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={handleSettingChange('pushNotifications')}
                    />
                  }
                  label="Push Notifications"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                  Receive push notifications in browser
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.marketingEmails}
                      onChange={handleSettingChange('marketingEmails')}
                    />
                  }
                  label="Marketing Emails"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
                  Receive promotional and marketing emails
                </Typography>
              </Box>
            </DashboardCard>
          </Grid>

          <Grid size={12}>
            <DashboardCard
              title="Preferences"
              subtitle="Customize your experience"
            >
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <IconLanguage size={24} />
                    <Typography variant="h6">Language</Typography>
                  </Box>
                  <TextField
                    select
                    fullWidth
                    value={settings.language}
                    onChange={handleSettingChange('language')}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <IconPalette size={24} />
                    <Typography variant="h6">Theme</Typography>
                  </Box>
                  <TextField
                    select
                    fullWidth
                    value={settings.theme}
                    onChange={handleSettingChange('theme')}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="auto">Auto</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Typography variant="h6">Timezone</Typography>
                  </Box>
                  <TextField
                    select
                    fullWidth
                    value={settings.timezone}
                    onChange={handleSettingChange('timezone')}
                  >
                    <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                    <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                    <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                    <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Box mt={3}>
                <Button variant="contained" onClick={handleSaveSettings}>
                  Save Preferences
                </Button>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AccountSettings;
