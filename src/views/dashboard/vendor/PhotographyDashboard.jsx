import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';
import VendorDashboard from './VendorDashboard';
import {
  IconCamera,
  IconPhoto,
  IconCalendarEvent,
  IconFileUpload
} from '@tabler/icons-react';
import user1 from '../../../assets/images/profile/user-1.jpg';
import user2 from '../../../assets/images/profile/user-2.jpg';
import user3 from '../../../assets/images/profile/user-3.jpg';

const PhotographyDashboard = () => {
  const { user } = useAuth();
  const { vendorData, projects } = useVendor();

  // Photography specific quick actions
  const quickActions = [
    {
      title: 'New Photoshoot',
      icon: IconCamera,
      color: 'primary',
      count: projects.filter(p => p.status === 'active').length
    },
    {
      title: 'Gallery Management',
      icon: IconPhoto,
      color: 'success',
      count: '500+'
    },
    {
      title: 'Upcoming Sessions',
      icon: IconCalendarEvent,
      color: 'warning',
      count: projects.filter(p => p.status === 'planning').length
    },
    {
      title: 'Photo Delivery',
      icon: IconFileUpload,
      color: 'info',
      count: '3 Pending'
    }
  ];

  // Recent clients with photos
  const recentClients = [
    { name: 'Sarah Johnson', image: user1, project: 'Wedding Photography' },
    { name: 'Maria Garcia', image: user2, project: 'Pre-wedding Session' },
    { name: 'Lisa Chen', image: user3, project: 'Engagement Photos' }
  ];

  return (
    <PageContainer 
      title="Photography Dashboard" 
      description="Manage your photography business, projects, and client galleries"
    >
      <Box>
        {/* Base Vendor Dashboard */}
        <VendorDashboard />

        {/* Photography-Specific Section */}
        <Box mt={4}>
          <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
            Photography Quick Actions
          </Typography>
          
          <Grid container spacing={3}>
            {/* Quick Action Cards */}
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: `${action.color}.light`,
                            width: 50,
                            height: 50
                          }}
                        >
                          <Icon size={24} color={action.color} />
                        </Avatar>
                        <Box>
                          <Typography variant="h4" fontWeight="700">
                            {action.count}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {action.title}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}

            {/* Recent Clients */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Recent Clients
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {recentClients.map((client, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'grey.50',
                          '&:hover': {
                            bgcolor: 'grey.100'
                          }
                        }}
                      >
                        <Avatar
                          src={client.image}
                          sx={{ width: 50, height: 50 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {client.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {client.project}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Equipment Status */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="600" mb={2}>
                    Equipment Status
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'success.light',
                        border: '1px solid',
                        borderColor: 'success.main'
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="600" color="success.dark">
                        All Equipment Ready
                      </Typography>
                      <Typography variant="caption" color="success.dark">
                        Canon EOS R5, Sony A7R IV, Lenses
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'warning.light',
                        border: '1px solid',
                        borderColor: 'warning.main'
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="600" color="warning.dark">
                        Maintenance Due
                      </Typography>
                      <Typography variant="caption" color="warning.dark">
                        Backup Camera - Service in 2 days
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default PhotographyDashboard;