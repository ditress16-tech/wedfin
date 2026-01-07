import { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Alert
} from '@mui/material';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
  IconPackage,
  IconCurrencyDollar
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import FormDialog from '../../../components/vendor/FormDialog';
import { useFormDialog } from '../../../hooks/useFormDialog';
import { useAuth } from '../../../context/AuthContext';
import { getStatusColor } from '../../../utils/formatters';

const ServicePackages = () => {
  const { getVendorCategory } = useAuth();
  const vendorCategory = getVendorCategory();

  // Mock packages by category
  const packagesByCategory = {
    photography: [
      {
        id: 1,
        name: 'Basic Photography Package',
        category: 'photography',
        price: 1500,
        duration: '4 hours',
        description: 'Perfect for small events and intimate gatherings',
        features: [
          '4 hours of coverage',
          '200+ edited photos',
          'Online gallery',
          '1 photographer',
          'Basic retouching'
        ],
        isPopular: false,
        status: 'active'
      },
      {
        id: 2,
        name: 'Premium Photography Package',
        category: 'photography',
        price: 2500,
        duration: '8 hours',
        description: 'Most popular choice for full-day wedding coverage',
        features: [
          '8 hours of coverage',
          '500+ edited photos',
          'Online gallery with download',
          '2 photographers',
          'Professional retouching',
          'Engagement session included',
          'USB drive with all photos'
        ],
        isPopular: true,
        status: 'active'
      },
      {
        id: 3,
        name: 'Luxury Photography Package',
        category: 'photography',
        price: 4500,
        duration: 'Full day',
        description: 'Complete wedding photography experience',
        features: [
          'Full day coverage (12+ hours)',
          '1000+ edited photos',
          'Premium online gallery',
          '3 photographers',
          'Advanced retouching',
          'Engagement + pre-wedding session',
          'Custom photo album',
          'USB drive + cloud storage',
          'Same-day preview photos'
        ],
        isPopular: false,
        status: 'active'
      }
    ],
    makeup: [
      {
        id: 1,
        name: 'Basic Makeup Package',
        category: 'makeup',
        price: 800,
        duration: '2 hours',
        description: 'Simple and elegant makeup for your special day',
        features: [
          'Bridal makeup',
          'Basic hair styling',
          'False lashes',
          'Touch-up kit',
          '1 makeup trial'
        ],
        isPopular: false,
        status: 'active'
      },
      {
        id: 2,
        name: 'Premium Makeup Package',
        category: 'makeup',
        price: 1500,
        duration: '4 hours',
        description: 'Complete bridal makeup with traditional touch',
        features: [
          'Bridal makeup',
          'Professional hair styling',
          'Premium false lashes',
          'Airbrush makeup',
          '2 makeup trials',
          'Touch-up service',
          'Makeup for 2 family members'
        ],
        isPopular: true,
        status: 'active'
      },
      {
        id: 3,
        name: 'Luxury Makeup Package',
        category: 'makeup',
        price: 2500,
        duration: 'Full day',
        description: 'Ultimate bridal beauty experience',
        features: [
          'Bridal makeup & hair',
          'Pre-wedding makeup session',
          'Premium airbrush makeup',
          'Designer hair styling',
          '3 makeup trials',
          'Full day touch-up service',
          'Makeup for 4 family members',
          'Spa treatment included'
        ],
        isPopular: false,
        status: 'active'
      }
    ],
    catering: [
      {
        id: 1,
        name: 'Basic Catering Package',
        category: 'catering',
        price: 3500,
        duration: '50-100 guests',
        description: 'Simple yet delicious menu for intimate gatherings',
        features: [
          'Indonesian menu (3 courses)',
          'Buffet setup',
          'Basic table decoration',
          'Serving staff (2 people)',
          'Standard cutlery & plates'
        ],
        isPopular: false,
        status: 'active'
      },
      {
        id: 2,
        name: 'Premium Catering Package',
        category: 'catering',
        price: 6500,
        duration: '100-200 guests',
        description: 'Popular choice with diverse menu options',
        features: [
          'Indonesian & Western menu (5 courses)',
          'Buffet or table service',
          'Premium table decoration',
          'Serving staff (5 people)',
          'Premium cutlery & plates',
          'Welcome drinks',
          'Dessert station'
        ],
        isPopular: true,
        status: 'active'
      },
      {
        id: 3,
        name: 'Luxury Catering Package',
        category: 'catering',
        price: 12000,
        duration: '200-500 guests',
        description: 'Complete fine dining experience',
        features: [
          'International fusion menu (7 courses)',
          'Live cooking stations',
          'Premium table service',
          'Serving staff (10 people)',
          'Designer cutlery & plates',
          'Welcome drinks & cocktails',
          'Multiple dessert stations',
          'Custom menu design',
          'Professional food photography'
        ],
        isPopular: false,
        status: 'active'
      }
    ],
    venue: [
      {
        id: 1,
        name: 'Basic Venue Package',
        category: 'venue',
        price: 2500,
        duration: '4 hours',
        description: 'Simple and elegant venue for intimate ceremonies',
        features: [
          'Garden or indoor space',
          '50-100 guests capacity',
          'Basic decoration',
          'Sound system',
          'Parking area',
          'Bridal room'
        ],
        isPopular: false,
        status: 'active'
      },
      {
        id: 2,
        name: 'Premium Venue Package',
        category: 'venue',
        price: 5000,
        duration: '8 hours',
        description: 'Complete venue with all amenities',
        features: [
          'Garden + Ballroom access',
          '100-300 guests capacity',
          'Premium decoration',
          'Professional sound & lighting',
          'Parking area',
          'Bridal suite',
          'Photo booth area',
          'Catering kitchen access'
        ],
        isPopular: true,
        status: 'active'
      },
      {
        id: 3,
        name: 'Luxury Venue Package',
        category: 'venue',
        price: 10000,
        duration: 'Full day',
        description: 'Exclusive venue experience with premium facilities',
        features: [
          'Full venue access (Garden, Ballroom, Chapel)',
          '300-500 guests capacity',
          'Designer decoration',
          'Premium sound, lighting & AV system',
          'VIP parking area',
          'Luxury bridal suite',
          'Multiple photo spots',
          'Professional catering kitchen',
          'Accommodation for bride & groom',
          'Event coordinator included'
        ],
        isPopular: false,
        status: 'active'
      }
    ]
  };

  const [packages, setPackages] = useState([]);
  const { 
    open: openDialog, 
    editing: editingPackage, 
    formData, 
    handleOpen: handleOpenDialog, 
    handleClose: handleCloseDialog, 
    handleChange 
  } = useFormDialog({
    name: '',
    category: 'photography',
    price: '',
    duration: '',
    description: '',
    features: '',
    isPopular: false,
    status: 'active'
  });

  useEffect(() => {
    // Load packages based on vendor category
    if (vendorCategory && packagesByCategory[vendorCategory]) {
      setPackages(packagesByCategory[vendorCategory]);
    }
  }, [vendorCategory]);

  const handleSave = () => {
    const featuresArray = formData.features.split('\n').filter(f => f.trim() !== '');
    
    if (editingPackage) {
      // Update existing package
      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id 
          ? { ...formData, id: pkg.id, features: featuresArray, price: parseFloat(formData.price), category: vendorCategory }
          : pkg
      ));
    } else {
      // Add new package
      const newPackage = {
        ...formData,
        id: Math.max(...packages.map(p => p.id), 0) + 1,
        features: featuresArray,
        price: parseFloat(formData.price),
        category: vendorCategory
      };
      setPackages([...packages, newPackage]);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const handleOpenWithData = (pkg = null) => {
    if (pkg) {
      handleOpenDialog({
        ...pkg,
        features: pkg.features.join('\n')
      });
    } else {
      handleOpenDialog({
        name: '',
        category: vendorCategory || 'photography',
        price: '',
        duration: '',
        description: '',
        features: '',
        isPopular: false,
        status: 'active'
      });
    }
  };

  return (
    <PageContainer title="Service Packages" description="Manage service packages">
      <Box>
        <DashboardCard
          title="Service Packages"
          subtitle="Create and manage your service packages"
          action={
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => handleOpenDialog()}
            >
              Add Package
            </Button>
          }
        >
          <Box>
            <Grid container spacing={3}>
              {packages.map((pkg) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={pkg.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      border: pkg.isPopular ? 2 : 1,
                      borderColor: pkg.isPopular ? 'primary.main' : 'divider',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-4px)',
                        transition: 'all 0.3s'
                      }
                    }}
                  >
                    {pkg.isPopular && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 1
                        }}
                      />
                    )}
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <IconPackage size={24} color="primary" />
                        <Typography variant="h5" fontWeight="600">
                          {pkg.name}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="baseline" gap={1} mb={2}>
                        <Typography variant="h3" fontWeight="700" color="primary.main">
                          ${pkg.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / {pkg.duration}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary" mb={3}>
                        {pkg.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle2" fontWeight="600" mb={1}>
                        Package Includes:
                      </Typography>
                      
                      <List dense sx={{ mb: 2 }}>
                        {pkg.features.map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                            <IconCheck size={16} color="green" style={{ marginRight: 8 }} />
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>

                      <Box display="flex" gap={1} mb={2}>
                        <Chip
                          label={pkg.status}
                          size="small"
                          color={getStatusColor(pkg.status)}
                          variant="outlined"
                        />
                        <Chip
                          label={pkg.category}
                          size="small"
                          variant="outlined"
                        />
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          startIcon={<IconEdit size={16} />}
                          onClick={() => handleOpenWithData(pkg)}
                        >
                          Edit
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          <IconTrash size={18} />
                        </IconButton>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {packages.length === 0 && (
              <Box textAlign="center" py={8}>
                <IconPackage size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No packages yet
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Create your first service package to get started
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<IconPlus size={18} />}
                  onClick={() => handleOpenWithData()}
                >
                  Add Package
                </Button>
              </Box>
            )}
          </Box>
        </DashboardCard>

        {/* Add/Edit Package Dialog */}
        <FormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          title={editingPackage ? 'Edit Package' : 'Add New Package'}
          onSave={handleSave}
          saveLabel={editingPackage ? 'Update Package' : 'Create Package'}
          saveDisabled={!formData.name || !formData.price || !formData.duration}
        >
          <TextField
            label="Package Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            placeholder="e.g., Premium Wedding Package"
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                select
                fullWidth
                required
              >
                <MenuItem value="photography">Photography</MenuItem>
                <MenuItem value="makeup">Makeup</MenuItem>
                <MenuItem value="catering">Catering</MenuItem>
                <MenuItem value="venue">Venue</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                select
                fullWidth
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g., 2500"
                slotProps={{
                  input: {
                    startAdornment: <IconCurrencyDollar size={20} style={{ marginRight: 8 }} />
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g., 8 hours"
              />
            </Grid>
          </Grid>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
            required
            placeholder="Brief description of the package"
          />

          <TextField
            label="Features (one per line)"
            name="features"
            value={formData.features}
            onChange={handleChange}
            multiline
            rows={6}
            fullWidth
            required
            placeholder="8 hours of coverage&#10;500+ edited photos&#10;Online gallery&#10;2 photographers"
            helperText="Enter each feature on a new line"
          />

          <Box>
            <label>
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                style={{ marginRight: 8 }}
              />
              Mark as "Most Popular"
            </label>
          </Box>

          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="body2">
              Tip: Popular packages are highlighted and shown first to clients
            </Typography>
          </Alert>
        </FormDialog>
      </Box>
    </PageContainer>
  );
};

export default ServicePackages;
