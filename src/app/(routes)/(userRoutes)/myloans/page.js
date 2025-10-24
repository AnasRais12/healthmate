// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Typography, Box, IconButton } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { CalendarMonth, Category, Email, Money, MoreVert, Payment, PendingActions, Person, Subtitles, VerifiedUser } from '@mui/icons-material';
// import { deleteRequest, getRequest, postRequest, putRequest } from '@/service/apiFunction';
// import { deleteApiCall, getApiCall, postApiCall, putApiCall } from '@/service/apiService';
// import { adminRoutes } from '@/lib/routes';
// import CustomTable from '@/components/layout/CustomTable';
// import useDebounce from '@/hooks/useDebounce';
// import { useSearch } from '@/context/commonContext';
// import * as yup from 'yup';

// import Link from 'next/link';
// import AlertModal from '@/components/modal/AlertModal';

// const AdminUsersPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [actionMenuBarOpen, setActionMenuBarOpen] = useState(null);
//     const [isSearching, setIsSearching] = useState(false);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [addUserModalOpen, setAddUserModalOpen] = useState(false);
//     const { searchQuery } = useSearch();
//     const debouncedSearchQuery = useDebounce(searchQuery, 500);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const loanSchema = yup.object().shape({
//         image: yup
//             .mixed()
//             .required('Image is required'),
//         loanAmount: yup
//             .number()
//             .typeError('Loan amount must be a number')
//             .required('Loan amount is required')
//             .positive('Must be positive'),
//         loanPeriod: yup
//             .number()
//             .typeError('Loan period must be a number')
//             .required('Loan period is required')
//             .positive('Must be positive'),
//         category: yup.string().required('Category is required'),
//         subcategory: yup.string().required('Subcategory is required'),
//     });

//     const formFields = [
//         { label: 'Loan Amount', name: 'loanAmount', type: 'number', icon: <Money /> },
//         { label: 'Loan Period (Months)', name: 'loanPeriod', type: 'number', icon: <CalendarMonth /> },
//         { label: 'Category', name: 'category', type: 'text', icon: <Category /> },
//         { label: 'Subcategory', name: 'subcategory', type: 'text', icon: <Subtitles /> },
//         { label: 'Image', name: 'image', type: 'file', icon: <Email /> }, // 👈 file input

//     ];


//     useEffect(() => {
//         async function fetchUsers() {
//             try {
//                 await getRequest(
//                     getApiCall?.userReadDetails?.getMyLoan,
//                     (resData) => {
//                         console.log(resData, "Resdata is here");
//                         setUsers(resData?.data.loan);
//                     }
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchUsers();
//     }, []);
//     useEffect(() => {
//         setIsSearching(true);

//         const timer = setTimeout(() => {
//             const result = users?.filter((user) =>
//                 user?.category?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//             );
//             setFilteredUsers(result);
//             console.log(result, "result is here ");

//             setIsSearching(false);
//         }, 300);

//         return () => clearTimeout(timer);
//     }, [debouncedSearchQuery, users]);


//     const handleOpenActionMenuClick = (event, user) => {
//         setActionMenuBarOpen(event.currentTarget);
//         console.log(user, "user is here ");
//         setSelectedUser(user)
//     };

//     const handleAddUser = async (newUser) => {


//         await postRequest(
//             postApiCall?.UserAddDetail?.createUser,
//             newUser,
//             (resData) => {
//                 console.log(resData?.message, "resdata is here ");

//                 AlertModal({
//                     icon: 'success',
//                     title: 'User Create',
//                     text: `${resData?.message}`,
//                     buttonText: 'OK',
//                 }).then(() => {
//                     setUsers((prev) => [...prev, resData?.data]);
//                     // window.location.reload()
//                 });
//             },
//             {
//                 'Content-Type': 'multipart/form-data',
//             }
//         );
//     };

//     const handleEditUser = async (updatedUser) => {
//         try {
//             const userId = updatedUser?._id;
//             await putRequest(
//                 putApiCall.adminUpdateDetail.updateUser(userId),
//                 updatedUser,
//                 (resData) => {
//                     console.log(resData?.message, "resdata is here ");


