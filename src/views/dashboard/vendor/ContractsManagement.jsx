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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  IconSearch,
  IconPlus,
  IconFileText,
  IconSignature,
  IconDownload,
  IconEye,
  IconEdit,
  IconDots,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconX,
  IconSend,
  IconCopy,
  IconTemplate,
  IconUser,
  IconUsers
} from '@tabler/icons-react';
import PageContainer from '../../../ui/container/PageContainer';
import CollapsibleSection from '../../../components/vendor/shared/CollapsibleSection';

const ContractsManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [contractDialogOpen, setContractDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // Mock contracts data
  const contracts = [
    {
      id: 1,
      title: 'Wedding Photography Contract - Sarah Johnson',
      clientName: 'Sarah Johnson',
      projectId: 'PRJ-001',
      type: 'wedding_photography',
      status: 'signed',
      createdDate: '2024-01-15',
      signedDate: '2024-01-18',
      expiryDate: '2024-06-15',
      value: 5000,
      vendorSigned: true,
      clientSigned: true,
      template: 'Wedding Photography Standard',
      notes: 'Full day coverage with engagement session'
    },
    {
      id: 2,
      title: 'Engagement Photography - Michael Chen',
      clientName: 'Michael Chen',
      projectId: 'PRJ-002',
      type: 'engagement_photography',
      status: 'pending_client',
      createdDate: '2024-01-20',
      signedDate: null,
      expiryDate: '2024-02-20',
      value: 2500,
      vendorSigned: true,
      clientSigned: false,
      template: 'Engagement Photography Standard',
      notes: 'Outdoor session in Central Park'
    },
    {
      id: 3,
      title: 'Wedding Videography - Emily Rodriguez',
      clientName: 'Emily Rodriguez',
      projectId: 'PRJ-003',
      type: 'wedding_videography',
      status: 'draft',
      createdDate: '2024-01-22',
      signedDate: null,
      expiryDate: '2024-02-22',
      value: 8000,
      vendorSigned: false,
      clientSigned: false,
      template: 'Wedding Videography Premium',
      notes: 'Cinematic style with drone footage'
    },
    {
      id: 4,
      title: 'Corporate Event - Tech Conference',
      clientName: 'TechCorp Inc.',
      projectId: 'PRJ-004',
      type: 'corporate_event',
      status: 'expired',
      createdDate: '2024-01-10',
      signedDate: null,
      expiryDate: '2024-01-25',
      value: 3500,
      vendorSigned: true,
      clientSigned: false,
      template: 'Corporate Event Standard',
      notes: 'Multi-day conference coverage'
    }
  ];

  // Mock contract templates
  const contractTemplates = [
    {
      id: 1,
      name: 'Wedding Photography Standard',
      type: 'wedding_photography',
      description: 'Standard wedding photography contract with full day coverage',
      lastUpdated: '2024-01-01',
      usageCount: 15
    },
    {
      id: 2,
      name: 'Wedding Photography Premium',
      type: 'wedding_photography',
      description: 'Premium wedding photography with additional services',
      lastUpdated: '2024-01-01',
      usageCount: 8
    },
    {
      id: 3,
      name: 'Engagement Photography Standard',
      type: 'engagement_photography',
      description: 'Standard engagement session contract',
      lastUpdated: '2024-01-01',
      usageCount: 12
    },
    {
      id: 4,
      name: 'Wedding Videography Premium',
      type: 'wedding_videography',
      description: 'Premium videography with cinematic editing',
      lastUpdated: '2024-01-01',
      usageCount: 6
    },
    {
      id: 5,
      name: 'Corporate Event Standard',
      type: 'corporate_event',
      description: 'Standard corporate event coverage contract',
      lastUpdated: '2024-01-01',
      usageCount: 4
    }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Draft', color: 'default', icon: IconEdit },
    { value: 'pending_client', label: 'Pending Client', color: 'warning', icon: IconClock },
    { value: 'signed', label: 'Signed', color: 'success', icon: IconCheck },
    { value: 'expired', label: 'Expired', color: 'error', icon: IconX }
  ];

  const getStatusData = (status) => {
    return statusOptions.find(s => s.value === status) || statusOptions[0];
  };

  const getContractTypeLabel = (type) => {
    const types = {
      wedding_photography: 'Wedding Photography',
      engagement_photography: 'Engagement Photography',
      wedding_videography: 'Wedding Videography',
      corporate_event: 'Corporate Event'
    };
    return types[type] || type;
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || contract.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const contractStats = {
    total: contracts.length,
    draft: contracts.filter(c => c.status === 'draft').length,
    pending: contracts.filter(c => c.status === 'pending_client').length,
    signed: contracts.filter(c => c.status === 'signed').length,
    expired: contracts.filter(c => c.status === 'expired').length,
    totalValue: contracts.filter(c => c.status === 'signed').reduce((sum, c) => sum + c.value, 0)
  };

  const handleViewContract = (contract) => {
    setSelectedContract(contract);
    setContractDialogOpen(true);
  };

  return (
    <PageContainer title="Contracts Management" description="Digital contract management and signature tracking">
      <Box>
        {/* Contract Statistics */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <IconFileText />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {contractStats.total}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Contracts
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <IconCheck />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {contractStats.signed}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Signed Contracts
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'warning.light' }}>
                    <IconClock />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      {contractStats.pending}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Pending Signature
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'info.light' }}>
                    <IconSignature />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      ${contractStats.totalValue.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Contract Value
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box mb={3}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Active Contracts" />
            <Tab label="Templates" />
            <Tab label="Signatures" />
            <Tab label="Archive" />
          </Tabs>
        </Box>

        {/* Active Contracts Tab */}
        {activeTab === 0 && (
          <CollapsibleSection
            title="Contract Management"
            subtitle={`${filteredContracts.length} contracts found`}
            defaultExpanded={true}
            headerAction={
              <Button
                startIcon={<IconPlus />}
                variant="contained"
                onClick={() => {}}
              >
                New Contract
              </Button>
            }
          >
            <Box mb={3}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search contracts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch size={20} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      {statusOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* Contracts Grid */}
            <Grid container spacing={3}>
              {filteredContracts.map((contract) => {
                const statusData = getStatusData(contract.status);
                const StatusIcon = statusData.icon;
                
                return (
                  <Grid item xs={12} key={contract.id}>
                    <Card 
                      sx={{ 
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: 4
                        }
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} md={6}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Avatar sx={{ bgcolor: `${statusData.color}.light` }}>
                                <StatusIcon size={20} />
                              </Avatar>
                              <Box>
                                <Typography variant="h6" fontWeight="600">
                                  {contract.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {contract.clientName} • {getContractTypeLabel(contract.type)}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Created: {new Date(contract.createdDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} md={2}>
                            <Box textAlign="center">
                              <Typography variant="h6" fontWeight="600">
                                ${contract.value.toLocaleString()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Contract Value
                              </Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} md={2}>
                            <Box>
                              <Chip 
                                label={statusData.label} 
                                color={statusData.color}
                                size="small"
                                sx={{ mb: 1 }}
                              />
                              <Box display="flex" alignItems="center" gap={1}>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <IconUser size={14} />
                                  <Typography variant="caption" color={contract.vendorSigned ? 'success.main' : 'text.secondary'}>
                                    Vendor
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <IconUsers size={14} />
                                  <Typography variant="caption" color={contract.clientSigned ? 'success.main' : 'text.secondary'}>
                                    Client
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} md={2}>
                            <Box display="flex" gap={1} justifyContent="flex-end">
                              <IconButton 
                                size="small" 
                                onClick={() => handleViewContract(contract)}
                              >
                                <IconEye />
                              </IconButton>
                              <IconButton size="small">
                                <IconDownload />
                              </IconButton>
                              <IconButton size="small">
                                <IconEdit />
                              </IconButton>
                              <IconButton size="small">
                                <IconDots />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>

                        {contract.notes && (
                          <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
                            <Typography variant="body2" color="text.secondary">
                              {contract.notes}
                            </Typography>
                          </Box>
                        )}

                        {contract.status === 'pending_client' && (
                          <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
                            <Box display="flex" alignItems="center" gap={2}>
                              <IconAlertTriangle size={16} color="orange" />
                              <Typography variant="body2" color="warning.main">
                                Waiting for client signature - Expires {new Date(contract.expiryDate).toLocaleDateString()}
                              </Typography>
                              <Button size="small" startIcon={<IconSend />} variant="outlined">
                                Remind Client
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CollapsibleSection>
        )}

        {/* Templates Tab */}
        {activeTab === 1 && (
          <CollapsibleSection
            title="Contract Templates"
            subtitle="Manage and create contract templates"
            defaultExpanded={true}
            headerAction={
              <Button
                startIcon={<IconPlus />}
                variant="contained"
                onClick={() => {}}
              >
                New Template
              </Button>
            }
          >
            <Grid container spacing={3}>
              {contractTemplates.map((template) => (
                <Grid item xs={12} md={6} lg={4} key={template.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            <IconTemplate />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="600">
                              {template.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {getContractTypeLabel(template.type)}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton size="small">
                          <IconDots />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {template.description}
                      </Typography>

                      <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
                        <Typography variant="caption" color="text.secondary">
                          Used {template.usageCount} times
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Updated {new Date(template.lastUpdated).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Box display="flex" gap={1}>
                        <Button size="small" startIcon={<IconEye />} variant="outlined">
                          Preview
                        </Button>
                        <Button size="small" startIcon={<IconEdit />} variant="outlined">
                          Edit
                        </Button>
                        <Button size="small" startIcon={<IconCopy />} variant="contained">
                          Use
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CollapsibleSection>
        )}

        {/* Signatures Tab */}
        {activeTab === 2 && (
          <CollapsibleSection
            title="Digital Signatures"
            subtitle="Track signature status and compliance"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Digital signature tracking will be displayed here
            </Typography>
          </CollapsibleSection>
        )}

        {/* Archive Tab */}
        {activeTab === 3 && (
          <CollapsibleSection
            title="Contract Archive"
            subtitle="View completed and archived contracts"
            defaultExpanded={true}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
              Archived contracts will be displayed here
            </Typography>
          </CollapsibleSection>
        )}

        {/* Contract View Dialog */}
        <Dialog open={contractDialogOpen} onClose={() => setContractDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Contract Details
          </DialogTitle>
          <DialogContent>
            {selectedContract && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  {selectedContract.title}
                </Typography>
                
                <Grid container spacing={2} mb={3}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Client
                    </Typography>
                    <Typography variant="body2">
                      {selectedContract.clientName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Project ID
                    </Typography>
                    <Typography variant="body2">
                      {selectedContract.projectId}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Contract Value
                    </Typography>
                    <Typography variant="body2">
                      ${selectedContract.value.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Chip 
                      label={getStatusData(selectedContract.status).label} 
                      color={getStatusData(selectedContract.status).color}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Typography variant="subtitle2" gutterBottom>
                  Signature Status
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      {selectedContract.vendorSigned ? <IconCheck color="green" /> : <IconX color="red" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Vendor Signature" 
                      secondary={selectedContract.vendorSigned ? 'Signed' : 'Pending'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {selectedContract.clientSigned ? <IconCheck color="green" /> : <IconX color="red" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Client Signature" 
                      secondary={selectedContract.clientSigned ? `Signed on ${selectedContract.signedDate}` : 'Pending'}
                    />
                  </ListItem>
                </List>

                {selectedContract.notes && (
                  <Box mt={2}>
                    <Typography variant="subtitle2" gutterBottom>
                      Notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedContract.notes}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContractDialogOpen(false)}>
              Close
            </Button>
            <Button startIcon={<IconDownload />} variant="outlined">
              Download
            </Button>
            <Button startIcon={<IconEdit />} variant="contained">
              Edit Contract
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default ContractsManagement;