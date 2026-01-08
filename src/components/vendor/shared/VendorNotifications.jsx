import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { useVendor } from '../../../context/VendorContext';
import DashboardCard from '../../../ui/shared/DashboardCard';

const VendorNotifications = () => {
  const { notifications } = useVendor();

  const getNotificationIcon = (type) => {
    const icons = {
      info: InfoIcon,
      warning: WarningIcon,
      success: CheckCircleIcon,
      payment: MoneyIcon
    };
    const IconComponent = icons[type] || NotificationsIcon;
    return <IconComponent sx={{ fontSize: 20 }} />;
  };

  const getNotificationColor = (type) => {
    const colors = {
      info: 'info',
      warning: 'warning',
      success: 'success',
      payment: 'primary'
    };
    return colors[type] || 'default';
  };

  const handleMarkAsRead = (notificationId) => {
    // Handle mark as read functionality
    console.log('Mark as read:', notificationId);
  };

  const handleDismiss = (notificationId) => {
    // Handle dismiss functionality
    console.log('Dismiss:', notificationId);
  };

  return (
    <DashboardCard 
      title="Recent Notifications" 
      subtitle="Stay updated with your latest activities"
      action={
        <Button variant="text" size="small">
          View All
        </Button>
      }
    >
      <Box>
        {notifications.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              No new notifications
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <ListItem 
                key={notification.id} 
                divider={index < notifications.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getNotificationColor(notification.type)}.light`,
                      color: `${getNotificationColor(notification.type)}.main`
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2">
                        {notification.message}
                      </Typography>
                      <Chip
                        label={notification.type}
                        size="small"
                        color={getNotificationColor(notification.type)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {notification.time}
                    </Typography>
                  }
                />
                
                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => handleMarkAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDismiss(notification.id)}
                    title="Dismiss"
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </DashboardCard>
  );
};

export default VendorNotifications;