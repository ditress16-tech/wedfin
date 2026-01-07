import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconPlus,
  IconEdit,
  IconCheck,
  IconUsers,
  IconChefHat
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const EventCoordination = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock event coordination data
  const events = [
    {
      id: 1,
      name: 'Sarah & John Wedding',
      date: '2024-02-15',
      time: '6:00 PM',
      venue: 'Grand Ballroom Hotel',
      guests: 200,
      status: 'in_progress',
      progress: 75,
      timeline: [
        { time: '4:00 PM', task: 'Setup kitchen equipment', status: 'completed' },
        { time: '5:00 PM', task: 'Food preparation begins', status: 'completed' },
        { time: '6:00 PM', task: 'Cocktail hour service', status: 'in_progress' },
        { time: '7:30 PM', task: 'Dinner service', status: 'pending' },
        { time: '9:00 PM', task: 'Dessert service', status: 'pending' },
        { time: '10:00 PM', task: 'Cleanup begins', status: 'pending' }
      ],
      team: ['Head Chef', '2 Cooks', '4 Servers'],
      specialRequests: ['Vegetarian options', 'Late night snacks']
    },
    {
      id: 2,
      name: 'Maria & David Wedding',
      date: '2024-03-20',
      time: '5:00 PM',
      venue: 'Garden Paradise',
      guests: 150,
      status: 'planning',
      progress: 45,
      timeline: [
        { time: '3:00 PM', task: 'Setup outdoor kitchen', status: 'pending' },
        { time: '4:00 PM', task: 'Food preparation', status: 'pending' },
        { time: '5:00 PM', task: 'Appetizer service', status: 'pending' },
        { time: '6:30 PM', task: 'Main course service', status: 'pending' },
        { time: '8:00 PM', task: 'Dessert & coffee', status: 'pending' }
      ],
      team: ['Head Chef', '1 Cook', '3 Servers'],
      specialRequests: ['Gluten-free options', 'Kids menu']
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      planning: 'info',
      in_progress: 'warning',
      completed: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getTaskStatusColor = (status) => {
    const colors = {
      completed: 'success',
      in_progress: 'warning',
      pending: 'default'
    };
    return colors[status] || 'default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleUpdateProgress = (eventId) => {
    console.log('Update progress:', eventId);
  };

  return (
    <>
      <DashboardCard 
        title="Event Coordination" 
        subtitle="Coordinate catering operations for wedding events"
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Add Event
          </Button>
        }
      >
        <Box>
          <List>
            {events.map((event, index) => (
              <ListItem 
                key={event.id} 
                divider={index < events.length - 1}
                sx={{ px: 0, alignItems: 'flex-start' }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(event.status)}.light`,
                      color: `${getStatusColor(event.status)}.main`
                    }}
                  >
                    <IconCalendarEvent size={20} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {event.name}
                      </Typography>
                      <Chip
                        label={event.status.replace('_', ' ')}
                        size="small"
                        color={getStatusColor(event.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconClock size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {formatDate(event.date)} • {event.time} • {getDaysUntil(event.date)} days to go
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconMapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {event.venue}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconUsers size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {event.guests} guests
                      </Typography>
                      
                      {/* Progress */}
                      <Box display="flex" alignItems="center" gap={1} my={1}>
                        <Typography variant="body2" color="text.secondary">
                          Progress: {event.progress}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={event.progress}
                          sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                        />
                      </Box>
                      
                      {/* Team */}
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconChefHat size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        Team: {event.team.join(', ')}
                      </Typography>
                      
                      {/* Timeline Preview */}
                      <Box mt={1}>
                        <Typography variant="body2" fontWeight="medium" gutterBottom>
                          Today's Timeline:
                        </Typography>
                        {event.timeline.slice(0, 3).map((task, taskIndex) => (
                          <Box key={taskIndex} display="flex" alignItems="center" gap={1} mb={0.5}>
                            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60 }}>
                              {task.time}
                            </Typography>
                            <Chip
                              label={task.task}
                              size="small"
                              color={getTaskStatusColor(task.status)}
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          </Box>
                        ))}
                        {event.timeline.length > 3 && (
                          <Typography variant="caption" color="text.secondary">
                            +{event.timeline.length - 3} more tasks
                          </Typography>
                        )}
                      </Box>
                      
                      {/* Special Requests */}
                      {event.specialRequests.length > 0 && (
                        <Box mt={1}>
                          <Typography variant="body2" fontWeight="medium" gutterBottom>
                            Special Requests:
                          </Typography>
                          <Box display="flex" gap={0.5} flexWrap="wrap">
                            {event.specialRequests.map((request, reqIndex) => (
                              <Chip
                                key={reqIndex}
                                label={request}
                                size="small"
                                variant="filled"
                                color="warning"
                                sx={{ fontSize: '0.7rem', height: 20 }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleUpdateProgress(event.id)}
                    title="Update Progress"
                  >
                    <IconCheck size={16} />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <IconEdit size={16} />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DashboardCard>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Event Coordination</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Event Name"
              fullWidth
              placeholder="e.g., Sarah & John Wedding"
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Event Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Event Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              label="Venue"
              fullWidth
              placeholder="e.g., Grand Ballroom Hotel"
            />
            <TextField
              label="Number of Guests"
              type="number"
              fullWidth
              placeholder="e.g., 200"
            />
            <TextField
              label="Team Assignment"
              fullWidth
              placeholder="e.g., Head Chef, 2 Cooks, 4 Servers (comma separated)"
            />
            <TextField
              label="Special Requests"
              multiline
              rows={3}
              fullWidth
              placeholder="List any special dietary requirements, timing constraints, or other requests"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCoordination;