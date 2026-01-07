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
  Tab
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

const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Sarah & John Wedding',
      client: 'Sarah Johnson',
      weddingDate: '2024-06-15',
      budget: 50000,
      spent: 35000,
      status: 'active',
      progress: 70,
      priority: 'high',
      tasks: 12,
      completedTasks: 8,
      category: 'Full Service',
      notes: 'Garden ceremony, 200 guests'
    },
    {
      id: 2,
      name: 'Maria & Carlos Wedding',
      client: 'Maria Garcia',
      weddingDate: '2024-08-20',
      budget: 40000,
      spent: 12000,
      status: 'planning',
      progress: 30,
      priority: 'medium',
      tasks: 15,
      completedTasks: 4,
      category: 'Photography',
      notes: 'Beach wedding, traditional style'
    },
    {
      id: 3,
      name: 'Lisa & David Wedding',
      client: 'Lisa Chen',
      weddingDate: '2024-04-10',
      budget: 30000,
      spent: 28000,
      status: 'completed',
      progress: 100,
      priority: 'low',
      tasks: 10,
      completedTasks: 10,
      category: 'Makeup',
      notes: 'Modern minimalist theme'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tabValue, setTabValue] = useState(0);

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
      setProjects(prev => prev.filter(p => p.id !== id));
    }
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

          <Grid container spacing={3}>
            {projects
              .filter(project => {
                if (tabValue === 0) return true;
                if (tabValue === 1) return project.status === 'active';
                if (tabValue === 2) return project.status === 'planning';
                if (tabValue === 3) return project.status === 'completed';
                return true;
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
                      </Box>

                      {/* Info */}
                      <Box display="flex" flexDirection="column" gap={1.5} mb={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconCalendar size={16} color="gray" />
                          <Typography variant="body2">
                            {formatDate(project.weddingDate)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconCurrencyDollar size={16} color="gray" />
                          <Typography variant="body2">
                            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconChecklist size={16} color="gray" />
                          <Typography variant="body2">
                            {project.completedTasks} / {project.tasks} tasks completed
                          </Typography>
                        </Box>
                      </Box>

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
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained">
              {selectedProject ? 'Update' : 'Add'} Project
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ProjectManagement;
