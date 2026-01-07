import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const VendorAnalytics = () => {
  const { user } = useAuth();
  const { analytics } = useVendor();
  const [timeRange, setTimeRange] = useState('month');

  const performanceMetrics = [
    {
      title: 'Project Completion Rate',
      value: '94%',
      change: '+5%',
      trend: 'up',
      color: 'success',
      description: 'Projects completed on time'
    },
    {
      title: 'Client Satisfaction',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      color: 'primary',
      description: 'Average client rating'
    },
    {
      title: 'Revenue Growth',
      value: '23%',
      change: '+8%',
      trend: 'up',
      color: 'warning',
      description: 'Monthly revenue increase'
    },
    {
      title: 'Response Time',
      value: '2.4h',
      change: '-0.5h',
      trend: 'up',
      color: 'info',
      description: 'Average response to inquiries'
    }
  ];

  const monthlyData = [
    { month: 'Jan', projects: 12, revenue: 45000, satisfaction: 4.6 },
    { month: 'Feb', projects: 15, revenue: 52000, satisfaction: 4.7 },
    { month: 'Mar', projects: 18, revenue: 61000, satisfaction: 4.8 },
    { month: 'Apr', projects: 14, revenue: 48000, satisfaction: 4.9 },
    { month: 'May', projects: 20, revenue: 68000, satisfaction: 4.8 },
    { month: 'Jun', projects: 22, revenue: 75000, satisfaction: 4.9 }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} /> : 
      <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />;
  };

  return (
    <PageContainer 
      title="Analytics Dashboard" 
      description="Detailed performance analytics and insights"
    >
      <Box>
        {/* Header Controls */}
        <Box display="flex" justifyContent="between" alignItems="center" mb={3}>
          <Typography variant="h4" gutterBottom>
            Performance Analytics
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Performance Metrics */}
        <Grid container spacing={3} mb={4}>
          {performanceMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AssessmentIcon color={metric.color} sx={{ mr: 1 }} />
                    <Typography variant="h6" color={`${metric.color}.main`}>
                      {metric.value}
                    </Typography>
                    <Box ml="auto" display="flex" alignItems="center">
                      {getTrendIcon(metric.trend)}
                      <Typography 
                        variant="body2" 
                        color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                        sx={{ ml: 0.5 }}
                      >
                        {metric.change}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {metric.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts and Detailed Analytics */}
        <Grid container spacing={3}>
          {/* Monthly Performance Chart */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <BarChartIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Monthly Performance</Typography>
                </Box>
                
                {/* Simple chart representation */}
                <Box>
                  {monthlyData.map((data, index) => (
                    <Box key={data.month} mb={2}>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">{data.month}</Typography>
                        <Typography variant="body2">
                          {data.projects} projects • ${data.revenue.toLocaleString()}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(data.projects / 25) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Key Insights */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <PieChartIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Key Insights</Typography>
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Top Performance Areas
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    <Chip label="Client Communication" color="success" size="small" />
                    <Chip label="On-time Delivery" color="success" size="small" />
                    <Chip label="Quality Standards" color="primary" size="small" />
                  </Box>
                </Box>

                <Box mb={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Areas for Improvement
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    <Chip label="Response Time" color="warning" size="small" />
                    <Chip label="Cost Efficiency" color="info" size="small" />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Recommendations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Focus on reducing initial response time
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Implement automated follow-up system
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Optimize resource allocation
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Breakdown */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <TimelineIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Revenue Breakdown</Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        $68,500
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Revenue (This Month)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        $3,425
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average per Project
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        23%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Growth Rate
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default VendorAnalytics;