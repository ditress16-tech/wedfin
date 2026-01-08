import { useState } from 'react';

export const useFormDialog = (initialFormData = {}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData(item);
    } else {
      setEditing(null);
      setFormData(initialFormData);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return {
    open,
    editing,
    formData,
    setFormData,
    handleOpen,
    handleClose,
    handleChange
  };
};
