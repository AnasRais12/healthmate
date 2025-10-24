// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Typography, Box, IconButton } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { MoreVert } from '@mui/icons-material';
// import { deleteRequest, getRequest, postRequest, putRequest } from '@/service/apiFunction';
// import { deleteApiCall, getApiCall, postApiCall, putApiCall } from '@/service/apiService';
// import { adminRoutes } from '@/lib/routes';
// import CustomTable from '@/components/layout/CustomTable';
// import useDebounce from '@/hooks/useDebounce';
// import { useSearch } from '@/context/commonContext';
// import formSche
// import Link from 'next/link';
// import AlertModal from '@/components/modal/AlertModal';

// const AdminUsers = () => {
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

//     const formFields = [
//         { label: 'Name', name: 'username', type: 'text' },
//         { label: 'Email', name: 'email', type: 'email' },
//         { label: 'Role', name: 'role', type: 'text' },
//     ];

//     useEffect(() => {
//         async function fetchUsers() {
//             try {
//                 await getRequest(
//                     getApiCall?.adminReadDetails?.getAllUser,
//                     (resData) => {
//                         setUsers(resData?.data.users || []);
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
//             const result = users.filter(user =>
//                 user?.username?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//             );
//             setFilteredUsers(result);
//             setIsSearching(false);
//         }, 300);

//         return () => clearTimeout(timer);
//     }, [debouncedSearchQuery, users]);


//     const handleOpenActionMenuClick = (event, user) => {
//         setActionMenuBarOpen(event.currentTarget);
//         setSelectedUser(user);
//     };

//     const handleAddUser = async (newUser) => {
//         await postRequest(
//             postApiCall.adminAddDetail.createUser,
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
//                     window.location.reload()
//                 });
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
//             minWidth: 180,
//             flex: 1,
//             renderCell: (params) => (
//                 <Typography
//                     fontWeight="bold"
//                     sx={{
//                         fontSize: {
//                             xs: '14px',
//                             md: '17px',
//                         },
//                     }}
//                 >
//                     {params.value}
//                 </Typography>
//             ),
//         },
//         {
//             field: 'email',
//             headerName: 'Email',

//             minWidth: 220,
//             flex: 1,
//             renderCell: (params) => (
//                 <Typography
//                     color="text.secondary"
//                     sx={{
//                         fontSize: {
//                             xs: '14px',
//                             md: '17px',
//                         },
//                     }}
//                 >
//                     {params.value}
//                 </Typography>
//             ),
//         },
//       {
//   field: 'role',
//   headerName: 'Role',
//   minWidth: 80, // Ya 50 se bhi kam rakh sakta hai agar chahiye
//   width: 100, // Fixed width set karo
//   renderCell: (params) => (
//     <Typography
//       color="text.secondary"
//       sx={{
//         fontSize: {
//           xs: '14px',
//           md: '17px',
//         },
//       }}
//     >
//       {params.value}
//     </Typography>
//   ),
// },
//         {
//             field: 'createdAt',
//             headerName: 'Created At',
//             minWidth: 200,
//             flex: 1,
//             renderCell: (params) => (
//                 <Typography
//                     color="text.secondary"
//                     sx={{
//                         fontSize: {
//                             xs: '14px',
//                             md: '17px',
//                         },
//                     }}
//                 >
//                     {params.value}
//                 </Typography>
//             ),
//         },
//         {
//             field: 'updatedAt',
//             headerName: 'Updated At',
//                        minWidth: 200,

//             flex: 1,
//             renderCell: (params) => (
//                 <Typography
//                     color="text.secondary"
//                     sx={{
//                         fontSize: {
//                             xs: '14px',
//                             md: '17px',
//                         },
//                     }}
//                 >
//                     {params.value}
//                 </Typography>
//             ),
//         },
//         {
//             field: 'action',
//             headerName: 'Action',
//             flex: 1,
//             minWidth: 100,

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
//                                     md: '22px', // or '17px' if you want it exact
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
//                                         md: '22px', // or '17px' if you want it exact
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
//             title="Admin Users"
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
//             addUserFiledsSchema={formSchema}
//             selectedUser={selectedUser}
//         />
//     );
// };

// export default AdminUsers;
