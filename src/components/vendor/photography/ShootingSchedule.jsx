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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import {
  IconCamera,
  IconMapPin,
  IconClock,
  IconPlus,
  IconEdit,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const ShootingSchedule = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock shooting schedule data
  const shootingSchedule = [
    {
      id: 1,
      title: 'Sarah & John - Pre-wedding',
      client: 'Sarah Johnson',
      date: '2024-01-12',
      time: '09:00 AM',
      duration: '3 hours',
      location: 'Central Park',
      type: 'pre_wedding',
      status: 'confirmed',
      equipment: ['Canon EOS R5', 'Canon 24-70mm f/2.8']
    },
    {
      id: 2,
      title: 'Maria & David - Wedding Day',
      client: 'Maria Garcia',
      date: '2024-01-15',
      time: '08:00 AM',
      duration: '8 hours',
      location: 'Grand Ballroom Hotel',
      type: 'wedding',
      status: 'confirmed',
      equipment: ['Canon EOS R5', 'Sony A7R IV', 'Multiple Lenses']
    },
    {
      id: 3,
      title: 'Lisa & Michael - Engagement',
      client: 'Lisa Chen',
      date: '2024-01-18',
      time: '04:00 PM',
      duration: '2 hours',
      location: 'Beach Resort',
      type: 'engagement',
      status: 'pending',
      equipment: ['Sony A7R IV', 'Canon 85mm f/1.4']
    }
  ];

  const getShootTypeColor = (type) => {
    const colors = {
      wedding: 'success',
      pre_wedding: 'info',
      engagement: 'warning',
      portrait: 'primary'
    };
    return colors[type] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'error',
      completed: 'info'
    };
    return colors[status] || 'default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleConfirmShoot = (shootId) => {
    console.log('Confirm shoot:', shootId);
  };

  const handleCancelShoot = (shootId) => {
    console.log('Cancel shoot:', shootId);
  };

  return (
    <>
      <DashboardCard 
        title="Shooting Schedule" 
        subtitle="Manage your upcoming photography sessions"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Schedule Shoot
          </Button>
        }
      >
        <Box>
          <List>
            {shootingSchedule.map((shoot, index) => (
              <ListItem 
                key={shoot.id} 
                divider={index < shootingSchedule.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getShootTypeColor(shoot.type)}.light`,
                      color: `${getShootTypeColor(shoot.type)}.main`
                    }}
                  >
                    <IconCamera size={20} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {shoot.title}
                      </Typography>
                      <Chip
                        label={shoot.status}
                        size="small"
                        color={getStatusColor(shoot.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconClock size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {formatDate(shoot.date)} • {shoot.time} • {shoot.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconMapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {shoot.location}
                      </Typography>
                      <Box display="flex" gap={0.5} mt={0.5}>
                        <Chip
                          label={shoot.type.replace('_', ' ')}
                          size="small"
                          color={getShootTypeColor(shoot.type)}
                          variant="filled"
                        />
                      </Box>
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  {shoot.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleConfirmShoot(shoot.id)}
                        title="Confirm"
                      >
                        <IconCheck size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleCancelShoot(shoot.id)}
                        title="Cancel"
                      >
                        <IconX size={16} />
                      </IconButton>
                    </>
                  )}
                  <IconButton size="small" color="primary">
                    <IconEdit size={16} />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DashboardCard>

      {/* Schedule Shoot Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Shoot</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Shoot Title"
              fullWidth
              placeholder="e.g., Sarah & John - Pre-wedding"
            />
            <TextField
              label="Client Name"
              fullWidth
              placeholder="e.g., Sarah Johnson"
            />
            <TextField
              label="Shoot Type"
              select
              fullWidth
              defaultValue="wedding"
            >
              <MenuItem value="wedding">Wedding</MenuItem>
              <MenuItem value="pre_wedding">Pre-wedding</MenuItem>
              <MenuItem value="engagement">Engagement</MenuItem>
              <MenuItem value="portrait">Portrait</MenuItem>
            </TextField>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Duration"
              fullWidth
              placeholder="e.g., 3 hours"
            />
            <TextField
              label="Location"
              fullWidth
              placeholder="e.g., Central Park"
            />
            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              placeholder="Additional notes for the shoot"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Schedule Shoot
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShootingSchedule;