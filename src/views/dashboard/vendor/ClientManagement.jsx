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
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
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
import { useFinancial } from '../../../context/FinancialContext';
import { useVendor } from '../../../context/VendorContext';

const ClientManagement = () => {
  const { getTransactionsByClient, addClientTransaction } = useFinancial();
  const { projects } = useVendor();
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
  const [financeFilter, setFinanceFilter] = useState('all'); // all | highValue | outstanding
  const [sortBy, setSortBy] = useState('name'); // name | revenueDesc | revenueAsc

  const [newTx, setNewTx] = useState({
    type: 'income',
    amount: '',
    description: '',
    status: 'completed',
  });

  const handleAddClient = () => {
    setSelectedClient(null);
    setOpenDialog(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const getClientProjectCount = (clientId) => {
    if (!projects || projects.length === 0) return 0;
    return projects.filter((p) => p.clientId === clientId).length;
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleNewTxChange = (field, value) => {
    setNewTx((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTransactionForClient = () => {
    if (!selectedClient) return;
    const numericAmount = Number(newTx.amount);
    if (!numericAmount || !newTx.type) return;

    addClientTransaction({
      clientId: selectedClient.id,
      projectId: undefined,
      type: newTx.type,
      amount: numericAmount,
      description: newTx.description || `${newTx.type === 'income' ? 'Income' : 'Expense'} for ${selectedClient.name}`,
      status: newTx.status || 'completed',
    });

    // reset form
    setNewTx({ type: 'income', amount: '', description: '', status: 'completed' });
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

  const getClientFinancialSummary = (clientId) => {
    const txs = getTransactionsByClient(clientId);
    if (!txs || txs.length === 0) {
      return {
        income: 0,
        expense: 0,
        net: 0,
        lastDate: null,
      };
    }

    const income = txs
      .filter((t) => (t.amount || 0) > 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const expense = txs
      .filter((t) => (t.amount || 0) < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);

    const net = txs.reduce((sum, t) => sum + (t.amount || 0), 0);

    const lastDate = txs.reduce((latest, t) => {
      if (!t.date) return latest;
      const d = new Date(t.date);
      return !latest || d > latest ? d : latest;
    }, null);

    return { income, expense, net, lastDate };
  };

  const getClientOutstanding = (clientId) => {
    const txs = getTransactionsByClient(clientId);
    if (!txs || txs.length === 0) return 0;
    return txs
      .filter((t) => t.type === 'income' && t.status === 'pending')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  };

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const leads = clients.filter(c => c.status === 'lead').length;
  const totalRevenue = clients.reduce((sum, c) => {
    const financial = getClientFinancialSummary(c.id);
    return sum + (financial.net || c.totalSpent || 0);
  }, 0);

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

          {/* Finance-based filters & sorting */}
          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Finance Filter</InputLabel>
              <Select
                value={financeFilter}
                label="Finance Filter"
                onChange={(e) => setFinanceFilter(e.target.value)}
              >
                <MenuItem value="all">All clients</MenuItem>
                <MenuItem value="highValue">High value (&gt; $10,000)</MenuItem>
                <MenuItem value="outstanding">With outstanding balance</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="revenueDesc">Revenue (high to low)</MenuItem>
                <MenuItem value="revenueAsc">Revenue (low to high)</MenuItem>
              </Select>
            </FormControl>
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
                  .filter((client) => {
                    const financial = getClientFinancialSummary(client.id);
                    const outstanding = getClientOutstanding(client.id);

                    if (financeFilter === 'highValue') {
                      return (financial.net || client.totalSpent || 0) > 10000;
                    }
                    if (financeFilter === 'outstanding') {
                      return outstanding > 0;
                    }
                    return true;
                  })
                  .sort((a, b) => {
                    if (sortBy === 'name') {
                      return a.name.localeCompare(b.name);
                    }
                    const fa = getClientFinancialSummary(a.id).net || a.totalSpent || 0;
                    const fb = getClientFinancialSummary(b.id).net || b.totalSpent || 0;
                    if (sortBy === 'revenueDesc') return fb - fa;
                    if (sortBy === 'revenueAsc') return fa - fb;
                    return 0;
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
                              {(() => {
                                const count = getClientProjectCount(client.id) || client.projects || 0;
                                return `${count} project${count !== 1 ? 's' : ''}`;
                              })()}
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
                        {(() => {
                          const financial = getClientFinancialSummary(client.id);
                          const value = financial.net || client.totalSpent;
                          return (
                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                              <Typography variant="subtitle2" fontWeight="600">
                                {formatCurrency(value)}
                              </Typography>
                              {financial.income !== 0 || financial.expense !== 0 ? (
                                <Typography variant="caption" color="text.secondary">
                                  {formatCurrency(financial.income)} in / {formatCurrency(financial.expense)} out
                                </Typography>
                              ) : null}
                            </Box>
                          );
                        })()}
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

        {/* Add/Edit Client Dialog + Financial Detail */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          <DialogTitle>
            {selectedClient ? 'Client Details & Financial Overview' : 'Add New Client'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {/* Left: Client form */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Client Information
                </Typography>
                <Grid container spacing={2}>
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
              </Grid>

              {/* Right: Financial & Project summary for existing client */}
              {selectedClient && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Financial Overview
                  </Typography>
                  {(() => {
                    const financial = getClientFinancialSummary(selectedClient.id);
                    const outstanding = getClientOutstanding(selectedClient.id);
                    const txs = getTransactionsByClient(selectedClient.id) || [];
                    const projectCount = getClientProjectCount(selectedClient.id);

                    return (
                      <Box>
                        <Grid container spacing={2} mb={2}>
                          <Grid item xs={12} sm={6}>
                            <Card>
                              <CardContent>
                                <Typography variant="caption" color="text.secondary">
                                  Total Income
                                </Typography>
                                <Typography variant="h6" fontWeight={700}>
                                  {formatCurrency(financial.income)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Card>
                              <CardContent>
                                <Typography variant="caption" color="text.secondary">
                                  Total Expense
                                </Typography>
                                <Typography variant="h6" fontWeight={700}>
                                  {formatCurrency(financial.expense)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Card>
                              <CardContent>
                                <Typography variant="caption" color="text.secondary">
                                  Net Revenue
                                </Typography>
                                <Typography variant="h6" fontWeight={700}>
                                  {formatCurrency(financial.net)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Card>
                              <CardContent>
                                <Typography variant="caption" color="text.secondary">
                                  Outstanding (Pending)
                                </Typography>
                                <Typography
                                  variant="h6"
                                  fontWeight={700}
                                  color={outstanding > 0 ? 'warning.main' : 'text.primary'}
                                >
                                  {formatCurrency(outstanding)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" gutterBottom>
                          Related Projects ({projectCount})
                        </Typography>
                        {projectCount === 0 ? (
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            No linked projects for this client.
                          </Typography>
                        ) : (
                          <Box mb={2}>
                            {projects
                              .filter((p) => p.clientId === selectedClient.id)
                              .slice(0, 3)
                              .map((p) => (
                                <Box
                                  key={p.id}
                                  sx={{
                                    p: 1.5,
                                    mb: 1,
                                    borderRadius: 1,
                                    bgcolor: 'grey.50',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                  }}
                                >
                                  <Typography variant="subtitle2" fontWeight={600}>
                                    {p.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatDate(p.weddingDate || p.date)} • {p.status}
                                  </Typography>
                                </Box>
                              ))}
                          </Box>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" gutterBottom>
                          Recent Transactions
                        </Typography>

                        {/* Quick add transaction for this client */}
                        <Box display="flex" flexWrap="wrap" gap={1.5} mb={2} alignItems="center">
                          <FormControl size="small" sx={{ minWidth: 110 }}>
                            <InputLabel>Type</InputLabel>
                            <Select
                              label="Type"
                              value={newTx.type}
                              onChange={(e) => handleNewTxChange('type', e.target.value)}
                            >
                              <MenuItem value="income">Income</MenuItem>
                              <MenuItem value="expense">Expense</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            size="small"
                            label="Amount"
                            type="number"
                            value={newTx.amount}
                            onChange={(e) => handleNewTxChange('amount', e.target.value)}
                          />
                          <TextField
                            size="small"
                            label="Description"
                            sx={{ flex: 1, minWidth: 140 }}
                            value={newTx.description}
                            onChange={(e) => handleNewTxChange('description', e.target.value)}
                          />
                          <FormControl size="small" sx={{ minWidth: 130 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                              label="Status"
                              value={newTx.status}
                              onChange={(e) => handleNewTxChange('status', e.target.value)}
                            >
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="pending">Pending</MenuItem>
                            </Select>
                          </FormControl>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={handleAddTransactionForClient}
                            disabled={!newTx.amount || !Number(newTx.amount)}
                          >
                            Add
                          </Button>
                        </Box>

                        {txs.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            No transactions for this client yet.
                          </Typography>
                        ) : (
                          <TableContainer>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Description</TableCell>
                                  <TableCell align="right">Amount</TableCell>
                                  <TableCell>Status</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {txs
                                  .slice()
                                  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                                  .slice(0, 5)
                                  .map((tx) => (
                                    <TableRow key={tx.id}>
                                      <TableCell>{tx.date ? new Date(tx.date).toLocaleDateString() : '-'}</TableCell>
                                      <TableCell>{tx.description}</TableCell>
                                      <TableCell align="right">
                                        <Typography
                                          variant="body2"
                                          color={(tx.amount || 0) >= 0 ? 'success.main' : 'error.main'}
                                          fontWeight={600}
                                        >
                                          {formatCurrency(Math.abs(tx.amount || 0))}
                                        </Typography>
                                      </TableCell>
                                      <TableCell>{tx.status}</TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </Box>
                    );
                  })()}
                </Grid>
              )}
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
