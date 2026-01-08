import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import { IconX, IconCheck } from '@tabler/icons-react';

const FormDialog = ({ 
  open, 
  onClose, 
  title, 
  onSave, 
  children, 
  saveDisabled = false,
  saveLabel = 'Save'
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} startIcon={<IconX size={18} />}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          startIcon={<IconCheck size={18} />}
          disabled={saveDisabled}
        >
          {saveLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
