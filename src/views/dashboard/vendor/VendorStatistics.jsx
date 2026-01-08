import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const VendorStatistics = () => {
  const { user } = useAuth();
  const { projects, analytics } = useVendor();
  const [tabValue, setTabValue] = useState(0);

  const statisticsData = {
    overview: {
      totalProjects: 156,
      completedProjects: 142,
      activeProjects: 14,
      totalRevenue: 485000,
      averageRating: 4.8,
      clientRetention: 89
    },
    monthly: [
      { month: 'Jan', projects: 12, revenue: 45000, clients: 8, rating: 4.6 },
      { month: 'Feb', projects: 15, revenue: 52000, clients: 11, rating: 4.7 },
      { month: 'Mar', projects: 18, revenue: 61000, clients: 14, rating: 4.8 },
      { month: 'Apr', projects: 14, revenue: 48000, clients: 10, rating: 4.9 },
      { month: 'May', projects: 20, revenue: 68000, clients: 16, rating: 4.8 },
      { month: 'Jun', projects: 22, revenue: 75000, clients: 18, rating: 4.9 }
    ],
    topClients: [
      { name: 'Sarah & John Wedding', projects: 3, revenue: 15000, rating: 5.0 },
      { name: 'Emma & Michael Event', projects: 2, revenue: 12000, rating: 4.9 },
      { name: 'Lisa & David Ceremony', projects: 4, revenue: 18000, rating: 4.8 },
      { name: 'Anna & Robert Wedding', projects: 2, revenue: 9500, rating: 4.7 },
      { name: 'Maria & Carlos Event', projects: 3, revenue: 14500, rating: 4.9 }
    ],
    serviceBreakdown: [
      { service: 'Wedding Photography', count: 45, revenue: 180000, percentage: 37 },
      { service: 'Engagement Shoots', count: 32, revenue: 96000, percentage: 20 },
      { service: 'Event Coverage', count: 28, revenue: 112000, percentage: 23 },
      { service: 'Portrait Sessions', count: 25, revenue: 50000, percentage: 10 },
      { service: 'Commercial Work', count: 26, revenue: 47000, percentage: 10 }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'active': return 'primary';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <PageContainer 
      title="Statistics Dashboard" 
      description="Detailed statistics and data analysis"
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Detailed Statistics
        </Typography>

        {/* Overview Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mx: 'auto', mb: 1 }}>
                  <EventIcon color="primary" />
                </Avatar>
                <Typography variant="h4" color="primary">
                  {statisticsData.overview.totalProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Projects
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.light', mx: 'auto', mb: 1 }}>
                  <TrendingUpIcon color="success" />
                </Avatar>
                <Typography variant="h4" color="success.main">
                  {statisticsData.overview.completedProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.light', mx: 'auto', mb: 1 }}>
                  <AssessmentIcon color="warning" />
                </Avatar>
                <Typography variant="h4" color="warning.main">
                  {statisticsData.overview.activeProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'info.light', mx: 'auto', mb: 1 }}>
                  <MoneyIcon color="info" />
                </Avatar>
                <Typography variant="h4" color="info.main">
                  ${(statisticsData.overview.totalRevenue / 1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'secondary.light', mx: 'auto', mb: 1 }}>
                  <StarIcon color="secondary" />
                </Avatar>
                <Typography variant="h4" color="secondary.main">
                  {statisticsData.overview.averageRating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Rating
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'error.light', mx: 'auto', mb: 1 }}>
                  <PeopleIcon color="error" />
                </Avatar>
                <Typography variant="h4" color="error.main">
                  {statisticsData.overview.clientRetention}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Client Retention
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Detailed Statistics Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Monthly Trends" />
              <Tab label="Top Clients" />
              <Tab label="Service Breakdown" />
            </Tabs>
          </Box>

          <CardContent>
            {/* Monthly Trends Tab */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Monthly Performance Trends
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Projects</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">New Clients</TableCell>
                        <TableCell align="right">Avg Rating</TableCell>
                        <TableCell align="right">Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {statisticsData.monthly.map((row, index) => {
                        const prevRevenue = index > 0 ? statisticsData.monthly[index - 1].revenue : row.revenue;
                        const growth = ((row.revenue - prevRevenue) / prevRevenue * 100).toFixed(1);
                        
                        return (
                          <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell align="right">{row.projects}</TableCell>
                            <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                            <TableCell align="right">{row.clients}</TableCell>
                            <TableCell align="right">
                              <Box display="flex" alignItems="center" justifyContent="flex-end">
                                <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                                {row.rating}
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={`${growth > 0 ? '+' : ''}${growth}%`}
                                color={growth > 0 ? 'success' : growth < 0 ? 'error' : 'default'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Top Clients Tab */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Top Performing Clients
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Client Name</TableCell>
                        <TableCell align="right">Projects</TableCell>
                        <TableCell align="right">Total Revenue</TableCell>
                        <TableCell align="right">Avg Revenue</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {statisticsData.topClients.map((client, index) => (
                        <TableRow key={client.name}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                                {client.name.charAt(0)}
                              </Avatar>
                              {client.name}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{client.projects}</TableCell>
                          <TableCell align="right">${client.revenue.toLocaleString()}</TableCell>
                          <TableCell align="right">${(client.revenue / client.projects).toLocaleString()}</TableCell>
                          <TableCell align="right">
                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                              <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                              {client.rating}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={index < 3 ? 'VIP' : 'Regular'}
                              color={index < 3 ? 'primary' : 'default'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Service Breakdown Tab */}
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Service Performance Breakdown
                </Typography>
                <Grid container spacing={3}>
                  {statisticsData.serviceBreakdown.map((service, index) => (
                    <Grid item xs={12} key={service.service}>
                      <Paper sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle1">{service.service}</Typography>
                          <Typography variant="h6" color="primary">
                            ${service.revenue.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            {service.count} projects completed
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.percentage}% of total revenue
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={service.percentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default VendorStatistics;