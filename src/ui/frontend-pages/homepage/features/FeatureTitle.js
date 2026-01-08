import React from 'react';
import { Grid } from '@mui/material';
import { Box, Typography } from '@mui/material';

const FeatureTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid size={{ xs: 12, lg: 6 }} textAlign="center">
        <Typography variant="body1">
          Manage your wedding photography business with{' '}
          <Box fontWeight={500} component="span">
            powerful tools
          </Box>
          , track bookings, and <br />
          collaborate with clients seamlessly!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FeatureTitle;
