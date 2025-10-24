// ✅ import all icons used in routes
import { FiHome, FiUpload, FiHeart, FiClock, FiUser } from "react-icons/fi";

// export const adminRoutes = [
//   { path: '/admin/dashboard', label: 'Admin Dashboard', icon: <FiHome /> },
//   { path: '/admin/users', label: 'Users', icon: <FiUser /> },
//   { path: '/admin/loans', label: 'Loans', icon: <FiBox /> },
//   { path: '/admin/payments', label: 'Payments', icon: <FiDollarSign /> },
//   { path: '/admin/guarantors', label: 'Guarantors', icon: <FiUsers /> },
//   { path: '/admin/reports', label: 'Reports', icon: <FiBarChart /> },
// ];

export const userRoutes = [
  { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { path: '/report', label: 'Report', icon: <FiUpload /> },
  { path: '/vitals', label: 'Vitals', icon: <FiHeart /> },
  { path: '/timeline', label: 'Timeline', icon: <FiClock /> },
  { path: '/profile', label: 'Profile', icon: <FiUser /> },
];


export const reportTypes = [
  { name: "Blood Test", value: "blood_test" },
  { name: "X-Ray", value: "xray" },
  { name: "CT Scan", value: "ct_scan" },
  { name: "MRI", value: "mri" },
  { name: "Ultrasound", value: "ultrasound" },
  { name: "ECG / EKG Report", value: "ecg" },
  { name: "Pathology Report", value: "pathology" },
  { name: "Radiology Report", value: "radiology" },
  { name: "Prescription", value: "prescription" },
  { name: "Discharge Summary", value: "discharge_summary" },
  { name: "Surgery Report", value: "surgery" },
  { name: "Vaccination Record", value: "vaccination" },
];