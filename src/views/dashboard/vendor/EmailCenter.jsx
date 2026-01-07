import React, { useState } from 'react';
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
  Checkbox,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  IconMail,
  IconMailOpened,
  IconStar,
  IconStarFilled,
  IconTrash,
  IconReload,
  IconSearch,
  IconSend,
  IconInbox,
  IconSend as IconSent,
  IconArchive
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';

const EmailCenter = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [openCompose, setOpenCompose] = useState(false);

  const emails = [
    {
      id: 1,
      from: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      subject: 'Wedding Photography Inquiry',
      preview: 'Hi, I am interested in booking your services for my wedding on June 15...',
      date: 'Today, 10:30 AM',
      read: false,
      starred: true,
      folder: 'inbox'
    },
    {
      id: 2,
      from: 'Maria Garcia',
      email: 'maria.g@email.com',
      subject: 'Re: Pre-wedding Session Schedule',
      preview: 'Thank you for the quick response. The proposed date works perfectly for us...',
      date: 'Today, 9:15 AM',
      read: true,
      starred: false,
      folder: 'inbox'
    },
    {
      id: 3,
      from: 'Lisa Chen',
      email: 'lisa.c@email.com',
      subject: 'Photo Delivery Confirmation',
      preview: 'I received all the photos! They look absolutely amazing. Thank you so much...',
      date: 'Yesterday',
      read: true,
      starred: true,
      folder: 'inbox'
    },
    {
      id: 4,
      from: 'Emily Davis',
      email: 'emily.d@email.com',
      subject: 'Payment Confirmation',
      preview: 'Payment has been processed successfully. Looking forward to working with you...',
      date: '2 days ago',
      read: true,
      starred: false,
      folder: 'inbox'
    }
  ];

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: IconInbox, count: 12 },
    { id: 'sent', label: 'Sent', icon: IconSent, count: 45 },
    { id: 'starred', label: 'Starred', icon: IconStarFilled, count: 8 },
    { id: 'archive', label: 'Archive', icon: IconArchive, count: 156 },
    { id: 'trash', label: 'Trash', icon: IconTrash, count: 3 }
  ];

  const handleSelectEmail = (id) => {
    setSelectedEmails(prev =>
      prev.includes(id) ? prev.filter(emailId => emailId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(e => e.id));
    }
  };

  const filteredEmails = emails.filter(email => {
    if (selectedFolder === 'starred') return email.starred;
    return email.folder === selectedFolder;
  });

  return (
    <PageContainer title="Email Center" description="Manage emails">
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<IconSend size={18} />}
                  onClick={() => setOpenCompose(true)}
                  sx={{ mb: 3 }}
                >
                  Compose
                </Button>

                <List sx={{ p: 0 }}>
                  {folders.map((folder) => {
                    const Icon = folder.icon;
                    return (
                      <ListItem
                        key={folder.id}
                        button
                        selected={selectedFolder === folder.id}
                        onClick={() => setSelectedFolder(folder.id)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          '&.Mui-selected': {
                            bgcolor: 'primary.light'
                          }
                        }}
                      >
                        <Icon size={20} style={{ marginRight: 12 }} />
                        <ListItemText primary={folder.label} />
                        <Chip label={folder.count} size="small" />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <DashboardCard
              title="Email Center"
              action={
                <Box display="flex" gap={1}>
                  <IconButton size="small" title="Refresh">
                    <IconReload size={20} />
                  </IconButton>
                  <IconButton size="small" title="Delete" disabled={selectedEmails.length === 0}>
                    <IconTrash size={20} />
                  </IconButton>
                </Box>
              }
            >
              <Box mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search emails..."
                  InputProps={{
                    startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />
                  }}
                />
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Checkbox
                  checked={selectedEmails.length === emails.length && emails.length > 0}
                  indeterminate={selectedEmails.length > 0 && selectedEmails.length < emails.length}
                  onChange={handleSelectAll}
                />
                <Typography variant="body2" color="text.secondary">
                  {selectedEmails.length > 0
                    ? `${selectedEmails.length} selected`
                    : `${filteredEmails.length} emails`}
                </Typography>
              </Box>

              <Divider />

              <List sx={{ p: 0 }}>
                {filteredEmails.map((email) => (
                  <Box key={email.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        bgcolor: email.read ? 'transparent' : 'action.hover',
                        '&:hover': { bgcolor: 'action.selected' }
                      }}
                    >
                      <Checkbox
                        checked={selectedEmails.includes(email.id)}
                        onChange={() => handleSelectEmail(email.id)}
                      />
                      <IconButton size="small" sx={{ mr: 1 }}>
                        {email.starred ? (
                          <IconStarFilled size={18} color="orange" />
                        ) : (
                          <IconStar size={18} />
                        )}
                      </IconButton>
                      <Box flexGrow={1} minWidth={0}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={email.read ? 400 : 600}
                            noWrap
                          >
                            {email.from}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {email.date}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={email.read ? 400 : 600}
                          noWrap
                          mb={0.5}
                        >
                          {email.subject}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {email.preview}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>

              {filteredEmails.length === 0 && (
                <Box textAlign="center" py={8}>
                  <IconMail size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
                  <Typography variant="h6" color="text.secondary">
                    No emails in {selectedFolder}
                  </Typography>
                </Box>
              )}
            </DashboardCard>
          </Grid>
        </Grid>

        <Dialog open={openCompose} onClose={() => setOpenCompose(false)} maxWidth="md" fullWidth>
          <DialogTitle>New Message</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField label="To" fullWidth placeholder="recipient@email.com" />
              <TextField label="Subject" fullWidth placeholder="Email subject" />
              <TextField
                label="Message"
                multiline
                rows={10}
                fullWidth
                placeholder="Type your message here..."
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenCompose(false)}>Cancel</Button>
            <Button variant="contained" startIcon={<IconSend size={18} />}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default EmailCenter;
