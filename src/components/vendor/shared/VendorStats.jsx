import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon, 
  TrendingDown as TrendingDownIcon, 
  People as PeopleIcon, 
  CalendarToday as CalendarIcon, 
  AttachMoney as MoneyIcon, 
  Star as StarIcon 
} from '@mui/icons-material';
import { useVendor } from '../../../context/VendorContext';
import { useAuth } from '../../../context/AuthContext';

const VendorStats = () => {
  const { analytics, vendorData } = useVendor();
  const { getVendorCategory } = useAuth();
  const category = getVendorCategory();

  const statsData = [
    {
      title: 'Monthly Revenue',
      value: `$${analytics.monthlyRevenue?.toLocaleString() || '0'}`,
      change: analytics.monthlyRevenue > analytics.previousMonthRevenue ? '+12.5%' : '-5.2%',
      trend: analytics.monthlyRevenue > analytics.previousMonthRevenue ? 'up' : 'down',
      icon: MoneyIcon,
      color: 'primary'
    },
    {
      title: 'Active Projects',
      value: analytics.activeProjects || '0',
      change: '+3',
      trend: 'up',
      icon: CalendarIcon,
      color: 'success'
    },
    {
      title: 'Total Projects',
      value: analytics.totalProjects || '0',
      change: `${analytics.completedProjects || 0} completed`,
      trend: 'neutral',
      icon: PeopleIcon,
      color: 'info'
    },
    {
      title: 'Client Rating',
      value: analytics.clientSatisfaction || '0.0',
      change: 'Excellent',
      trend: 'up',
      icon: StarIcon,
      color: 'warning'
    }
  ];

  const getIconColor = (color) => {
    const colors = {
      primary: '#1976d2',
      success: '#2e7d32',
      info: '#0288d1',
      warning: '#ed6c02'
    };
    return colors[color] || '#1976d2';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'success.main';
    if (trend === 'down') return 'error.main';
    return 'text.secondary';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUpIcon sx={{ fontSize: 16 }} />;
    if (trend === 'down') return <TrendingDownIcon sx={{ fontSize: 16 }} />;
    return null;
  };

  return (
    <Grid container spacing={3}>
      {statsData.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}.light`,
                    color: `${stat.color}.main`,
                    width: 48,
                    height: 48
                  }}
                >
                  <stat.icon size={24} />
                </Avatar>
                <Box display="flex" alignItems="center" color={getTrendColor(stat.trend)}>
                  {getTrendIcon(stat.trend)}
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {stat.value}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default VendorStats;