// Utility functions for formatting data

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatPercentage = (value) => {
  return `${value >= 0 ? '+' : ''}${value}%`;
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'success',
    paid: 'success',
    completed: 'success',
    pending: 'warning',
    'in-progress': 'primary',
    overdue: 'error',
    draft: 'default',
    inactive: 'default'
  };
  return colors[status] || 'default';
};

export const getPriorityColor = (priority) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'info'
  };
  return colors[priority] || 'default';
};

export const getCategoryColor = (category) => {
  const colors = {
    client: 'primary',
    equipment: 'success',
    ideas: 'warning',
    contacts: 'info',
    general: 'default'
  };
  return colors[category] || 'default';
};
