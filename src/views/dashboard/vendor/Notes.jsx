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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconPin,
  IconNotes,
  IconSearch
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/ui/shared/DashboardCard';

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Client Meeting Notes - Sarah Johnson',
      content: 'Discussed wedding photography package. Client prefers natural lighting and candid shots. Venue: Grand Hotel. Date: June 15, 2024.',
      category: 'client',
      isPinned: true,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      title: 'Equipment Checklist',
      content: 'Camera bodies (2), Lenses (24-70mm, 70-200mm, 50mm f/1.4), Flash units (3), Batteries, Memory cards, Tripod, Light reflectors',
      category: 'equipment',
      isPinned: true,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19'
    },
    {
      id: 3,
      title: 'Wedding Shot List Ideas',
      content: 'Getting ready shots, First look, Ceremony entrance, Ring exchange, First kiss, Family portraits, Couple portraits, Reception details, First dance, Cake cutting',
      category: 'ideas',
      isPinned: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 4,
      title: 'Vendor Contacts',
      content: 'Florist: Bloom & Co (555-0123), Caterer: Gourmet Events (555-0456), DJ: Sound Masters (555-0789)',
      category: 'contacts',
      isPinned: false,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-14'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    isPinned: false
  });

  const categories = [
    { value: 'all', label: 'All Notes' },
    { value: 'client', label: 'Client' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'ideas', label: 'Ideas' },
    { value: 'contacts', label: 'Contacts' },
    { value: 'general', label: 'General' }
  ];

  const handleOpenDialog = (note = null) => {
    if (note) {
      setEditingNote(note);
      setFormData(note);
    } else {
      setEditingNote(null);
      setFormData({
        title: '',
        content: '',
        category: 'general',
        isPinned: false
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingNote(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    const now = new Date().toISOString().split('T')[0];
    
    if (editingNote) {
      setNotes(notes.map(note =>
        note.id === editingNote.id
          ? { ...formData, id: note.id, createdAt: note.createdAt, updatedAt: now }
          : note
      ));
    } else {
      const newNote = {
        ...formData,
        id: Math.max(...notes.map(n => n.id), 0) + 1,
        createdAt: now,
        updatedAt: now
      };
      setNotes([newNote, ...notes]);
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const handleTogglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const getCategoryColor = (category) => {
    const colors = {
      client: 'primary',
      equipment: 'success',
      ideas: 'warning',
      contacts: 'info',
      general: 'default'
    };
    return colors[category] || 'default';
  };

  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || note.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  return (
    <PageContainer title="Notes" description="Manage notes and documentation">
      <Box>
        <DashboardCard
          title="Notes"
          subtitle="Keep track of important information"
          action={
            <Button
              variant="contained"
              startIcon={<IconPlus size={18} />}
              onClick={() => handleOpenDialog()}
            >
              New Note
            </Button>
          }
        >
          <Box mb={3}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <IconSearch size={20} style={{ marginRight: 8 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={3}>
            {filteredNotes.map((note) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={note.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: note.isPinned ? 2 : 1,
                    borderColor: note.isPinned ? 'primary.main' : 'divider',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" fontWeight="600" sx={{ pr: 1 }}>
                        {note.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleTogglePin(note.id)}
                        color={note.isPinned ? 'primary' : 'default'}
                      >
                        <IconPin size={18} />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {note.content}
                    </Typography>

                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        label={note.category}
                        size="small"
                        color={getCategoryColor(note.category)}
                        variant="outlined"
                      />
                      {note.isPinned && (
                        <Chip
                          label="Pinned"
                          size="small"
                          color="primary"
                          variant="filled"
                        />
                      )}
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                      Updated: {new Date(note.updatedAt).toLocaleDateString()}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        startIcon={<IconEdit size={16} />}
                        onClick={() => handleOpenDialog(note)}
                      >
                        Edit
                      </Button>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(note.id)}
                      >
                        <IconTrash size={18} />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredNotes.length === 0 && (
            <Box textAlign="center" py={8}>
              <IconNotes size={64} style={{ opacity: 0.3, marginBottom: 16 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No notes found
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                {searchQuery || filterCategory !== 'all'
                  ? 'Try adjusting your search or filter'
                  : 'Create your first note to get started'}
              </Typography>
              {!searchQuery && filterCategory === 'all' && (
                <Button
                  variant="contained"
                  startIcon={<IconPlus size={18} />}
                  onClick={() => handleOpenDialog()}
                >
                  New Note
                </Button>
              )}
            </Box>
          )}
        </DashboardCard>

        {/* Add/Edit Note Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingNote ? 'Edit Note' : 'New Note'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Enter note title"
              />

              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                select
                fullWidth
                required
              >
                {categories.filter(cat => cat.value !== 'all').map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={8}
                fullWidth
                required
                placeholder="Enter note content..."
              />

              <Box>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    style={{ marginRight: 8 }}
                  />
                  Pin this note
                </label>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!formData.title || !formData.content}
            >
              {editingNote ? 'Update' : 'Create'} Note
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default Notes;
