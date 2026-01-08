import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  LinearProgress,
  Avatar,
  Divider
} from '@mui/material';
import {
  IconBrain,
  IconChevronDown,
  IconChevronUp,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconLightbulb,
  IconTarget,
  IconRefresh
} from '@tabler/icons-react';

const AIInsightWidget = ({ vendorData, projects, financialData }) => {
  const [expanded, setExpanded] = useState(false);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate AI insights generation
  const generateInsights = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const generatedInsights = [
        {
          type: 'revenue',
          icon: IconTrendingUp,
          color: 'success',
          title: 'Revenue Opportunity',
          description: 'Your wedding photography bookings are 23% higher this month. Consider raising prices by 10-15% for premium packages.',
          confidence: 85,
          impact: 'high'
        },
        {
          type: 'efficiency',
          icon: IconTarget,
          color: 'primary',
          title: 'Workflow Optimization',
          description: 'Projects with pre-wedding consultations have 40% fewer revisions. Schedule more consultation calls.',
          confidence: 92,
          impact: 'medium'
        },
        {
          type: 'risk',
          icon: IconAlertTriangle,
          color: 'warning',
          title: 'Client Risk Alert',
          description: '3 clients have overdue payments totaling $4,500. Follow up within 48 hours to maintain cash flow.',
          confidence: 98,
          impact: 'high'
        },
        {
          type: 'opportunity',
          icon: IconLightbulb,
          color: 'info',
          title: 'Market Opportunity',
          description: 'Engagement photo demand is up 35% in your area. Consider creating specialized engagement packages.',
          confidence: 78,
          impact: 'medium'
        },
        {
          type: 'performance',
          icon: IconTrendingDown,
          color: 'error',
          title: 'Performance Alert',
          description: 'Client satisfaction dropped 0.3 points. Recent feedback mentions longer delivery times.',
          confidence: 89,
          impact: 'high'
        }
      ];
      
      setInsights(generatedInsights);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    generateInsights();
  }, [vendorData, projects, financialData]);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'success';
    if (confidence >= 70) return 'warning';
    return 'error';
  };

  return (
    <Card 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 40, height: 40 }}>
              <IconBrain size={20} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="600">
                AI Business Insights
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Powered by machine learning
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton 
              size="small" 
              onClick={generateInsights}
              disabled={loading}
              sx={{ color: 'white' }}
            >
              <IconRefresh />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => setExpanded(!expanded)}
              sx={{ color: 'white' }}
            >
              {expanded ? <IconChevronUp /> : <IconChevronDown />}
            </IconButton>
          </Box>
        </Box>

        {loading && (
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              Analyzing your business data...
            </Typography>
            <LinearProgress sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          </Box>
        )}

        {!loading && insights.length > 0 && (
          <Box>
            {/* Summary Stats */}
            <Box display="flex" gap={2} mb={2}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="700">
                  {insights.length}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Insights
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="700">
                  {insights.filter(i => i.impact === 'high').length}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  High Impact
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="700">
                  {Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Avg Confidence
                </Typography>
              </Box>
            </Box>

            {/* Top Insight Preview */}
            {!expanded && insights.length > 0 && (
              <Box 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  borderRadius: 2, 
                  p: 2,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <insights[0].icon size={16} />
                  <Typography variant="subtitle2" fontWeight="600">
                    {insights[0].title}
                  </Typography>
                  <Chip 
                    label={`${insights[0].confidence}%`} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white'
                    }} 
                  />
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {insights[0].description}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        <Collapse in={expanded}>
          <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
          
          <Box display="flex" flexDirection="column" gap={2}>
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <Box 
                  key={index}
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    borderRadius: 2, 
                    p: 2,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box display="flex" justifyContent="between" alignItems="flex-start" gap={2}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Icon size={18} />
                      <Typography variant="subtitle2" fontWeight="600">
                        {insight.title}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" gap={1}>
                      <Chip 
                        label={insight.impact.toUpperCase()} 
                        color={getImpactColor(insight.impact)}
                        size="small"
                        sx={{ color: 'white' }}
                      />
                      <Chip 
                        label={`${insight.confidence}%`} 
                        color={getConfidenceColor(insight.confidence)}
                        size="small"
                        sx={{ color: 'white' }}
                      />
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {insight.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AIInsightWidget;