//                     AlertModal({
//                         icon: 'success',
//                         title: 'User Update',
//                         text: `${resData?.message}`,
//                         buttonText: 'OK',
//                     }).then(() => {
//                         (updatedUser,
//                             setUsers((prev) =>
//                                 prev.map((user) =>
//                                     user._id === userId ? { ...user, ...resData?.data } : user
//                                 )
//                             ));
//                         window.location.reload()

//                     });
//                 }
//             );
//         }
//         finally { }



//     };

//     const handleDeleteUser = async (userId) => {
//         await deleteRequest(
//             deleteApiCall.adminDeleteDetail.deleteUser(userId),
//             (resData) => {
//                 AlertModal({
//                     icon: 'success',
//                     title: 'User Deleted',
//                     text: `${resData?.message}`,
//                     buttonText: 'OK',
//                 }).then(() => {
//                     setUsers((prev) => prev.filter((user) => user._id !== userId));
//                     window.location.reload()

//                 });

//             }
//         );
//     };



//     const columns = [
//         {
//             field: 'username',
//             headerName: 'Name',
//             minWidth: 150,
//             flex: 1,
//             renderCell: (params) => params.row.userId?.username,
//         },

//         {
//             field: 'category',
//             headerName: 'Category',
//             minWidth: 150,
//             flex: 1,
//         },
//         {
//             field: 'subcategory',
//             headerName: 'Subcategory',
//             minWidth: 150,
//             flex: 1,
//         },
//         {
//             field: 'loanAmount',
//             headerName: 'Amount (PKR)',
//             minWidth: 120,
//             flex: 1,
//         },
//         {
//             field: 'loanPeriod',
//             headerName: 'Period',
//             minWidth: 100,
//             flex: 1,
//             renderCell: (params) => `${params.value} years`, // or months if applicable
//         },
//         {
//             field: 'paymentStatus',
//             headerName: 'Payment',
//             minWidth: 120,
//             flex: 1,
//         },
//         {
//             field: 'status',
//             headerName: 'Status',
//             minWidth: 120,
//             flex: 1,
//         },
//         {
//             field: 'createdAt',
//             headerName: 'Created At',
//             minWidth: 180,
//             flex: 1,
//             renderCell: (params) => new Date(params.value).toLocaleDateString(),
//         },
//         {
//             field: 'action',
//             headerName: 'Action',
//             minWidth: 120,
//             flex: 1,
//             sortable: false,
//             filterable: false,
//             renderCell: (params) => (
//                 <Box display="flex" justifyContent="center" gap={1}>
//                     <IconButton
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             setActionMenuBarOpen(true);
//                             handleOpenActionMenuClick(e, params.row);
//                         }}
//                     >
//                         <MoreVert
//                             sx={{
//                                 fontSize: {
//                                     xs: '18px',
//                                     md: '22px',
//                                 },
//                             }}
//                         />
//                     </IconButton>
//                     <IconButton>
//                         <Link
//                             href="https://google.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             <VisibilityIcon
//                                 sx={{
//                                     fontSize: {
//                                         xs: '18px',
//                                         md: '22px',
//                                     },
//                                 }}
//                             />
//                         </Link>
//                     </IconButton>
//                 </Box>
//             ),
//         },
//     ];




//     return (
//         <CustomTable
//             title="My Loans"
//             data={filteredUsers}
//             columns={columns}
//             loading={loading || isSearching}
//             routes={adminRoutes}
//             actionMenuBarOpen={actionMenuBarOpen}
//             actionMenuBarClose={setActionMenuBarOpen}
//             editDialogOpen={editDialogOpen}
//             editDialogOpenClose={setEditDialogOpen}
//             onEdit={handleEditUser}
//             deleteDialogOpen={deleteDialogOpen}
//             deleteDialogOpenClose={setDeleteDialogOpen}
//             onDelete={handleDeleteUser}
//             showAddButton={true}
//             showExportButton={true}
//             addDialogModalOpen={addUserModalOpen}
//             addDialogModalOpenClose={setAddUserModalOpen}
//             onAdd={handleAddUser}
//             addUserFields={formFields}
//             addUserFiledsSchema={loanSchema}
//             selectedUser={selectedUser}
//         />
//     );
// };

// export default AdminUsersPage;
'use client';
import React from 'react';

const page = () => {
  return (
    <div>
      my loans
    </div>
  );
}

export default page;
