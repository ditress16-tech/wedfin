import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUser,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconCamera,
  IconVideo,
  IconPalette,
  IconUsers,
  IconChevronLeft,
  IconChevronRight,
  IconToday
} from '@tabler/icons-react';
import PageContainer from '../../../ui/container/PageContainer';
import CollapsibleSection from '../../../components/vendor/shared/CollapsibleSection';

const EnhancedCalendar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Wedding Photography - Sarah Johnson',
      type: 'wedding',
      client: 'Sarah Johnson