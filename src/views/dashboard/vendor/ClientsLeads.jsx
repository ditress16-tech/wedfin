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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Event as EventIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const ClientsLeads = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const clientsData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      weddingDate: '2024-03-15',
      totalSpent: 15000,
      projects: 2,
      rating: 5,
      lastContact: '2024-01-20',
      source: 'Website',
      notes: 'Preferred photographer for outdoor weddings'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      email: 'emma@email.com',
      phone: '+1 (555) 234-5678',
      status: 'completed',
      weddingDate: '2024-02-10',
      totalSpent: 8000,
      projects: 1,
      rating: 4.8,
      lastContact: '2024-02-15',
      source: 'Referral',
      notes: 'Very satisfied with engagement shoot'
    },
    {
      id: 3,
      name: 'Lisa Brown',
      email: 'lisa@email.com',
      phone: '+1 (555) 345-6789',
      status: 'lead',
      weddingDate: '2024-05-20',
      totalSpent: 0,
      projects: 0,
      rating: null,
      lastContact: '2024-01-25',
      source: 'Social Media',
      notes: 'Interested in premium package'
    }
  ];

  const leadsData = [
    {
      id: 1,
      name: 'Anna Davis',
      email: 'anna@email.com',
      phone: '+1 (555) 456-7890',
      weddingDate: '2024-06-15',
      budget: '10000-15000',
      source: 'Google Ads',
      status: 'new',
      lastContact: '2024-01-28',
      notes: 'Looking for destination wedding photographer'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@email.com',
      phone: '+1 (555) 567-8901',
      weddingDate: '2024-07-10',
      budget: '5000-8000',
      source: 'Instagram',
      status: 'contacted',
      lastContact: '2024-01-26',
      notes: 'Budget-conscious, interested in basic package'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'lead': return 'warning';
      case 'new': return 'info';
      case 'contacted': return 'secondary';
      default: return 'default';
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event, client) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const clientStats = {
    totalClients: clientsData.length,
    activeClients: clientsData.filter(c => c.status === 'active').length,
    totalLeads: leadsData.length,
    conversionRate: 75,
    averageValue: 11000,
    totalRevenue: clientsData.reduce((sum, c) => sum + c.totalSpent, 0)
  };

  return (
    <PageContainer 
      title="Clients & Leads" 
      description="Manage your clients and track potential leads"
    >
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Clients & Leads Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Client
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mx: 'auto', mb: 1 }}>
                  <PeopleIcon color="primary" />
                </Avatar>
                <Typography variant="h4" color="primary">
                  {clientStats.totalClients}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Clients
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.light', mx: 'auto', mb: 1 }}>
                  <TrendingUpIcon color="success" />
                </Avatar>
                <Typography variant="h4" color="success.main">
                  {clientStats.totalLeads}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Leads
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.light', mx: 'auto', mb: 1 }}>
                  <EventIcon color="warning" />
                </Avatar>
                <Typography variant="h4" color="warning.main">
                  {clientStats.conversionRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conversion Rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'info.light', mx: 'auto', mb: 1 }}>
                  <MoneyIcon color="info" />
                </Avatar>
                <Typography variant="h4" color="info.main">
                  ${(clientStats.totalRevenue / 1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              placeholder="Search clients and leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* Clients and Leads Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={`Clients (${clientStats.totalClients})`} />
              <Tab label={`Leads (${clientStats.totalLeads})`} />
            </Tabs>
          </Box>

          {/* Clients Tab */}
          {tabValue === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Client</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Wedding Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Projects</TableCell>
                    <TableCell>Total Spent</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientsData
                    .filter(client => 
                      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      client.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((client) => (
                    <TableRow key={client.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                            {client.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">
                              {client.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Source: {client.source}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {client.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {client.phone}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {new Date(client.weddingDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={client.status}
                          color={getStatusColor(client.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{client.projects}</TableCell>
                      <TableCell>${client.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>
                        {client.rating && (
                          <Box display="flex" alignItems="center">
                            <StarIcon sx={{ color: 'warning.main', mr: 0.5, fontSize: 16 }} />
                            {client.rating}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e, client)}
                        >
                          <MoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Leads Tab */}
          {tabValue === 1 && (
            <Box p={2}>
              <List>
                {leadsData
                  .filter(lead => 
                    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((lead) => (
                  <ListItem key={lead.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.light' }}>
                        {lead.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle1">
                            {lead.name}
                          </Typography>
                          <Chip
                            label={lead.status}
                            color={getStatusColor(lead.status)}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {lead.email} • {lead.phone}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Wedding: {new Date(lead.weddingDate).toLocaleDateString()} • Budget: ${lead.budget}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Source: {lead.source} • Last contact: {new Date(lead.lastContact).toLocaleDateString()}
                          </Typography>
                          {lead.notes && (
                            <Typography variant="body2" color="primary">
                              Note: {lead.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, lead)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Card>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <EmailIcon sx={{ mr: 1 }} />
            Send Email
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <PhoneIcon sx={{ mr: 1 }} />
            Call Client
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <EventIcon sx={{ mr: 1 }} />
            Schedule Meeting
          </MenuItem>
        </Menu>

        {/* Add Client Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" type="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Wedding Date" type="date" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Notes" multiline rows={3} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained">Add Client</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ClientsLeads;