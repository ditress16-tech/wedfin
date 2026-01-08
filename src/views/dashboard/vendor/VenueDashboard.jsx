import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';
import VendorDashboard from './VendorDashboard';
import VenueCalendar from '../../../components/vendor/venue/VenueCalendar';
import SetupRequirements from '../../../components/vendor/venue/SetupRequirements';
import CapacityManagement from '../../../components/vendor/venue/CapacityManagement';
import EventSetup from '../../../components/vendor/venue/EventSetup';

const VenueDashboard = () => {
  const { user } = useAuth();
  const { vendorData, projects } = useVendor();

  return (
    <PageContainer 
      title="Venue Dashboard" 
      description="Manage your venue bookings, setup requirements, and facility operations"
    >
      <Box>
        {/* Base Vendor Dashboard */}
        <VendorDashboard />

        {/* Venue-Specific Components */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Venue Management
          </Typography>
          
          <Grid container spacing={3}>
            {/* Venue Calendar */}
            <Grid item xs={12} md={6}>
              <VenueCalendar />
            </Grid>

            {/* Setup Requirements */}
            <Grid item xs={12} md={6}>
              <SetupRequirements />
            </Grid>

            {/* Capacity Management */}
            <Grid item xs={12} md={8}>
              <CapacityManagement />
            </Grid>

            {/* Event Setup */}
            <Grid item xs={12} md={4}>
              <EventSetup />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default VenueDashboard;