import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color, bgColor }) => {
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight="700">
              {value}
            </Typography>
          </Box>
          <Avatar
            sx={{
              bgcolor: bgColor,
              width: 50,
              height: 50
            }}
          >
            <Icon size={24} color={color} />
          </Avatar>
        </Box>
        {change && (
          <Box display="flex" alignItems="center" gap={0.5}>
            {trend === 'up' ? (
              <IconTrendingUp size={16} color="green" />
            ) : (
              <IconTrendingDown size={16} color="red" />
            )}
            <Typography
              variant="caption"
              color={trend === 'up' ? 'success.main' : 'error.main'}
              fontWeight="600"
            >
              {change}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
