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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Divider,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const CalendarBooking = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  const bookingsData = [
    {
      id: 1,
      title: 'Sarah & John Wedding',
      client: 'Sarah Johnson',
      date: '2024-02-15',
      time: '14:00',
      duration: '8 hours',
      location: 'Grand Ballroom Hotel',
      type: 'wedding',
      status: 'confirmed',
      notes: 'Outdoor ceremony, indoor reception'
    },
    {
      id: 2,
      title: 'Emma & Michael Engagement',
      client: 'Emma Wilson',
      date: '2024-02-20',
      time: '16:00',
      duration: '2 hours',
      location: 'Central Park',
      type: 'engagement',
      status: 'confirmed',
      notes: 'Golden hour shoot'
    },
    {
      id: 3,
      title: 'Lisa & David Pre-wedding',
      client: 'Lisa Brown',
      date: '2024-02-25',
      time: '10:00',
      duration: '4 hours',
      location: 'Beach Resort',
      type: 'pre-wedding',
      status: 'pending',
      notes: 'Beach and garden locations'
    },
    {
      id: 4,
      title: 'Anna & Robert Consultation',
      client: 'Anna Davis',
      date: '2024-02-28',
      time: '15:00',
      duration: '1 hour',
      location: 'Studio',
      type: 'consultation',
      status: 'confirmed',
      notes: 'Initial meeting and package discussion'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'wedding': return 'primary';
      case 'engagement': return 'secondary';
      case 'pre-wedding': return 'warning';
      case 'consultation': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookingsData.filter(booking => booking.date === dateStr);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    dayNames.forEach(day => {
      days.push(
        <Box key={day} sx={{ p: 1, textAlign: 'center', fontWeight: 'bold', bgcolor: 'grey.100' }}>
          {day}
        </Box>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ p: 1, minHeight: 80 }} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const bookings = getBookingsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <Box
          key={day}
          sx={{
            p: 1,
            minHeight: 80,
            border: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
            bgcolor: isSelected ? 'primary.light' : isToday ? 'warning.light' : 'background.paper',
            '&:hover': { bgcolor: 'action.hover' }
          }}
          onClick={() => setSelectedDate(date)}
        >
          <Typography variant="body2" sx={{ fontWeight: isToday ? 'bold' : 'normal' }}>
            {day}
          </Typography>
          {bookings.map((booking, index) => (
            <Chip
              key={booking.id}
              label={booking.title}
              size="small"
              color={getTypeColor(booking.type)}
              sx={{ 
                fontSize: '0.7rem', 
                height: 20, 
                mb: 0.5,
                display: index < 2 ? 'flex' : 'none' // Show max 2 bookings
              }}
            />
          ))}
          {bookings.length > 2 && (
            <Typography variant="caption" color="text.secondary">
              +{bookings.length - 2} more
            </Typography>
          )}
        </Box>
      );
    }

    return days;
  };

  const todayBookings = getBookingsForDate(new Date());
  const upcomingBookings = bookingsData
    .filter(booking => new Date(booking.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <PageContainer 
      title="Calendar & Booking" 
      description="Manage your schedule and bookings"
    >
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Calendar & Booking Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Booking
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Calendar */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                {/* Calendar Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={() => navigateMonth(-1)}>
                      <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant="h5">
                      {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Typography>
                    <IconButton onClick={() => navigateMonth(1)}>
                      <ChevronRightIcon />
                    </IconButton>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      startIcon={<TodayIcon />}
                      onClick={goToToday}
                    >
                      Today
                    </Button>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <Select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                      >
                        <MenuItem value="month">Month</MenuItem>
                        <MenuItem value="week">Week</MenuItem>
                        <MenuItem value="day">Day</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {/* Calendar Grid */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(7, 1fr)"
                  gap={0}
                  sx={{ border: '1px solid', borderColor: 'divider' }}
                >
                  {renderCalendarGrid()}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Today's Schedule */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Today's Schedule
                </Typography>
                {todayBookings.length > 0 ? (
                  <List>
                    {todayBookings.map((booking) => (
                      <ListItem key={booking.id} divider>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: getTypeColor(booking.type) + '.light' }}>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={booking.title}
                          secondary={`${booking.time} - ${booking.duration}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No bookings for today
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Bookings */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Bookings
                </Typography>
                <List>
                  {upcomingBookings.map((booking) => (
                    <ListItem key={booking.id} divider>
                      <ListItemAvatar>
                        <Badge
                          badgeContent={
                            <Chip
                              label={booking.status}
                              size="small"
                              color={getStatusColor(booking.status)}
                            />
                          }
                        >
                          <Avatar sx={{ bgcolor: getTypeColor(booking.type) + '.light' }}>
                            <EventIcon />
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={booking.title}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {booking.location}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Selected Date Details */}
        {selectedDate && (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              {getBookingsForDate(selectedDate).length > 0 ? (
                <Grid container spacing={2}>
                  {getBookingsForDate(selectedDate).map((booking) => (
                    <Grid item xs={12} sm={6} key={booking.id}>
                      <Paper sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Typography variant="subtitle1">
                            {booking.title}
                          </Typography>
                          <Chip
                            label={booking.status}
                            size="small"
                            color={getStatusColor(booking.status)}
                          />
                        </Box>
                        
                        <Box display="flex" alignItems="center" mb={1}>
                          <ScheduleIcon sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            {booking.time} ({booking.duration})
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" mb={1}>
                          <LocationIcon sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            {booking.location}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" mb={1}>
                          <PeopleIcon sx={{ mr: 1, fontSize: 16 }} />
                          <Typography variant="body2">
                            {booking.client}
                          </Typography>
                        </Box>
                        
                        {booking.notes && (
                          <Typography variant="body2" color="text.secondary">
                            Notes: {booking.notes}
                          </Typography>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No bookings for this date
                </Typography>
              )}
            </CardContent>
          </Card>
        )}

        {/* New Booking Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Event Title" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Client Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Event Type</InputLabel>
                  <Select label="Event Type">
                    <MenuItem value="wedding">Wedding</MenuItem>
                    <MenuItem value="engagement">Engagement</MenuItem>
                    <MenuItem value="pre-wedding">Pre-wedding</MenuItem>
                    <MenuItem value="consultation">Consultation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Duration" placeholder="e.g., 4 hours" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Location" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  placeholder="Additional notes or requirements"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained">Create Booking</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default CalendarBooking;