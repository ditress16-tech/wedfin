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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  IconSearch,
  IconFilter,
  IconPlus,
  IconPhone,
  IconMail,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconWorld,
  IconDots,
  IconEye,
  IconEdit,
  IconUserCheck,
  IconX,
  IconTrendingUp,
  IconUsers,
  IconTarget,
  IconClock
} from '@tabler/icons-react';
import PageContainer from '../../../ui/container/PageContainer';
import CollapsibleSection from '../../../components/vendor/shared/CollapsibleSection';
import { formatCurrency } from '../../../utils/formatters';

const EnhancedLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Mock leads data
  const leads = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      status: 'discussion',
      channel: 'whatsapp',
      source: 'Instagram Ad',
      eventDate: '2024-06-15',
      eventType: 'Wedding',
      budget: 5000,
      location: 'New York',
      notes: 'Interested in full-day photography package',
      createdAt: '2024-01-15',
      lastContact: '2024-01-20',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      status: 'follow-up',
      channel: 'website',
      source: 'Google Search',
      eventDate: '2024-08-22',
      eventType: 'Engagement',
      budget: 2500,
      location: 'Los Angeles',
      notes: 'Looking for outdoor engagement session',
      createdAt: '2024-01-18',
      lastContact: '2024-01-22',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      status: 'converted',
      channel: 'instagram',
      source: 'Referral',
      eventDate: '2024-05-10',
      eventType: 'Wedding',
      budget: 8000,
      location: 'Miami',
      notes: 'Converted to client - Project #PRJ-001',
      createdAt: '2024-01-10',
      lastContact: '2024-01-25',
      priority: 'high'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 456-7890',
      status: 'rejected',
      channel: 'email',
      source: 'Wedding Fair',
      eventDate: '2024-07-05',
      eventType: 'Wedding',
      budget: 3000,
      location: 'Chicago',
      notes: 'Budget constraints - declined proposal',
      createdAt: '2024-01-12',
      lastContact: '2024-01-24',
      priority: 'low'
    }
  ];

  const statusOptions = [
    { value: 'discussion', label: 'Discussion', color: 'info' },
    { value: 'follow-up', label: 'Follow Up', color: 'warning' },
    { value: 'converted', label: 'Converted', color: 'success' },
    { value: 'rejected', label: 'Rejected', color: 'error' }
  ];

  const channelOptions = [
    { value: 'whatsapp', label: 'WhatsApp', icon: IconBrandWhatsapp, color: '#25D366' },
    { value: 'instagram', label: 'Instagram', icon: IconBrandInstagram, color: '#E4405F' },
    { value: 'website', label: 'Website', icon: IconWorld, color: '#1976d2' },
    { value: 'email', label: 'Email', icon: IconMail, color: '#f44336' },
    { value: 'phone', label: 'Phone', icon: IconPhone, color: '#ff9800' }
  ];

  const getChannelIcon = (channel) => {
    const channelData = channelOptions.find(c => c.value === channel);
    return channelData ? channelData.icon : IconWorld;
  };

  const getChannelColor = (channel) => {
    const channelData = channelOptions.find(c => c.value === channel);
    return channelData ? channelData.color : '#1976d2';
  };

  const getStatusColor = (status) => {
    const statusData = statusOptions.find(s => s.value === status);
    return statusData ? statusData.color : 'default';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesChannel = selectedChannel === 'all' || lead.channel === selectedChannel;
    
    return matchesSearch && matchesStatus && matchesChannel;
  });

  const leadStats = {
    total: leads.length,
    discussion: leads.filter(l => l.status === 'discussion').length,
    followUp: leads.filter(l => l.status === 'follow-up').length,
    converted: leads.filter(l => l.status === 'converted').length,
    conversionRate: Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100),
    totalValue: leads.filter(l => l.status === 'converted').reduce((sum, l) => sum + l.budget, 0)
  };

  const handleConvertLead = (lead) => {
    setSelectedLead(lead);
    setConvertDialogOpen(true);
  };

  return (
    <PageContainer title="Enhanced Leads" description="Advanced lead management and conversion tracking">
      <Box>
        {/* Lead Statistics */}
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
                      {leadStats.total}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Leads
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
                      {leadStats.discussion + leadStats.followUp}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Active Leads
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
                    <IconTarget />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {leadStats.conversionRate}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Conversion Rate
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
                    <IconTrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {formatCurrency(leadStats.totalValue)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Converted Value
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filters */}
        <CollapsibleSection
          title="Lead Management"
          subtitle={`${filteredLeads.length} leads found`}
          defaultExpanded={true}
          headerAction={
            <Button
              startIcon={<IconPlus />}
              variant="contained"
              onClick={() => {}}
            >
              Add Lead
            </Button>
          }
        >
          <Box mb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search leads..."
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
              
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    {statusOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Channel</InputLabel>
                  <Select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    label="Channel"
                  >
                    <MenuItem value="all">All Channels</MenuItem>
                    {channelOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Leads Grid */}
          <Grid container spacing={3}>
            {filteredLeads.map((lead) => {
              const ChannelIcon = getChannelIcon(lead.channel);
              
              return (
                <Grid item xs={12} md={6} lg={4} key={lead.id}>
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
                          <Avatar sx={{ bgcolor: getChannelColor(lead.channel), width: 40, height: 40 }}>
                            <ChannelIcon size={20} color="white" />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="600">
                              {lead.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {lead.source}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box display="flex" gap={1}>
                          <Chip 
                            label={lead.priority.toUpperCase()} 
                            color={getPriorityColor(lead.priority)}
                            size="small"
                          />
                          <IconButton size="small">
                            <IconDots />
                          </IconButton>
                        </Box>
                      </Box>

                      <Box mb={2}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {lead.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {lead.phone}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>{lead.eventType}</strong> • {new Date(lead.eventDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Budget: {formatCurrency(lead.budget)} • {lead.location}
                        </Typography>
                      </Box>

                      <Box mb={2}>
                        <Chip 
                          label={statusOptions.find(s => s.value === lead.status)?.label} 
                          color={getStatusColor(lead.status)}
                          size="small"
                        />
                      </Box>

                      {lead.notes && (
                        <Box mb={2}>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {lead.notes}
                          </Typography>
                        </Box>
                      )}

                      <Divider sx={{ my: 2 }} />

                      <Box display="flex" gap={1}>
                        <Button size="small" startIcon={<IconEye />} variant="outlined">
                          View
                        </Button>
                        <Button size="small" startIcon={<IconEdit />} variant="outlined">
                          Edit
                        </Button>
                        {lead.status !== 'converted' && lead.status !== 'rejected' && (
                          <Button 
                            size="small" 
                            startIcon={<IconUserCheck />} 
                            variant="contained"
                            onClick={() => handleConvertLead(lead)}
                          >
                            Convert
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

        {/* Convert Lead Dialog */}
        <Dialog open={convertDialogOpen} onClose={() => setConvertDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Convert Lead to Client
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Convert "{selectedLead?.name}" to a client and create a new project.
            </Typography>
            
            <Box mt={2}>
              <TextField
                fullWidth
                label="Project Name"
                defaultValue={`${selectedLead?.eventType} - ${selectedLead?.name}`}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Project Budget"
                defaultValue={selectedLead?.budget}
                type="number"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Event Date"
                type="date"
                defaultValue={selectedLead?.eventDate}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConvertDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setConvertDialogOpen(false)}>
              Convert to Client
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default EnhancedLeads;