import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { CalendarToday as CalendarIcon, Visibility as EyeIcon, Edit as EditIcon } from '@mui/icons-material';
import { useVendor } from '../../../context/VendorContext';
import DashboardCard from '../../../ui/shared/DashboardCard';

const VendorProjects = () => {
  const { projects, getUpcomingProjects } = useVendor();
  const upcomingProjects = getUpcomingProjects().slice(0, 5); // Show only 5 upcoming projects

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      planning: 'warning',
      completed: 'info',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'error',
      medium: 'warning',
      low: 'success'
    };
    return colors[priority] || 'default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardCard title="Upcoming Projects" subtitle="Your active and upcoming wedding projects">
      <Box>
        {upcomingProjects.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              No upcoming projects found
            </Typography>
          </Box>
        ) : (
          <List>
            {upcomingProjects.map((project, index) => (
              <ListItem key={project.id} divider={index < upcomingProjects.length - 1}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                    <CalendarIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {project.name}
                      </Typography>
                      <Chip
                        label={project.status}
                        size="small"
                        color={getStatusColor(project.status)}
                        variant="outlined"
                      />
                      <Chip
                        label={project.priority}
                        size="small"
                        color={getPriorityColor(project.priority)}
                        variant="filled"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Client: {project.client} • {formatDate(project.date)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Budget: ${project.budget?.toLocaleString()} • {getDaysUntil(project.date)} days to go
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          Progress: {project.progress}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </Box>
                  }
                />
                
                <ListItemSecondaryAction>
                  <Box display="flex" gap={1}>
                    <IconButton size="small" color="primary">
                      <EyeIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <EditIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </DashboardCard>
  );
};

export default VendorProjects;