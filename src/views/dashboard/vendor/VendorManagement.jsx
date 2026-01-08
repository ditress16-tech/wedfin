import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const VendorManagement = () => {
  const { user } = useAuth();
  const { vendorData } = useVendor();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: 'Elite Wedding Photography',
    ownerName: 'John Smith',
    email: 'john@elitewedding.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    website: 'www.elitewedding.com',
    description: 'Professional wedding photographer with 10+ years of experience capturing beautiful moments.',
    specialties: ['Wedding Photography', 'Engagement Shoots', 'Portrait Sessions'],
    serviceArea: ['New York', 'New Jersey', 'Connecticut'],
    pricing: {
      basePackage: 2500,
      premiumPackage: 4500,
      luxuryPackage: 7500
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const vendorStats = {
    totalProjects: 156,
    rating: 4.8,
    reviews: 89,
    yearsActive: 10,
    verified: true,
    responseTime: '2 hours',
    completionRate: 98
  };

  return (
    <PageContainer 
      title="Vendor Management" 
      description="Manage your vendor profile and business settings"
    >
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Vendor Profile Management</Typography>
          <Button
            variant={isEditing ? "contained" : "outlined"}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Overview */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                >
                  {profileData.businessName.charAt(0)}
                </Avatar>
                
                <Typography variant="h5" gutterBottom>
                  {profileData.businessName}
                </Typography>
                
                <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                  <StarIcon sx={{ color: 'warning.main', mr: 0.5 }} />
                  <Typography variant="h6" color="warning.main">
                    {vendorStats.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({vendorStats.reviews} reviews)
                  </Typography>
                </Box>

                {vendorStats.verified && (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified Vendor"
                    color="success"
                    sx={{ mb: 2 }}
                  />
                )}

                <Typography variant="body2" color="text.secondary" paragraph>
                  {profileData.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Quick Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="primary">
                      {vendorStats.totalProjects}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Projects
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4" color="success.main">
                      {vendorStats.yearsActive}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Years Active
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Metrics
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Response Time"
                      secondary={vendorStats.responseTime}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Completion Rate"
                      secondary={`${vendorStats.completionRate}%`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Client Satisfaction"
                      secondary={`${vendorStats.rating}/5.0`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Card>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Business Info" />
                  <Tab label="Services & Pricing" />
                  <Tab label="Availability" />
                  <Tab label="Settings" />
                </Tabs>
              </Box>

              <CardContent>
                {/* Business Info Tab */}
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Business Information
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Business Name"
                          value={profileData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Owner Name"
                          value={profileData.ownerName}
                          onChange={(e) => handleInputChange('ownerName', e.target.value)}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Website"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Business Description"
                          value={profileData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Services & Pricing Tab */}
                {tabValue === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Services & Pricing
                    </Typography>
                    
                    <Box mb={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Specialties
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {profileData.specialties.map((specialty, index) => (
                          <Chip
                            key={index}
                            label={specialty}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box mb={3}>
                      <Typography variant="subtitle1" gutterBottom>
                        Service Areas
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {profileData.serviceArea.map((area, index) => (
                          <Chip
                            key={index}
                            label={area}
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    <Typography variant="subtitle1" gutterBottom>
                      Package Pricing
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            Base Package
                          </Typography>
                          <Typography variant="h4" color="primary">
                            ${profileData.pricing.basePackage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Starting price
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="warning.main">
                            Premium Package
                          </Typography>
                          <Typography variant="h4" color="warning.main">
                            ${profileData.pricing.premiumPackage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Most popular
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color="secondary.main">
                            Luxury Package
                          </Typography>
                          <Typography variant="h4" color="secondary.main">
                            ${profileData.pricing.luxuryPackage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Premium service
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Availability Tab */}
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Weekly Availability
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {Object.entries(profileData.availability).map(([day, available]) => (
                        <Grid item xs={12} sm={6} key={day}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={available}
                                onChange={(e) => handleInputChange('availability', {
                                  ...profileData.availability,
                                  [day]: e.target.checked
                                })}
                                disabled={!isEditing}
                              />
                            }
                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Settings Tab */}
                {tabValue === 3 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Account Settings
                    </Typography>
                    
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Notification Preferences"
                          secondary="Manage email and SMS notifications"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <VerifiedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Verification Status"
                          secondary="Your account is verified"
                        />
                        <Chip label="Verified" color="success" size="small" />
                      </ListItem>
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default VendorManagement;