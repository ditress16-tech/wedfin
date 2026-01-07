import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import { IconUsers, IconCalendar, IconCurrencyDollar } from '@tabler/icons-react';
import { formatDate, getStatusColor } from '../../utils/formatters';

const ProjectCard = ({ project }) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        bgcolor: 'grey.50',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: 'grey.100',
          borderColor: 'primary.main'
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight="600" mb={0.5}>
            {project.name}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconUsers size={14} />
              <Typography variant="caption" color="text.secondary">
                {project.client}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconCalendar size={14} />
              <Typography variant="caption" color="text.secondary">
                {formatDate(project.date)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconCurrencyDollar size={14} />
              <Typography variant="caption" color="text.secondary">
                ${project.budget?.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Chip
          label={project.status}
          size="small"
          color={getStatusColor(project.status)}
          sx={{ textTransform: 'capitalize' }}
        />
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          <Typography variant="caption" color="text.secondary">
            Progress
          </Typography>
          <Typography variant="caption" fontWeight="600">
            {project.progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{ height: 6, borderRadius: 3 }}
          color={
            project.progress === 100 ? 'success' :
            project.progress >= 50 ? 'primary' :
            'warning'
          }
        />
      </Box>
    </Box>
  );
};

export default ProjectCard;
