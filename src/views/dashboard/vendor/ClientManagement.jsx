import { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Tabs,
  Tab
} from '@mui/material';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconPhone,
  IconMail,
  IconUser,
  IconStar,
  IconCalendar
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { formatDate, formatCurrency } from '../../../utils/formatters';

const ClientManagement = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 234 567 8900',
      weddingDate: '2024-06-15',
      budget: 50000,
      status: 'active',
      rating: 5,
      projects: 3,
      totalSpent: 35000,
      notes: 'Prefers modern style, very organized'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.g@email.com',
      phone: '+1 234 567 8901',
      weddingDate: '2024-08-20',
      budget: 40000,
      status: 'lead',
      rating: 0,
      projects: 1,
      totalSpent: 12000,
      notes: 'Interested in traditional theme'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      email: 'lisa.c@email.com',
      phone: '+1 234 567 8902',
      weddingDate: '2024-04-10',
      budget: 30000,
      status: 'completed',
      rating: 5,
      projects: 2,
      totalSpent: 28000,
      notes: 'Great communication, referred 2 friends'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleAddClient = () => {
    setSelectedClient(null);
    setOpenDialog(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      lead: 'warning',
      completed: 'info',
      inactive: 'default'
    };
    return colors[status] || 'default';
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              bgcolor: `${color}.light`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="700">
              {value}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const leads = clients.filter(c => c.status === 'lead').length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <PageContainer title="Client Management" description="Manage your wedding clients">
      <Box>
        {/* Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Clients"
              value={totalClients}
              icon={IconUser}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Clients"
              value={activeClients}
              icon={IconStar}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="New Leads"
              value={leads}
              icon={IconCalendar}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: 'info.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h5">💰</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {formatCurrency(totalRevenue)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Revenue
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Clients Table */}
        <DashboardCard
          title="Clients"
          subtitle="Manage your wedding clients and leads"
          action={
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={handleAddClient}
            >
              Add Client
            </Button>
          }
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="All Clients" />
              <Tab label="Active" />
              <Tab label="Leads" />
              <Tab label="Completed" />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Wedding Date</TableCell>
                  <TableCell align="right">Budget</TableCell>
                  <TableCell align="right">Spent</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients
                  .filter(client => {
                    if (tabValue === 0) return true;
                    if (tabValue === 1) return client.status === 'active';
                    if (tabValue === 2) return client.status === 'lead';
                    if (tabValue === 3) return client.status === 'completed';
                    return true;
                  })
                  .map((client) => (
                    <TableRow key={client.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {client.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="600">
                              {client.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {client.projects} project{client.projects !== 1 ? 's' : ''}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column" gap={0.5}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconMail size={14} />
                            <Typography variant="caption">{client.email}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconPhone size={14} />
                            <Typography variant="caption">{client.phone}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(client.weddingDate)}</TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight="600">
                          {formatCurrency(client.budget)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight="600">
                          {formatCurrency(client.totalSpent)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={client.status}
                          size="small"
                          color={getStatusColor(client.status)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        {client.rating > 0 ? (
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconStar size={16} fill="gold" color="gold" />
                            <Typography variant="subtitle2">{client.rating}</Typography>
                          </Box>
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            No rating
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditClient(client)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* Add/Edit Client Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedClient ? 'Edit Client' : 'Add New Client'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  defaultValue={selectedClient?.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue={selectedClient?.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue={selectedClient?.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Wedding Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={selectedClient?.weddingDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  defaultValue={selectedClient?.budget}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Status"
                  select
                  SelectProps={{ native: true }}
                  defaultValue={selectedClient?.status || 'lead'}
                >
                  <option value="lead">Lead</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="inactive">Inactive</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  defaultValue={selectedClient?.notes}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained">
              {selectedClient ? 'Update' : 'Add'} Client
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ClientManagement;
