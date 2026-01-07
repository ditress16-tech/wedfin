import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';
import VendorDashboard from './VendorDashboard';
import GalleryManagement from '../../../components/vendor/photography/GalleryManagement';
import EquipmentTracking from '../../../components/vendor/photography/EquipmentTracking';
import ShootingSchedule from '../../../components/vendor/photography/ShootingSchedule';
import PhotoDelivery from '../../../components/vendor/photography/PhotoDelivery';

const PhotographyDashboard = () => {
  const { user } = useAuth();
  const { vendorData, projects } = useVendor();

  return (
    <PageContainer 
      title="Photography Dashboard" 
      description="Manage your photography business, projects, and client galleries"
    >
      <Box>
        {/* Base Vendor Dashboard */}
        <VendorDashboard />

        {/* Photography-Specific Components */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Photography Management
          </Typography>
          
          <Grid container spacing={3}>
            {/* Gallery Management */}
            <Grid item xs={12} md={6}>
              <GalleryManagement />
            </Grid>

            {/* Equipment Tracking */}
            <Grid item xs={12} md={6}>
              <EquipmentTracking />
            </Grid>

            {/* Shooting Schedule */}
            <Grid item xs={12} md={8}>
              <ShootingSchedule />
            </Grid>

            {/* Photo Delivery */}
            <Grid item xs={12} md={4}>
              <PhotoDelivery />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default PhotographyDashboard;