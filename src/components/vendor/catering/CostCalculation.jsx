import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider
} from '@mui/material';
import {
  IconCalculator,
  IconPlus,
  IconEdit,
  IconTrash,
  IconDownload
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const CostCalculation = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock cost calculation data
  const costBreakdown = {
    projectName: 'Sarah & John Wedding',
    guests: 200,
    calculations: [
      {
        id: 1,
        category: 'Ingredients',
        items: [
          { name: 'Rice (50kg)', quantity: 50, unit: 'kg', unitCost: 2.5, total: 125 },
          { name: 'Chicken (30kg)', quantity: 30, unit: 'kg', unitCost: 8, total: 240 },
          { name: 'Vegetables', quantity: 1, unit: 'lot', unitCost: 150, total: 150 },
          { name: 'Spices & Seasonings', quantity: 1, unit: 'lot', unitCost: 80, total: 80 }
        ],
        subtotal: 595
      },
      {
        id: 2,
        category: 'Labor',
        items: [
          { name: 'Head Chef (8 hours)', quantity: 8, unit: 'hours', unitCost: 25, total: 200 },
          { name: 'Assistant Cooks (16 hours)', quantity: 16, unit: 'hours', unitCost: 15, total: 240 },
          { name: 'Servers (24 hours)', quantity: 24, unit: 'hours', unitCost: 12, total: 288 }
        ],
        subtotal: 728
      },
      {
        id: 3,
        category: 'Equipment & Supplies',
        items: [
          { name: 'Disposable Plates & Utensils', quantity: 200, unit: 'sets', unitCost: 1.5, total: 300 },
          { name: 'Chafing Dishes Rental', quantity: 8, unit: 'pieces', unitCost: 15, total: 120 },
          { name: 'Transportation', quantity: 1, unit: 'trip', unitCost: 100, total: 100 }
        ],
        subtotal: 520
      }
    ],
    totalCost: 1843,
    profitMargin: 25, // 25%
    finalPrice: 2304
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Ingredients': 'success',
      'Labor': 'warning',
      'Equipment & Supplies': 'info',
      'Overhead': 'secondary'
    };
    return colors[category] || 'primary';
  };

  const handleAddItem = () => {
    setOpenDialog(true);
  };

  const handleEditItem = (itemId) => {
    console.log('Edit item:', itemId);
  };

  const handleDeleteItem = (itemId) => {
    console.log('Delete item:', itemId);
  };

  const handleExportCalculation = () => {
    console.log('Export calculation');
  };

  return (
    <>
      <DashboardCard 
        title="Cost Calculation" 
        subtitle="Calculate detailed costs for catering projects"
        action={
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconDownload size={16} />}
              onClick={handleExportCalculation}
            >
              Export
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<IconPlus size={16} />}
              onClick={handleAddItem}
            >
              Add Item
            </Button>
          </Box>
        }
      >
        <Box>
          {/* Project Info */}
          <Box mb={3} p={2} bgcolor="grey.50" borderRadius={1}>
            <Typography variant="h6" gutterBottom>
              {costBreakdown.projectName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Number of Guests: {costBreakdown.guests}
            </Typography>
          </Box>

          {/* Cost Breakdown by Category */}
          {costBreakdown.calculations.map((category) => (
            <Box key={category.id} mb={3}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="h6">
                  {category.category}
                </Typography>
                <Chip
                  label={`$${category.subtotal.toLocaleString()}`}
                  color={getCategoryColor(category.category)}
                  variant="outlined"
                />
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Unit</TableCell>
                      <TableCell align="right">Unit Cost</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {category.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">{item.unit}</TableCell>
                        <TableCell align="right">${item.unitCost}</TableCell>
                        <TableCell align="right">${item.total}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditItem(item.id)}
                          >
                            <IconEdit size={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <IconTrash size={14} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Summary */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Cost Summary
            </Typography>
            
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body1">Total Cost:</Typography>
              <Typography variant="body1" fontWeight="medium">
                ${costBreakdown.totalCost.toLocaleString()}
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body1">Profit Margin ({costBreakdown.profitMargin}%):</Typography>
              <Typography variant="body1" fontWeight="medium">
                ${(costBreakdown.finalPrice - costBreakdown.totalCost).toLocaleString()}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Final Price:</Typography>
              <Typography variant="h6" color="primary.main">
                ${costBreakdown.finalPrice.toLocaleString()}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" mt={1}>
              Price per guest: ${(costBreakdown.finalPrice / costBreakdown.guests).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </DashboardCard>

      {/* Add Item Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Cost Item</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Category"
              select
              fullWidth
              defaultValue="Ingredients"
            >
              <MenuItem value="Ingredients">Ingredients</MenuItem>
              <MenuItem value="Labor">Labor</MenuItem>
              <MenuItem value="Equipment & Supplies">Equipment & Supplies</MenuItem>
              <MenuItem value="Overhead">Overhead</MenuItem>
            </TextField>
            <TextField
              label="Item Name"
              fullWidth
              placeholder="e.g., Rice (50kg)"
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                placeholder="e.g., 50"
              />
              <TextField
                label="Unit"
                fullWidth
                placeholder="e.g., kg, hours, pieces"
              />
            </Box>
            <TextField
              label="Unit Cost"
              type="number"
              fullWidth
              placeholder="e.g., 2.5"
              InputProps={{ startAdornment: '$' }}
            />
            <TextField
              label="Notes"
              multiline
              rows={2}
              fullWidth
              placeholder="Additional notes about this item"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CostCalculation;