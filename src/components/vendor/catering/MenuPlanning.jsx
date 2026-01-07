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
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  IconChefHat,
  IconPlus,
  IconEdit,
  IconEye,
  IconCopy,
  IconChevronDown,
  IconCurrencyDollar
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const MenuPlanning = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false);

  // Mock menu data
  const menus = [
    {
      id: 1,
      name: 'Traditional Indonesian Wedding',
      client: 'Sarah & John Wedding',
      guests: 200,
      budget: 15000,
      status: 'approved',
      categories: [
        {
          name: 'Appetizers',
          items: ['Lumpia Shanghai', 'Chicken Satay', 'Spring Rolls'],
          cost: 2000
        },
        {
          name: 'Main Course',
          items: ['Nasi Gudeg', 'Rendang Beef', 'Grilled Fish'],
          cost: 8000
        },
        {
          name: 'Desserts',
          items: ['Es Cendol', 'Klepon', 'Fruit Salad'],
          cost: 1500
        }
      ],
      dietaryRestrictions: ['Halal', 'No Pork'],
      totalCost: 11500
    },
    {
      id: 2,
      name: 'Western Fusion Menu',
      client: 'Maria & David Wedding',
      guests: 150,
      budget: 12000,
      status: 'pending',
      categories: [
        {
          name: 'Appetizers',
          items: ['Caesar Salad', 'Bruschetta', 'Cheese Platter'],
          cost: 1800
        },
        {
          name: 'Main Course',
          items: ['Grilled Salmon', 'Beef Tenderloin', 'Chicken Cordon Bleu'],
          cost: 7500
        },
        {
          name: 'Desserts',
          items: ['Tiramisu', 'Chocolate Cake', 'Ice Cream'],
          cost: 1200
        }
      ],
      dietaryRestrictions: ['Vegetarian Options', 'Gluten-Free'],
      totalCost: 10500
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      approved: 'success',
      pending: 'warning',
      rejected: 'error',
      draft: 'info'
    };
    return colors[status] || 'default';
  };

  const handleViewMenu = (menuId) => {
    console.log('View menu:', menuId);
  };

  const handleCopyMenu = (menuId) => {
    console.log('Copy menu:', menuId);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedMenu(isExpanded ? panel : false);
  };

  return (
    <>
      <DashboardCard 
        title="Menu Planning" 
        subtitle="Create and manage wedding menus for your clients"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Create Menu
          </Button>
        }
      >
        <Box>
          {menus.map((menu) => (
            <Accordion 
              key={menu.id}
              expanded={expandedMenu === menu.id}
              onChange={handleAccordionChange(menu.id)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<IconChevronDown />}>
                <Box display="flex" alignItems="center" width="100%" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(menu.status)}.light`,
                      color: `${getStatusColor(menu.status)}.main`
                    }}
                  >
                    <IconChefHat size={20} />
                  </Avatar>
                  
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {menu.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {menu.client} • {menu.guests} guests
                    </Typography>
                  </Box>
                  
                  <Box display="flex" gap={1} alignItems="center">
                    <Chip
                      label={menu.status}
                      size="small"
                      color={getStatusColor(menu.status)}
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary">
                      ${menu.totalCost.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails>
                <Box>
                  {/* Menu Categories */}
                  {menu.categories.map((category, index) => (
                    <Box key={index} mb={2}>
                      <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                        {category.name} (${category.cost.toLocaleString()})
                      </Typography>
                      <Box display="flex" gap={0.5} flexWrap="wrap" mb={1}>
                        {category.items.map((item, itemIndex) => (
                          <Chip
                            key={itemIndex}
                            label={item}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                  
                  {/* Dietary Restrictions */}
                  <Box mb={2}>
                    <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                      Dietary Restrictions
                    </Typography>
                    <Box display="flex" gap={0.5} flexWrap="wrap">
                      {menu.dietaryRestrictions.map((restriction, index) => (
                        <Chip
                          key={index}
                          label={restriction}
                          size="small"
                          color="warning"
                          variant="filled"
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  {/* Budget Info */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Budget: ${menu.budget.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color={menu.totalCost <= menu.budget ? 'success.main' : 'error.main'}>
                      Total Cost: ${menu.totalCost.toLocaleString()}
                    </Typography>
                  </Box>
                  
                  {/* Actions */}
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<IconEye size={14} />}
                      onClick={() => handleViewMenu(menu.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<IconCopy size={14} />}
                      onClick={() => handleCopyMenu(menu.id)}
                    >
                      Copy Menu
                    </Button>
                    <IconButton size="small" color="primary">
                      <IconEdit size={16} />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </DashboardCard>

      {/* Create Menu Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Menu</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Menu Name"
              fullWidth
              placeholder="e.g., Traditional Indonesian Wedding"
            />
            <TextField
              label="Client/Event"
              fullWidth
              placeholder="e.g., Sarah & John Wedding"
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Number of Guests"
                type="number"
                fullWidth
                placeholder="e.g., 200"
              />
              <TextField
                label="Budget"
                type="number"
                fullWidth
                placeholder="e.g., 15000"
                InputProps={{ startAdornment: '$' }}
              />
            </Box>
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
              <MenuItem value="buffet">Buffet Style</MenuItem>
            </TextField>
            <TextField
              label="Dietary Restrictions"
              fullWidth
              placeholder="e.g., Halal, Vegetarian, Gluten-Free (comma separated)"
              helperText="List any dietary restrictions or special requirements"
            />
            <TextField
              label="Special Notes"
              multiline
              rows={3}
              fullWidth
              placeholder="Additional requirements, preferences, or notes"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Create Menu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuPlanning;