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
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import { getApiCall } from '@/service/apiService';
// import { adminRoutes } from '@/lib/routes';
// import { SidebarWrapper } from '@/components/layout/DashboardLayout';
// import { getRequest } from '@/service/apiFunction';

// const AdminPaymentsPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setloading] = useState(false);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setloading(true);
//         await getRequest(
//           getApiCall?.adminReadDetails?.getAllPayments,
//           (resData) => {
//             console.log(resData, 'resData os here ');
//             setPayments(resData?.data);
//           }
//         );
//       } finally {
//         setloading(false);
//       }
//     };

//     fetchPayments();
//   }, []);
//   console.log(payments, 'payment is here ');

//   return (
//     <SidebarWrapper routes={adminRoutes}>
//       <Box>
//         <Typography variant="h5" gutterBottom>
//           All Payments
//         </Typography>
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <>
//             <TableContainer component={Paper} sx={{ p: 2 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>User</TableCell>
//                     <TableCell>Loan ID</TableCell>
//                     <TableCell>Amount</TableCell>
//                     <TableCell>Payment Type</TableCell>
//                     <TableCell>Date</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {payments?.length > 0 &&
//                     payments?.map((payment, id) => (
//                       <TableRow key={id}>
//                         <TableCell>
//                           {payment.paidBy?.username || 'N/A'}
//                         </TableCell>
//                         <TableCell>{payment.loanId?._id}</TableCell>
//                         <TableCell>Rs. {payment.amount}</TableCell>
//                         <TableCell>{payment.paymentType}</TableCell>
//                         <TableCell>
//                           {new Date(payment.createdAt).toLocaleDateString()}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Box>
//     </SidebarWrapper>
//   );
// };

// export default AdminPaymentsPage;

'use client'
import React from 'react'

const page = () => {
  return (
    <div>
      hello payments
    </div>
  )
}

export default page
