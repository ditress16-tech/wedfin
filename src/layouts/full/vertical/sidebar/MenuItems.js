import { uniqueId } from 'lodash';

import {
  IconCamera,
  IconPalette,
  IconChefHat,
  IconBuildingCommunity,
  IconChartBar,
  IconChartLine,
  IconCalendar,
  IconUsers,
  IconClipboardList,
  IconChecklist,
  IconCurrencyDollar,
  IconHome,
  IconBriefcase,
  IconFileInvoice,
  IconPackage,
  IconReportAnalytics,
  IconMessage,
  IconMail,
  IconNotes,
  IconUsersGroup,
  IconUserCircle,
  IconSettings,
  IconMessageCircle,
  IconWallet,
  IconFolders,
  IconUserCheck
} from '@tabler/icons-react';

// Photography Vendor Menu
const photographyMenuItems = [
  {
    navlabel: true,
    subheader: 'Photography Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/vendor/photography',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/dashboards/vendor/analytics',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartLine,
    href: '/dashboards/vendor/statistics',
  },
  {
    navlabel: true,
    subheader: 'Project Management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Management',
    icon: IconClipboardList,
    href: '/dashboards/vendor/wedding-management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Projects',
    icon: IconBriefcase,
    href: '/dashboards/vendor/wedding-projects',
  },
  {
    id: uniqueId(),
    title: 'Vendor Management',
    icon: IconUsers,
    href: '/dashboards/vendor/vendor-management',
  },
  {
    id: uniqueId(),
    title: 'Clients & Leads',
    icon: IconUsers,
    href: '/dashboards/vendor/clients-leads',
  },
  {
    id: uniqueId(),
    title: 'Calendar & Booking',
    icon: IconCalendar,
    href: '/dashboards/vendor/calendar-booking',
  },
  {
    id: uniqueId(),
    title: 'Tasks & Timeline',
    icon: IconChecklist,
    href: '/dashboards/vendor/tasks-timeline',
  },
  {
    navlabel: true,
    subheader: 'Financial',
  },
  {
    id: uniqueId(),
    title: 'Financial Management',
    icon: IconCurrencyDollar,
    href: '/dashboards/vendor/financial-management',
  },
  {
    id: uniqueId(),
    title: 'Invoices & Billing',
    icon: IconFileInvoice,
    href: '/dashboards/vendor/invoices-billing',
  },
  {
    id: uniqueId(),
    title: 'Service Packages',
    icon: IconPackage,
    href: '/dashboards/vendor/service-packages',
  },
  {
    id: uniqueId(),
    title: 'KPI & Reports',
    icon: IconReportAnalytics,
    href: '/dashboards/vendor/kpi-reports',
  },
  {
    navlabel: true,
    subheader: 'Communication',
  },
  {
    id: uniqueId(),
    title: 'Messages & Chat',
    icon: IconMessageCircle,
    href: '/dashboards/vendor/messages-chat',
  },
  {
    id: uniqueId(),
    title: 'Email Center',
    icon: IconMail,
    href: '/dashboards/vendor/email-center',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/dashboards/vendor/notes',
  },
  {
    navlabel: true,
    subheader: 'Team & Settings',
  },
  {
    id: uniqueId(),
    title: 'Team Management',
    icon: IconUsersGroup,
    href: '/dashboards/vendor/team-management',
  },
  {
    id: uniqueId(),
    title: 'User Profile',
    icon: IconUserCircle,
    href: '/dashboards/vendor/user-profile',
  },
  {
    id: uniqueId(),
    title: 'Account Settings',
    icon: IconSettings,
    href: '/dashboards/vendor/account-settings',
  },
];

// Makeup Artist Menu
const makeupMenuItems = [
  {
    navlabel: true,
    subheader: 'Makeup Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/vendor/makeup',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/dashboards/vendor/analytics',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartLine,
    href: '/dashboards/vendor/statistics',
  },
  {
    navlabel: true,
    subheader: 'Project Management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Management',
    icon: IconClipboardList,
    href: '/dashboards/vendor/wedding-management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Projects',
    icon: IconBriefcase,
    href: '/dashboards/vendor/wedding-projects',
  },
  {
    id: uniqueId(),
    title: 'Vendor Management',
    icon: IconUsers,
    href: '/dashboards/vendor/vendor-management',
  },
  {
    id: uniqueId(),
    title: 'Clients & Leads',
    icon: IconUsers,
    href: '/dashboards/vendor/clients-leads',
  },
  {
    id: uniqueId(),
    title: 'Calendar & Booking',
    icon: IconCalendar,
    href: '/dashboards/vendor/calendar-booking',
  },
  {
    id: uniqueId(),
    title: 'Tasks & Timeline',
    icon: IconChecklist,
    href: '/dashboards/vendor/tasks-timeline',
  },
  {
    navlabel: true,
    subheader: 'Financial',
  },
  {
    id: uniqueId(),
    title: 'Financial Management',
    icon: IconCurrencyDollar,
    href: '/dashboards/vendor/financial-management',
  },
  {
    id: uniqueId(),
    title: 'Invoices & Billing',
    icon: IconFileInvoice,
    href: '/dashboards/vendor/invoices-billing',
  },
  {
    id: uniqueId(),
    title: 'Service Packages',
    icon: IconPackage,
    href: '/dashboards/vendor/service-packages',
  },
  {
    id: uniqueId(),
    title: 'KPI & Reports',
    icon: IconReportAnalytics,
    href: '/dashboards/vendor/kpi-reports',
  },
  {
    navlabel: true,
    subheader: 'Communication',
  },
  {
    id: uniqueId(),
    title: 'Messages & Chat',
    icon: IconMessageCircle,
    href: '/dashboards/vendor/messages-chat',
  },
  {
    id: uniqueId(),
    title: 'Email Center',
    icon: IconMail,
    href: '/dashboards/vendor/email-center',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/dashboards/vendor/notes',
  },
  {
    navlabel: true,
    subheader: 'Team & Settings',
  },
  {
    id: uniqueId(),
    title: 'Team Management',
    icon: IconUsersGroup,
    href: '/dashboards/vendor/team-management',
  },
  {
    id: uniqueId(),
    title: 'User Profile',
    icon: IconUserCircle,
    href: '/dashboards/vendor/user-profile',
  },
  {
    id: uniqueId(),
    title: 'Account Settings',
    icon: IconSettings,
    href: '/dashboards/vendor/account-settings',
  },
];

// Catering Service Menu
const cateringMenuItems = [
  {
    navlabel: true,
    subheader: 'Catering Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/vendor/catering',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/dashboards/vendor/analytics',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartLine,
    href: '/dashboards/vendor/statistics',
  },
  {
    navlabel: true,
    subheader: 'Project Management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Management',
    icon: IconClipboardList,
    href: '/dashboards/vendor/wedding-management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Projects',
    icon: IconBriefcase,
    href: '/dashboards/vendor/wedding-projects',
  },
  {
    id: uniqueId(),
    title: 'Vendor Management',
    icon: IconUsers,
    href: '/dashboards/vendor/vendor-management',
  },
  {
    id: uniqueId(),
    title: 'Clients & Leads',
    icon: IconUsers,
    href: '/dashboards/vendor/clients-leads',
  },
  {
    id: uniqueId(),
    title: 'Calendar & Booking',
    icon: IconCalendar,
    href: '/dashboards/vendor/calendar-booking',
  },
  {
    id: uniqueId(),
    title: 'Tasks & Timeline',
    icon: IconChecklist,
    href: '/dashboards/vendor/tasks-timeline',
  },
  {
    navlabel: true,
    subheader: 'Financial',
  },
  {
    id: uniqueId(),
    title: 'Financial Management',
    icon: IconCurrencyDollar,
    href: '/dashboards/vendor/financial-management',
  },
  {
    id: uniqueId(),
    title: 'Invoices & Billing',
    icon: IconFileInvoice,
    href: '/dashboards/vendor/invoices-billing',
  },
  {
    id: uniqueId(),
    title: 'Service Packages',
    icon: IconPackage,
    href: '/dashboards/vendor/service-packages',
  },
  {
    id: uniqueId(),
    title: 'KPI & Reports',
    icon: IconReportAnalytics,
    href: '/dashboards/vendor/kpi-reports',
  },
  {
    navlabel: true,
    subheader: 'Communication',
  },
  {
    id: uniqueId(),
    title: 'Messages & Chat',
    icon: IconMessageCircle,
    href: '/dashboards/vendor/messages-chat',
  },
  {
    id: uniqueId(),
    title: 'Email Center',
    icon: IconMail,
    href: '/dashboards/vendor/email-center',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/dashboards/vendor/notes',
  },
  {
    navlabel: true,
    subheader: 'Team & Settings',
  },
  {
    id: uniqueId(),
    title: 'Team Management',
    icon: IconUsersGroup,
    href: '/dashboards/vendor/team-management',
  },
  {
    id: uniqueId(),
    title: 'User Profile',
    icon: IconUserCircle,
    href: '/dashboards/vendor/user-profile',
  },
  {
    id: uniqueId(),
    title: 'Account Settings',
    icon: IconSettings,
    href: '/dashboards/vendor/account-settings',
  },
];

// Wedding Venue Menu
const venueMenuItems = [
  {
    navlabel: true,
    subheader: 'Venue Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/vendor/venue',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/dashboards/vendor/analytics',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartLine,
    href: '/dashboards/vendor/statistics',
  },
  {
    navlabel: true,
    subheader: 'Project Management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Management',
    icon: IconClipboardList,
    href: '/dashboards/vendor/wedding-management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Projects',
    icon: IconBriefcase,
    href: '/dashboards/vendor/wedding-projects',
  },
  {
    id: uniqueId(),
    title: 'Vendor Management',
    icon: IconUsers,
    href: '/dashboards/vendor/vendor-management',
  },
  {
    id: uniqueId(),
    title: 'Clients & Leads',
    icon: IconUsers,
    href: '/dashboards/vendor/clients-leads',
  },
  {
    id: uniqueId(),
    title: 'Calendar & Booking',
    icon: IconCalendar,
    href: '/dashboards/vendor/calendar-booking',
  },
  {
    id: uniqueId(),
    title: 'Tasks & Timeline',
    icon: IconChecklist,
    href: '/dashboards/vendor/tasks-timeline',
  },
  {
    navlabel: true,
    subheader: 'Financial',
  },
  {
    id: uniqueId(),
    title: 'Financial Management',
    icon: IconCurrencyDollar,
    href: '/dashboards/vendor/financial-management',
  },
  {
    id: uniqueId(),
    title: 'Invoices & Billing',
    icon: IconFileInvoice,
    href: '/dashboards/vendor/invoices-billing',
  },
  {
    id: uniqueId(),
    title: 'Service Packages',
    icon: IconPackage,
    href: '/dashboards/vendor/service-packages',
  },
  {
    id: uniqueId(),
    title: 'KPI & Reports',
    icon: IconReportAnalytics,
    href: '/dashboards/vendor/kpi-reports',
  },
  {
    navlabel: true,
    subheader: 'Communication',
  },
  {
    id: uniqueId(),
    title: 'Messages & Chat',
    icon: IconMessageCircle,
    href: '/dashboards/vendor/messages-chat',
  },
  {
    id: uniqueId(),
    title: 'Email Center',
    icon: IconMail,
    href: '/dashboards/vendor/email-center',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/dashboards/vendor/notes',
  },
  {
    navlabel: true,
    subheader: 'Team & Settings',
  },
  {
    id: uniqueId(),
    title: 'Team Management',
    icon: IconUsersGroup,
    href: '/dashboards/vendor/team-management',
  },
  {
    id: uniqueId(),
    title: 'User Profile',
    icon: IconUserCircle,
    href: '/dashboards/vendor/user-profile',
  },
  {
    id: uniqueId(),
    title: 'Account Settings',
    icon: IconSettings,
    href: '/dashboards/vendor/account-settings',
  },
];

// Wedding Planner Menu
const plannerMenuItems = [
  {
    navlabel: true,
    subheader: 'Planner Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/vendor/photography',
  },
  {
    id: uniqueId(),
    title: 'Analytics',
    icon: IconChartBar,
    href: '/dashboards/vendor/analytics',
  },
  {
    id: uniqueId(),
    title: 'Statistics',
    icon: IconChartLine,
    href: '/dashboards/vendor/statistics',
  },
  {
    navlabel: true,
    subheader: 'Project Management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Management',
    icon: IconClipboardList,
    href: '/dashboards/vendor/wedding-management',
  },
  {
    id: uniqueId(),
    title: 'Wedding Projects',
    icon: IconBriefcase,
    href: '/dashboards/vendor/wedding-projects',
  },
  {
    id: uniqueId(),
    title: 'Vendor Management',
    icon: IconUsers,
    href: '/dashboards/vendor/vendor-management',
  },
  {
    id: uniqueId(),
    title: 'Clients & Leads',
    icon: IconUsers,
    href: '/dashboards/vendor/clients-leads',
  },
  {
    id: uniqueId(),
    title: 'Calendar & Booking',
    icon: IconCalendar,
    href: '/dashboards/vendor/calendar-booking',
  },
  {
    id: uniqueId(),
    title: 'Tasks & Timeline',
    icon: IconChecklist,
    href: '/dashboards/vendor/tasks-timeline',
  },
  {
    navlabel: true,
    subheader: 'Financial',
  },
  {
    id: uniqueId(),
    title: 'Financial Management',
    icon: IconCurrencyDollar,
    href: '/dashboards/vendor/financial-management',
  },
  {
    id: uniqueId(),
    title: 'Invoices & Billing',
    icon: IconFileInvoice,
    href: '/dashboards/vendor/invoices-billing',
  },
  {
    id: uniqueId(),
    title: 'Service Packages',
    icon: IconPackage,
    href: '/dashboards/vendor/service-packages',
  },
  {
    id: uniqueId(),
    title: 'KPI & Reports',
    icon: IconReportAnalytics,
    href: '/dashboards/vendor/kpi-reports',
  },
  {
    navlabel: true,
    subheader: 'Communication',
  },
  {
    id: uniqueId(),
    title: 'Messages & Chat',
    icon: IconMessageCircle,
    href: '/dashboards/vendor/messages-chat',
  },
  {
    id: uniqueId(),
    title: 'Email Center',
    icon: IconMail,
    href: '/dashboards/vendor/email-center',
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/dashboards/vendor/notes',
  },
  {
    navlabel: true,
    subheader: 'Team & Settings',
  },
  {
    id: uniqueId(),
    title: 'Team Management',
    icon: IconUsersGroup,
    href: '/dashboards/vendor/team-management',
  },
  {
    id: uniqueId(),
    title: 'User Profile',
    icon: IconUserCircle,
    href: '/dashboards/vendor/user-profile',
  },
  {
    id: uniqueId(),
    title: 'Account Settings',
    icon: IconSettings,
    href: '/dashboards/vendor/account-settings',
  },
];

// Export menu items based on user role
export const getMenuItems = (userRole) => {
  switch (userRole) {
    case 'vendor_photography':
      return photographyMenuItems;
    case 'vendor_makeup':
      return makeupMenuItems;
    case 'vendor_catering':
      return cateringMenuItems;
    case 'vendor_venue':
      return venueMenuItems;
    case 'wedding_planner':
      return plannerMenuItems;
    default:
      return photographyMenuItems;
  }
};

// Default export for backward compatibility
export default photographyMenuItems;
