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
  MenuItem
} from '@mui/material';
import {
  IconPhoto,
  IconUpload,
  IconEye,
  IconShare,
  IconPlus,
  IconHeart,
  IconStar
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const PortfolioGallery = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLook, setSelectedLook] = useState(null);

  // Mock portfolio data
  const portfolioLooks = [
    {
      id: 1,
      title: 'Bridal Glam Look',
      client: 'Sarah Johnson',
      category: 'bridal',
      date: '2024-01-15',
      likes: 45,
      rating: 5,
      thumbnail: '/api/placeholder/200/150',
      tags: ['bridal', 'glam', 'traditional']
    },
    {
      id: 2,
      title: 'Natural Day Look',
      client: 'Maria Garcia',
      category: 'natural',
      date: '2024-01-10',
      likes: 32,
      rating: 4.8,
      thumbnail: '/api/placeholder/200/150',
      tags: ['natural', 'day', 'minimal']
    },
    {
      id: 3,
      title: 'Evening Smokey Eyes',
      client: 'Lisa Chen',
      category: 'evening',
      date: '2024-01-05',
      likes: 67,
      rating: 4.9,
      thumbnail: '/api/placeholder/200/150',
      tags: ['evening', 'smokey', 'dramatic']
    },
    {
      id: 4,
      title: 'Vintage Inspired',
      client: 'Emma Wilson',
      category: 'vintage',
      date: '2024-01-02',
      likes: 28,
      rating: 4.7,
      thumbnail: '/api/placeholder/200/150',
      tags: ['vintage', 'retro', 'classic']
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      bridal: 'success',
      natural: 'info',
      evening: 'warning',
      vintage: 'secondary',
      editorial: 'primary'
    };
    return colors[category] || 'default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewLook = (look) => {
    setSelectedLook(look);
    console.log('View look:', look);
  };

  const handleShareLook = (lookId) => {
    console.log('Share look:', lookId);
  };

  return (
    <>
      <DashboardCard 
        title="Portfolio Gallery" 
        subtitle="Showcase your makeup artistry and client transformations"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Add Look
          </Button>
        }
      >
        <Box>
          <Grid container spacing={2}>
            {portfolioLooks.map((look) => (
              <Grid item xs={12} sm={6} key={look.id}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      height: 120,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <IconPhoto size={40} color="grey" />
                    <Box
                      position="absolute"
                      top={8}
                      right={8}
                      display="flex"
                      gap={0.5}
                    >
                      <Chip
                        label={look.category}
                        size="small"
                        color={getCategoryColor(look.category)}
                        variant="filled"
                      />
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                      {look.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {look.client} • {formatDate(look.date)}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <IconHeart size={14} />
                        <Typography variant="caption">{look.likes}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <IconStar size={14} />
                        <Typography variant="caption">{look.rating}</Typography>
                      </Box>
                    </Box>
                    
                    <Box display="flex" gap={0.5} mb={2} flexWrap="wrap">
                      {look.tags.slice(0, 2).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                    </Box>
                    
                    <Box display="flex" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<IconEye size={14} />}
                        onClick={() => handleViewLook(look)}
                        fullWidth
                      >
                        View
                      </Button>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleShareLook(look.id)}
                      >
                        <IconShare size={16} />
                      </IconButton>
                    </Box>
                  </CardContent>
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
              Upload New Photos
            </Button>
          </Box>
        </Box>
      </DashboardCard>

      {/* Add Look Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Look</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Look Title"
              fullWidth
              placeholder="e.g., Bridal Glam Look"
            />
            <TextField
              label="Client Name"
              fullWidth
              placeholder="e.g., Sarah Johnson"
            />
            <TextField
              label="Category"
              select
              fullWidth
              defaultValue="bridal"
            >
              <MenuItem value="bridal">Bridal</MenuItem>
              <MenuItem value="natural">Natural</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
              <MenuItem value="vintage">Vintage</MenuItem>
              <MenuItem value="editorial">Editorial</MenuItem>
              <MenuItem value="special_occasion">Special Occasion</MenuItem>
            </TextField>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Tags"
              fullWidth
              placeholder="e.g., bridal, glam, traditional (comma separated)"
              helperText="Separate tags with commas"
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              placeholder="Describe the makeup look and techniques used"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Look
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PortfolioGallery;