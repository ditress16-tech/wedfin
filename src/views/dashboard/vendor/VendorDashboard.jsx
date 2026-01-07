import React from 'react';
import { Box, Grid, Typography, Alert } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';
import DashboardCard from '../../../ui/shared/DashboardCard';
import VendorStats from '../../../components/vendor/shared/VendorStats';
import VendorProjects from '../../../components/vendor/shared/VendorProjects';
import VendorCalendar from '../../../components/vendor/shared/VendorCalendar';
import VendorNotifications from '../../../components/vendor/shared/VendorNotifications';

const VendorDashboard = () => {
  const { user, getVendorCategory } = useAuth();
  const { vendorData, loading } = useVendor();
  const category = getVendorCategory();

  if (loading) {
    return (
      <PageContainer title="Vendor Dashboard" description="Loading vendor dashboard...">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </PageContainer>
    );
  }

  if (!vendorData) {
    return (
      <PageContainer title="Vendor Dashboard" description="Vendor dashboard">
        <Alert severity="error">
          Unable to load vendor data. Please try again later.
        </Alert>
      </PageContainer>
    );
  }

  const getCategoryTitle = () => {
    const titles = {
      photography: 'Photography Dashboard',
      makeup: 'Makeup Artist Dashboard',
      catering: 'Catering Dashboard',
      venue: 'Venue Dashboard'
    };
    return titles[category] || 'Vendor Dashboard';
  };

  const getCategoryDescription = () => {
    const descriptions = {
      photography: 'Manage your photography projects, bookings, and client galleries',
      makeup: 'Track makeup appointments, product inventory, and client portfolios',
      catering: 'Oversee catering orders, menu planning, and event coordination',
      venue: 'Monitor venue bookings, setup requirements, and facility management'
    };
    return descriptions[category] || 'Manage your vendor business operations';
  };

  return (
    <PageContainer 
      title={getCategoryTitle()} 
      description={getCategoryDescription()}
    >
      <Box>
        {/* Welcome Section */}
        <Box mb={3}>
          <Typography variant="h4" gutterBottom>
            Welcome back, {vendorData.businessName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {getCategoryDescription()}
          </Typography>
        </Box>

        {/* Main Dashboard Grid */}
        <Grid container spacing={3}>
          {/* Stats Overview */}
          <Grid item xs={12}>
            <VendorStats />
          </Grid>

          {/* Projects and Calendar */}
          <Grid item xs={12} md={8}>
            <VendorProjects />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <VendorCalendar />
          </Grid>

          {/* Notifications */}
          <Grid item xs={12}>
            <VendorNotifications />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default VendorDashboard;