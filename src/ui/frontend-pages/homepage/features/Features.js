import React from 'react';
import { Box, Stack, Typography, Container } from '@mui/material';
import FeatureTitle from './FeatureTitle';
import { Grid } from '@mui/material';

import icon1 from 'src/assets/images/svgs/icon-briefcase.svg';
import FeatureApp from 'src/assets/images/frontend-pages/homepage/feature-apps.png';
import LogoIcon from 'src/assets/images/logos/logoIcon.svg';
import Screen1 from 'src/assets/images/frontend-pages/homepage/screen1.png';
import IconBubble from 'src/assets/images/svgs/icon-speech-bubble.svg';
import IconFav from 'src/assets/images/svgs/icon-favorites.svg';

const Features = () => {
  return (
    <Box pt={10} pb={10}>
      <Container maxWidth="lg">
        <FeatureTitle />

        <Grid container spacing={3} mt={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 'grow' }}>
            <Box mb={3} bgcolor="warning.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <img src={icon1} alt="icon1" width={40} height={40} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Light & Dark Themes
                  </Typography>
                  <Typography variant="body1">
                    Choose your preferred visual style for your dashboard.
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box textAlign="center" mb={3} bgcolor="secondary.light" borderRadius="24px">
              <Box px={4} py="50px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Typography variant="h6" fontWeight={700}>
                    Multi-Vendor Management
                  </Typography>
                  <Typography variant="body1">
                    {' '}
                    Manage photography, makeup, catering, and venue vendors.
                  </Typography>
                </Stack>
              </Box>
              <Box height="70px">
                <img src={FeatureApp} alt="icon1" width={250} height={70} />
              </Box>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, lg: 5 }}
            sx={{
              order: {
                xs: 3,
                lg: 2,
              },
            }}
          >
            <Box textAlign="center" mb={3} bgcolor="primary.light" borderRadius="24px">
              <Box pt="65px" pb="40px" px={5}>
                <img src={LogoIcon} alt="logo" height="50" width="50" />
                <Typography
                  variant="h2"
                  fontWeight="700"
                  mt={4}
                  sx={{
                    fontSize: {
                      lg: '40px',
                      xs: '35px',
                    },
                  }}
                >
                  Wedding Dashboard
                </Typography>
                <Typography variant="body1" mt={2}>
                  Complete solution for wedding vendors:{' '}
                  <Typography component="span" fontWeight={600}>
                    Bookings, Projects, Analytics & More.
                  </Typography>
                </Typography>
                <Box mt={5} mb={2}>
                  <img
                    src={Screen1}
                    alt="icon1"
                    width={405}
                    height={245}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6, lg: 'grow' }}
            sx={{
              order: {
                xs: 2,
                lg: 3,
              },
            }}
          >
            <Box textAlign="center" mb={3} bgcolor="success.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <img src={IconBubble} alt="icon1" width={40} height={40} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Real-time Updates
                  </Typography>
                  <Typography variant="body1">
                    {' '}
                    Stay updated with real-time booking and project changes.
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box textAlign="center" mb={3} bgcolor="error.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <img src={IconFav} alt="icon1" width={40} height={40} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Calendar & Booking
                  </Typography>
                  <Typography variant="body1">
                    {' '}
                    Manage your schedule and bookings efficiently.
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
