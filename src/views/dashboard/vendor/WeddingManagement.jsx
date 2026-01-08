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
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Event as EventIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { useVendor } from '../../../context/VendorContext';
import PageContainer from '../../../ui/container/PageContainer';

const WeddingManagement = () => {
  const { user } = useAuth();
  const { projects } = useVendor();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const weddingProjects = [
    {
      id: 1,
      coupleName: 'Sarah & John',
      weddingDate: '2024-03-15',
      venue: 'Grand Ballroom Hotel',
      budget: 75000,
      status: 'planning',
      progress: 65,
      services: ['Photography', 'Catering', 'Venue'],
      timeline: [
        { phase: 'Initial Consultation', completed: true, date: '2024-01-10' },
        { phase: 'Contract Signing', completed: true, date: '2024-01-15' },
        { phase: 'Planning Phase', completed: false, date: '2024-02-01' },
        { phase: 'Final Preparations', completed: false, date: '2024-03-01' },
        { phase: 'Wedding Day', completed: false, date: '2024-03-15' }
      ]
    },
    {
      id: 2,
      coupleName: 'Emma & Michael',
      weddingDate: '2024-04-20',
      venue: 'Garden Pavilion',
      budget: 45000,
      status: 'confirmed',
      progress: 85,
      services: ['Photography', 'Makeup'],
      timeline: [
        { phase: 'Initial Consultation', completed: true, date: '2024-01-20' },
        { phase: 'Contract Signing', completed: true, date: '2024-01-25' },
        { phase: 'Planning Phase', completed: true, date: '2024-02-15' },
        { phase: 'Final Preparations', completed: false, date: '2024-04-01' },
        { phase: 'Wedding Day', completed: false, date: '2024-04-20' }
      ]
    },
    {
      id: 3,
      coupleName: 'Lisa & David',
      weddingDate: '2024-02-28',
      venue: 'Beachside Resort',
      budget: 95000,
      status: 'completed',
      progress: 100,
      services: ['Photography', 'Catering', 'Venue', 'Makeup'],
      timeline: [
        { phase: 'Initial Consultation', completed: true, date: '2023-12-01' },
        { phase: 'Contract Signing', completed: true, date: '2023-12-05' },
        { phase: 'Planning Phase', completed: true, date: '2024-01-15' },
        { phase: 'Final Preparations', completed: true, date: '2024-02-15' },
        { phase: 'Wedding Day', completed: true, date: '2024-02-28' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'confirmed': return 'primary';
      case 'planning': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'confirmed': return 'Confirmed';
      case 'planning': return 'In Planning';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const filteredWeddings = filterStatus === 'all' 
    ? weddingProjects 
    : weddingProjects.filter(wedding => wedding.status === filterStatus);

  const handleViewWedding = (wedding) => {
    setSelectedWedding(wedding);
    setOpenDialog(true);
  };

  const getDaysUntilWedding = (weddingDate) => {
    const today = new Date();
    const wedding = new Date(weddingDate);
    const diffTime = wedding - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <PageContainer 
      title="Wedding Management" 
      description="Manage all your wedding projects and timelines"
    >
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Wedding Project Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Wedding Project
          </Button>
        </Box>

        {/* Filter Controls */}
        <Box mb={3}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterStatus}
              label="Filter by Status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Weddings</MenuItem>
              <MenuItem value="planning">In Planning</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Wedding Projects Grid */}
        <Grid container spacing={3}>
          {filteredWeddings.map((wedding) => {
            const daysUntil = getDaysUntilWedding(wedding.weddingDate);
            
            return (
              <Grid item xs={12} md={6} lg={4} key={wedding.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {wedding.coupleName}
                        </Typography>
                        <Chip
                          label={getStatusLabel(wedding.status)}
                          color={getStatusColor(wedding.status)}
                          size="small"
                        />
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleViewWedding(wedding)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Box>

                    {/* Wedding Details */}
                    <Box mb={2}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <EventIcon sx={{ mr: 1, fontSize: 18 }} />
                        <Typography variant="body2">
                          {new Date(wedding.weddingDate).toLocaleDateString()}
                        </Typography>
                        {daysUntil > 0 && (
                          <Chip
                            label={`${daysUntil} days`}
                            size="small"
                            color="info"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                      
                      <Box display="flex" alignItems="center" mb={1}>
                        <LocationIcon sx={{ mr: 1, fontSize: 18 }} />
                        <Typography variant="body2">{wedding.venue}</Typography>
                      </Box>
                      
                      <Box display="flex" alignItems="center" mb={1}>
                        <MoneyIcon sx={{ mr: 1, fontSize: 18 }} />
                        <Typography variant="body2">
                          ${wedding.budget.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Services */}
                    <Box mb={2}>
                      <Typography variant="subtitle2" gutterBottom>
                        Services:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {wedding.services.map((service) => (
                          <Chip
                            key={service}
                            label={service}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Progress */}
                    <Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle2">Progress</Typography>
                        <Typography variant="body2">{wedding.progress}%</Typography>
                      </Box>
                      <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
                        <Box
                          sx={{
                            width: `${wedding.progress}%`,
                            bgcolor: getStatusColor(wedding.status) + '.main',
                            height: '100%',
                            borderRadius: 1,
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Wedding Detail Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="md" 
          fullWidth
        >
          <DialogTitle>
            {selectedWedding ? `${selectedWedding.coupleName} Wedding Details` : 'New Wedding Project'}
          </DialogTitle>
          <DialogContent>
            {selectedWedding ? (
              <Box>
                {/* Wedding Info */}
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Wedding Information
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Couple:</strong> {selectedWedding.coupleName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Date:</strong> {new Date(selectedWedding.weddingDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Venue:</strong> {selectedWedding.venue}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <strong>Budget:</strong> ${selectedWedding.budget.toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Project Status
                      </Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Chip
                          label={getStatusLabel(selectedWedding.status)}
                          color={getStatusColor(selectedWedding.status)}
                          size="small"
                        />
                        <Typography variant="body2" sx={{ ml: 2 }}>
                          {selectedWedding.progress}% Complete
                        </Typography>
                      </Box>
                      <Typography variant="body2" gutterBottom>
                        <strong>Services:</strong> {selectedWedding.services.join(', ')}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Timeline */}
                <Typography variant="h6" gutterBottom>
                  Project Timeline
                </Typography>
                <Stepper orientation="vertical">
                  {selectedWedding.timeline.map((phase, index) => (
                    <Step key={phase.phase} active={true} completed={phase.completed}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Avatar
                            sx={{
                              bgcolor: phase.completed ? 'success.main' : 'grey.300',
                              width: 24,
                              height: 24
                            }}
                          >
                            {phase.completed ? (
                              <CheckIcon sx={{ fontSize: 16 }} />
                            ) : (
                              <ScheduleIcon sx={{ fontSize: 16 }} />
                            )}
                          </Avatar>
                        )}
                      >
                        <Box>
                          <Typography variant="subtitle2">{phase.phase}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(phase.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Couple Names"
                      placeholder="e.g., Sarah & John"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Wedding Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Venue"
                      placeholder="Wedding venue location"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Budget"
                      type="number"
                      placeholder="Total budget"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Services Required</InputLabel>
                      <Select multiple label="Services Required">
                        <MenuItem value="photography">Photography</MenuItem>
                        <MenuItem value="catering">Catering</MenuItem>
                        <MenuItem value="venue">Venue</MenuItem>
                        <MenuItem value="makeup">Makeup</MenuItem>
                        <MenuItem value="decoration">Decoration</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
              {selectedWedding ? 'Close' : 'Cancel'}
            </Button>
            {!selectedWedding && (
              <Button variant="contained">Create Project</Button>
            )}
            {selectedWedding && (
              <Button variant="contained" startIcon={<EditIcon />}>
                Edit Project
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default WeddingManagement;