import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as BankIcon,
  Receipt as ReceiptIcon,
  Assessment as ReportIcon,
  PieChart as PieChartIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useFinancial } from '../../../context/FinancialContext';
import PageContainer from '../../../ui/container/PageContainer';

const FinancialManagement = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const {
    budgets,
    transactions,
    revenue,
    getFinancialSummary,
  } = useFinancial();

  const summary = getFinancialSummary();

  const overview = {
    totalRevenue: revenue.reduce((sum, item) => sum + (item.amount || 0), 0),
    monthlyRevenue: summary.monthlyRevenue,
    pendingPayments: transactions
      .filter((tx) => tx.type === 'income' && tx.status === 'pending' && (tx.amount || 0) > 0)
      .reduce((sum, tx) => sum + (tx.amount || 0), 0),
    expenses: summary.monthlyExpenses,
    netProfit: summary.monthlyProfit,
    profitMargin: summary.monthlyRevenue
      ? Math.round((summary.monthlyProfit / summary.monthlyRevenue) * 100)
      : 0,
  };

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 10);

  const totalBudgetSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);

  const expenseCategories = budgets.map((b) => ({
    category: b.category,
    amount: b.spent,
    percentage: totalBudgetSpent ? Math.round(((b.spent || 0) / totalBudgetSpent) * 100) : 0,
  }));

  const monthlyData = [
    { month: 'Jan', revenue: 15000000, expenses: 6000000, profit: 9000000 },
    { month: 'Feb', revenue: 25000000, expenses: 8500000, profit: 16500000 },
    { month: 'Mar', revenue: 22000000, expenses: 9000000, profit: 13000000 },
    { month: 'Apr', revenue: 16500000, expenses: 7500000, profit: 9000000 },
    { month: 'May', revenue: 20000000, expenses: 8000000, profit: 12000000 },
    { month: 'Jun', revenue: 19500000, expenses: 7800000, profit: 11700000 }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTransactionColor = (type) => {
    return type === 'income' ? 'success' : 'error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <PageContainer 
      title="Financial Management" 
      description="Track revenue, expenses, and financial performance"
    >
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Manajemen Keuangan</Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Periode</InputLabel>
            <Select
              value={timeRange}
              label="Periode"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">Minggu Ini</MenuItem>
              <MenuItem value="month">Bulan Ini</MenuItem>
              <MenuItem value="quarter">Kuartal Ini</MenuItem>
              <MenuItem value="year">Tahun Ini</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Financial Overview Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mx: 'auto', mb: 1 }}>
                  <MoneyIcon color="primary" />
                </Avatar>
                <Typography variant="h5" color="primary">
                  {formatCurrency(overview.totalRevenue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Pendapatan
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
                <Typography variant="h5" color="success.main">
                  {formatCurrency(overview.monthlyRevenue)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pendapatan Bulanan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.light', mx: 'auto', mb: 1 }}>
                  <BankIcon color="warning" />
                </Avatar>
                <Typography variant="h5" color="warning.main">
                  {formatCurrency(overview.pendingPayments)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pembayaran Tertunda
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'error.light', mx: 'auto', mb: 1 }}>
                  <TrendingDownIcon color="error" />
                </Avatar>
                <Typography variant="h5" color="error.main">
                  {formatCurrency(overview.expenses)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pengeluaran Bulanan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'info.light', mx: 'auto', mb: 1 }}>
                  <ReportIcon color="info" />
                </Avatar>
                <Typography variant="h5" color="info.main">
                  {formatCurrency(overview.netProfit)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Profit Bersih
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'secondary.light', mx: 'auto', mb: 1 }}>
                  <PieChartIcon color="secondary" />
                </Avatar>
                <Typography variant="h5" color="secondary.main">
                  {overview.profitMargin}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Margin Profit
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Financial Details */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Tren Pendapatan" />
              <Tab label="Transaksi Terbaru" />
              <Tab label="Rincian Pengeluaran" />
            </Tabs>
          </Box>

          <CardContent>
            {/* Revenue Trends Tab */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Tren Pendapatan Bulanan
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Expenses</TableCell>
                        <TableCell align="right">Net Profit</TableCell>
                        <TableCell align="right">Margin</TableCell>
                        <TableCell align="right">Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {monthlyData.map((row, index) => {
                        const margin = ((row.profit / row.revenue) * 100).toFixed(1);
                        const prevRevenue = index > 0 ? monthlyData[index - 1].revenue : row.revenue;
                        const growth = ((row.revenue - prevRevenue) / prevRevenue * 100).toFixed(1);
                        
                        return (
                          <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                            <TableCell align="right">{formatCurrency(row.expenses)}</TableCell>
                            <TableCell align="right">{formatCurrency(row.profit)}</TableCell>
                            <TableCell align="right">{margin}%</TableCell>
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

            {/* Recent Transactions Tab */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Recent Transactions
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Client/Category</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar
                                sx={{
                                  bgcolor: getTransactionColor(transaction.type) + '.light',
                                  mr: 2,
                                  width: 32,
                                  height: 32
                                }}
                              >
                                {transaction.type === 'income' ? (
                                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                                ) : (
                                  <TrendingDownIcon sx={{ fontSize: 16 }} />
                                )}
                              </Avatar>
                              {transaction.description}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {transaction.client || transaction.category}
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                              fontWeight="bold"
                            >
                              {formatCurrency(Math.abs(transaction.amount))}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={transaction.status}
                              color={getStatusColor(transaction.status)}
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

            {/* Expense Breakdown Tab */}
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Expense Breakdown by Category
                </Typography>
                
                <Grid container spacing={3}>
                  {expenseCategories.map((category, index) => (
                    <Grid item xs={12} key={category.category}>
                      <Paper sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle1">
                            {category.category}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {formatCurrency(category.amount)}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            {category.percentage}% of total expenses
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatCurrency(overview.expenses)} total
                          </Typography>
                        </Box>
                        
                        <LinearProgress
                          variant="determinate"
                          value={category.percentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Box mt={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Total Monthly Expenses
                    </Typography>
                    <Typography variant="h4" color="error.main">
                      {formatCurrency(overview.expenses)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {((overview.expenses / overview.monthlyRevenue) * 100).toFixed(1)}% of monthly revenue
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default FinancialManagement;