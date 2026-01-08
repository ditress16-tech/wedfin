import { Card, CardContent, Box, Typography, LinearProgress } from '@mui/material';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

const KPICard = ({ title, value, change, trend, icon: Icon, color, target, current }) => {
  const progress = target ? (current / target) * 100 : 0;

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box
            sx={{
              bgcolor: `${color}.light`,
              p: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={24} color={color} />
          </Box>
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
          </Box>
        </Box>
        
        <Typography variant="h4" fontWeight="700" mb={0.5}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {title}
        </Typography>
        
        {target && (
          <Box>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={color}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
