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
  LinearProgress,
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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconCurrencyDollar,
  IconChecklist,
  IconClock
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { formatDate, formatCurrency, getStatusColor } from '../../../utils/formatters';
import { useVendor } from '../../../context/VendorContext';
import { useFinancial } from '../../../context/FinancialContext';

const ProjectManagement = () => {
  const { projects: vendorProjects, deleteProject } = useVendor();
  const { getTransactionsByProject, addClientTransaction } = useFinancial();

  const projects = (vendorProjects || []).map((project) => ({
    id: project.id,
    name: project.name,
    client: project.client,
    clientId: project.clientId,
    weddingDate: project.weddingDate || project.date,
    budget: project.budget,
    spent:
      typeof project.spent === 'number'
        ? project.spent
        : project.budget && project.progress
        ? (project.budget * project.progress) / 100
        : 0,
    status: project.status,
    progress: project.progress,
    priority: project.priority,
    tasks: project.tasks ?? 0,
    completedTasks: project.completedTasks ?? 0,
    category: project.category || project.type || '',
    notes: project.notes || ''
  }));

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const [financeFilter, setFinanceFilter] = useState('all'); // all | highValue | outstanding
  const [sortBy, setSortBy] = useState('name'); // name | revenueDesc | outstandingDesc

  const [txDialogOpen, setTxDialogOpen] = useState(false);
  const [txProject, setTxProject] = useState(null);
  const [txForm, setTxForm] = useState({
    type: 'income',
    amount: '',
    description: '',
    status: 'completed',
  });

  const handleAddProject = () => {
    setSelectedProject(null);
    setOpenDialog(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const openTxDialog = (project) => {
    setTxProject(project);
    setTxForm({ type: 'income', amount: '', description: '', status: 'completed' });
    setTxDialogOpen(true);
  };

  const closeTxDialog = () => {
    setTxDialogOpen(false);
    setTxProject(null);
  };

  const handleTxFormChange = (field, value) => {
    setTxForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTransaction = () => {
    if (!txProject) return;
    const numericAmount = Number(txForm.amount);
    if (!numericAmount || !txForm.type) return;

    addClientTransaction({
      clientId: txProject.clientId,
      projectId: txProject.id,
      type: txForm.type,
      amount: numericAmount,
      description:
        txForm.description ||
        `${txForm.type === 'income' ? 'Income' : 'Expense'} for ${txProject.name}`,
      status: txForm.status || 'completed',
    });

    closeTxDialog();
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
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
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalRevenue = projects.reduce((sum, p) => sum + p.spent, 0);

  const getProjectFinancialSummary = (projectId) => {
    const txs = getTransactionsByProject(projectId);
    if (!txs || txs.length === 0) {
      return { income: 0, expense: 0, net: 0, outstanding: 0 };
    }

    const income = txs
      .filter((t) => (t.amount || 0) > 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const expense = txs
      .filter((t) => (t.amount || 0) < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);

    const net = txs.reduce((sum, t) => sum + (t.amount || 0), 0);

    const outstanding = txs
      .filter((t) => t.type === 'income' && t.status === 'pending')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    return { income, expense, net, outstanding };
  };

  return (
    <PageContainer title="Project Management" description="Manage your wedding projects">
      <Box>
        {/* Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Projects"
              value={totalProjects}
              icon={IconChecklist}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Projects"
              value={activeProjects}
              icon={IconClock}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed"
              value={completedProjects}
              icon={IconCalendar}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              icon={IconCurrencyDollar}
              color="warning"
            />
          </Grid>
        </Grid>

        {/* Projects Grid */}
        <DashboardCard
          title="Projects"
          subtitle="Manage your wedding projects"
          action={
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={handleAddProject}
            >
              Add Project
            </Button>
          }
>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="All Projects" />
              <Tab label="Active" />
              <Tab label="Planning" />
              <Tab label="Completed" />
            </Tabs>
          </Box>

          {/* Finance-based filters & sorting */}
          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            {/* TODO: add project-level finance filters/controls here if needed */}
          </Box>

          <Grid container spacing={3}>
            {projects
              .filter(project => {
                if (tabValue === 0) return true;
                if (tabValue === 1) return project.status === 'active';
                if (tabValue === 2) return project.status === 'planning';
                if (tabValue === 3) return project.status === 'completed';
                return true;
              })
              .filter((project) => {
                const financial = getProjectFinancialSummary(project.id);
                if (financeFilter === 'highValue') {
                  return (financial.net || project.spent || 0) > 10000;
                }
                if (financeFilter === 'outstanding') {
                  return financial.outstanding > 0;
                }
                return true;
              })
              .sort((a, b) => {
                if (sortBy === 'name') {
                  return a.name.localeCompare(b.name);
                }
                const fa = getProjectFinancialSummary(a.id);
                const fb = getProjectFinancialSummary(b.id);
                if (sortBy === 'revenueDesc') {
                  return (fb.net || fb.income || 0) - (fa.net || fa.income || 0);
                }
                if (sortBy === 'outstandingDesc') {
                  return (fb.outstanding || 0) - (fa.outstanding || 0);
                }
                return 0;
              })
              .map((project) => (
                <Grid item xs={12} md={6} lg={4} key={project.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Header */}
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                        <Box>
                          <Typography variant="h6" fontWeight="600" mb={0.5}>
                            {project.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {project.client}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditProject(project)}
                          >
                            <IconEdit size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => openTxDialog(project)}
                          >
                            <IconCurrencyDollar size={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <IconTrash size={16} />
                          </IconButton>
                        </Stack>
                      </Box>

                      {/* Status & Priority */}
                      <Box display="flex" gap={1} mb={2}>
                        <Chip
                          label={project.status}
                          size="small"
                          color={getStatusColor(project.status)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                        <Chip
                          label={project.priority}
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                        {new Date(project.weddingDate) < new Date() && project.status !== 'completed' && (
                          <Chip
                            label="Overdue"
                            size="small"
                            color="error"
                          />
                        )}
                      </Box>

                      {/* Info */}
                      <Box display="flex" flexDirection="column" gap={1.5} mb={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconCalendar size={16} color="gray" />
                          <Typography variant="body2">
                            {formatDate(project.weddingDate)}
                          </Typography>
                        </Box>
                      <Box display="flex" flexDirection="column" gap={0.25}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconCurrencyDollar size={16} color="gray" />
                          <Typography variant="body2">
                            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          color={project.spent > project.budget ? 'error.main' : 'text.secondary'}
                        >
                          {project.spent > project.budget
                            ? `Over budget by ${formatCurrency(project.spent - project.budget)}`
                            : `Remaining budget ${formatCurrency(project.budget - project.spent)}`}
                        </Typography>
                      </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconChecklist size={16} color="gray" />
                          <Typography variant="body2">
                            {project.completedTasks} / {project.tasks} tasks completed
                          </Typography>
                        </Box>
                      </Box>

                      {/* Financial Snapshot */}
                      {(() => {
                        const financial = getProjectFinancialSummary(project.id);
                        if (!financial.income && !financial.expense && !financial.outstanding) {
                          return null;
                        }
                        return (
                          <Box mt={2} mb={1.5}>
                            <Typography variant="caption" color="text.secondary">
                              Financial: {formatCurrency(financial.income)} in / {formatCurrency(financial.expense)} out
                            </Typography>
                            {financial.outstanding > 0 && (
                              <Typography variant="caption" color="warning.main" display="block">
                                Outstanding: {formatCurrency(financial.outstanding)}
                              </Typography>
                            )}
                          </Box>
                        );
                      })()}

                      {/* Progress */}
                      <Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="caption" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="caption" fontWeight="600">
                            {project.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{ height: 8, borderRadius: 1 }}
                        />
                      </Box>

                      {/* Notes */}
                      {project.notes && (
                        <Box mt={2} p={1.5} bgcolor="grey.50" borderRadius={1}>
                          <Typography variant="caption" color="text.secondary">
                            {project.notes}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </DashboardCard>

        {/* Add/Edit Project Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedProject ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  defaultValue={selectedProject?.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  defaultValue={selectedProject?.client}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Wedding Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={selectedProject?.weddingDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  defaultValue={selectedProject?.budget}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  defaultValue={selectedProject?.category}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Status"
                  select
                  SelectProps={{ native: true }}
                  defaultValue={selectedProject?.status || 'planning'}
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Priority"
                  select
                  SelectProps={{ native: true }}
                  defaultValue={selectedProject?.priority || 'medium'}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  defaultValue={selectedProject?.notes}
                />
              </Grid>
            </Grid>

            {selectedProject && (
              <>
                <Divider sx={{ my: 3 }} />
                {(() => {
                  const financial = getProjectFinancialSummary(selectedProject.id);
                  const txs = getTransactionsByProject(selectedProject.id) || [];

                  return (
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Financial Overview
                      </Typography>
                      <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
                          <Card>
                            <CardContent>
                              <Typography variant="caption" color="text.secondary">
                                Outstanding (Pending)
                              </Typography>
                              <Typography
                                variant="h6"
                                fontWeight={700}
                                color={financial.outstanding > 0 ? 'warning.main' : 'text.primary'}
                              >
                                {formatCurrency(financial.outstanding)}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>

                      <Typography variant="subtitle2" gutterBottom>
                        Recent Transactions
                      </Typography>
                      {txs.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No transactions for this project yet.
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
                                    <TableCell>
                                      {tx.date ? new Date(tx.date).toLocaleDateString() : '-'}
                                    </TableCell>
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
              </>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained">
              {selectedProject ? 'Update' : 'Add'} Project
            </Button>
          </DialogActions>
        </Dialog>

        {/* Project Transaction Dialog */}
        <Dialog open={txDialogOpen} onClose={closeTxDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {txProject ? `Add Transaction - ${txProject.name}` : 'Add Transaction'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  value={txForm.type}
                  onChange={(e) => handleTxFormChange('type', e.target.value)}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                label="Amount"
                type="number"
                value={txForm.amount}
                onChange={(e) => handleTxFormChange('amount', e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Description"
                value={txForm.description}
                onChange={(e) => handleTxFormChange('description', e.target.value)}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={txForm.status}
                  onChange={(e) => handleTxFormChange('status', e.target.value)}
                >
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={closeTxDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveTransaction}
              disabled={!txForm.amount || !Number(txForm.amount)}
            >
              Save Transaction
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ProjectManagement;
