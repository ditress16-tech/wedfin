import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  TextField,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconCurrencyDollar,
  IconCalendar,
  IconStar,
  IconDownload,
  IconFileAnalytics
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';

const KPIReports = () => {
  const { getVendorCategory } = useAuth();
  const { analytics } = useVendor();
  const vendorCategory = getVendorCategory();
  const [period, setPeriod] = useState('month');

  // KPI data based on vendor analytics
  const [kpiData, setKpiData] = useState([]);

  useEffect(() => {
    if (analytics && Object.keys(analytics).length > 0) {
      const revenueChange = analytics.previousMonthRevenue > 0 
        ? (((analytics.monthlyRevenue - analytics.previousMonthRevenue) / analytics.previousMonthRevenue) * 100).toFixed(1)
        : 0;

      setKpiData([
        {
          title: 'Total Revenue',
          value: `$${analytics.monthlyRevenue?.toLocaleString() || 0}`,
          change: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`,
          trend: revenueChange >= 0 ? 'up' : 'down',
          icon: IconCurrencyDollar,
          color: 'success',
          target: analytics.monthlyRevenue * 1.2,
          current: analytics.monthlyRevenue
        },
        {
          title: 'Active Projects',
          value: analytics.activeProjects?.toString() || '0',
          change: '+8.3%',
          trend: 'up',
          icon: IconCalendar,
          color: 'primary',
          target: analytics.activeProjects * 1.5,
          current: analytics.activeProjects
        },
        {
          title: 'Total Projects',
          value: analytics.totalProjects?.toString() || '0',
          change: '+12.5%',
          trend: 'up',
          icon: IconUsers,
          color: 'warning',
          target: analytics.totalProjects * 1.2,
          current: analytics.totalProjects
        },
        {
          title: 'Client Satisfaction',
          value: `${analytics.clientSatisfaction || 0}/5.0`,
          change: '+0.3',
          trend: 'up',
          icon: IconStar,
          color: 'info',
          target: 5.0,
          current: analytics.clientSatisfaction
        }
      ]);
    }
  }, [analytics]);

  // Performance metrics based on vendor analytics
  const [performanceMetrics, setPerformanceMetrics] = useState([]);

  useEffect(() => {
    if (analytics && Object.keys(analytics).length > 0) {
      setPerformanceMetrics([
        {
          metric: 'Booking Conversion Rate',
          value: analytics.bookingConversionRate || 0,
          target: 75,
          status: (analytics.bookingConversionRate || 0) >= 75 ? 'excellent' : (analytics.bookingConversionRate || 0) >= 65 ? 'good' : 'needs-improvement'
        },
        {
          metric: 'Average Project Value',
          value: Math.round(((analytics.averageProjectValue || 0) / 10000) * 100),
          target: 80,
          status: ((analytics.averageProjectValue || 0) / 10000) * 100 >= 80 ? 'excellent' : 'good'
        },
        {
          metric: 'Client Retention Rate',
          value: analytics.repeatClientRate || 0,
          target: 80,
          status: (analytics.repeatClientRate || 0) >= 80 ? 'excellent' : (analytics.repeatClientRate || 0) >= 60 ? 'good' : 'needs-improvement'
        },
        {
          metric: 'On-Time Delivery',
          value: 92,
          target: 90,
          status: 'excellent'
        },
        {
          metric: 'Response Time (hours)',
          value: 78,
          target: 85,
          status: 'good'
        }
      ]);
    }
  }, [analytics]);

  const getProgressColor = (status) => {
    const colors = {
      excellent: 'success',
      good: 'primary',
      'needs-improvement': 'warning'
    };
    return colors[status] || 'default';
  };

  const getStatusChip = (status) => {
    const labels = {
      excellent: 'Excellent',
      good: 'Good',
      'needs-improvement': 'Needs Improvement'
    };
    return (
      <Chip
        label={labels[status]}
        size="small"
        color={getProgressColor(status)}
        variant="outlined"
      />
    );
  };

  return (
    <PageContainer title="KPI & Reports" description="Key Performance Indicators and Reports">
      <Box>
        {/* Header Actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="600">
            Performance Dashboard
          </Typography>
          <Box display="flex" gap={2}>
            <TextField
              select
              size="small"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              startIcon={<IconDownload size={18} />}
            >
              Export Report
            </Button>
          </Box>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={3} mb={3}>
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const progress = (kpi.current / kpi.target) * 100;
            
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box
                        sx={{
                          bgcolor: `${kpi.color}.light`,
                          p: 1,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon size={24} color={kpi.color} />
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {kpi.trend === 'up' ? (
                          <IconTrendingUp size={16} color="green" />
                        ) : (
                          <IconTrendingDown size={16} color="red" />
                        )}
                        <Typography
                          variant="caption"
                          color={kpi.trend === 'up' ? 'success.main' : 'error.main'}
                          fontWeight="600"
                        >
                          {kpi.change}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h4" fontWeight="700" mb={0.5}>
                      {kpi.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {kpi.title}
                    </Typography>
                    
                    <Box>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {Math.round(progress)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        color={kpi.color}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Performance Metrics */}
        <DashboardCard
          title="Performance Metrics"
          subtitle="Track your business performance indicators"
        >
          <Box>
            {performanceMetrics.map((metric, index) => (
              <Box key={index} mb={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {metric.metric}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    {getStatusChip(metric.status)}
                    <Typography variant="body2" color="text.secondary">
                      {metric.value}% / {metric.target}%
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  color={getProgressColor(metric.status)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </Box>
        </DashboardCard>

        {/* Quick Reports */}
        <Grid container spacing={3} mt={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <IconFileAnalytics size={24} />
                  <Typography variant="h6" fontWeight="600">
                    Monthly Report
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Comprehensive monthly performance report including revenue, projects, and client metrics.
                </Typography>
                <Button variant="outlined" fullWidth startIcon={<IconDownload size={18} />}>
                  Download Monthly Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <IconFileAnalytics size={24} />
                  <Typography variant="h6" fontWeight="600">
                    Financial Summary
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Detailed financial breakdown including income, expenses, and profit margins.
                </Typography>
                <Button variant="outlined" fullWidth startIcon={<IconDownload size={18} />}>
                  Download Financial Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default KPIReports;
