import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Divider,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  IconCamera,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconCalendar,
  IconEdit,
  IconCheck,
  IconX,
  IconStar
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';

const UserProfile = () => {
  const { getVendorCategory } = useAuth();
  const { vendorData } = useVendor();
  const vendorCategory = getVendorCategory();

  // Profile data by category
  const profileDataByCategory = {
    photography: {
      name: 'Eternal Moments Photography',
      email: 'contact@eternalmoments.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Professional wedding photographer with 10+ years of experience. Specializing in candid moments and natural lighting.',
      website: 'www.eternalmoments.com',
      experience: '10+ years',
      specialization: 'Wedding Photography',
      rating: 4.8,
      completedProjects: 245
    },
    makeup: {
      name: 'Glamour Beauty Studio',
      email: 'contact@glamourbeauty.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      bio: 'Bridal makeup specialist with 10+ years experience. Expert in traditional and modern makeup styles.',
      website: 'www.glamourbeauty.com',
      experience: '10+ years',
      specialization: 'Bridal Makeup',
      rating: 4.9,
      completedProjects: 180
    },
    catering: {
      name: 'Royal Feast Catering',
      email: 'contact@royalfeast.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      bio: 'Premium catering service for weddings and events. Specializing in international fusion cuisine.',
      website: 'www.royalfeast.com',
      experience: '15+ years',
      specialization: 'Wedding Catering',
      rating: 4.7,
      completedProjects: 150
    },
    venue: {
      name: 'Paradise Garden Venue',
      email: 'contact@paradisegarden.com',
      phone: '+1 (555) 456-7890',
      location: 'Miami, FL',
      bio: 'Beautiful outdoor and indoor wedding venue with stunning garden views and modern facilities.',
      website: 'www.paradisegarden.com',
      experience: '12+ years',
      specialization: 'Wedding Venue',
      rating: 4.6,
      completedProjects: 120
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Load profile data based on vendor category
    if (vendorCategory && profileDataByCategory[vendorCategory]) {
      const data = profileDataByCategory[vendorCategory];
      setProfileData(data);
      setEditData(data);
    }
  }, [vendorCategory]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const stats = [
    { label: 'Projects Completed', value: profileData.completedProjects || 0 },
    { label: 'Client Rating', value: `${profileData.rating || 0}/5.0` },
    { label: 'Years Experience', value: profileData.experience || 'N/A' },
    { label: 'Active Clients', value: vendorData?.activeProjects || '0' }
  ];

  const achievements = [
    { title: 'Top Rated Vendor', year: '2024' },
    { title: 'Best Wedding Photographer', year: '2023' },
    { title: '100+ Happy Clients', year: '2023' },
    { title: 'Featured in Wedding Magazine', year: '2022' }
  ];

  return (
    <PageContainer title="User Profile" description="Manage your profile">
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box position="relative" display="inline-block" mb={2}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: 'primary.main',
                      fontSize: '3rem'
                    }}
                  >
                    {profileData.name.charAt(0)}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                    size="small"
                  >
                    <IconCamera size={18} />
                  </IconButton>
                </Box>

                <Typography variant="h5" fontWeight="600" mb={1}>
                  {profileData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {profileData.specialization}
                </Typography>

                <Box display="flex" justifyContent="center" gap={1} mb={3}>
                  <Chip
                    icon={<IconStar size={16} />}
                    label={`${profileData.rating} Rating`}
                    color="warning"
                    size="small"
                  />
                  <Chip
                    label="Verified"
                    color="success"
                    size="small"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <IconMail size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={profileData.email}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <IconPhone size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={profileData.phone}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <IconMapPin size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={profileData.location}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <IconBriefcase size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={profileData.experience}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Achievements
                </Typography>
                <List dense>
                  {achievements.map((achievement, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <IconStar size={20} color="orange" />
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement.title}
                        secondary={achievement.year}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3} mb={3}>
              {stats.map((stat, index) => (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h4" fontWeight="700" mb={0.5}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <DashboardCard
              title="Profile Information"
              action={
                !isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<IconEdit size={18} />}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      startIcon={<IconX size={18} />}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<IconCheck size={18} />}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Box>
                )
              }
            >
              <Box>
                <Grid container spacing={3}>
                  <Grid size={12}>
                    <TextField
                      label="Business Name"
                      name="name"
                      value={isEditing ? editData.name : profileData.name}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={isEditing ? editData.email : profileData.email}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={isEditing ? editData.phone : profileData.phone}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Location"
                      name="location"
                      value={isEditing ? editData.location : profileData.location}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Website"
                      name="website"
                      value={isEditing ? editData.website : profileData.website}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Specialization"
                      name="specialization"
                      value={isEditing ? editData.specialization : profileData.specialization}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Experience"
                      name="experience"
                      value={isEditing ? editData.experience : profileData.experience}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      label="Bio"
                      name="bio"
                      value={isEditing ? editData.bio : profileData.bio}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default UserProfile;
