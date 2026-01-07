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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import {
  IconCamera,
  IconDeviceDesktop,
  IconBulb,
  IconPlus,
  IconEdit,
  IconAlertTriangle,
  IconCheck
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const EquipmentTracking = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock equipment data
  const equipment = [
    {
      id: 1,
      name: 'Canon EOS R5',
      type: 'camera',
      status: 'available',
      condition: 'excellent',
      lastUsed: '2024-01-05',
      maintenanceDue: '2024-03-15'
    },
    {
      id: 2,
      name: 'Sony A7R IV',
      type: 'camera',
      status: 'in_use',
      condition: 'good',
      lastUsed: '2024-01-07',
      maintenanceDue: '2024-02-20'
    },
    {
      id: 3,
      name: 'Canon 24-70mm f/2.8',
      type: 'lens',
      status: 'available',
      condition: 'excellent',
      lastUsed: '2024-01-05',
      maintenanceDue: '2024-04-10'
    },
    {
      id: 4,
      name: 'Godox AD600Pro',
      type: 'lighting',
      status: 'maintenance',
      condition: 'needs_repair',
      lastUsed: '2024-01-03',
      maintenanceDue: '2024-01-10'
    }
  ];

  const getEquipmentIcon = (type) => {
    const icons = {
      camera: IconCamera,
      lens: IconCamera,
      lighting: IconBulb,
      accessory: IconDeviceDesktop
    };
    const IconComponent = icons[type] || IconCamera;
    return <IconComponent size={20} />;
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      in_use: 'warning',
      maintenance: 'error',
      retired: 'default'
    };
    return colors[status] || 'default';
  };

  const getConditionColor = (condition) => {
    const colors = {
      excellent: 'success',
      good: 'info',
      fair: 'warning',
      needs_repair: 'error'
    };
    return colors[condition] || 'default';
  };

  const isMaintenanceDue = (maintenanceDate) => {
    const today = new Date();
    const dueDate = new Date(maintenanceDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <>
      <DashboardCard 
        title="Equipment Tracking" 
        subtitle="Monitor your photography equipment and maintenance"
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Add Equipment
          </Button>
        }
      >
        <Box>
          <List>
            {equipment.map((item, index) => (
              <ListItem 
                key={item.id} 
                divider={index < equipment.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(item.status)}.light`,
                      color: `${getStatusColor(item.status)}.main`
                    }}
                  >
                    {getEquipmentIcon(item.type)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2">
                        {item.name}
                      </Typography>
                      {isMaintenanceDue(item.maintenanceDue) && (
                        <IconAlertTriangle size={16} color="orange" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Box display="flex" gap={1} mb={0.5}>
                        <Chip
                          label={item.status.replace('_', ' ')}
                          size="small"
                          color={getStatusColor(item.status)}
                          variant="outlined"
                        />
                        <Chip
                          label={item.condition.replace('_', ' ')}
                          size="small"
                          color={getConditionColor(item.condition)}
                          variant="filled"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Last used: {item.lastUsed} • Maintenance due: {item.maintenanceDue}
                      </Typography>
                    </Box>
                  }
                />
                
                <IconButton size="small" color="primary">
                  <IconEdit size={16} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </DashboardCard>

      {/* Add Equipment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Equipment</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Equipment Name"
              fullWidth
              placeholder="e.g., Canon EOS R5"
            />
            <TextField
              label="Type"
              select
              fullWidth
              defaultValue="camera"
            >
              <MenuItem value="camera">Camera</MenuItem>
              <MenuItem value="lens">Lens</MenuItem>
              <MenuItem value="lighting">Lighting</MenuItem>
              <MenuItem value="accessory">Accessory</MenuItem>
            </TextField>
            <TextField
              label="Condition"
              select
              fullWidth
              defaultValue="excellent"
            >
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="needs_repair">Needs Repair</MenuItem>
            </TextField>
            <TextField
              label="Purchase Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Next Maintenance Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Equipment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EquipmentTracking;