import React, { useState } from 'react';
import {
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Backdrop,
  Box,
  Tooltip
} from '@mui/material';
import {
  IconPlus,
  IconCamera,
  IconUsers,
  IconCalendarPlus,
  IconFileText,
  IconMessage,
  IconX
} from '@tabler/icons-react';

const FloatingActionButton = ({ 
  actions = [],
  variant = 'speedDial', // 'simple', 'speedDial'
  position = 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  onAction
}) => {
  const [open, setOpen] = useState(false);

  const getPositionStyles = () => {
    const positions = {
      'bottom-right': { position: 'fixed', bottom: 24, right: 24 },
      'bottom-left': { position: 'fixed', bottom: 24, left: 24 },
      'top-right': { position: 'fixed', top: 24, right: 24 },
      'top-left': { position: 'fixed', top: 24, left: 24 }
    };
    return positions[position];
  };

  const defaultActions = [
    {
      icon: IconCamera,
      name: 'New Project',
      action: 'new-project',
      color: 'primary'
    },
    {
      icon: IconUsers,
      name: 'Add Client',
      action: 'add-client',
      color: 'success'
    },
    {
      icon: IconCalendarPlus,
      name: 'Schedule Event',
      action: 'schedule-event',
      color: 'info'
    },
    {
      icon: IconFileText,
      name: 'Create Invoice',
      action: 'create-invoice',
      color: 'warning'
    },
    {
      icon: IconMessage,
      name: 'Quick Message',
      action: 'quick-message',
      color: 'secondary'
    }
  ];

  const actionList = actions.length > 0 ? actions : defaultActions;

  const handleAction = (actionKey) => {
    setOpen(false);
    if (onAction) {
      onAction(actionKey);
    }
  };

  if (variant === 'simple') {
    return (
      <Box sx={{ ...getPositionStyles(), zIndex: 1300 }}>
        <Tooltip title="Quick Actions" placement="left">
          <Fab 
            color="primary" 
            onClick={() => handleAction('primary')}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s'
              }
            }}
          >
            <IconPlus />
          </Fab>
        </Tooltip>
      </Box>
    );
  }

  return (
    <>
      <Backdrop 
        open={open} 
        sx={{ zIndex: 1200 }}
        onClick={() => setOpen(false)}
      />
      
      <Box sx={{ ...getPositionStyles(), zIndex: 1300 }}>
        <SpeedDial
          ariaLabel="Quick Actions"
          icon={<SpeedDialIcon icon={<IconPlus />} openIcon={<IconX />} />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction={position.includes('bottom') ? 'up' : 'down'}
          sx={{
            '& .MuiSpeedDial-fab': {
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.1)',
                transition: 'all 0.2s'
              }
            }
          }}
        >
          {actionList.map((action) => {
            const Icon = action.icon;
            return (
              <SpeedDialAction
                key={action.action}
                icon={<Icon />}
                tooltipTitle={action.name}
                tooltipPlacement={position.includes('right') ? 'left' : 'right'}
                onClick={() => handleAction(action.action)}
                sx={{
                  '& .MuiSpeedDialAction-fab': {
                    bgcolor: `${action.color}.main`,
                    color: 'white',
                    '&:hover': {
                      bgcolor: `${action.color}.dark`,
                      transform: 'scale(1.1)'
                    }
                  }
                }}
              />
            );
          })}
        </SpeedDial>
      </Box>
    </>
  );
};

export default FloatingActionButton;