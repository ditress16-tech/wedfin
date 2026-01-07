import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';
import VendorDashboard from './VendorDashboard';
import MenuPlanning from '../../../components/vendor/catering/MenuPlanning';
import CostCalculation from '../../../components/vendor/catering/CostCalculation';
import TastingSchedule from '../../../components/vendor/catering/TastingSchedule';
import EventCoordination from '../../../components/vendor/catering/EventCoordination';

const CateringDashboard = () => {
  const { user } = useAuth();
  const { vendorData, projects } = useVendor();

  return (
    <PageContainer 
      title="Catering Dashboard" 
      description="Manage your catering services, menu planning, and event coordination"
    >
      <Box>
        {/* Base Vendor Dashboard */}
        <VendorDashboard />

        {/* Catering-Specific Components */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Catering Management
          </Typography>
          
          <Grid container spacing={3}>
            {/* Menu Planning */}
            <Grid item xs={12} md={6}>
              <MenuPlanning />
            </Grid>

            {/* Cost Calculation */}
            <Grid item xs={12} md={6}>
              <CostCalculation />
            </Grid>

            {/* Tasting Schedule */}
            <Grid item xs={12} md={8}>
              <TastingSchedule />
            </Grid>

            {/* Event Coordination */}
            <Grid item xs={12} md={4}>
              <EventCoordination />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default CateringDashboard;