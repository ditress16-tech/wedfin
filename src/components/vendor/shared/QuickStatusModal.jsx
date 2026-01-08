import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import { IconX } from '@tabler/icons-react';

const QuickStatusModal = ({ open, onClose, project, onUpdate }) => {
  const [status, setStatus] = useState(project?.status || '');
  const [subStatus, setSubStatus] = useState(project?.subStatus || '');
  const [notes, setNotes] = useState('');

  const statusOptions = [
    { value: 'planning', label: 'Planning', color: 'info' },
    { value: 'active', label: 'Active', color: 'primary' },
    { value: 'editing', label: 'Editing', color: 'warning' },
    { value: 'review', label: 'Client Review', color: 'secondary' },
    { value: 'completed', label: 'Completed', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'error' }
  ];

  const subStatusOptions = {
    planning: ['Initial Meeting', 'Contract Signing', 'Timeline Setup'],
    active: ['Pre-production', 'Shooting', 'Post-production'],
    editing: ['Raw Processing', 'Color Grading', 'Final Touches'],
    review: ['Client Feedback', 'Revisions', 'Final Approval'],
    completed: ['Delivered', 'Payment Complete', 'Archived'],
    cancelled: ['Client Request', 'Force Majeure', 'Payment Issues']
  };

  const handleSubmit = () => {
    const updateData = {
      status,
      subStatus,
      notes,
      lastUpdated: new Date().toISOString()
    };
    
    onUpdate(project.id, updateData);
    onClose();
  };

  const getStatusColor = (statusValue) => {
    const option = statusOptions.find(opt => opt.value === statusValue);
    return option?.color || 'default';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Quick Status Update</Typography>
          <IconButton onClick={onClose} size="small">
            <IconX />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} pt={1}>
          {/* Project Info */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Project: {project?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Client: {project?.clientName}
            </Typography>
          </Box>

          {/* Current Status Display */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Current Status
            </Typography>
            <Box display="flex" gap={1}>
              <Chip 
                label={project?.status} 
                color={getStatusColor(project?.status)} 
                size="small" 
              />
              {project?.subStatus && (
                <Chip 
                  label={project.subStatus} 
                  variant="outlined" 
                  size="small" 
                />
              )}
            </Box>
          </Box>

          {/* Status Selection */}
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setSubStatus(''); // Reset sub-status when main status changes
              }}
              label="New Status"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip 
                      label={option.label} 
                      color={option.color} 
                      size="small" 
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sub-Status Selection */}
          {status && subStatusOptions[status] && (
            <FormControl fullWidth>
              <InputLabel>Sub Status</InputLabel>
              <Select
                value={subStatus}
                onChange={(e) => setSubStatus(e.target.value)}
                label="Sub Status"
              >
                {subStatusOptions[status].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Notes */}
          <TextField
            label="Update Notes"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this status update..."
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!status}
        >
          Update Status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickStatusModal;