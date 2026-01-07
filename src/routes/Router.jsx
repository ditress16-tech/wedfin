// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Homepage = Loadable(lazy(() => import('../ui/frontend-pages/homepage')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/ForgotPassword')));

/* ****Vendor Dashboards***** */
const PhotographyDashboard = Loadable(lazy(() => import('../views/dashboard/vendor/PhotographyDashboard')));
const MakeupDashboard = Loadable(lazy(() => import('../views/dashboard/vendor/MakeupDashboard')));
const CateringDashboard = Loadable(lazy(() => import('../views/dashboard/vendor/CateringDashboard')));
const VenueDashboard = Loadable(lazy(() => import('../views/dashboard/vendor/VenueDashboard')));

/* ****Vendor Core Pages***** */
const VendorAnalytics = Loadable(lazy(() => import('../views/dashboard/vendor/VendorAnalytics')));
const VendorStatistics = Loadable(lazy(() => import('../views/dashboard/vendor/VendorStatistics')));
const WeddingManagement = Loadable(lazy(() => import('../views/dashboard/vendor/WeddingManagement')));
const WeddingProjects = Loadable(lazy(() => import('../views/dashboard/vendor/WeddingProjects')));
const VendorManagement = Loadable(lazy(() => import('../views/dashboard/vendor/VendorManagement')));
const ClientsLeads = Loadable(lazy(() => import('../views/dashboard/vendor/ClientsLeads')));
const CalendarBooking = Loadable(lazy(() => import('../views/dashboard/vendor/CalendarBooking')));
const TasksTimeline = Loadable(lazy(() => import('../views/dashboard/vendor/TasksTimeline')));
const FinancialManagement = Loadable(lazy(() => import('../views/dashboard/vendor/FinancialManagement')));

/* ****Additional Vendor Pages***** */
const InvoicesBilling = Loadable(lazy(() => import('../views/dashboard/vendor/InvoicesBilling')));
const ServicePackages = Loadable(lazy(() => import('../views/dashboard/vendor/ServicePackages')));
const KPIReports = Loadable(lazy(() => import('../views/dashboard/vendor/KPIReports')));
const MessagesChat = Loadable(lazy(() => import('../views/dashboard/vendor/MessagesChat')));
const EmailCenter = Loadable(lazy(() => import('../views/dashboard/vendor/EmailCenter')));
const Notes = Loadable(lazy(() => import('../views/dashboard/vendor/Notes')));
const TeamManagement = Loadable(lazy(() => import('../views/dashboard/vendor/TeamManagement')));
const UserProfile = Loadable(lazy(() => import('../views/dashboard/vendor/UserProfile')));
const AccountSettings = Loadable(lazy(() => import('../views/dashboard/vendor/AccountSettings')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/404', element: <Error /> },
    ],
  },
  {
    path: '/dashboards',
    element: <FullLayout />,
    children: [
      { path: '/dashboards', element: <Navigate to="/dashboards/vendor/photography" /> },
      { path: '/dashboards/sample-page', exact: true, element: <SamplePage /> },
      
      // Vendor Dashboard Routes
      { path: '/dashboards/vendor', element: <Navigate to="/dashboards/vendor/photography" /> },
      { path: '/dashboards/vendor/photography', element: <PhotographyDashboard /> },
      { path: '/dashboards/vendor/makeup', element: <MakeupDashboard /> },
      { path: '/dashboards/vendor/catering', element: <CateringDashboard /> },
      { path: '/dashboards/vendor/venue', element: <VenueDashboard /> },
      
      // Vendor Core Pages (accessible from all vendor types)
      { path: '/dashboards/vendor/analytics', element: <VendorAnalytics /> },
      { path: '/dashboards/vendor/statistics', element: <VendorStatistics /> },
      { path: '/dashboards/vendor/wedding-management', element: <WeddingManagement /> },
      { path: '/dashboards/vendor/wedding-projects', element: <WeddingProjects /> },
      { path: '/dashboards/vendor/vendor-management', element: <VendorManagement /> },
      { path: '/dashboards/vendor/clients-leads', element: <ClientsLeads /> },
      { path: '/dashboards/vendor/calendar-booking', element: <CalendarBooking /> },
      { path: '/dashboards/vendor/tasks-timeline', element: <TasksTimeline /> },
      { path: '/dashboards/vendor/financial-management', element: <FinancialManagement /> },
      
      // Additional Vendor Pages
      { path: '/dashboards/vendor/invoices-billing', element: <InvoicesBilling /> },
      { path: '/dashboards/vendor/service-packages', element: <ServicePackages /> },
      { path: '/dashboards/vendor/kpi-reports', element: <KPIReports /> },
      { path: '/dashboards/vendor/messages-chat', element: <MessagesChat /> },
      { path: '/dashboards/vendor/email-center', element: <EmailCenter /> },
      { path: '/dashboards/vendor/notes', element: <Notes /> },
      { path: '/dashboards/vendor/team-management', element: <TeamManagement /> },
      { path: '/dashboards/vendor/user-profile', element: <UserProfile /> },
      { path: '/dashboards/vendor/account-settings', element: <AccountSettings /> },
      
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

const router = createBrowserRouter(Router);
export default router;
