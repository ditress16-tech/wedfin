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
  TextField
} from '@mui/material';
import {
  IconPhoto,
  IconUpload,
  IconEye,
  IconDownload,
  IconShare,
  IconPlus,
  IconFolder
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const GalleryManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  // Mock gallery data
  const galleries = [
    {
      id: 1,
      name: 'Sarah & John Wedding',
      client: 'Sarah Johnson',
      date: '2024-01-15',
      photos: 245,
      status: 'processing',
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 2,
      name: 'Maria & David Pre-wedding',
      client: 'Maria Garcia',
      date: '2024-01-10',
      photos: 89,
      status: 'ready',
      thumbnail: '/api/placeholder/150/100'
    },
    {
      id: 3,
      name: 'Lisa & Michael Engagement',
      client: 'Lisa Chen',
      date: '2024-01-05',
      photos: 156,
      status: 'delivered',
      thumbnail: '/api/placeholder/150/100'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      processing: 'warning',
      ready: 'success',
      delivered: 'info',
      pending: 'error'
    };
    return colors[status] || 'default';
  };

  const handleCreateGallery = () => {
    setOpenDialog(true);
  };

  const handleViewGallery = (gallery) => {
    setSelectedGallery(gallery);
    // Navigate to gallery detail view
    console.log('View gallery:', gallery);
  };

  return (
    <>
      <DashboardCard 
        title="Gallery Management" 
        subtitle="Manage your photo galleries and client deliveries"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={handleCreateGallery}
          >
            New Gallery
          </Button>
        }
      >
        <Box>
          <Grid container spacing={2}>
            {galleries.map((gallery) => (
              <Grid item xs={12} key={gallery.id}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      variant="rounded"
                      sx={{ width: 60, height: 40, bgcolor: 'primary.light' }}
                    >
                      <IconFolder size={24} />
                    </Avatar>
                    
                    <Box flexGrow={1}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {gallery.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {gallery.client} • {gallery.photos} photos
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                        <Chip
                          label={gallery.status}
                          size="small"
                          color={getStatusColor(gallery.status)}
                          variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {gallery.date}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewGallery(gallery)}
                      >
                        <IconEye size={16} />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <IconShare size={16} />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <IconDownload size={16} />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box mt={2} textAlign="center">
            <Button
              variant="outlined"
              startIcon={<IconUpload size={16} />}
              fullWidth
            >
              Upload Photos
            </Button>
          </Box>
        </Box>
      </DashboardCard>

      {/* Create Gallery Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Gallery</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Gallery Name"
              fullWidth
              placeholder="e.g., Sarah & John Wedding"
            />
            <TextField
              label="Client Name"
              fullWidth
              placeholder="e.g., Sarah Johnson"
            />
            <TextField
              label="Event Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              placeholder="Brief description of the photo session"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Gallery
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GalleryManagement;