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
  IconChefHat,
  IconClock,
  IconMapPin,
  IconPlus,
  IconEdit,
  IconCheck,
  IconX,
  IconUsers
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const TastingSchedule = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock tasting schedule data
  const tastingSchedule = [
    {
      id: 1,
      client: 'Sarah & John',
      date: '2024-01-12',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Our Kitchen Studio',
      attendees: 4,
      menuType: 'Indonesian Traditional',
      status: 'confirmed',
      notes: 'Bride prefers less spicy food',
      weddingDate: '2024-02-15'
    },
    {
      id: 2,
      client: 'Maria & David',
      date: '2024-01-15',
      time: '11:00 AM',
      duration: '1.5 hours',
      location: 'Client Home',
      attendees: 6,
      menuType: 'Western Fusion',
      status: 'pending',
      notes: 'Include vegetarian options',
      weddingDate: '2024-03-20'
    },
    {
      id: 3,
      client: 'Lisa & Michael',
      date: '2024-01-18',
      time: '4:00 PM',
      duration: '2 hours',
      location: 'Our Kitchen Studio',
      attendees: 2,
      menuType: 'Chinese Banquet',
      status: 'confirmed',
      notes: 'No seafood allergies',
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

  const handleConfirmTasting = (tastingId) => {
    console.log('Confirm tasting:', tastingId);
  };

  const handleCancelTasting = (tastingId) => {
    console.log('Cancel tasting:', tastingId);
  };

  return (
    <>
      <DashboardCard 
        title="Tasting Schedule" 
        subtitle="Manage food tasting appointments with clients"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Schedule Tasting
          </Button>
        }
      >
        <Box>
          <List>
            {tastingSchedule.map((tasting, index) => (
              <ListItem 
                key={tasting.id} 
                divider={index < tastingSchedule.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(tasting.status)}.light`,
                      color: `${getStatusColor(tasting.status)}.main`
                    }}
                  >
                    <IconChefHat size={20} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {tasting.client}
                      </Typography>
                      <Chip
                        label={tasting.status}
                        size="small"
                        color={getStatusColor(tasting.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {tasting.menuType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconClock size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {formatDate(tasting.date)} • {tasting.time} • {tasting.duration}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconMapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {tasting.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <IconUsers size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {tasting.attendees} attendees
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Wedding: {formatDate(tasting.weddingDate)} ({getDaysUntilWedding(tasting.weddingDate)} days)
                      </Typography>
                      {tasting.notes && (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          Note: "{tasting.notes}"
                        </Typography>
                      )}
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  {tasting.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleConfirmTasting(tasting.id)}
                        title="Confirm"
                      >
                        <IconCheck size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleCancelTasting(tasting.id)}
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

      {/* Schedule Tasting Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Food Tasting</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Client Names"
              fullWidth
              placeholder="e.g., Sarah & John"
            />
            <TextField
              label="Menu Type"
              select
              fullWidth
              defaultValue="indonesian"
            >
              <MenuItem value="indonesian">Indonesian Traditional</MenuItem>
              <MenuItem value="western">Western</MenuItem>
              <MenuItem value="chinese">Chinese</MenuItem>
              <MenuItem value="fusion">Fusion</MenuItem>
              <MenuItem value="custom">Custom Menu</MenuItem>
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
              <MenuItem value="studio">Our Kitchen Studio</MenuItem>
              <MenuItem value="client_home">Client Home</MenuItem>
              <MenuItem value="venue">Wedding Venue</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
            </TextField>
            <TextField
              label="Number of Attendees"
              type="number"
              fullWidth
              placeholder="e.g., 4"
            />
            <TextField
              label="Wedding Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText="When is the actual wedding?"
            />
            <TextField
              label="Special Notes"
              multiline
              rows={3}
              fullWidth
              placeholder="Dietary restrictions, preferences, allergies, etc."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Schedule Tasting
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TastingSchedule;