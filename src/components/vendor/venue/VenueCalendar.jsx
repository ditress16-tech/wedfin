import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Paper
} from '@mui/material';
import {
  IconCalendar,
  IconMapPin,
  IconUsers,
  IconPlus,
  Edit as EditIcon,
  Visibility as EyeIcon,
  AccessTime as ClockIcon
} from '@mui/icons-material';
import DashboardCard from '../../../ui/shared/DashboardCard';

const VenueCalendar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock venue booking data
  const bookings = [
    {
      id: 1,
      eventName: 'Sarah & John Wedding',
      client: 'Sarah Johnson',
      date: '2024-02-15',
      time: '6:00 PM - 11:00 PM',
      space: 'Grand Ballroom',
      guests: 200,
      status: 'confirmed',
      setup: 'Banquet Style',
      services: ['Sound System', 'Lighting', 'Bridal Suite']
    },
    {
      id: 2,
      eventName: 'Maria & David Wedding',
      client: 'Maria Garcia',
      date: '2024-03-20',
      time: '5:00 PM - 10:00 PM',
      space: 'Garden Area',
      guests: 150,
      status: 'tentative',
      setup: 'Outdoor Ceremony',
      services: ['Tent Rental', 'Sound System', 'Parking']
    },
    {
      id: 3,
      eventName: 'Corporate Event',
      client: 'ABC Company',
      date: '2024-01-25',
      time: '2:00 PM - 6:00 PM',
      space: 'Conference Hall',
      guests: 80,
      status: 'confirmed',
      setup: 'Theater Style',
      services: ['AV Equipment', 'Catering Space']
    },
    {
      id: 4,
      eventName: 'Lisa & Michael Wedding',
      client: 'Lisa Chen',
      date: '2024-04-10',
      time: '4:00 PM - 9:00 PM',
      space: 'Chapel + Reception Hall',
      guests: 120,
      status: 'pending',
      setup: 'Ceremony + Reception',
      services: ['Chapel Decoration', 'Sound System', 'Bridal Suite']
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'success',
      tentative: 'warning',
      pending: 'info',
      cancelled: 'error'
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

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUpcomingBookings = () => {
    const today = new Date();
    return bookings
      .filter(booking => new Date(booking.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  };

  const handleViewBooking = (bookingId) => {
    console.log('View booking:', bookingId);
  };

  const handleEditBooking = (bookingId) => {
    console.log('Edit booking:', bookingId);
  };

  return (
    <>
      <DashboardCard 
        title="Venue Calendar" 
        subtitle="Manage venue bookings and availability"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            New Booking
          </Button>
        }
      >
        <Box>
          {/* Calendar Overview */}
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Upcoming Bookings
            </Typography>
            <Grid container spacing={2}>
              {getUpcomingBookings().map((booking) => (
                <Grid item xs={12} key={booking.id}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: `${getStatusColor(booking.status)}.light`,
                          color: `${getStatusColor(booking.status)}.main`,
                          width: 48,
                          height: 48
                        }}
                      >
                        <IconCalendar size={24} />
                      </Avatar>
                      
                      <Box flexGrow={1}>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {booking.eventName}
                          </Typography>
                          <Chip
                            label={booking.status}
                            size="small"
                            color={getStatusColor(booking.status)}
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {booking.client} • {formatDate(booking.date)} • {booking.time}
                        </Typography>
                        
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconMapPin size={14} />
                            <Typography variant="body2" color="text.secondary">
                              {booking.space}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <IconUsers size={14} />
                            <Typography variant="body2" color="text.secondary">
                              {booking.guests} guests
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <ClockIcon sx={{ fontSize: 14 }} />
                            <Typography variant="body2" color="text.secondary">
                              {getDaysUntil(booking.date)} days
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary">
                          Setup: {booking.setup}
                        </Typography>
                        
                        <Box display="flex" gap={0.5} mt={1} flexWrap="wrap">
                          {booking.services.slice(0, 2).map((service, index) => (
                            <Chip
                              key={index}
                              label={service}
                              size="small"
                              variant="filled"
                              color="primary"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          ))}
                          {booking.services.length > 2 && (
                            <Chip
                              label={`+${booking.services.length - 2} more`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                        </Box>
                      </Box>
                      
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleViewBooking(booking.id)}
                        >
                          <EyeIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditBooking(booking.id)}
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {/* Quick Stats */}
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Confirmed
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">
                    {bookings.filter(b => b.status === 'tentative').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tentative
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" color="info.main">
                    {bookings.filter(b => b.status === 'pending').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DashboardCard>

      {/* New Booking Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Venue Booking</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Event Name"
              fullWidth
              placeholder="e.g., Sarah & John Wedding"
            />
            <TextField
              label="Client Name"
              fullWidth
              placeholder="e.g., Sarah Johnson"
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Event Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              label="Venue Space"
              select
              fullWidth
              defaultValue="grand_ballroom"
            >
              <MenuItem value="grand_ballroom">Grand Ballroom</MenuItem>
              <MenuItem value="garden_area">Garden Area</MenuItem>
              <MenuItem value="chapel">Chapel</MenuItem>
              <MenuItem value="conference_hall">Conference Hall</MenuItem>
              <MenuItem value="reception_hall">Reception Hall</MenuItem>
            </TextField>
            <TextField
              label="Number of Guests"
              type="number"
              fullWidth
              placeholder="e.g., 200"
            />
            <TextField
              label="Setup Style"
              select
              fullWidth
              defaultValue="banquet"
            >
              <MenuItem value="banquet">Banquet Style</MenuItem>
              <MenuItem value="theater">Theater Style</MenuItem>
              <MenuItem value="cocktail">Cocktail Style</MenuItem>
              <MenuItem value="outdoor">Outdoor Ceremony</MenuItem>
              <MenuItem value="mixed">Ceremony + Reception</MenuItem>
            </TextField>
            <TextField
              label="Required Services"
              fullWidth
              placeholder="e.g., Sound System, Lighting, Bridal Suite (comma separated)"
              helperText="List all required services and amenities"
            />
            <TextField
              label="Special Requirements"
              multiline
              rows={3}
              fullWidth
              placeholder="Any special setup requirements, decorations, or other needs"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Booking
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VenueCalendar;