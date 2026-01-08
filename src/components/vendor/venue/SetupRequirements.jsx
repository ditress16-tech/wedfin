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
  Checkbox,
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
  IconSettings,
  IconPlus,
  IconEdit,
  Check as CheckIcon,
  ExpandMore as ChevronDownIcon,
  Lightbulb as BulbIcon,
  AudioFile as AudioIcon,
  Chair as ChairIcon,
  LocalFlorist as FlowerIcon
} from '@mui/icons-material';
import DashboardCard from '../../../ui/shared/DashboardCard';

const SetupRequirements = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedSetup, setExpandedSetup] = useState(false);

  // Mock setup requirements data
  const setupRequirements = [
    {
      id: 1,
      eventName: 'Sarah & John Wedding',
      date: '2024-02-15',
      space: 'Grand Ballroom',
      status: 'in_progress',
      categories: [
        {
          name: 'Furniture & Seating',
          icon: ChairIcon,
          items: [
            { name: 'Round tables (20)', required: true, completed: true },
            { name: 'Chiavari chairs (200)', required: true, completed: true },
            { name: 'Bridal table setup', required: true, completed: false },
            { name: 'Cocktail tables (8)', required: false, completed: false }
          ]
        },
        {
          name: 'Audio Visual',
          icon: AudioIcon,
          items: [
            { name: 'Sound system setup', required: true, completed: true },
            { name: 'Microphones (2 wireless)', required: true, completed: false },
            { name: 'Projector & screen', required: false, completed: false },
            { name: 'DJ booth setup', required: true, completed: false }
          ]
        },
        {
          name: 'Lighting',
          icon: BulbIcon,
          items: [
            { name: 'Ambient lighting', required: true, completed: true },
            { name: 'Spotlight for ceremony', required: true, completed: false },
            { name: 'Dance floor lighting', required: false, completed: false },
            { name: 'Candle arrangements', required: false, completed: false }
          ]
        },
        {
          name: 'Decorations',
          icon: FlowerIcon,
          items: [
            { name: 'Floral centerpieces', required: false, completed: false },
            { name: 'Backdrop setup', required: true, completed: false },
            { name: 'Aisle decoration', required: true, completed: false },
            { name: 'Entrance decoration', required: false, completed: false }
          ]
        }
      ],
      timeline: '2 days before event',
      notes: 'Client prefers warm lighting. Extra tables may be needed.'
    },
    {
      id: 2,
      eventName: 'Maria & David Wedding',
      date: '2024-03-20',
      space: 'Garden Area',
      status: 'planning',
      categories: [
        {
          name: 'Outdoor Setup',
          icon: IconSettings,
          items: [
            { name: 'Tent installation (40x60)', required: true, completed: false },
            { name: 'Flooring setup', required: true, completed: false },
            { name: 'Weather protection', required: true, completed: false },
            { name: 'Heating/cooling units', required: false, completed: false }
          ]
        },
        {
          name: 'Seating & Tables',
          icon: ChairIcon,
          items: [
            { name: 'Farm tables (15)', required: true, completed: false },
            { name: 'Cross-back chairs (150)', required: true, completed: false },
            { name: 'Lounge area setup', required: false, completed: false }
          ]
        }
      ],
      timeline: '3 days before event',
      notes: 'Weather contingency plan required. Backup indoor space reserved.'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      planning: 'info',
      in_progress: 'warning',
      completed: 'success',
      delayed: 'error'
    };
    return colors[status] || 'default';
  };

  const getCategoryProgress = (items) => {
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  const getOverallProgress = (categories) => {
    const allItems = categories.flatMap(cat => cat.items);
    const completed = allItems.filter(item => item.completed).length;
    return Math.round((completed / allItems.length) * 100);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedSetup(isExpanded ? panel : false);
  };

  const handleToggleItem = (setupId, categoryIndex, itemIndex) => {
    console.log('Toggle item:', setupId, categoryIndex, itemIndex);
  };

  return (
    <>
      <DashboardCard 
        title="Setup Requirements" 
        subtitle="Manage venue setup and preparation tasks"
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Add Setup
          </Button>
        }
      >
        <Box>
          {setupRequirements.map((setup) => (
            <Accordion 
              key={setup.id}
              expanded={expandedSetup === setup.id}
              onChange={handleAccordionChange(setup.id)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ChevronDownIcon />}>
                <Box display="flex" alignItems="center" width="100%" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(setup.status)}.light`,
                      color: `${getStatusColor(setup.status)}.main`
                    }}
                  >
                    <IconSettings size={20} />
                  </Avatar>
                  
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {setup.eventName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {setup.space} • {setup.date} • {setup.timeline}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" gap={1} alignItems="center">
                    <Chip
                      label={setup.status.replace('_', ' ')}
                      size="small"
                      color={getStatusColor(setup.status)}
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {getOverallProgress(setup.categories)}% complete
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              
              <AccordionDetails>
                <Box>
                  {setup.categories.map((category, categoryIndex) => (
                    <Box key={categoryIndex} mb={3}>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <category.icon size={20} />
                        <Typography variant="subtitle2" fontWeight="medium">
                          {category.name}
                        </Typography>
                        <Chip
                          label={`${getCategoryProgress(category.items)}%`}
                          size="small"
                          color={getCategoryProgress(category.items) === 100 ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </Box>
                      
                      <List dense>
                        {category.items.map((item, itemIndex) => (
                          <ListItem 
                            key={itemIndex}
                            sx={{ px: 0 }}
                            secondaryAction={
                              <Checkbox
                                checked={item.completed}
                                onChange={() => handleToggleItem(setup.id, categoryIndex, itemIndex)}
                                color="success"
                              />
                            }
                          >
                            <ListItemText
                              primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography 
                                    variant="body2"
                                    sx={{ 
                                      textDecoration: item.completed ? 'line-through' : 'none',
                                      color: item.completed ? 'text.secondary' : 'text.primary'
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                  {item.required && (
                                    <Chip
                                      label="Required"
                                      size="small"
                                      color="error"
                                      variant="outlined"
                                      sx={{ fontSize: '0.7rem', height: 18 }}
                                    />
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                  
                  {setup.notes && (
                    <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Notes:</strong> {setup.notes}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </DashboardCard>

      {/* Add Setup Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Setup Requirements</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Event Name"
              fullWidth
              placeholder="e.g., Sarah & John Wedding"
            />
            <TextField
              label="Event Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
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
              label="Setup Timeline"
              fullWidth
              placeholder="e.g., 2 days before event"
            />
            <TextField
              label="Setup Categories"
              fullWidth
              placeholder="e.g., Furniture, Audio Visual, Lighting (comma separated)"
              helperText="Main categories for setup requirements"
            />
            <TextField
              label="Special Notes"
              multiline
              rows={3}
              fullWidth
              placeholder="Any special requirements, client preferences, or important notes"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Setup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SetupRequirements;