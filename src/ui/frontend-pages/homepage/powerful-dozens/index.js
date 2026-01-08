import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Grid } from '@mui/material';
import DozensCarousel from './DozensCarousel';

const features = [
  {
    title: 'Project Management',
    subtext:
      'Manage all your wedding projects in one place. Track progress, deadlines, and deliverables with ease.',
  },
  {
    title: 'Client Management',
    subtext:
      'Keep track of all your clients and leads. Manage communications, contracts, and payments efficiently.',
  },
  {
    title: 'Analytics & Reports',
    subtext:
      'Get insights into your business performance. Track bookings, revenue, and client satisfaction metrics.',
  },
];

const PowerfulDozens = () => {
  return (
    <>
      <Container
        sx={{
          maxWidth: '1400px !important',
          mt: {
            xs: '40px',
            lg: '90px',
          },
        }}
      >
        <Box
          bgcolor="primary.light"
          borderRadius="24px"
          sx={{
            py: {
              xs: '40px',
              lg: '70px',
            },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, lg: 6, sm: 9 }}>
                <Typography
                  variant="h4"
                  mb="55px"
                  fontWeight={700}
                  fontSize="40px"
                  lineHeight="1.3"
                  sx={{
                    fontSize: {
                      lg: '40px',
                      xs: '35px',
                    },
                  }}
                >
                  Everything You Need to Manage Your Wedding Business
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <DozensCarousel />
          <Container maxWidth="lg">
            <Grid container spacing={3} mt={5}>
              {features.map((feature, i) => (
                <Grid size={{ xs: 12, lg: 4, sm: 4 }} textAlign="center" key={i}>
                  <Typography
                    variant="h4"
                    mb="16px"
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        xs: '17px',
                      },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" lineHeight="28px">
                    {feature.subtext}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default PowerfulDozens;
