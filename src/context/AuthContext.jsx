import React, { createContext, useContext, useState, useEffect } from 'react';

// User roles constants
export const USER_ROLES = {
  WEDDING_PLANNER: 'wedding_planner',
  VENDOR_PHOTOGRAPHY: 'vendor_photography',
  VENDOR_MAKEUP: 'vendor_makeup',
  VENDOR_CATERING: 'vendor_catering',
  VENDOR_VENUE: 'vendor_venue'
};

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data - in real app, this would come from API
  const mockUsers = {
    wedding_planner: {
      id: 1,
      email: 'planner@wedding.com',
      name: 'Wedding Planner',
      role: USER_ROLES.WEDDING_PLANNER,
      permissions: ['all_projects', 'all_vendors', 'financial_overview', 'vendor_assignment']
    },
    vendor_photography: {
      id: 2,
      email: 'photo@vendor.com',
      name: 'Photography Studio',
      role: USER_ROLES.VENDOR_PHOTOGRAPHY,
      category: 'photography',
      permissions: ['own_projects', 'own_profile', 'own_financial', 'assigned_tasks']
    },
    vendor_makeup: {
      id: 3,
      email: 'makeup@vendor.com',
      name: 'Makeup Artist',
      role: USER_ROLES.VENDOR_MAKEUP,
      category: 'makeup',
      permissions: ['own_projects', 'own_profile', 'own_financial', 'assigned_tasks']
    },
    vendor_catering: {
      id: 4,
      email: 'catering@vendor.com',
      name: 'Catering Service',
      role: USER_ROLES.VENDOR_CATERING,
      category: 'catering',
      permissions: ['own_projects', 'own_profile', 'own_financial', 'assigned_tasks']
    },
    vendor_venue: {
      id: 5,
      email: 'venue@vendor.com',
      name: 'Wedding Venue',
      role: USER_ROLES.VENDOR_VENUE,
      category: 'venue',
      permissions: ['own_projects', 'own_profile', 'own_financial', 'assigned_tasks']
    }
  };

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userType) => {
    const userData = mockUsers[userType];
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user has permission
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  // Check if user is wedding planner
  const isWeddingPlanner = () => {
    return user?.role === USER_ROLES.WEDDING_PLANNER;
  };

  // Check if user is vendor
  const isVendor = () => {
    return user?.role?.startsWith('vendor_');
  };

  // Get vendor category
  const getVendorCategory = () => {
    return user?.category || null;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isWeddingPlanner,
    isVendor,
    getVendorCategory,
    USER_ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;