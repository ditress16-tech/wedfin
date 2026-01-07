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
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const WeddingProjects = () => {
  const { user } = useAuth();
  const { projects } = useVendor();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      projectName: 'Sarah & John Wedding',
      clientName: 'Sarah Johnson',
      weddingDate: '2024-03-15',
      venue: 'Grand Ballroom Hotel',
      status: 'in-progress',
      progress: 75,
      budget: 15000,
      paid: 10000,
      services: ['Photography', 'Video'],
      startDate: '2024-01-10',
      deliveryDate: '2024-04-15',
      priority: 'high'
    },
    {
      id: 2,
      projectName: 'Emma & Michael Engagement',
      clientName: 'Emma Wilson',
      weddingDate: '2024-04-20',
      venue: 'Garden Pavilion',
      status: 'completed',
      progress: 100,
      budget: 8000,
      paid: 8000,
      services: ['Photography'],
      startDate: '2024-01-20',
      deliveryDate: '2024-02-20',
      priority: 'medium'
    },
    {
      id: 3,
      projectName: 'Lisa & David Wedding',
      clientName: 'Lisa Brown',
      weddingDate: '2024-05-10',
      venue: 'Beachside Resort',
      status: 'planning',
      progress: 25,
      budget: 20000,
      paid: 5000,
      services: ['Photography', 'Video', 'Drone'],
      startDate: '2024-02-01',
      deliveryDate: '2024-06-10',
      priority: 'high'
    },
    {
      id: 4,
      projectName: 'Anna & Robert Anniversary',
      clientName: 'Anna Davis',
      weddingDate: '2024-06-15',
      venue: 'Private Estate',
      status: 'pending',
      progress: 0,
      budget: 12000,
      paid: 0,
      services: ['Photography'],
      startDate: '2024-03-01',
      deliveryDate: '2024-07-15',
      priority: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'planning': return 'warning';
      case 'pending': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (tabValue) {
      case 0: return matchesSearch; // All
      case 1: return matchesSearch && project.status === 'in-progress';
      case 2: return matchesSearch && project.status === 'completed';
      case 3: return matchesSearch && (project.status === 'planning' || project.status === 'pending');
      default: return matchesSearch;
    }
  });

  const projectStats = {
    total: projectsData.length,
    inProgress: projectsData.filter(p => p.status === 'in-progress').length,
    completed: projectsData.filter(p => p.status === 'completed').length,
    pending: projectsData.filter(p => p.status === 'planning' || p.status === 'pending').length,
    totalRevenue: projectsData.reduce((sum, p) => sum + p.budget, 0),
    paidAmount: projectsData.reduce((sum, p) => sum + p.paid, 0)
  };

  return (
    <PageContainer 
      title="Wedding Projects" 
      description="Manage all your wedding photography projects"
    >
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Wedding Projects</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Project
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mx: 'auto', mb: 1 }}>
                  <EventIcon color="primary" />
                </Avatar>
                <Typography variant="h4" color="primary">
                  {projectStats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Projects
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
                  {projectStats.inProgress}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  In Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.light', mx: 'auto', mb: 1 }}>
                  <EventIcon color="success" />
                </Avatar>
                <Typography variant="h4" color="success.main">
                  {projectStats.completed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
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
                  ${(projectStats.totalRevenue / 1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Revenue
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
              >
                Filter
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={`All (${projectStats.total})`} />
              <Tab label={`In Progress (${projectStats.inProgress})`} />
              <Tab label={`Completed (${projectStats.completed})`} />
              <Tab label={`Pending (${projectStats.pending})`} />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Wedding Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">
                          {project.projectName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project.venue}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                          {project.clientName.charAt(0)}
                        </Avatar>
                        {project.clientName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(project.weddingDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="body2">
                          {project.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">
                          ${project.budget.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Paid: ${project.paid.toLocaleString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.priority}
                        color={getPriorityColor(project.priority)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, project)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredProjects.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No projects found matching your criteria
              </Typography>
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
            <ViewIcon sx={{ mr: 1 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <EditIcon sx={{ mr: 1 }} />
            Edit Project
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete Project
          </MenuItem>
        </Menu>
      </Box>
    </PageContainer>
  );
};

export default WeddingProjects;