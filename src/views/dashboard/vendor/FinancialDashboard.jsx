import { Grid, Box, Card, CardContent, Typography, LinearProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useFinancial } from '../../../context/FinancialContext';
import {
  IconWallet,
  IconCreditCard,
  IconCash,
  IconTrendingUp,
  IconTrendingDown,
  IconTarget,
  IconChartBar
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { formatCurrency } from '../../../utils/formatters';

const FinancialDashboard = () => {
  const {
    accounts,
    debitCards,
    creditCards,
    cashBalance,
    digitalWallets,
    budgets,
    financialGoals,
    transactions,
    getFinancialSummary
  } = useFinancial();

  const summary = getFinancialSummary();

  const StatCard = ({ title, value, subtitle, icon: Icon, color, bgColor }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="700" mb={0.5}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              bgcolor: bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={28} color={color} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer title="Financial Dashboard" description="Comprehensive financial overview">
      <Box>
        {/* Main Financial Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Balance"
              value={formatCurrency(summary.totalBalance)}
              subtitle="All accounts"
              icon={IconWallet}
              color="#5D87FF"
              bgColor="rgba(93, 135, 255, 0.1)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Net Worth"
              value={formatCurrency(summary.netWorth)}
              subtitle="Balance - Debt"
              icon={IconChartBar}
              color="#49BEFF"
              bgColor="rgba(73, 190, 255, 0.1)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Monthly Revenue"
              value={formatCurrency(summary.monthlyRevenue)}
              subtitle="This month"
              icon={IconTrendingUp}
              color="#13DEB9"
              bgColor="rgba(19, 222, 185, 0.1)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Monthly Profit"
              value={formatCurrency(summary.monthlyProfit)}
              subtitle={`Expenses: ${formatCurrency(summary.monthlyExpenses)}`}
              icon={IconTarget}
              color={summary.monthlyProfit >= 0 ? '#13DEB9' : '#FA896B'}
              bgColor={summary.monthlyProfit >= 0 ? 'rgba(19, 222, 185, 0.1)' : 'rgba(250, 137, 107, 0.1)'}
            />
          </Grid>
        </Grid>

        {/* Accounts Overview */}
        <Grid container spacing={3} mb={3}>
          {/* Bank Accounts */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <IconWallet size={24} />
                  <Typography variant="h6" fontWeight="600">
                    Bank Accounts
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {accounts.map(account => (
                    <Box
                      key={account.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'grey.50',
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {account.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {account.bank}
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="700">
                          {formatCurrency(account.balance)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Methods */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <IconCreditCard size={24} />
                  <Typography variant="h6" fontWeight="600">
                    Payment Methods
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  {/* Debit Cards */}
                  {debitCards.map(card => (
                    <Box
                      key={card.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'primary.light',
                        border: '1px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {card.name} •••• {card.last4}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Debit Card - {card.bank}
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="700">
                          {formatCurrency(card.balance)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  {/* Credit Cards */}
                  {creditCards.map(card => (
                    <Box
                      key={card.id}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'warning.light',
                        border: '1px solid',
                        borderColor: 'warning.main'
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {card.name} •••• {card.last4}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Credit Card - Due: {new Date(card.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="700">
                          {formatCurrency(card.balance)}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(card.balance / card.limit) * 100}
                        sx={{ height: 6, borderRadius: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary" mt={0.5}>
                        {formatCurrency(card.limit - card.balance)} available
                      </Typography>
                    </Box>
                  ))}

                  {/* Cash */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'success.light',
                      border: '1px solid',
                      borderColor: 'success.main'
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconCash size={20} />
                        <Typography variant="subtitle2" fontWeight="600">
                          Cash on Hand
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="700">
                        {formatCurrency(cashBalance)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Budgets & Goals */}
        <Grid container spacing={3}>
          {/* Budget Tracking */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Budget Tracking
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {budgets.map(budget => {
                    const percentage = (budget.spent / budget.allocated) * 100;
                    const remaining = budget.allocated - budget.spent;
                    return (
                      <Box key={budget.id}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="subtitle2" fontWeight="600">
                            {budget.category}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(percentage, 100)}
                          color={percentage > 90 ? 'error' : percentage > 70 ? 'warning' : 'success'}
                          sx={{ height: 8, borderRadius: 1, mb: 0.5 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatCurrency(remaining)} remaining ({(100 - percentage).toFixed(0)}%)
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Financial Goals */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Financial Goals
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {financialGoals.map(goal => {
                    const percentage = (goal.current / goal.target) * 100;
                    const remaining = goal.target - goal.current;
                    return (
                      <Box key={goal.id}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="600">
                              {goal.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Target: {new Date(goal.deadline).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(percentage, 100)}
                          color="primary"
                          sx={{ height: 8, borderRadius: 1, mb: 0.5 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatCurrency(remaining)} to go ({percentage.toFixed(0)}% complete)
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Transactions */}
        {transactions && transactions.length > 0 && (
          <Box mt={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Recent Transactions
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...transactions]
                        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                        .slice(0, 5)
                        .map((tx) => {
                          const amount = tx.amount ?? 0;
                          const isPositive = amount >= 0;
                          return (
                            <TableRow key={tx.id}>
                              <TableCell>
                                {tx.date ? new Date(tx.date).toLocaleDateString() : '-'}
                              </TableCell>
                              <TableCell>{tx.description || 'Transaction'}</TableCell>
                              <TableCell align="right">
                                <Typography
                                  variant="body2"
                                  color={isPositive ? 'success.main' : 'error.main'}
                                  fontWeight="600"
                                >
                                  {formatCurrency(Math.abs(amount))}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default FinancialDashboard;
