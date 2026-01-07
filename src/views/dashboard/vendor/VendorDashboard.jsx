import { Grid, Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { useVendor } from '../../../context/VendorContext';
import { useAuth } from '../../../context/AuthContext';
import {
  IconCurrencyDollar,
  IconBriefcase,
  IconUsers,
  IconStar,
  IconClock
} from '@tabler/icons-react';
import StatCard from '../../../components/vendor/StatCard';
import ProjectCard from '../../../components/vendor/ProjectCard';
import welcomeBg from '../../../assets/images/backgrounds/welcome-bg2.png';
import profileBg from '../../../assets/images/backgrounds/profilebg.jpg';

const VendorDashboard = () => {
  const { vendorData, projects, analytics } = useVendor();
  const { user, getVendorCategory } = useAuth();
  const vendorCategory = getVendorCategory();

  // Calculate revenue change
  const revenueChange = analytics.previousMonthRevenue > 0 
    ? (((analytics.monthlyRevenue - analytics.previousMonthRevenue) / analytics.previousMonthRevenue) * 100).toFixed(1)
    : 0;

  const stats = [
    {
      title: 'Monthly Revenue',
      value: `$${analytics.monthlyRevenue?.toLocaleString() || 0}`,
      change: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`,
      trend: revenueChange >= 0 ? 'up' : 'down',
      icon: IconCurrencyDollar,
      color: 'success',
      bgColor: 'success.light'
    },
    {
      title: 'Active Projects',
      value: analytics.activeProjects || 0,
      change: '+8.3%',
      trend: 'up',
      icon: IconBriefcase,
      color: 'primary',
      bgColor: 'primary.light'
    },
    {
      title: 'Total Projects',
      value: analytics.totalProjects || 0,
      change: '+12.5%',
      trend: 'up',
      icon: IconUsers,
      color: 'warning',
      bgColor: 'warning.light'
    },
    {
      title: 'Client Rating',
      value: `${analytics.clientSatisfaction || 0}/5.0`,
      change: '+0.3',
      trend: 'up',
      icon: IconStar,
      color: 'info',
      bgColor: 'info.light'
    }
  ];

  const getCategoryLabel = (category) => {
    const labels = {
      photography: 'Photography',
      makeup: 'Makeup Artist',
      catering: 'Catering Service',
      venue: 'Wedding Venue'
    };
    return labels[category] || category;
  };

  return (
    <Box>
      {/* Welcome Banner */}
      <Card
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, rgba(93, 135, 255, 0.9) 0%, rgba(93, 135, 255, 0.7) 100%), url(${welcomeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" fontWeight="700" mb={1}>
                Welcome back, {vendorData?.businessName || user?.name}! 👋
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }} mb={2}>
                {getCategoryLabel(vendorCategory)} Dashboard
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.85 }}>
                {vendorData?.description || 'Manage your business, projects, and clients all in one place.'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  gap: 1,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  p: 3,
                  borderRadius: 3
                }}
              >
                <Typography variant="h2" fontWeight="700">
                  {analytics.activeProjects || 0}
                </Typography>
                <Typography variant="subtitle2">
                  Active Projects
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Projects Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="600">
                  Recent Projects
                </Typography>
                <Chip label={`${projects.length} Total`} color="primary" size="small" />
              </Box>
              
              <Box>
                {projects.slice(0, 5).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats & Info */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              mb: 3,
              background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%), url(${profileBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Business Overview
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4" fontWeight="700">
                    {analytics.bookingConversionRate || 0}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Repeat Clients
                  </Typography>
                  <Typography variant="h4" fontWeight="700">
                    {analytics.repeatClientRate || 0}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Avg Project Value
                  </Typography>
                  <Typography variant="h4" fontWeight="700">
                    ${analytics.averageProjectValue?.toLocaleString() || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="600" mb={2}>
                Upcoming Deadlines
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {projects
                  .filter(p => p.status !== 'completed')
                  .slice(0, 3)
                  .map((project) => (
                    <Box
                      key={project.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'grey.50',
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="600" mb={0.5}>
                        {project.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <IconClock size={14} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(project.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorDashboard;
