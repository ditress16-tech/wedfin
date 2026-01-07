import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const EventSetup = () => {
  const [setupTasks, setSetupTasks] = useState([
    {
      id: 1,
      task: 'Sound System Setup',
      status: 'completed',
      assignedTo: 'Tech Team A',
      estimatedTime: '2 hours',
      priority: 'high'
    },
    {
      id: 2,
      task: 'Lighting Installation',
      status: 'in-progress',
      assignedTo: 'Tech Team B',
      estimatedTime: '3 hours',
      priority: 'high'
    },
    {
      id: 3,
      task: 'Table & Chair Arrangement',
      status: 'pending',
      assignedTo: 'Setup Crew',
      estimatedTime: '1.5 hours',
      priority: 'medium'
    },
    {
      id: 4,
      task: 'Decoration Setup',
      status: 'pending',
      assignedTo: 'Decoration Team',
      estimatedTime: '4 hours',
      priority: 'medium'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    task: '',
    assignedTo: '',
    estimatedTime: '',
    priority: 'medium'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setFormData({
      task: '',
      assignedTo: '',
      estimatedTime: '',
      priority: 'medium'
    });
    setOpenDialog(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      task: task.task,
      assignedTo: task.assignedTo,
      estimatedTime: task.estimatedTime,
      priority: task.priority
    });
    setOpenDialog(true);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      setSetupTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...formData }
          : task
      ));
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        status: 'pending'
      };
      setSetupTasks(prev => [...prev, newTask]);
    }
    setOpenDialog(false);
  };

  const handleDeleteTask = (taskId) => {
    setSetupTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setSetupTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center">
              <SettingsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Event Setup Tasks</Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </Box>

          <List>
            {setupTasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: 'background.paper'
                }}
              >
                <ListItemIcon>
                  {task.status === 'completed' ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <ScheduleIcon color="action" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2">
                        {task.task}
                      </Typography>
                      <Chip
                        label={task.status}
                        size="small"
                        color={getStatusColor(task.status)}
                      />
                      <Chip
                        label={task.priority}
                        size="small"
                        color={getPriorityColor(task.priority)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Assigned to: {task.assignedTo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Estimated time: {task.estimatedTime}
                      </Typography>
                    </Box>
                  }
                />
                <Box display="flex" gap={1}>
                  <Tooltip title="Edit Task">
                    <IconButton
                      size="small"
                      onClick={() => handleEditTask(task)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Task">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  {task.status !== 'completed' && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleStatusChange(
                        task.id, 
                        task.status === 'pending' ? 'in-progress' : 'completed'
                      )}
                    >
                      {task.status === 'pending' ? 'Start' : 'Complete'}
                    </Button>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>

          {setupTasks.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body2" color="text.secondary">
                No setup tasks yet. Add your first task to get started.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTask ? 'Edit Setup Task' : 'Add New Setup Task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Description"
                value={formData.task}
                onChange={(e) => setFormData(prev => ({ ...prev, task: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Assigned To"
                value={formData.assignedTo}
                onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Time"
                value={formData.estimatedTime}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                placeholder="e.g., 2 hours"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveTask} 
            variant="contained"
            disabled={!formData.task || !formData.assignedTo}
          >
            {editingTask ? 'Update' : 'Add'} Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventSetup;