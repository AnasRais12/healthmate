// // 'use client';

// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
// //     Paper, Typography
// // } from '@mui/material';

// // const AdminGuarantorsPage = () => {
// //     const [guarantors, setGuarantors] = useState([]);

// //     useEffect(() => {
// //         const fetchGuarantors = async () => {
// //             try {
// //                 const response = await axios.get('/api/admin/guarantors');
// //                 setGuarantors(response.data?.data || []);
// //             } catch (error) {
// //                 console.error('Failed to fetch guarantors:', error);
// //             }
// //         };

// //         fetchGuarantors();
// //     }, []);

// //     return (
// //         <TableContainer component={Paper} sx={{ p: 2 }}>
// //             <Typography variant="h6" gutterBottom>
// //                 All Guarantors
// //             </Typography>
// //             <Table>
// //                 <TableHead>
// //                     <TableRow>
// //                         <TableCell>Name</TableCell>
// //                         <TableCell>CNIC</TableCell>
// //                         <TableCell>Phone</TableCell>
// //                         <TableCell>Address</TableCell>
// //                         <TableCell>Created At</TableCell>
// //                     </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                     {guarantors?.length > 0 && guarantors?.map((g, id) => (
// //                         <TableRow key={id}>
// //                             <TableCell>{g?.name}</TableCell>
// //                             <TableCell>{g?.cnic}</TableCell>
// //                             <TableCell>{g?.phone}</TableCell>
// //                             <TableCell>{g?.address}</TableCell>
// //                             <TableCell>{new Date(g?.createdAt).toLocaleDateString()}</TableCell>
// //                         </TableRow>
// //                     ))}
// //                 </TableBody>
// //             </Table>
// //         </TableContainer>
// //     );
// // };

// // export default AdminGuarantorsPage;

// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   CircularProgress,
// } from '@mui/material';
// import { getApiCall } from '@/service/apiService';
// import { getRequest } from '@/service/apiFunction';
// import { SidebarWrapper } from '@/components/layout/DashboardLayout';
// import { adminRoutes } from '@/lib/routes';

// const AdminLoansPage = () => {
//   const [guarantors, setGuarantors] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGuarantors = async () => {
//       try {
//         await getRequest(
//           getApiCall?.adminReadDetails?.getAllGuarantors,
//           (resData) => {
//             console.log(resData, 'resData os here ');
//             setGuarantors(resData?.data?.guarantors);
//           }
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGuarantors();
//   }, []);

//   return (
//     <SidebarWrapper routes={adminRoutes}>
//       <Box>
//         <Typography variant="h5" gutterBottom>
//           All Guarantors
//         </Typography>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <TableContainer component={Paper} sx={{ p: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>CNIC</TableCell>
//                   <TableCell>Phone</TableCell>
//                   <TableCell>Address</TableCell>
//                   <TableCell>Created At</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {guarantors?.length > 0 &&
//                   guarantors?.map((g, id) => (
//                     <TableRow key={id}>
//                       <TableCell>{g?.name}</TableCell>
//                       <TableCell>{g?.cnic}</TableCell>
//                       <TableCell>{g?.phone}</TableCell>
//                       <TableCell>{g?.address}</TableCell>
//                       <TableCell>
//                         {new Date(g?.createdAt).toLocaleDateString()}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </SidebarWrapper>
//   );
// };

// export default AdminLoansPage;
"use client"
import React from 'react'

const page = () => {
  return (
    <div>
      hello guarantors
    </div>
  )
}

export default page
