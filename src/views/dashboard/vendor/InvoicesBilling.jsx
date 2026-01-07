import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import {
  IconPlus,
  IconEye,
  IconDownload,
  IconSend,
  IconFileInvoice,
  IconCurrencyDollar,
  IconCalendar
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { useAuth } from '../../../context/AuthContext';

const InvoicesBilling = () => {
  const { getVendorCategory } = useAuth();
  const vendorCategory = getVendorCategory();

  // Mock invoices by category
  const invoicesByCategory = {
    photography: [
      {
        id: 'INV-2024-001',
        clientName: 'Sarah Johnson',
        project: 'Wedding Photography Premium',
        amount: 2500,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-01-30',
        paidDate: '2024-01-28'
      },
      {
        id: 'INV-2024-002',
        clientName: 'Maria Garcia',
        project: 'Pre-wedding Photography Session',
        amount: 1200,
        status: 'pending',
        issueDate: '2024-01-18',
        dueDate: '2024-02-02',
        paidDate: null
      },
      {
        id: 'INV-2024-003',
        clientName: 'Lisa Chen',
        project: 'Engagement Photography',
        amount: 800,
        status: 'overdue',
        issueDate: '2024-01-10',
        dueDate: '2024-01-25',
        paidDate: null
      },
      {
        id: 'INV-2024-004',
        clientName: 'Emily Davis',
        project: 'Wedding Photography Luxury',
        amount: 4500,
        status: 'draft',
        issueDate: '2024-01-20',
        dueDate: '2024-02-05',
        paidDate: null
      }
    ],
    makeup: [
      {
        id: 'INV-2024-001',
        clientName: 'Sarah Johnson',
        project: 'Bridal Makeup Premium',
        amount: 1500,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-01-30',
        paidDate: '2024-01-28'
      },
      {
        id: 'INV-2024-002',
        clientName: 'Maria Garcia',
        project: 'Traditional Makeup Package',
        amount: 1200,
        status: 'pending',
        issueDate: '2024-01-18',
        dueDate: '2024-02-02',
        paidDate: null
      },
      {
        id: 'INV-2024-003',
        clientName: 'Lisa Chen',
        project: 'Modern Glam Makeup',
        amount: 1000,
        status: 'overdue',
        issueDate: '2024-01-10',
        dueDate: '2024-01-25',
        paidDate: null
      },
      {
        id: 'INV-2024-004',
        clientName: 'Emily Davis',
        project: 'Bridal Makeup Luxury',
        amount: 2500,
        status: 'draft',
        issueDate: '2024-01-20',
        dueDate: '2024-02-05',
        paidDate: null
      }
    ],
    catering: [
      {
        id: 'INV-2024-001',
        clientName: 'Sarah Johnson',
        project: 'Wedding Banquet - 200 pax',
        amount: 8500,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-01-30',
        paidDate: '2024-01-28'
      },
      {
        id: 'INV-2024-002',
        clientName: 'Maria Garcia',
        project: 'Buffet Service - 150 pax',
        amount: 6000,
        status: 'pending',
        issueDate: '2024-01-18',
        dueDate: '2024-02-02',
        paidDate: null
      },
      {
        id: 'INV-2024-003',
        clientName: 'Lisa Chen',
        project: 'Intimate Dinner - 50 pax',
        amount: 3500,
        status: 'overdue',
        issueDate: '2024-01-10',
        dueDate: '2024-01-25',
        paidDate: null
      },
      {
        id: 'INV-2024-004',
        clientName: 'Emily Davis',
        project: 'Luxury Catering - 300 pax',
        amount: 12000,
        status: 'draft',
        issueDate: '2024-01-20',
        dueDate: '2024-02-05',
        paidDate: null
      }
    ],
    venue: [
      {
        id: 'INV-2024-001',
        clientName: 'Sarah Johnson',
        project: 'Garden Wedding Venue',
        amount: 5000,
        status: 'paid',
        issueDate: '2024-01-15',
        dueDate: '2024-01-30',
        paidDate: '2024-01-28'
      },
      {
        id: 'INV-2024-002',
        clientName: 'Maria Garcia',
        project: 'Ballroom Venue Premium',
        amount: 7000,
        status: 'pending',
        issueDate: '2024-01-18',
        dueDate: '2024-02-02',
        paidDate: null
      },
      {
        id: 'INV-2024-003',
        clientName: 'Lisa Chen',
        project: 'Chapel Ceremony',
        amount: 3000,
        status: 'overdue',
        issueDate: '2024-01-10',
        dueDate: '2024-01-25',
        paidDate: null
      },
      {
        id: 'INV-2024-004',
        clientName: 'Emily Davis',
        project: 'Full Venue Luxury Package',
        amount: 10000,
        status: 'draft',
        issueDate: '2024-01-20',
        dueDate: '2024-02-05',
        paidDate: null
      }
    ]
  };

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Load invoices based on vendor category
    if (vendorCategory && invoicesByCategory[vendorCategory]) {
      setInvoices(invoicesByCategory[vendorCategory]);
    }
  }, [vendorCategory]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      paid: 'success',
      pending: 'warning',
      overdue: 'error',
      draft: 'default'
    };
    return colors[status] || 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  };

  const handleDownload = (invoiceId) => {
    console.log('Download invoice:', invoiceId);
    // Implement download logic
  };

  const handleSendInvoice = (invoiceId) => {
    console.log('Send invoice:', invoiceId);
    // Implement send email logic
  };

  const getTotalStats = () => {
    const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    const pending = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
    const overdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
    
    return { total, paid, pending, overdue };
  };

  const stats = getTotalStats();

  return (
    <PageContainer title="Invoices & Billing" description="Manage invoices and billing">
      <Box>
        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Invoiced
                </Typography>
                <Typography variant="h4" fontWeight="600">
                  {formatCurrency(stats.total)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ bgcolor: 'success.light' }}>
              <CardContent>
                <Typography variant="subtitle2" color="success.dark" gutterBottom>
                  Paid
                </Typography>
                <Typography variant="h4" fontWeight="600" color="success.dark">
                  {formatCurrency(stats.paid)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ bgcolor: 'warning.light' }}>
              <CardContent>
                <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="h4" fontWeight="600" color="warning.dark">
                  {formatCurrency(stats.pending)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ bgcolor: 'error.light' }}>
              <CardContent>
                <Typography variant="subtitle2" color="error.dark" gutterBottom>
                  Overdue
                </Typography>
                <Typography variant="h4" fontWeight="600" color="error.dark">
                  {formatCurrency(stats.overdue)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Invoices Table */}
        <DashboardCard
          title="Invoices"
          subtitle="Manage your invoices and billing"
          action={
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
            >
              Create Invoice
            </Button>
          }
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Issue Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="600">
                        {invoice.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>{invoice.project}</TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" fontWeight="600">
                        {formatCurrency(invoice.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        size="small"
                        color={getStatusColor(invoice.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleViewInvoice(invoice)}
                          title="View"
                        >
                          <IconEye size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleDownload(invoice.id)}
                          title="Download"
                        >
                          <IconDownload size={18} />
                        </IconButton>
                        {invoice.status !== 'paid' && (
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleSendInvoice(invoice.id)}
                            title="Send"
                          >
                            <IconSend size={18} />
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* Invoice Detail Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={1}>
              <IconFileInvoice size={24} />
              Invoice Details
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedInvoice && (
              <Box>
                <Grid container spacing={3}>
                  <Grid size={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Invoice ID
                    </Typography>
                    <Typography variant="h6" fontWeight="600">
                      {selectedInvoice.id}
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedInvoice.status}
                      size="small"
                      color={getStatusColor(selectedInvoice.status)}
                      sx={{ textTransform: 'capitalize', mt: 0.5 }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid size={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Client Name
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {selectedInvoice.clientName}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Project
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {selectedInvoice.project}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid size={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Issue Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedInvoice.issueDate)}
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Due Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedInvoice.dueDate)}
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Paid Date
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedInvoice.paidDate)}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="h4" fontWeight="700" color="primary.main">
                    {formatCurrency(selectedInvoice.amount)}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
            <Button variant="outlined" startIcon={<IconDownload size={18} />}>
              Download PDF
            </Button>
            {selectedInvoice?.status !== 'paid' && (
              <Button variant="contained" startIcon={<IconSend size={18} />}>
                Send to Client
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default InvoicesBilling;
