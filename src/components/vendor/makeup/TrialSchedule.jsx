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
  IconPalette,
  IconClock,
  IconMapPin,
  IconPlus,
  IconEdit,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const TrialSchedule = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock trial schedule data
  const trialSchedule = [
    {
      id: 1,
      client: 'Sarah Johnson',
      service: 'Bridal Makeup Trial',
      date: '2024-01-12',
      time: '10:00 AM',
      duration: '2 hours',
      location: 'Studio',
      status: 'confirmed',
      notes: 'Traditional bridal look with red lipstick',
      weddingDate: '2024-02-15'
    },
    {
      id: 2,
      client: 'Maria Garcia',
      service: 'Pre-wedding Makeup Trial',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '1.5 hours',
      location: 'Client Home',
      status: 'pending',
      notes: 'Natural glam look for outdoor shoot',
      weddingDate: '2024-03-20'
    },
    {
      id: 3,
      client: 'Lisa Chen',
      service: 'Evening Makeup Trial',
      date: '2024-01-18',
      time: '4:00 PM',
      duration: '1 hour',
      location: 'Studio',
      status: 'confirmed',
      notes: 'Smokey eyes for evening reception',
      weddingDate: '2024-04-10'
    }
  ];

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

  const getDaysUntilWedding = (weddingDate) => {
    const today = new Date();
    const wedding = new Date(weddingDate);
    const diffTime = wedding - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleConfirmTrial = (trialId) => {
    console.log('Confirm trial:', trialId);
  };

  const handleCancelTrial = (trialId) => {
    console.log('Cancel trial:', trialId);
  };

  return (
    <>
      <DashboardCard 
        title="Trial Schedule" 
        subtitle="Manage makeup trials and consultations"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Schedule Trial
          </Button>
        }
      >
        <Box>
          <List>
            {trialSchedule.map((trial, index) => (
              <ListItem 
                key={trial.id} 
                divider={index < trialSchedule.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(trial.status)}.light`,
                      color: `${getStatusColor(trial.status)}.main`
                    }}
                  >
                    <IconPalette size={20} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {trial.client}
                      </Typography>
                      <Chip
                        label={trial.status}
                        size="small"
                        color={getStatusColor(trial.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {trial.service}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconClock size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {formatDate(trial.date)} • {trial.time} • {trial.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconMapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {trial.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Wedding: {formatDate(trial.weddingDate)} ({getDaysUntilWedding(trial.weddingDate)} days)
                      </Typography>
                      {trial.notes && (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          "{trial.notes}"
                        </Typography>
                      )}
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  {trial.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleConfirmTrial(trial.id)}
                        title="Confirm"
                      >
                        <IconCheck size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleCancelTrial(trial.id)}
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

      {/* Schedule Trial Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Makeup Trial</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Client Name"
              fullWidth
              placeholder="e.g., Sarah Johnson"
            />
            <TextField
              label="Service Type"
              select
              fullWidth
              defaultValue="bridal_trial"
            >
              <MenuItem value="bridal_trial">Bridal Makeup Trial</MenuItem>
              <MenuItem value="pre_wedding_trial">Pre-wedding Trial</MenuItem>
              <MenuItem value="evening_trial">Evening Makeup Trial</MenuItem>
              <MenuItem value="consultation">Makeup Consultation</MenuItem>
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
              placeholder="e.g., 2 hours"
            />
            <TextField
              label="Location"
              select
              fullWidth
              defaultValue="studio"
            >
              <MenuItem value="studio">Studio</MenuItem>
              <MenuItem value="client_home">Client Home</MenuItem>
              <MenuItem value="venue">Wedding Venue</MenuItem>
              <MenuItem value="other">Other Location</MenuItem>
            </TextField>
            <TextField
              label="Wedding Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText="When is the actual wedding?"
            />
            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              placeholder="Special requests, preferred look, etc."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Schedule Trial
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrialSchedule;