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
  IconButton,
  Tabs,
  Tab,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  IconCreditCard,
  IconWallet,
  IconPiggyBank,
  IconLock,
  IconUsers,
  IconTarget,
  IconGift,
  IconPlus,
  IconTrendingUp,
  IconTrendingDown,
  IconEye,
  IconEyeOff,
  IconDots
} from '@tabler/icons-react';
import PageContainer from '../../../ui/container/PageContainer';
import CollapsibleSection from '../../../components/vendor/shared/CollapsibleSection';
import { formatCurrency } from '../../../utils/formatters';

const EnhancedFinance = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showBalances, setShowBalances] = useState(true);

  // Mock data for financial cards
  const financialCards = [
    {
      id: 1,
      type: 'debit',
      name: 'Business Checking',
      bank: 'Chase Bank',
      balance: 15420.50,
      lastFour: '4532',
      color: 'primary',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit',
      name: 'Business Credit',
      bank: 'American Express',
      balance: -2340.00,
      limit: 10000,
      lastFour: '8901',
      color: 'success',
      isDefault: false
    },
    {
      id: 3,
      type: 'cash',
      name: 'Cash Wallet',
      bank: 'Physical Cash',
      balance: 850.00,
      lastFour: 'CASH',
      color: 'warning',
      isDefault: false
    },
    {
      id: 4,
      type: 'prepaid',
      name: 'Equipment Fund',
      bank: 'Prepaid Card',
      balance: 3200.00,
      lastFour: '7654',
      color: 'info',
      isDefault: false
    }
  ];

  // Mock data for financial pockets
  const financialPockets = [
    {
      id: 1,
      name: 'Nabung & Bayar',
      description: 'Savings and payment management',
      icon: IconPiggyBank,
      balance: 8500.00,
      target: 15000.00,
      color: 'success',
      type: 'savings'
    },
    {
      id: 2,
      name: 'Terkunci',
      description: 'Locked funds for security',
      icon: IconLock,
      balance: 5000.00,
      target: 5000.00,
      color: 'error',
      type: 'locked'
    },
    {
      id: 3,
      name: 'Bersama',
      description: 'Shared team expenses',
      icon: IconUsers,
      balance: 2300.00,
      target: 5000.00,
      color: 'primary',
      type: 'shared'
    },
    {
      id: 4,
      name: 'Anggaran',
      description: 'Monthly budget allocation',
      icon: IconTarget,
      balance: 4200.00,
      target: 6000.00,
      color: 'warning',
      type: 'budget'
    },
    {
      id: 5,
      name: 'Reward Pool',
      description: 'Freelancer rewards fund',
      icon: IconGift,
      balance: 1800.00,
      target: 3000.00,
      color: 'info',
      type: 'rewards'
    }
  ];

  const getCardIcon = (type) => {
    switch (type) {
      case 'credit': return IconCreditCard;
      case 'debit': return IconCreditCard;
      case 'cash': return IconWallet;
      case 'prepaid': return IconCreditCard;
      default: return IconCreditCard;
    }
  };

  const getCardTypeLabel = (type) => {
    switch (type) {
      case 'credit': return 'Credit Card';
      case 'debit': return 'Debit Card';
      case 'cash': return 'Cash Wallet';
      case 'prepaid': return 'Prepaid Card';
      default: return 'Card';
    }
  };

  const totalBalance = financialCards.reduce((sum, card) => sum + card.balance, 0);
  const totalPockets = financialPockets.reduce((sum, pocket) => sum + pocket.balance, 0);

  return (
    <PageContainer title="Enhanced Finance" description="Comprehensive financial management system">
      <Box>
        {/* Financial Overview */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="600">
                    Total Balance
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => setShowBalances(!showBalances)}
                    sx={{ color: 'white' }}
                  >
                    {showBalances ? <IconEye /> : <IconEyeOff />}
                  </IconButton>
                </Box>
                <Typography variant="h3" fontWeight="700">
                  {showBalances ? formatCurrency(totalBalance) : '••••••'}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconTrendingUp size={16} />
                  <Typography variant="caption">
                    +12.5% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Pocket Funds
                </Typography>
                <Typography variant="h3" fontWeight="700">
                  {showBalances ? formatCurrency(totalPockets) : '••••••'}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconTrendingUp size={16} />
                  <Typography variant="caption">
                    5 active pockets
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="600" mb={2}>
                  Net Worth
                </Typography>
                <Typography variant="h3" fontWeight="700">
                  {showBalances ? formatCurrency(totalBalance + totalPockets) : '••••••'}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconTrendingUp size={16} />
                  <Typography variant="caption">
                    +8.7% growth
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs for different sections */}
        <Box mb={3}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Cards & Accounts" />
            <Tab label="Financial Pockets" />
            <Tab label="Transactions" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        {/* Cards & Accounts Tab */}
        {activeTab === 0 && (
          <CollapsibleSection
            title="Payment Cards & Accounts"
            subtitle="Manage your business financial accounts"
            icon={IconCreditCard}
            defaultExpanded={true}
            headerAction={
              <Button
                startIcon={<IconPlus />}
                variant="outlined"
                size="small"
                onClick={() => {}}
              >
                Add Card
              </Button>
            }
          >
            <Grid container spacing={3}>
              {financialCards.map((card) => {
                const CardIcon = getCardIcon(card.type);
                return (
                  <Grid item xs={12} sm={6} md={4} key={card.id}>
                    <Card 
                      sx={{ 
                        background: `linear-gradient(135deg, ${card.color === 'primary' ? '#667eea 0%, #764ba2 100%' : 
                          card.color === 'success' ? '#56ab2f 0%, #a8e6cf 100%' :
                          card.color === 'warning' ? '#f093fb 0%, #f5576c 100%' :
                          '#4facfe 0%, #00f2fe 100%'})`,
                        color: 'white',
                        position: 'relative',
                        minHeight: 180
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
                          <Box>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                              {getCardTypeLabel(card.type)}
                            </Typography>
                            <Typography variant="h6" fontWeight="600">
                              {card.name}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                              {card.bank}
                            </Typography>
                          </Box>
                          <Box display="flex" gap={1}>
                            {card.isDefault && (
                              <Chip 
                                label="Default" 
                                size="small" 
                                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                              />
                            )}
                            <IconButton size="small" sx={{ color: 'white' }}>
                              <IconDots />
                            </IconButton>
                          </Box>
                        </Box>

                        <Box mt={3}>
                          <Typography variant="h4" fontWeight="700">
                            {showBalances ? formatCurrency(card.balance) : '••••••'}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            •••• •••• •••• {card.lastFour}
                          </Typography>
                        </Box>

                        {card.type === 'credit' && (
                          <Box mt={2}>
                            <Box display="flex" justifyContent="between" alignItems="center" mb={1}>
                              <Typography variant="caption">
                                Credit Used
                              </Typography>
                              <Typography variant="caption">
                                {Math.abs(card.balance)} / {card.limit}
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={(Math.abs(card.balance) / card.limit) * 100}
                              sx={{ 
                                bgcolor: 'rgba(255,255,255,0.2)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: 'rgba(255,255,255,0.8)'
                                }
                              }}
                            />
                          </Box>
                        )}

                        <Avatar
                          sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            width: 40,
                            height: 40
                          }}
                        >
                          <CardIcon size={20} />
                        </Avatar>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CollapsibleSection>
        )}

        {/* Financial Pockets Tab */}
        {activeTab === 1 && (
          <CollapsibleSection
            title="Financial Pockets"
            subtitle="Organize your money into different categories"
            icon={IconPiggyBank}
            defaultExpanded={true}
            headerAction={
              <Button
                startIcon={<IconPlus />}
                variant="outlined"
                size="small"
                onClick={() => {}}
              >
                Create Pocket
              </Button>
            }
          >
            <Grid container spacing={3}>
              {financialPockets.map((pocket) => {
                const PocketIcon = pocket.icon;
                const progress = (pocket.balance / pocket.target) * 100;
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={pocket.id}>
                    <Card>
                      <CardContent>
                        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: `${pocket.color}.light` }}>
                              <PocketIcon size={20} />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {pocket.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {pocket.description}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton size="small">
                            <IconDots />
                          </IconButton>
                        </Box>

                        <Box mb={2}>
                          <Typography variant="h4" fontWeight="700" color={`${pocket.color}.main`}>
                            {showBalances ? formatCurrency(pocket.balance) : '••••••'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Target: {formatCurrency(pocket.target)}
                          </Typography>
                        </Box>

                        <Box>
                          <Box display="flex" justifyContent="between" alignItems="center" mb={1}>
                            <Typography variant="caption" color="text.secondary">
                              Progress
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {Math.round(progress)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min(progress, 100)}
                            color={pocket.color}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>

                        <Box display="flex" gap={1} mt={2}>
                          <Button size="small" variant="outlined" fullWidth>
                            Add Money
                          </Button>
                          <Button size="small" variant="contained" fullWidth>
                            Use Funds
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CollapsibleSection>
        )}

        {/* Transactions Tab */}
        {activeTab === 2 && (
          <CollapsibleSection
            title="Recent Transactions"
            subtitle="Track all your financial activities"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Transaction history will be displayed here
            </Typography>
          </CollapsibleSection>
        )}

        {/* Analytics Tab */}
        {activeTab === 3 && (
          <CollapsibleSection
            title="Financial Analytics"
            subtitle="Insights and reports on your financial performance"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Financial analytics and reports will be displayed here
            </Typography>
          </CollapsibleSection>
        )}
      </Box>
    </PageContainer>
  );
};

export default EnhancedFinance;