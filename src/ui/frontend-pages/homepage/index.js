import { Box } from '@mui/material';
import HpHeader from '../shared/header/HpHeader';
import Banner from './banner/Banner';
import Features from './features/Features';
import ExceptionalFeature from './exceptional-feature';
import PowerfulDozens from './powerful-dozens';
import FAQ from './faq';
import Reviews from '../shared/reviews';
import Pricing from '../shared/pricing';
import C2a from '../shared/c2a';
import Footer from '../shared/footer';
import ScrollToTop from '../shared/scroll-to-top';

const Homepage = () => {
  return (
    <Box>
      <HpHeader />
      <Banner />
      <Features />
      <ExceptionalFeature />
      <PowerfulDozens />
      <Reviews />
      <Pricing />
      <FAQ />
      <C2a />
      <Footer />
      <ScrollToTop />
    </Box>
  );
};

export default Homepage;
