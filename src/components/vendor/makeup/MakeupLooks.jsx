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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  IconPalette,
  IconEye,
  IconCopy,
  IconPlus,
  IconStar,
  IconHeart,
  IconBookmark
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const MakeupLooks = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock makeup looks data
  const makeupLooks = [
    {
      id: 1,
      name: 'Classic Bridal Glow',
      category: 'bridal',
      difficulty: 'medium',
      duration: '45 minutes',
      products: ['Foundation', 'Concealer', 'Blush', 'Lipstick', 'Mascara'],
      steps: 8,
      rating: 4.9,
      uses: 15,
      favorite: true
    },
    {
      id: 2,
      name: 'Smokey Evening Eyes',
      category: 'evening',
      difficulty: 'hard',
      duration: '60 minutes',
      products: ['Eyeshadow Palette', 'Eyeliner', 'Mascara', 'False Lashes'],
      steps: 12,
      rating: 4.8,
      uses: 8,
      favorite: false
    },
    {
      id: 3,
      name: 'Natural Day Look',
      category: 'natural',
      difficulty: 'easy',
      duration: '20 minutes',
      products: ['BB Cream', 'Tinted Lip Balm', 'Mascara'],
      steps: 5,
      rating: 4.7,
      uses: 22,
      favorite: true
    },
    {
      id: 4,
      name: 'Vintage Red Lips',
      category: 'vintage',
      difficulty: 'medium',
      duration: '35 minutes',
      products: ['Foundation', 'Red Lipstick', 'Eyeliner', 'Mascara'],
      steps: 7,
      rating: 4.6,
      uses: 6,
      favorite: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Looks' },
    { value: 'bridal', label: 'Bridal' },
    { value: 'evening', label: 'Evening' },
    { value: 'natural', label: 'Natural' },
    { value: 'vintage', label: 'Vintage' }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      bridal: 'success',
      evening: 'warning',
      natural: 'info',
      vintage: 'secondary'
    };
    return colors[category] || 'primary';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'success',
      medium: 'warning',
      hard: 'error'
    };
    return colors[difficulty] || 'default';
  };

  const filteredLooks = selectedCategory === 'all' 
    ? makeupLooks 
    : makeupLooks.filter(look => look.category === selectedCategory);

  const handleViewLook = (lookId) => {
    console.log('View look details:', lookId);
  };

  const handleCopyLook = (lookId) => {
    console.log('Copy look:', lookId);
  };

  const handleToggleFavorite = (lookId) => {
    console.log('Toggle favorite:', lookId);
  };

  return (
    <>
      <DashboardCard 
        title="Makeup Looks Library" 
        subtitle="Your collection of signature makeup looks and techniques"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Create Look
          </Button>
        }
      >
        <Box>
          {/* Category Filter */}
          <Box mb={2}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {categories.map((category) => (
                <Chip
                  key={category.value}
                  label={category.label}
                  variant={selectedCategory === category.value ? 'filled' : 'outlined'}
                  color={selectedCategory === category.value ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(category.value)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>

          {/* Looks List */}
          <List>
            {filteredLooks.map((look, index) => (
              <ListItem 
                key={look.id} 
                divider={index < filteredLooks.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getCategoryColor(look.category)}.light`,
                      color: `${getCategoryColor(look.category)}.main`
                    }}
                  >
                    <IconPalette size={20} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {look.name}
                      </Typography>
                      {look.favorite && (
                        <IconHeart size={16} color="red" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Box display="flex" gap={1} mb={1}>
                        <Chip
                          label={look.category}
                          size="small"
                          color={getCategoryColor(look.category)}
                          variant="outlined"
                        />
                        <Chip
                          label={look.difficulty}
                          size="small"
                          color={getDifficultyColor(look.difficulty)}
                          variant="filled"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Duration: {look.duration} • {look.steps} steps • Used {look.uses} times
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <IconStar size={14} />
                        <Typography variant="body2" color="text.secondary">
                          {look.rating} rating
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Products: {look.products.slice(0, 3).join(', ')}
                        {look.products.length > 3 && ` +${look.products.length - 3} more`}
                      </Typography>
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleViewLook(look.id)}
                    title="View Details"
                  >
                    <IconEye size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleCopyLook(look.id)}
                    title="Copy Look"
                  >
                    <IconCopy size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color={look.favorite ? 'error' : 'default'}
                    onClick={() => handleToggleFavorite(look.id)}
                    title="Toggle Favorite"
                  >
                    <IconBookmark size={16} />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DashboardCard>

      {/* Create Look Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Makeup Look</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Look Name"
              fullWidth
              placeholder="e.g., Classic Bridal Glow"
            />
            <TextField
              label="Category"
              select
              fullWidth
              defaultValue="bridal"
            >
              <MenuItem value="bridal">Bridal</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
              <MenuItem value="natural">Natural</MenuItem>
              <MenuItem value="vintage">Vintage</MenuItem>
              <MenuItem value="editorial">Editorial</MenuItem>
            </TextField>
            <TextField
              label="Difficulty Level"
              select
              fullWidth
              defaultValue="medium"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </TextField>
            <TextField
              label="Duration"
              fullWidth
              placeholder="e.g., 45 minutes"
            />
            <TextField
              label="Products Used"
              fullWidth
              placeholder="e.g., Foundation, Concealer, Blush (comma separated)"
              helperText="List all products used in this look"
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              placeholder="Describe the look and key techniques"
            />
            <TextField
              label="Step-by-step Instructions"
              multiline
              rows={4}
              fullWidth
              placeholder="Detailed steps to recreate this look"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Look
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MakeupLooks;