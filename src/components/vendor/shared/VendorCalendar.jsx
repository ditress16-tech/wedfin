import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Button
} from '@mui/material';
import { IconCalendar, IconClock, IconMapPin, IconPlus } from '@tabler/icons-react';
import { useVendor } from '../../../context/VendorContext';
import DashboardCard from '../../../ui/shared/DashboardCard';

const VendorCalendar = () => {
  const { projects } = useVendor();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock upcoming events for the next 7 days
  const upcomingEvents = [
    {
      id: 1,
      title: 'Sarah & John - Consultation',
      date: '2024-01-08',
      time: '10:00 AM',
      type: 'consultation',
      location: 'Office'
    },
    {
      id: 2,
      title: 'Maria & David - Site Visit',
      date: '2024-01-09',
      time: '2:00 PM',
      type: 'site_visit',
      location: 'Paradise Garden'
    },
    {
      id: 3,
      title: 'Lisa & Michael - Final Meeting',
      date: '2024-01-10',
      time: '11:00 AM',
      type: 'meeting',
      location: 'Client Location'
    },
    {
      id: 4,
      title: 'Wedding Day - Sarah & John',
      date: '2024-01-15',
      time: '8:00 AM',
      type: 'wedding',
      location: 'Grand Ballroom'
    }
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      consultation: 'info',
      site_visit: 'warning',
      meeting: 'primary',
      wedding: 'success',
      trial: 'secondary'
    };
    return colors[type] || 'default';
  };

  const getEventIcon = (type) => {
    const icons = {
      consultation: IconClock,
      site_visit: IconMapPin,
      meeting: IconCalendar,
      wedding: IconCalendar,
      trial: IconClock
    };
    const IconComponent = icons[type] || IconCalendar;
    return <IconComponent size={16} />;
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <DashboardCard 
      title="Upcoming Events" 
      subtitle="Your schedule for the next week"
      action={
        <Button
          variant="outlined"
          size="small"
          startIcon={<IconPlus size={16} />}
        >
          Add Event
        </Button>
      }
    >
      <Box>
        {upcomingEvents.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              No upcoming events
            </Typography>
          </Box>
        ) : (
          <List>
            {upcomingEvents.map((event, index) => (
              <ListItem 
                key={event.id} 
                divider={index < upcomingEvents.length - 1}
                sx={{ px: 0 }}
              >
                <Box display="flex" alignItems="center" width="100%">
                  <Avatar
                    sx={{
                      bgcolor: `${getEventTypeColor(event.type)}.light`,
                      color: `${getEventTypeColor(event.type)}.main`,
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    {getEventIcon(event.type)}
                  </Avatar>
                  
                  <Box flexGrow={1}>
                    <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                      {event.title}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Chip
                        label={formatEventDate(event.date)}
                        size="small"
                        variant="outlined"
                        color={getEventTypeColor(event.type)}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary">
                      <IconMapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </DashboardCard>
  );
};

export default VendorCalendar;