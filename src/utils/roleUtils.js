import { USER_ROLES } from '../context/AuthContext';

// Role-based access control utilities
export const roleUtils = {
  // Check if user has access to specific feature
  hasAccess: (userRole, feature) => {
    const accessMatrix = {
      [USER_ROLES.WEDDING_PLANNER]: {
        all_projects: true,
        all_vendors: true,
        financial_overview: true,
        client_management: true,
        vendor_assignment: true,
        analytics_dashboard: true,
        statistics_reports: true,
        calendar_management: true,
        task_management: true,
        invoice_creation: true,
        service_packages: true,
        communication_hub: true,
        team_management: true,
        account_settings: true
      },
      [USER_ROLES.VENDOR_PHOTOGRAPHY]: {
        own_projects: true,
        own_profile: true,
        own_financial: true,
        limited_client_management: true,
        analytics_dashboard: true,
        own_statistics: true,
        own_calendar: true,
        assigned_tasks: true,
        invoice_creation: true,
        service_packages: true,
        project_communication: true,
        own_team: true,
        account_settings: true
      },
      [USER_ROLES.VENDOR_MAKEUP]: {
        own_projects: true,
        own_profile: true,
        own_financial: true,
        limited_client_management: true,
        analytics_dashboard: true,
        own_statistics: true,
        own_calendar: true,
        assigned_tasks: true,
        invoice_creation: true,
        service_packages: true,
        project_communication: true,
        own_team: true,
        account_settings: true
      },
      [USER_ROLES.VENDOR_CATERING]: {
        own_projects: true,
        own_profile: true,
        own_financial: true,
        limited_client_management: true,
        analytics_dashboard: true,
        own_statistics: true,
        own_calendar: true,
        assigned_tasks: true,
        invoice_creation: true,
        service_packages: true,
        project_communication: true,
        own_team: true,
        account_settings: true
      },
      [USER_ROLES.VENDOR_VENUE]: {
        own_projects: true,
        own_profile: true,
        own_financial: true,
        limited_client_management: true,
        analytics_dashboard: true,
        own_statistics: true,
        own_calendar: true,
        assigned_tasks: true,
        invoice_creation: true,
        service_packages: true,
        project_communication: true,
        own_team: true,
        account_settings: true
      }
    };

    return accessMatrix[userRole]?.[feature] || false;
  },

  // Get dashboard route based on user role
  getDashboardRoute: (userRole) => {
    if (userRole === USER_ROLES.WEDDING_PLANNER) {
      return '/dashboards/wedding';
    }
    
    const vendorRoutes = {
      [USER_ROLES.VENDOR_PHOTOGRAPHY]: '/dashboards/vendor/photography',
      [USER_ROLES.VENDOR_MAKEUP]: '/dashboards/vendor/makeup',
      [USER_ROLES.VENDOR_CATERING]: '/dashboards/vendor/catering',
      [USER_ROLES.VENDOR_VENUE]: '/dashboards/vendor/venue'
    };

    return vendorRoutes[userRole] || '/';
  },

  // Get vendor category from role
  getVendorCategory: (userRole) => {
    const categoryMap = {
      [USER_ROLES.VENDOR_PHOTOGRAPHY]: 'photography',
      [USER_ROLES.VENDOR_MAKEUP]: 'makeup',
      [USER_ROLES.VENDOR_CATERING]: 'catering',
      [USER_ROLES.VENDOR_VENUE]: 'venue'
    };

    return categoryMap[userRole] || null;
  },

  // Check if role is vendor
  isVendorRole: (userRole) => {
    return userRole?.startsWith('vendor_');
  },

  // Check if role is wedding planner
  isWeddingPlannerRole: (userRole) => {
    return userRole === USER_ROLES.WEDDING_PLANNER;
  },

  // Get role display name
  getRoleDisplayName: (userRole) => {
    const displayNames = {
      [USER_ROLES.WEDDING_PLANNER]: 'Wedding Planner',
      [USER_ROLES.VENDOR_PHOTOGRAPHY]: 'Photography Vendor',
      [USER_ROLES.VENDOR_MAKEUP]: 'Makeup Artist',
      [USER_ROLES.VENDOR_CATERING]: 'Catering Service',
      [USER_ROLES.VENDOR_VENUE]: 'Venue Provider'
    };

    return displayNames[userRole] || 'Unknown Role';
  },

  // Get available menu items based on role
  getMenuItems: (userRole) => {
    const baseVendorMenu = [
      { title: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
      { title: 'Analytics', href: '/analytics', icon: 'chart' },
      { title: 'Statistics', href: '/statistics', icon: 'stats' },
      { title: 'Wedding Projects', href: '/wedding-projects', icon: 'projects' },
      { title: 'Clients & Leads', href: '/clients-leads', icon: 'users' },
      { title: 'Calendar & Booking', href: '/calendar-booking', icon: 'calendar' },
      { title: 'Tasks & Timeline', href: '/tasks-timeline', icon: 'tasks' },
      { title: 'Financial Management', href: '/financial', icon: 'money' },
      { title: 'Service Packages', href: '/packages', icon: 'package' },
      { title: 'Communication', href: '/communication', icon: 'message' },
      { title: 'Settings', href: '/settings', icon: 'settings' }
    ];

    const weddingPlannerMenu = [
      { title: 'Wedding Overview', href: '/dashboards/wedding', icon: 'dashboard' },
      { title: 'All Projects', href: '/projects', icon: 'projects' },
      { title: 'Vendor Management', href: '/vendors', icon: 'vendors' },
      { title: 'Client Management', href: '/clients', icon: 'users' },
      { title: 'Financial Overview', href: '/financial', icon: 'money' },
      { title: 'Reports & Analytics', href: '/reports', icon: 'chart' },
      { title: 'Settings', href: '/settings', icon: 'settings' }
    ];

    if (userRole === USER_ROLES.WEDDING_PLANNER) {
      return weddingPlannerMenu;
    }

    return baseVendorMenu;
  }
};

export default roleUtils;