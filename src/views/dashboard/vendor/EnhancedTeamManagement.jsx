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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Rating,
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  IconSearch,
  IconPlus,
  IconPhone,
  IconMail,
  IconStar,
  IconDots,
  IconEye,
  IconEdit,
  IconCurrencyDollar,
  IconCalendar,
  IconCamera,
  IconVideo,
  IconPalette,
  IconMusic,
  IconUsers,
  IconTrendingUp,
  IconClock,
  IconCheck
} from '@tabler/icons-react';
import PageContainer from '../../../ui/container/PageContainer';
import CollapsibleSection from '../../../components/vendor/shared/CollapsibleSection';
import { formatCurrency } from '../../../utils/formatters';

const EnhancedTeamManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  // Mock freelancer data
  const freelancers = [
    {
      id: 1,
      name: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 123-4567',
      skills: ['photography', 'editing'],
      primarySkill: 'photography',
      rating: 4.8,
      totalProjects: 24,
      activeProjects: 3,
      totalEarnings: 15420.50,
      pendingPayments: 2340.00,
      rewardBalance: 850.00,
      joinDate: '2023-06-15',
      lastActive: '2024-01-25',
      status: 'active',
      avatar: null,
      notes: 'Excellent wedding photographer with great client feedback',
      hourlyRate: 75,
      availability: 'available'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      skills: ['videography', 'editing'],
      primarySkill: 'videography',
      rating: 4.9,
      totalProjects: 18,
      activeProjects: 2,
      totalEarnings: 12800.00,
      pendingPayments: 1500.00,
      rewardBalance: 650.00,
      joinDate: '2023-08-20',
      lastActive: '2024-01-24',
      status: 'active',
      avatar: null,
      notes: 'Specialized in cinematic wedding videos',
      hourlyRate: 85,
      availability: 'busy'
    },
    {
      id: 3,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 345-6789',
      skills: ['makeup', 'styling'],
      primarySkill: 'makeup',
      rating: 4.7,
      totalProjects: 32,
      activeProjects: 1,
      totalEarnings: 9600.00,
      pendingPayments: 800.00,
      rewardBalance: 420.00,
      joinDate: '2023-04-10',
      lastActive: '2024-01-23',
      status: 'active',
      avatar: null,
      notes: 'Professional makeup artist with bridal specialization',
      hourlyRate: 60,
      availability: 'available'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 456-7890',
      skills: ['coordination', 'planning'],
      primarySkill: 'coordination',
      rating: 4.6,
      totalProjects: 15,
      activeProjects: 0,
      totalEarnings: 7200.00,
      pendingPayments: 0,
      rewardBalance: 200.00,
      joinDate: '2023-09-05',
      lastActive: '2024-01-20',
      status: 'inactive',
      avatar: null,
      notes: 'Event coordinator, currently on break',
      hourlyRate: 50,
      availability: 'unavailable'
    }
  ];

  const skillOptions = [
    { value: 'photography', label: 'Photography', icon: IconCamera, color: 'primary' },
    { value: 'videography', label: 'Videography', icon: IconVideo, color: 'secondary' },
    { value: 'makeup', label: 'Makeup', icon: IconPalette, color: 'success' },
    { value: 'styling', label: 'Styling', icon: IconPalette, color: 'info' },
    { value: 'coordination', label: 'Coordination', icon: IconUsers, color: 'warning' },
    { value: 'music', label: 'Music/DJ', icon: IconMusic, color: 'error' },
    { value: 'editing', label: 'Editing', icon: IconEdit, color: 'default' }
  ];

  const getSkillIcon = (skill) => {
    const skillData = skillOptions.find(s => s.value === skill);
    return skillData ? skillData.icon : IconUsers;
  };

  const getSkillColor = (skill) => {
    const skillData = skillOptions.find(s => s.value === skill);
    return skillData ? skillData.color : 'default';
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'unavailable': return 'error';
      default: return 'default';
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || freelancer.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  const teamStats = {
    total: freelancers.length,
    active: freelancers.filter(f => f.status === 'active').length,
    totalEarnings: freelancers.reduce((sum, f) => sum + f.totalEarnings, 0),
    pendingPayments: freelancers.reduce((sum, f) => sum + f.pendingPayments, 0),
    averageRating: freelancers.reduce((sum, f) => sum + f.rating, 0) / freelancers.length,
    activeProjects: freelancers.reduce((sum, f) => sum + f.activeProjects, 0)
  };

  const handlePayment = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setPaymentDialogOpen(true);
  };

  return (
    <PageContainer title="Enhanced Team Management" description="Comprehensive freelancer and team management system">
      <Box>
        {/* Team Statistics */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <IconUsers />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {teamStats.active}/{teamStats.total}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Active Team Members
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <IconCurrencyDollar />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {formatCurrency(teamStats.totalEarnings)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Earnings
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <IconClock />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {formatCurrency(teamStats.pendingPayments)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Pending Payments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <IconStar />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {teamStats.averageRating.toFixed(1)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Average Rating
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box mb={3}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Team Members" />
            <Tab label="Payments" />
            <Tab label="Performance" />
            <Tab label="Rewards" />
          </Tabs>
        </Box>

        {/* Team Members Tab */}
        {activeTab === 0 && (
          <CollapsibleSection
            title="Team Members"
            subtitle={`${filteredFreelancers.length} members found`}
            defaultExpanded={true}
            headerAction={
              <Button
                startIcon={<IconPlus />}
                variant="contained"
                onClick={() => {}}
              >
                Add Member
              </Button>
            }
          >
            <Box mb={3}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch size={20} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Skill</InputLabel>
                    <Select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      label="Skill"
                    >
                      <MenuItem value="all">All Skills</MenuItem>
                      {skillOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Team Members Grid */}
            <Grid container spacing={3}>
              {filteredFreelancers.map((freelancer) => {
                const PrimarySkillIcon = getSkillIcon(freelancer.primarySkill);
                
                return (
                  <Grid item xs={12} md={6} lg={4} key={freelancer.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ width: 50, height: 50 }}>
                              {freelancer.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {freelancer.name}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1}>
                                <PrimarySkillIcon size={16} />
                                <Typography variant="caption" color="text.secondary">
                                  {skillOptions.find(s => s.value === freelancer.primarySkill)?.label}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Box display="flex" gap={1}>
                            <Chip 
                              label={freelancer.availability} 
                              color={getAvailabilityColor(freelancer.availability)}
                              size="small"
                            />
                            <IconButton size="small">
                              <IconDots />
                            </IconButton>
                          </Box>
                        </Box>

                        <Box mb={2}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {freelancer.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {freelancer.phone}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <Rating value={freelancer.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="caption" color="text.secondary">
                              ({freelancer.rating})
                            </Typography>
                          </Box>
                        </Box>

                        {/* Skills */}
                        <Box mb={2}>
                          <Typography variant="caption" color="text.secondary" gutterBottom>
                            Skills:
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
                            {freelancer.skills.map((skill) => (
                              <Chip 
                                key={skill}
                                label={skillOptions.find(s => s.value === skill)?.label}
                                color={getSkillColor(skill)}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>

                        {/* Stats */}
                        <Grid container spacing={2} mb={2}>
                          <Grid item xs={4}>
                            <Typography variant="h6" fontWeight="600" textAlign="center">
                              {freelancer.totalProjects}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                              Projects
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="h6" fontWeight="600" textAlign="center">
                              {freelancer.activeProjects}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                              Active
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="h6" fontWeight="600" textAlign="center">
                              ${freelancer.hourlyRate}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                              /hour
                            </Typography>
                          </Grid>
                        </Grid>

                        {/* Earnings */}
                        <Box mb={2}>
                          <Box display="flex" justifyContent="between" alignItems="center" mb={1}>
                            <Typography variant="caption" color="text.secondary">
                              Total Earnings
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="600">
                              {formatCurrency(freelancer.totalEarnings)}
                            </Typography>
                          </Box>
                          {freelancer.pendingPayments > 0 && (
                            <Box display="flex" justifyContent="between" alignItems="center">
                              <Typography variant="caption" color="warning.main">
                                Pending Payment
                              </Typography>
                              <Typography variant="subtitle2" fontWeight="600" color="warning.main">
                                {formatCurrency(freelancer.pendingPayments)}
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display="flex" gap={1}>
                          <Button size="small" startIcon={<IconEye />} variant="outlined">
                            View
                          </Button>
                          <Button size="small" startIcon={<IconEdit />} variant="outlined">
                            Edit
                          </Button>
                          {freelancer.pendingPayments > 0 && (
                            <Button 
                              size="small" 
                              startIcon={<IconCurrencyDollar />} 
                              variant="contained"
                              onClick={() => handlePayment(freelancer)}
                            >
                              Pay
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CollapsibleSection>
        )}

        {/* Payments Tab */}
        {activeTab === 1 && (
          <CollapsibleSection
            title="Payment Management"
            subtitle="Process payments and track earnings"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Payment management interface will be displayed here
            </Typography>
          </CollapsibleSection>
        )}

        {/* Performance Tab */}
        {activeTab === 2 && (
          <CollapsibleSection
            title="Performance Analytics"
            subtitle="Track team member performance and ratings"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Performance analytics will be displayed here
            </Typography>
          </CollapsibleSection>
        )}

        {/* Rewards Tab */}
        {activeTab === 3 && (
          <CollapsibleSection
            title="Reward System"
            subtitle="Manage freelancer rewards and bonuses"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Reward system management will be displayed here
            </Typography>
          </CollapsibleSection>
        )}

        {/* Payment Dialog */}
        <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Process Payment
          </DialogTitle>
          <DialogContent>
            {selectedFreelancer && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Processing payment for {selectedFreelancer.name}
                </Typography>
                
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Payment Amount"
                    defaultValue={selectedFreelancer.pendingPayments}
                    type="number"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Payment Method"
                    select
                    defaultValue="bank_transfer"
                    margin="normal"
                  >
                    <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    margin="normal"
                    placeholder="Payment notes..."
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setPaymentDialogOpen(false)}>
              Process Payment
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default EnhancedTeamManagement;