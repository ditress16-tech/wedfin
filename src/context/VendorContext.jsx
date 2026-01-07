import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create Vendor Context
const VendorContext = createContext();

// Vendor Provider Component
export const VendorProvider = ({ children }) => {
  const { user, isVendor, getVendorCategory } = useAuth();
  const [vendorData, setVendorData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock vendor data
  const mockVendorData = {
    photography: {
      businessName: 'Eternal Moments Photography',
      description: 'Professional wedding photography with artistic touch',
      rating: 4.8,
      totalProjects: 45,
      activeProjects: 8,
      monthlyRevenue: 25000,
      equipment: ['Canon EOS R5', 'Sony A7R IV', 'Various Lenses'],
      specialties: ['Wedding Photography', 'Pre-wedding', 'Engagement'],
      portfolio: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg']
    },
    makeup: {
      businessName: 'Glamour Beauty Studio',
      description: 'Bridal makeup specialist with 10+ years experience',
      rating: 4.9,
      totalProjects: 32,
      activeProjects: 6,
      monthlyRevenue: 18000,
      products: ['MAC', 'Urban Decay', 'Charlotte Tilbury'],
      specialties: ['Bridal Makeup', 'Traditional Look', 'Modern Glam'],
      portfolio: ['makeup1.jpg', 'makeup2.jpg', 'makeup3.jpg']
    },
    catering: {
      businessName: 'Royal Feast Catering',
      description: 'Premium catering service for weddings and events',
      rating: 4.7,
      totalProjects: 28,
      activeProjects: 5,
      monthlyRevenue: 35000,
      menuTypes: ['Indonesian', 'Western', 'Chinese', 'Fusion'],
      specialties: ['Wedding Banquet', 'Buffet Service', 'Live Cooking'],
      capacity: '50-500 guests'
    },
    venue: {
      businessName: 'Paradise Garden Venue',
      description: 'Beautiful outdoor and indoor wedding venue',
      rating: 4.6,
      totalProjects: 22,
      activeProjects: 4,
      monthlyRevenue: 42000,
      spaces: ['Garden Area', 'Ballroom', 'Chapel', 'Bridal Suite'],
      capacity: '100-300 guests',
      amenities: ['Parking', 'Bridal Room', 'Sound System', 'Lighting']
    }
  };

  // Mock projects data by category
  const mockProjectsByCategory = {
    photography: [
      {
        id: 1,
        name: 'Sarah & John Wedding Photography',
        client: 'Sarah Johnson',
        date: '2024-02-15',
        status: 'active',
        budget: 2500,
        progress: 75,
        priority: 'high',
        type: 'Wedding Photography',
        deliverables: ['500+ edited photos', 'Online gallery', 'USB drive']
      },
      {
        id: 2,
        name: 'Maria Pre-wedding Session',
        client: 'Maria Garcia',
        date: '2024-03-20',
        status: 'planning',
        budget: 1200,
        progress: 45,
        priority: 'medium',
        type: 'Pre-wedding',
        deliverables: ['200+ edited photos', 'Online gallery']
      },
      {
        id: 3,
        name: 'Lisa Engagement Photos',
        client: 'Lisa Chen',
        date: '2024-04-10',
        status: 'completed',
        budget: 800,
        progress: 100,
        priority: 'low',
        type: 'Engagement',
        deliverables: ['100+ edited photos', 'Online gallery']
      }
    ],
    makeup: [
      {
        id: 1,
        name: 'Sarah Bridal Makeup',
        client: 'Sarah Johnson',
        date: '2024-02-15',
        status: 'active',
        budget: 1500,
        progress: 80,
        priority: 'high',
        type: 'Bridal Makeup',
        deliverables: ['Bridal makeup', 'Hair styling', 'Touch-up kit']
      },
      {
        id: 2,
        name: 'Maria Traditional Makeup',
        client: 'Maria Garcia',
        date: '2024-03-20',
        status: 'planning',
        budget: 1200,
        progress: 30,
        priority: 'medium',
        type: 'Traditional Look',
        deliverables: ['Traditional makeup', 'Hair styling']
      },
      {
        id: 3,
        name: 'Lisa Modern Glam Makeup',
        client: 'Lisa Chen',
        date: '2024-04-10',
        status: 'completed',
        budget: 1000,
        progress: 100,
        priority: 'low',
        type: 'Modern Glam',
        deliverables: ['Modern makeup', 'Hair styling', 'Lashes']
      }
    ],
    catering: [
      {
        id: 1,
        name: 'Sarah Wedding Banquet',
        client: 'Sarah Johnson',
        date: '2024-02-15',
        status: 'active',
        budget: 8500,
        progress: 70,
        priority: 'high',
        type: 'Wedding Banquet',
        deliverables: ['Indonesian menu', 'Western menu', 'Live cooking', '200 pax']
      },
      {
        id: 2,
        name: 'Maria Buffet Service',
        client: 'Maria Garcia',
        date: '2024-03-20',
        status: 'planning',
        budget: 6000,
        progress: 40,
        priority: 'medium',
        type: 'Buffet Service',
        deliverables: ['Fusion menu', 'Buffet setup', '150 pax']
      },
      {
        id: 3,
        name: 'Lisa Intimate Dinner',
        client: 'Lisa Chen',
        date: '2024-04-10',
        status: 'completed',
        budget: 3500,
        progress: 100,
        priority: 'low',
        type: 'Intimate Dinner',
        deliverables: ['Western menu', 'Table service', '50 pax']
      }
    ],
    venue: [
      {
        id: 1,
        name: 'Sarah Garden Wedding Venue',
        client: 'Sarah Johnson',
        date: '2024-02-15',
        status: 'active',
        budget: 5000,
        progress: 85,
        priority: 'high',
        type: 'Garden Wedding',
        deliverables: ['Garden area', 'Decoration', 'Sound system', '200 guests']
      },
      {
        id: 2,
        name: 'Maria Ballroom Venue',
        client: 'Maria Garcia',
        date: '2024-03-20',
        status: 'planning',
        budget: 7000,
        progress: 50,
        priority: 'medium',
        type: 'Ballroom',
        deliverables: ['Ballroom', 'Lighting', 'Sound system', '300 guests']
      },
      {
        id: 3,
        name: 'Lisa Chapel Ceremony',
        client: 'Lisa Chen',
        date: '2024-04-10',
        status: 'completed',
        budget: 3000,
        progress: 100,
        priority: 'low',
        type: 'Chapel',
        deliverables: ['Chapel', 'Basic decoration', '100 guests']
      }
    ]
  };

  // Mock analytics data by category
  const mockAnalyticsByCategory = {
    photography: {
      monthlyRevenue: 25000,
      previousMonthRevenue: 22000,
      totalProjects: 45,
      activeProjects: 8,
      completedProjects: 37,
      clientSatisfaction: 4.8,
      averageProjectValue: 2500,
      bookingConversionRate: 75,
      repeatClientRate: 35
    },
    makeup: {
      monthlyRevenue: 18000,
      previousMonthRevenue: 16000,
      totalProjects: 32,
      activeProjects: 6,
      completedProjects: 26,
      clientSatisfaction: 4.9,
      averageProjectValue: 1200,
      bookingConversionRate: 80,
      repeatClientRate: 40
    },
    catering: {
      monthlyRevenue: 35000,
      previousMonthRevenue: 32000,
      totalProjects: 28,
      activeProjects: 5,
      completedProjects: 23,
      clientSatisfaction: 4.7,
      averageProjectValue: 6500,
      bookingConversionRate: 70,
      repeatClientRate: 30
    },
    venue: {
      monthlyRevenue: 42000,
      previousMonthRevenue: 38000,
      totalProjects: 22,
      activeProjects: 4,
      completedProjects: 18,
      clientSatisfaction: 4.6,
      averageProjectValue: 5000,
      bookingConversionRate: 65,
      repeatClientRate: 25
    }
  };

  // Load vendor data when user changes
  useEffect(() => {
    if (user && isVendor()) {
      setLoading(true);
      const category = getVendorCategory();
      
      // Simulate API call
      setTimeout(() => {
        setVendorData(mockVendorData[category] || {});
        setProjects(mockProjectsByCategory[category] || []);
        setAnalytics(mockAnalyticsByCategory[category] || {});
        setNotifications([
          { id: 1, type: 'info', message: 'New project assigned', time: '2 hours ago' },
          { id: 2, type: 'success', message: 'Payment received', time: '1 day ago' },
          { id: 3, type: 'warning', message: 'Upcoming deadline', time: '3 days ago' }
        ]);
        setLoading(false);
      }, 500);
    }
  }, [user, isVendor, getVendorCategory]);

  // Update vendor profile
  const updateVendorProfile = (updatedData) => {
    setVendorData(prev => ({ ...prev, ...updatedData }));
  };

  // Add new project
  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      status: 'planning',
      progress: 0
    };
    setProjects(prev => [...prev, newProject]);
  };

  // Update project
  const updateProject = (projectId, updatedData) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, ...updatedData }
          : project
      )
    );
  };

  // Get projects by status
  const getProjectsByStatus = (status) => {
    return projects.filter(project => project.status === status);
  };

  // Get upcoming projects
  const getUpcomingProjects = () => {
    const today = new Date();
    return projects.filter(project => {
      const projectDate = new Date(project.date);
      return projectDate > today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const value = {
    vendorData,
    projects,
    analytics,
    notifications,
    loading,
    updateVendorProfile,
    addProject,
    updateProject,
    getProjectsByStatus,
    getUpcomingProjects
  };

  return (
    <VendorContext.Provider value={value}>
      {children}
    </VendorContext.Provider>
  );
};

// Custom hook to use vendor context
export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
};

export default VendorContext;