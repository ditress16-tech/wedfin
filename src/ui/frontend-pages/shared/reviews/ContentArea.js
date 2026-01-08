import React from 'react';
import { Typography } from '@mui/material';

import LogoIcon from 'src/assets/images/logos/logoIcon.svg';

const ContentArea = () => {
  return (
    <>
      <Typography
        variant="h4"
        lineHeight={1.4}
        mb={3}
        fontWeight={700}
        sx={{
          fontSize: {
            lg: '40px',
            xs: '35px',
          },
          mr: {
            xs: 0,
            lg: 4,
          },
        }}
      >
        What wedding vendors{' '}
        <img
          src={LogoIcon}
          alt="logo"
          width={40}
          height={40}
          style={{ margin: '0 8px', verticalAlign: 'middle' }}
        />{' '}
        say about us?
      </Typography>
      <Typography variant="body1" lineHeight={1.8}>
        Wedding photographers, makeup artists, and other vendors love our platform. 
        Read what they have to say about managing their business with our dashboard.
      </Typography>
    </>
  );
};

export default ContentArea;
