import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Menu,
    MenuItem,
    Button,
    CircularProgress,
    InputBase,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search } from '@mui/icons-material';
import { useAppUtils, useReduxState } from '@/hooks/useAppUtils';
import { deleteVitalService } from '@/service/vitalsService';
import AlertModal from '../modal/AlertModal';

const CustomTable = ({
    title = 'Users',
    data = [],
    columns,
    loading = false,
    showAddButton = false,
    openModalAddButton,
    anchorEl,
    setAnchorEl,
    selectedUser,
    setEditInfo,
    footer = true
}) => {
    const [deleteUser, setDeleteUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, dispatch } = useAppUtils()
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredData(data);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = data.filter((row) =>
                Object.values(row).some(
                    (value) =>
                        String(value)?.toLowerCase()?.includes(lowerQuery) ||
                        String(row?.userId?.username || '')?.toLowerCase()?.includes(lowerQuery) ||
                        String(row?.userId?.email || '')?.toLowerCase()?.includes(lowerQuery)
                )
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);

    const handleDeleteConfirm = async () => {
        const res = await dispatch(deleteVitalService({ id: selectedUser?._id }))
        if (res?.payload) {
            AlertModal({
                icon: 'success',
                title: 'Vital Deleted!',
                text: 'The vital has been successfully deleted.',
                buttonText: 'Ok',
            });
            setDeleteUser(false)
            setAnchorEl(null);
        }
    };

    return (
        <Box
            className="hide-scrollbar"
            sx={{
                px: 0,
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
                overflowY: 'auto',

            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={2}
                mb={2}
            >



                <Box sx={{
                    display: "flex", flexDirection: { xs: 'column', sm: 'row' }, justifyContent: footer ? 'end' : 'space-between ', alignItems: footer ? "start" : { xs: 'start', sm: 'center' }, gap: { xs: "8px", sm: "6px" }, width: {
                        xs: '100%',
                        sm: '100%',
                    },
                }}>
                    {!footer && (
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, pt: { xs: 1, sm: 0 } }}>
                            Recent {title}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 1.5,
                            py: 0.5,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.default,
                            maxWidth: { xs: "100%", sm: "300px" },
                            width: { xs: "100%", sm: "fit-content" },
                            flex: 1,
                        }}
                    >


                        <Search sx={{ fontSize: 25, mr: 1, color: theme.palette.text.primary }} />
                        <InputBase
                            placeholder="Search..."
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>

                    {showAddButton && (
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => openModalAddButton(true)}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: 'auto',
                                },
                                padding: { xs: '6px 16px', sm: '4px 20px' },

                            }}
                        >
                            Add {title}
                        </Button>
                    )}



                </Box>

            </Box>

            {/* ✅ Only table scrolls */}
            {loading ? (
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ flexGrow: 1, width: '100%', position: 'relative' }}>
                    <Box sx={{ height: '100%' }}>
                        <Paper elevation={1} sx={{
                            width: '100%', height: '100%', borderRadius: '10px', ...(footer == false && { // Yeh conditional styling hai
                                display: 'flex',
                                gap: 2,
                                flexDirection: 'column',
                            }),
                        }}>
                            <DataGrid
                                rows={filteredData}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 25, 50]}
                                getRowId={(row) => row._id}
                                disableRowSelectionOnClick
                                autoHeight={footer ? true : false} // Yeh add karein taaki table height rows ke hisaab se adjust ho
                                sx={{
                                    height: '100%',
                                    borderRadius: '10px',
                                    '& .MuiDataGrid-root': {
                                        border: 'none',

                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#fafafa",
                                        color: "#333",
                                        borderBottom: "2px solid #e0e0e0",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        textTransform: "capitalize",
                                    },
                                    "& .MuiDataGrid-row": {
                                        transition: "all 0.2s ease-in-out",
                                        "&:hover": {
                                            backgroundColor: "#f9f9f9",
                                            transform: "scale(1.002)",
                                        },
                                    },

                                    '& .MuiDataGrid-columnHeaderTitle': {
                                        fontSize: {
                                            xs: '14px',
                                            md: '17px',
                                        },
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        position: 'relative', // Ensure cells can anchor the menu
                                        display: 'flex',
                                        alignItems: 'center',
                                        pl: '10px',
                                        whiteSpace: 'nowrap',
                                    },
                                    '& .MuiDataGrid-scrollbarContent': {
                                        overflowX: 'hidden'
                                    },
                                    '& .MuiDataGrid-footerContainer': { // Yeh footer (pagination) ko hide karega
                                        display: footer ? 'block' : 'none',
                                    },
                                }}
                            />
                            {!footer && (
                                <Button
                                    variant="contained"
                                    // onClick={() => router.push('/vitals')}
                                    sx={{
                                        borderRadius: '12px',
                                        px: 4,
                                        py: { xs: 0.5, sm: 1 },
                                        textTransform: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    View {title}
                                </Button>
                            )}

                        </Paper>
                    </Box>
                </Box>
            )}

            {/* Menu for Edit/Delete */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    onClick={() => {
                        setEditInfo(true);
                        setAnchorEl(null);
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem onClick={() => setDeleteUser(true)}>Delete</MenuItem>
            </Menu>


            {/* Delete Modal */}

            <Dialog open={deleteUser} onClose={() => setDeleteUser(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Delete {title}</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Are you sure you want to delete{' '}
                        <strong>This {title}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        bgcolor: theme.palette.cancelButton?.main,
                        color: theme.palette.cancelButton?.contrastText,
                    }} onClick={() => setDeleteUser(false)}>Cancel</Button>
                    <Button onClick={() => handleDeleteConfirm()} sx={{ backgroundColor: theme.palette.background.error }} variant="contained" color="error" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomTable;
