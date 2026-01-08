import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';
import VendorDashboard from './VendorDashboard';
import ProductInventory from '../../../components/vendor/makeup/ProductInventory';
import PortfolioGallery from '../../../components/vendor/makeup/PortfolioGallery';
import TrialSchedule from '../../../components/vendor/makeup/TrialSchedule';
import MakeupLooks from '../../../components/vendor/makeup/MakeupLooks';

const MakeupDashboard = () => {
  const { user } = useAuth();
  const { vendorData, projects } = useVendor();

  return (
    <PageContainer 
      title="Makeup Artist Dashboard" 
      description="Manage your makeup services, appointments, and client portfolios"
    >
      <Box>
        {/* Base Vendor Dashboard */}
        <VendorDashboard />

        {/* Makeup-Specific Components */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Makeup Artist Management
          </Typography>
          
          <Grid container spacing={3}>
            {/* Product Inventory */}
            <Grid item xs={12} md={6}>
              <ProductInventory />
            </Grid>

            {/* Portfolio Gallery */}
            <Grid item xs={12} md={6}>
              <PortfolioGallery />
            </Grid>

            {/* Trial Schedule */}
            <Grid item xs={12} md={8}>
              <TrialSchedule />
            </Grid>

            {/* Makeup Looks */}
            <Grid item xs={12} md={4}>
              <MakeupLooks />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default MakeupDashboard;