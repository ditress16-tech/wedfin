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
  TextField,
  MenuItem
} from '@mui/material';
import {
  IconPalette,
  IconAlertTriangle,
  IconPlus,
  IconEdit,
  IconShoppingCart,
  IconEye
} from '@tabler/icons-react';
import DashboardCard from '../../../ui/shared/DashboardCard';

const ProductInventory = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // Mock product inventory data
  const products = [
    {
      id: 1,
      name: 'MAC Studio Fix Foundation',
      category: 'foundation',
      brand: 'MAC',
      quantity: 5,
      minQuantity: 3,
      cost: 45,
      expiryDate: '2024-12-15',
      status: 'in_stock'
    },
    {
      id: 2,
      name: 'Urban Decay Eyeshadow Palette',
      category: 'eyeshadow',
      brand: 'Urban Decay',
      quantity: 2,
      minQuantity: 2,
      cost: 65,
      expiryDate: '2025-06-20',
      status: 'low_stock'
    },
    {
      id: 3,
      name: 'Charlotte Tilbury Lipstick',
      category: 'lipstick',
      brand: 'Charlotte Tilbury',
      quantity: 8,
      minQuantity: 4,
      cost: 38,
      expiryDate: '2024-08-30',
      status: 'in_stock'
    },
    {
      id: 4,
      name: 'NARS Blush',
      category: 'blush',
      brand: 'NARS',
      quantity: 1,
      minQuantity: 3,
      cost: 42,
      expiryDate: '2024-03-15',
      status: 'out_of_stock'
    }
  ];

  const getCategoryIcon = (category) => {
    // All categories use palette icon for simplicity
    return IconPalette;
  };

  const getStatusColor = (status) => {
    const colors = {
      in_stock: 'success',
      low_stock: 'warning',
      out_of_stock: 'error',
      expired: 'error'
    };
    return colors[status] || 'default';
  };

  const getStockLevel = (quantity, minQuantity) => {
    return Math.round((quantity / (minQuantity * 2)) * 100);
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleReorderProduct = (productId) => {
    console.log('Reorder product:', productId);
  };

  return (
    <>
      <DashboardCard 
        title="Product Inventory" 
        subtitle="Track your makeup products and stock levels"
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setOpenDialog(true)}
          >
            Add Product
          </Button>
        }
      >
        <Box>
          <List>
            {products.map((product, index) => (
              <ListItem 
                key={product.id} 
                divider={index < products.length - 1}
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getStatusColor(product.status)}.light`,
                      color: `${getStatusColor(product.status)}.main`
                    }}
                  >
                    <IconPalette size={20} />
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {product.name}
                      </Typography>
                      {(isExpiringSoon(product.expiryDate) || isExpired(product.expiryDate)) && (
                        <IconAlertTriangle size={16} color="orange" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {product.brand} • ${product.cost} • Expires: {formatDate(product.expiryDate)}
                      </Typography>
                      <Box display="flex" gap={1} mb={1}>
                        <Chip
                          label={product.status.replace('_', ' ')}
                          size="small"
                          color={getStatusColor(product.status)}
                          variant="outlined"
                        />
                        <Chip
                          label={product.category}
                          size="small"
                          variant="filled"
                          color="primary"
                        />
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                          Stock: {product.quantity} units
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={getStockLevel(product.quantity, product.minQuantity)}
                          sx={{ 
                            flexGrow: 1, 
                            height: 6, 
                            borderRadius: 3,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: product.quantity <= product.minQuantity ? 'error.main' : 'success.main'
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  }
                />
                
                <Box display="flex" gap={1}>
                  {product.quantity <= product.minQuantity && (
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => handleReorderProduct(product.id)}
                      title="Reorder"
                    >
                      <IconShoppingCart size={16} />
                    </IconButton>
                  )}
                  <IconButton size="small" color="primary">
                    <IconEdit size={16} />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DashboardCard>

      {/* Add Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Product Name"
              fullWidth
              placeholder="e.g., MAC Studio Fix Foundation"
            />
            <TextField
              label="Brand"
              fullWidth
              placeholder="e.g., MAC"
            />
            <TextField
              label="Category"
              select
              fullWidth
              defaultValue="foundation"
            >
              <MenuItem value="foundation">Foundation</MenuItem>
              <MenuItem value="concealer">Concealer</MenuItem>
              <MenuItem value="eyeshadow">Eyeshadow</MenuItem>
              <MenuItem value="lipstick">Lipstick</MenuItem>
              <MenuItem value="blush">Blush</MenuItem>
              <MenuItem value="mascara">Mascara</MenuItem>
              <MenuItem value="eyeliner">Eyeliner</MenuItem>
              <MenuItem value="brushes">Brushes</MenuItem>
            </TextField>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              placeholder="e.g., 5"
            />
            <TextField
              label="Minimum Quantity"
              type="number"
              fullWidth
              placeholder="e.g., 3"
            />
            <TextField
              label="Cost per Unit"
              type="number"
              fullWidth
              placeholder="e.g., 45"
              InputProps={{ startAdornment: '$' }}
            />
            <TextField
              label="Expiry Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductInventory;