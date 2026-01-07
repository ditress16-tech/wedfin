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
  TextField
} from '@mui/material';
import {
  IconPhoto,
  IconDownload,
  IconSend,
  IconClock,
  IconCheck,
  IconPlus
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const PhotoDelivery = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock photo delivery data
  const deliveries = [
    {
      id: 1,
      client: 'Sarah Johnson',
      project: 'Wedding Photos',
      totalPhotos: 245,
      processedPhotos: 245,
      status: 'ready',
      dueDate: '2024-01-20',
      deliveryMethod: 'online_gallery'
    },
    {
      id: 2,
      client: 'Maria Garcia',
      project: 'Pre-wedding Session',
      totalPhotos: 89,
      processedPhotos: 67,
      status: 'processing',
      dueDate: '2024-01-18',
      deliveryMethod: 'usb_drive'
    },
    {
      id: 3,
      client: 'Lisa Chen',
      project: 'Engagement Photos',
      totalPhotos: 156,
      processedPhotos: 156,
      status: 'delivered',
      dueDate: '2024-01-15',
      deliveryMethod: 'online_gallery'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      processing: 'warning',
      ready: 'success',
      delivered: 'info',
      overdue: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      processing: IconClock,
      ready: IconCheck,
      delivered: IconDownload,
      overdue: IconClock
    };
    const IconComponent = icons[status] || IconClock;
    return IconComponent;
  };

  const getProgress = (processed, total) => {
    return Math.round((processed / total) * 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeliverPhotos = (deliveryId) => {
    console.log('Deliver photos:', deliveryId);
  };

  const handleSendNotification = (deliveryId) => {
    console.log('Send notification:', deliveryId);
  };

  return (
    <>
      <DashboardCard 
        title="Photo Delivery" 
        subtitle="Track photo processing and delivery status"
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            New Delivery
          </Button>
        }
      >
        <Box>
          <List>
            {deliveries.map((delivery, index) => (
              <ListItem 
                key={delivery.id} 
                divider={index < deliveries.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(delivery.status)}.light`,
                      color: `${getStatusColor(delivery.status)}.main`
                    }}
                  >
                    {React.createElement(getStatusIcon(delivery.status), { size: 20 })}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {delivery.client}
                      </Typography>
                      <Chip
                        label={delivery.status}
                        size="small"
                        color={getStatusColor(delivery.status)}
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {delivery.project} • Due: {formatDate(delivery.dueDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {delivery.processedPhotos}/{delivery.totalPhotos} photos processed
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={1}>
                        <LinearProgress
                          variant="determinate"
                          value={getProgress(delivery.processedPhotos, delivery.totalPhotos)}
                          sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {getProgress(delivery.processedPhotos, delivery.totalPhotos)}%
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  {delivery.status === 'ready' && (
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => handleDeliverPhotos(delivery.id)}
                      title="Deliver Photos"
                    >
                      <IconSend size={16} />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleSendNotification(delivery.id)}
                    title="Send Notification"
                  >
                    <IconPhoto size={16} />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DashboardCard>

      {/* New Delivery Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Delivery</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Client Name"
              fullWidth
              placeholder="e.g., Sarah Johnson"
            />
            <TextField
              label="Project Name"
              fullWidth
              placeholder="e.g., Wedding Photos"
            />
            <TextField
              label="Total Photos"
              type="number"
              fullWidth
              placeholder="e.g., 245"
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Delivery Method"
              select
              fullWidth
              defaultValue="online_gallery"
            >
              <option value="online_gallery">Online Gallery</option>
              <option value="usb_drive">USB Drive</option>
              <option value="cloud_storage">Cloud Storage</option>
              <option value="physical_prints">Physical Prints</option>
            </TextField>
            <TextField
              label="Notes"
              multiline
              rows={3}
              fullWidth
              placeholder="Additional delivery instructions"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Delivery
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhotoDelivery;