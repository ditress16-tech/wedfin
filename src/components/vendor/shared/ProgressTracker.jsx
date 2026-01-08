import React from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepConnector,
  LinearProgress,
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  IconCheck,
  IconClock,
  IconAlertCircle,
  IconX
} from '@tabler/icons-react';

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '&.Mui-active': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
  '&.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.success.main,
    },
  },
}));

const ProgressTracker = ({ 
  steps, 
  currentStep, 
  variant = 'vertical', // 'vertical', 'horizontal', 'compact'
  showProgress = true 
}) => {
  const getStepIcon = (stepIndex, step) => {
    const isCompleted = stepIndex < currentStep;
    const isCurrent = stepIndex === currentStep;
    const isPending = stepIndex > currentStep;

    if (step.status === 'error') {
      return (
        <Avatar sx={{ bgcolor: 'error.main', width: 32, height: 32 }}>
          <IconX size={16} />
        </Avatar>
      );
    }

    if (isCompleted) {
      return (
        <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
          <IconCheck size={16} />
        </Avatar>
      );
    }

    if (isCurrent) {
      return (
        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
          <IconClock size={16} />
        </Avatar>
      );
    }

    if (step.status === 'warning') {
      return (
        <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
          <IconAlertCircle size={16} />
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
        <Typography variant="caption" fontWeight="600">
          {stepIndex + 1}
        </Typography>
      </Avatar>
    );
  };

  const getStepStatus = (stepIndex, step) => {
    if (step.status === 'error') return { label: 'Error', color: 'error' };
    if (step.status === 'warning') return { label: 'Issue', color: 'warning' };
    if (stepIndex < currentStep) return { label: 'Completed', color: 'success' };
    if (stepIndex === currentStep) return { label: 'In Progress', color: 'primary' };
    return { label: 'Pending', color: 'default' };
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  if (variant === 'compact') {
    return (
      <Box>
        {showProgress && (
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle2" fontWeight="600">
                Progress
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentStep + 1} of {steps.length} steps
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
        
        <Box display="flex" flexDirection="column" gap={1}>
          {steps.map((step, index) => {
            const status = getStepStatus(index, step);
            return (
              <Box 
                key={index}
                display="flex" 
                alignItems="center" 
                gap={2}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: index === currentStep ? 'primary.light' : 'transparent',
                  border: '1px solid',
                  borderColor: index === currentStep ? 'primary.main' : 'divider'
                }}
              >
                {getStepIcon(index, step)}
                <Box flex={1}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {step.title}
                  </Typography>
                  {step.description && (
                    <Typography variant="caption" color="text.secondary">
                      {step.description}
                    </Typography>
                  )}
                </Box>
                <Chip 
                  label={status.label} 
                  color={status.color} 
                  size="small" 
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Box>
        {showProgress && (
          <Box mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="600">
                Project Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(progressPercentage)}% Complete
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        )}
        
        <Stepper 
          activeStep={currentStep} 
          alternativeLabel
          connector={<CustomStepConnector />}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel 
                StepIconComponent={() => getStepIcon(index, step)}
              >
                <Typography variant="subtitle2" fontWeight="600">
                  {step.title}
                </Typography>
                {step.description && (
                  <Typography variant="caption" color="text.secondary">
                    {step.description}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }

  // Default vertical variant
  return (
    <Box>
      {showProgress && (
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" fontWeight="600">
              Project Timeline
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progressPercentage)}% Complete
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      )}
      
      <Stepper 
        activeStep={currentStep} 
        orientation="vertical"
        connector={<CustomStepConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel 
              StepIconComponent={() => getStepIcon(index, step)}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">
                    {step.title}
                  </Typography>
                  {step.description && (
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  )}
                </Box>
                <Chip 
                  label={getStepStatus(index, step).label} 
                  color={getStepStatus(index, step).color} 
                  size="small" 
                />
              </Box>
            </StepLabel>
            {step.content && (
              <StepContent>
                <Box sx={{ pb: 2 }}>
                  {step.content}
                </Box>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressTracker;