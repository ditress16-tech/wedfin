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
  Avatar,
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
  Stack
} from '@mui/material';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconMail,
  IconPhone,
  IconUserCheck,
  IconUserX,
  IconUsers
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';
import { useAuth } from '../../../context/AuthContext';
import user1 from '../../../assets/images/profile/user-1.jpg';
import user2 from '../../../assets/images/profile/user-2.jpg';
import user3 from '../../../assets/images/profile/user-3.jpg';
import user4 from '../../../assets/images/profile/user-4.jpg';
import user5 from '../../../assets/images/profile/user-5.jpg';
import user6 from '../../../assets/images/profile/user-6.jpg';

const TeamManagement = () => {
  const { getVendorCategory } = useAuth();
  const vendorCategory = getVendorCategory();

  const userImages = [user1, user2, user3, user4, user5, user6];

  // Roles by category
  const rolesByCategory = {
    photography: [
      'Lead Photographer',
      'Assistant Photographer',
      'Video Editor',
      'Photo Editor',
      'Coordinator',
      'Admin'
    ],
    makeup: [
      'Lead Makeup Artist',
      'Assistant Makeup Artist',
      'Hair Stylist',
      'Coordinator',
      'Admin'
    ],
    catering: [
      'Head Chef',
      'Sous Chef',
      'Service Manager',
      'Waiter/Waitress',
      'Coordinator',
      'Admin'
    ],
    venue: [
      'Venue Manager',
      'Event Coordinator',
      'Maintenance Staff',
      'Security',
      'Admin'
    ]
  };

  // Team members by category
  const teamMembersByCategory = {
    photography: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '+1 (555) 123-4567',
        role: 'Lead Photographer',
        status: 'active',
        joinDate: '2023-01-15',
        avatar: user1
      },
      {
        id: 2,
        name: 'Emma Wilson',
        email: 'emma.wilson@company.com',
        phone: '+1 (555) 234-5678',
        role: 'Assistant Photographer',
        status: 'active',
        joinDate: '2023-03-20',
        avatar: user2
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.brown@company.com',
        phone: '+1 (555) 345-6789',
        role: 'Video Editor',
        status: 'active',
        joinDate: '2023-06-10',
        avatar: user3
      }
    ],
    makeup: [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1 (555) 123-4567',
        role: 'Lead Makeup Artist',
        status: 'active',
        joinDate: '2023-01-15',
        avatar: user4
      },
      {
        id: 2,
        name: 'Lisa Chen',
        email: 'lisa.chen@company.com',
        phone: '+1 (555) 234-5678',
        role: 'Assistant Makeup Artist',
        status: 'active',
        joinDate: '2023-03-20',
        avatar: user5
      },
      {
        id: 3,
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        phone: '+1 (555) 345-6789',
        role: 'Hair Stylist',
        status: 'active',
        joinDate: '2023-06-10',
        avatar: user6
      }
    ],
    catering: [
      {
        id: 1,
        name: 'Chef Robert',
        email: 'robert@company.com',
        phone: '+1 (555) 123-4567',
        role: 'Head Chef',
        status: 'active',
        joinDate: '2023-01-15',
        avatar: user1
      },
      {
        id: 2,
        name: 'David Lee',
        email: 'david.lee@company.com',
        phone: '+1 (555) 234-5678',
        role: 'Sous Chef',
        status: 'active',
        joinDate: '2023-03-20',
        avatar: user2
      },
      {
        id: 3,
        name: 'Anna Martinez',
        email: 'anna.martinez@company.com',
        phone: '+1 (555) 345-6789',
        role: 'Service Manager',
        status: 'active',
        joinDate: '2023-06-10',
        avatar: user3
      }
    ],
    venue: [
      {
        id: 1,
        name: 'James Wilson',
        email: 'james.wilson@company.com',
        phone: '+1 (555) 123-4567',
        role: 'Venue Manager',
        status: 'active',
        joinDate: '2023-01-15',
        avatar: user4
      },
      {
        id: 2,
        name: 'Emily Davis',
        email: 'emily.davis@company.com',
        phone: '+1 (555) 234-5678',
        role: 'Event Coordinator',
        status: 'active',
        joinDate: '2023-03-20',
        avatar: user5
      },
      {
        id: 3,
        name: 'Tom Anderson',
        email: 'tom.anderson@company.com',
        phone: '+1 (555) 345-6789',
        role: 'Maintenance Staff',
        status: 'active',
        joinDate: '2023-06-10',
        avatar: user6
      }
    ]
  };

  const [teamMembers, setTeamMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'active'
  });

  useEffect(() => {
    // Load team members and roles based on vendor category
    if (vendorCategory) {
      setTeamMembers(teamMembersByCategory[vendorCategory] || []);
      setRoles(rolesByCategory[vendorCategory] || []);
    }
  }, [vendorCategory]);

  const handleOpenDialog = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMember(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    if (editingMember) {
      setTeamMembers(teamMembers.map(member =>
        member.id === editingMember.id
          ? { ...formData, id: member.id, joinDate: member.joinDate, avatar: member.avatar }
          : member
      ));
    } else {
      const newMember = {
        ...formData,
        id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: userImages[Math.floor(Math.random() * userImages.length)]
      };
      setTeamMembers([...teamMembers, newMember]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  const activeMembers = teamMembers.filter(m => m.status === 'active').length;
  const inactiveMembers = teamMembers.filter(m => m.status === 'inactive').length;

  return (
    <PageContainer title="Team Management" description="Manage your team">
      <Box>
        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
                    <IconUsers size={28} color="primary" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="600">
                      {teamMembers.length}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Members
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: 'success.light' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                    <IconUserCheck size={28} />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="600" color="success.dark">
                      {activeMembers}
                    </Typography>
                    <Typography variant="subtitle2" color="success.dark">
                      Active Members
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: 'grey.200' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'grey.500', width: 56, height: 56 }}>
                    <IconUserX size={28} />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight="600">
                      {inactiveMembers}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Inactive Members
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Team Members Table */}
        <DashboardCard
          title="Team Members"
          subtitle="Manage your team members and their roles"
          action={
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => handleOpenDialog()}
            >
              Add Member
            </Button>
          }
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={member.avatar} sx={{ width: 40, height: 40 }} />
                        <Typography variant="subtitle2" fontWeight="600">
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <IconMail size={14} />
                          <Typography variant="body2">{member.email}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconPhone size={14} />
                          <Typography variant="body2">{member.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={member.role} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      {new Date(member.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.status}
                        size="small"
                        color={getStatusColor(member.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(member)}
                          title="Edit"
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color={member.status === 'active' ? 'warning' : 'success'}
                          onClick={() => handleToggleStatus(member.id)}
                          title={member.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {member.status === 'active' ? (
                            <IconUserX size={18} />
                          ) : (
                            <IconUserCheck size={18} />
                          )}
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(member.id)}
                          title="Delete"
                        >
                          <IconTrash size={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingMember ? 'Edit Team Member' : 'Add Team Member'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                select
                fullWidth
                required
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
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
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.name || !formData.email || !formData.role}
            >
              {editingMember ? 'Update' : 'Add'} Member
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default TeamManagement;
