import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Divider
} from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const CollapsibleSection = ({ 
  title, 
  subtitle, 
  children, 
  defaultExpanded = false,
  icon: Icon,
  headerAction,
  variant = 'default' // 'default', 'compact', 'minimal'
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          card: { boxShadow: 1 },
          header: { py: 1.5, px: 2 },
          content: { pt: 0, px: 2, pb: 2 }
        };
      case 'minimal':
        return {
          card: { boxShadow: 0, border: '1px solid', borderColor: 'divider' },
          header: { py: 1, px: 1.5 },
          content: { pt: 0, px: 1.5, pb: 1.5 }
        };
      default:
        return {
          card: {},
          header: { py: 2, px: 3 },
          content: { pt: 0, px: 3, pb: 3 }
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.header}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={handleToggle}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            {Icon && (
              <Icon 
                size={variant === 'minimal' ? 18 : 20} 
                color="primary" 
              />
            )}
            <Box>
              <Typography 
                variant={variant === 'minimal' ? 'subtitle2' : 'h6'} 
                fontWeight="600"
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  display="block"
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            {headerAction}
            <IconButton 
              size={variant === 'minimal' ? 'small' : 'medium'}
              onClick={handleToggle}
            >
              {expanded ? <IconChevronUp /> : <IconChevronDown />}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
      
      <Collapse in={expanded}>
        <Divider />
        <CardContent sx={styles.content}>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CollapsibleSection;