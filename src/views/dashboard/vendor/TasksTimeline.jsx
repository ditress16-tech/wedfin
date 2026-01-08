import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  LinearProgress,
  Tabs,
  Tab,
  Divider,
  Stack,
  Avatar
} from '@mui/material';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
  IconCalendar,
  IconClock,
  IconFlag,
  IconUser,
  IconChecklist,
  IconAlertCircle,
  IconCircle,
  IconCircleCheck,
  IconCircleDot
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';

const TasksTimeline = () => {
  const { getVendorCategory } = useAuth();
  const { projects } = useVendor();
  const vendorCategory = getVendorCategory();

  // Tasks by category
  const tasksByCategory = {
    photography: [
      {
        id: 1,
        title: 'Pre-wedding consultation',
        project: 'Sarah & John Wedding Photography',
        description: 'Meet with couple to discuss photography style and preferences',
        dueDate: '2024-02-10',
        priority: 'high',
        status: 'completed',
        assignedTo: 'John Smith',
        category: 'Consultation'
      },
      {
        id: 2,
        title: 'Equipment preparation',
        project: 'Sarah & John Wedding Photography',
        description: 'Check and prepare all cameras, lenses, and backup equipment',
        dueDate: '2024-02-14',
        priority: 'high',
        status: 'in-progress',
        assignedTo: 'John Smith',
        category: 'Preparation'
      },
      {
        id: 3,
        title: 'Wedding day shooting',
        project: 'Sarah & John Wedding Photography',
        description: 'Full day wedding photography coverage',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'John Smith',
        category: 'Shooting'
      },
      {
        id: 4,
        title: 'Photo selection & editing',
        project: 'Sarah & John Wedding Photography',
        description: 'Select best photos and perform professional editing',
        dueDate: '2024-02-25',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Emma Wilson',
        category: 'Post-production'
      },
      {
        id: 5,
        title: 'Deliver final photos',
        project: 'Sarah & John Wedding Photography',
        description: 'Upload to online gallery and deliver USB drive',
        dueDate: '2024-03-01',
        priority: 'high',
        status: 'pending',
        assignedTo: 'John Smith',
        category: 'Delivery'
      }
    ],
    makeup: [
      {
        id: 1,
        title: 'Makeup trial session',
        project: 'Sarah Bridal Makeup',
        description: 'First makeup trial to determine the perfect look',
        dueDate: '2024-02-05',
        priority: 'high',
        status: 'completed',
        assignedTo: 'Sarah Johnson',
        category: 'Trial'
      },
      {
        id: 2,
        title: 'Product preparation',
        project: 'Sarah Bridal Makeup',
        description: 'Prepare all makeup products and tools',
        dueDate: '2024-02-14',
        priority: 'medium',
        status: 'in-progress',
        assignedTo: 'Sarah Johnson',
        category: 'Preparation'
      },
      {
        id: 3,
        title: 'Wedding day makeup',
        project: 'Sarah Bridal Makeup',
        description: 'Bridal makeup and hair styling on wedding day',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'Sarah Johnson',
        category: 'Application'
      },
      {
        id: 4,
        title: 'Touch-up service',
        project: 'Sarah Bridal Makeup',
        description: 'Provide touch-up service during the event',
        dueDate: '2024-02-15',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Lisa Chen',
        category: 'Touch-up'
      },
      {
        id: 5,
        title: 'Follow-up & feedback',
        project: 'Sarah Bridal Makeup',
        description: 'Get feedback and photos from the bride',
        dueDate: '2024-02-20',
        priority: 'low',
        status: 'pending',
        assignedTo: 'Sarah Johnson',
        category: 'Follow-up'
      }
    ],
    catering: [
      {
        id: 1,
        title: 'Menu tasting session',
        project: 'Sarah Wedding Banquet',
        description: 'Menu tasting with couple to finalize dishes',
        dueDate: '2024-02-05',
        priority: 'high',
        status: 'completed',
        assignedTo: 'Chef Robert',
        category: 'Planning'
      },
      {
        id: 2,
        title: 'Ingredient procurement',
        project: 'Sarah Wedding Banquet',
        description: 'Order and prepare all ingredients',
        dueDate: '2024-02-13',
        priority: 'high',
        status: 'in-progress',
        assignedTo: 'David Lee',
        category: 'Preparation'
      },
      {
        id: 3,
        title: 'Food preparation',
        project: 'Sarah Wedding Banquet',
        description: 'Prepare all dishes for 200 guests',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'Chef Robert',
        category: 'Cooking'
      },
      {
        id: 4,
        title: 'Setup & service',
        project: 'Sarah Wedding Banquet',
        description: 'Setup buffet and provide service during event',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'Anna Martinez',
        category: 'Service'
      },
      {
        id: 5,
        title: 'Cleanup & feedback',
        project: 'Sarah Wedding Banquet',
        description: 'Cleanup and collect client feedback',
        dueDate: '2024-02-16',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Anna Martinez',
        category: 'Cleanup'
      }
    ],
    venue: [
      {
        id: 1,
        title: 'Venue site visit',
        project: 'Sarah Garden Wedding Venue',
        description: 'Show venue to couple and discuss setup options',
        dueDate: '2024-02-01',
        priority: 'high',
        status: 'completed',
        assignedTo: 'James Wilson',
        category: 'Planning'
      },
      {
        id: 2,
        title: 'Decoration planning',
        project: 'Sarah Garden Wedding Venue',
        description: 'Plan decoration layout and theme',
        dueDate: '2024-02-10',
        priority: 'medium',
        status: 'in-progress',
        assignedTo: 'Emily Davis',
        category: 'Planning'
      },
      {
        id: 3,
        title: 'Venue preparation',
        project: 'Sarah Garden Wedding Venue',
        description: 'Clean and prepare venue for the event',
        dueDate: '2024-02-14',
        priority: 'high',
        status: 'pending',
        assignedTo: 'Tom Anderson',
        category: 'Preparation'
      },
      {
        id: 4,
        title: 'Setup & decoration',
        project: 'Sarah Garden Wedding Venue',
        description: 'Setup all decorations and equipment',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'Emily Davis',
        category: 'Setup'
      },
      {
        id: 5,
        title: 'Event coordination',
        project: 'Sarah Garden Wedding Venue',
        description: 'Coordinate event and manage venue during wedding',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'pending',
        assignedTo: 'James Wilson',
        category: 'Coordination'
      }
    ]
  };

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
    assignedTo: '',
    category: ''
  });

  useEffect(() => {
    // Load tasks based on vendor category
    if (vendorCategory && tasksByCategory[vendorCategory]) {
      setTasks(tasksByCategory[vendorCategory]);
      setFilteredTasks(tasksByCategory[vendorCategory]);
    }
  }, [vendorCategory]);

  useEffect(() => {
    // Filter tasks based on tab
    if (tabValue === 0) {
      setFilteredTasks(tasks);
    } else if (tabValue === 1) {
      setFilteredTasks(tasks.filter(t => t.status === 'pending'));
    } else if (tabValue === 2) {
      setFilteredTasks(tasks.filter(t => t.status === 'in-progress'));
    } else if (tabValue === 3) {
      setFilteredTasks(tasks.filter(t => t.status === 'completed'));
    }
  }, [tabValue, tasks]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData(task);
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        project: projects[0]?.name || '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
        assignedTo: '',
        category: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id
          ? { ...formData, id: task.id }
          : task
      ));
    } else {
      const newTask = {
        ...formData,
        id: Math.max(...tasks.map(t => t.id), 0) + 1
      };
      setTasks([...tasks, newTask]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        let newStatus = task.status;
        if (task.status === 'pending') newStatus = 'in-progress';
        else if (task.status === 'in-progress') newStatus = 'completed';
        else newStatus = 'pending';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'info'
    };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'default',
      'in-progress': 'primary',
      completed: 'success'
    };
    return colors[status] || 'default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
  };

  const stats = getTaskStats();

  return (
    <PageContainer title="Tasks & Timeline" description="Manage tasks and project timeline">
      <Box>
        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Tasks
                </Typography>
                <Typography variant="h3" fontWeight="600">
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'grey.100' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="h3" fontWeight="600">
                  {stats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.light' }}>
              <CardContent>
                <Typography variant="subtitle2" color="primary.dark" gutterBottom>
                  In Progress
                </Typography>
                <Typography variant="h3" fontWeight="600" color="primary.dark">
                  {stats.inProgress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.light' }}>
              <CardContent>
                <Typography variant="subtitle2" color="success.dark" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="h3" fontWeight="600" color="success.dark">
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Task List */}
          <Grid item xs={12} md={7}>
            <DashboardCard
              title="Tasks"
              subtitle="Manage your project tasks"
              action={
                <Button
                  variant="contained"
                  startIcon={<IconPlus size={18} />}
                  onClick={() => handleOpenDialog()}
                >
                  Add Task
                </Button>
              }
            >
              <Box>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                  <Tab label="All" />
                  <Tab label="Pending" />
                  <Tab label="In Progress" />
                  <Tab label="Completed" />
                </Tabs>

                <List>
                  {filteredTasks.map((task, index) => (
                    <React.Fragment key={task.id}>
                      <ListItem
                        sx={{
                          bgcolor: task.status === 'completed' ? 'grey.50' : 'transparent',
                          borderRadius: 1,
                          mb: 1
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={task.status === 'completed'}
                            onChange={() => handleToggleStatus(task.id)}
                            icon={<IconChecklist size={24} />}
                            checkedIcon={<IconCheck size={24} />}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                              <Typography
                                variant="subtitle2"
                                fontWeight="600"
                                sx={{
                                  textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                                }}
                              >
                                {task.title}
                              </Typography>
                              <Chip
                                label={task.priority}
                                size="small"
                                color={getPriorityColor(task.priority)}
                                sx={{ height: 20, textTransform: 'capitalize' }}
                              />
                              <Chip
                                label={task.status}
                                size="small"
                                color={getStatusColor(task.status)}
                                sx={{ height: 20, textTransform: 'capitalize' }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" mb={0.5}>
                                {task.description}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <IconCalendar size={14} />
                                  <Typography variant="caption">
                                    {formatDate(task.dueDate)}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <IconUser size={14} />
                                  <Typography variant="caption">
                                    {task.assignedTo}
                                  </Typography>
                                </Box>
                                <Chip
                                  label={task.category}
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 18 }}
                                />
                              </Box>
                            </Box>
                          }
                        />
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(task)}
                          >
                            <IconEdit size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(task.id)}
                          >
                            <IconTrash size={18} />
                          </IconButton>
                        </Box>
                      </ListItem>
                      {index < filteredTasks.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>

                {filteredTasks.length === 0 && (
                  <Box textAlign="center" py={4}>
                    <IconChecklist size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                    <Typography variant="h6" color="text.secondary">
                      No tasks found
                    </Typography>
                  </Box>
                )}
              </Box>
            </DashboardCard>
          </Grid>

          {/* Timeline */}
          <Grid item xs={12} md={5}>
            <DashboardCard title="Project Timeline" subtitle="Track project progress">
              <Box>
                {tasks
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .map((task, index) => (
                    <Box key={task.id} mb={3}>
                      <Box display="flex" gap={2}>
                        {/* Timeline Indicator */}
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: task.status === 'completed' 
                                ? 'success.main' 
                                : task.status === 'in-progress' 
                                ? 'primary.main' 
                                : 'grey.400'
                            }}
                          >
                            {task.status === 'completed' ? (
                              <IconCircleCheck size={20} />
                            ) : task.status === 'in-progress' ? (
                              <IconCircleDot size={20} />
                            ) : (
                              <IconCircle size={20} />
                            )}
                          </Avatar>
                          {index < tasks.length - 1 && (
                            <Box
                              sx={{
                                width: 2,
                                flexGrow: 1,
                                minHeight: 40,
                                bgcolor: 'grey.300',
                                my: 1
                              }}
                            />
                          )}
                        </Box>

                        {/* Timeline Content */}
                        <Box flexGrow={1}>
                          <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                            {formatDate(task.dueDate)}
                          </Typography>
                          <Card variant="outlined" sx={{ mb: 1 }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                              <Typography variant="subtitle2" fontWeight="600" mb={0.5}>
                                {task.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                {task.category}
                              </Typography>
                              <Box display="flex" gap={0.5} flexWrap="wrap">
                                <Chip
                                  label={task.status}
                                  size="small"
                                  color={getStatusColor(task.status)}
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                                <Chip
                                  label={task.priority}
                                  size="small"
                                  color={getPriorityColor(task.priority)}
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>

        {/* Add/Edit Task Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label="Project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                select
                fullWidth
                required
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.name}>
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                required
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Assigned To"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog} startIcon={<IconX size={18} />}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<IconCheck size={18} />}
              disabled={!formData.title || !formData.project || !formData.dueDate}
            >
              {editingTask ? 'Update' : 'Create'} Task
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default TasksTimeline;
