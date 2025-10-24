// components/AddUserDialog.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,

} from '@mui/material';
import ValidatedTextField from '../common/ValidatedTextField';
import CSpinner from '../common/CSpinner';



export const AddUserDialog = ({
    open,
    onClose,
    fields = [],
    onSubmit,
    loading = false,
    addUserFiledsSchema,
    theme,
}) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(addUserFiledsSchema),
    });


    const handleFormSubmit = (data) => {
        onSubmit(data, reset);
        // onClose();
    };



    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ bgcolor: theme.palette.background.paper, borderBottom: `2px solid ${theme.palette.background.default}` }}>Add New User</DialogTitle>
                              <Box onSubmit={handleSubmit(handleFormSubmit)} component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2} p={2}>
                          
                    {fields.map((field, index) => (
                        <ValidatedTextField
                            key={index}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            icon={field.icon}
                            control={control}
                            register={register}
                             errors={errors}
                            helperText={errors[field.name]?.message}

                        />
                         
                    ))}
                    {/* <Button sx={{
                        bgcolor: theme.palette.cancelButton?.main,
                        color: theme.palette.cancelButton?.contrastText,
                    }} onClick={onClose}>Cancel</Button> */}
                    <Button sx={{mb:2  , background:theme.customGradients.background,color:theme.palette.secondary}} disabled={!isValid} type="submit" variant="contained">{loading ? <CSpinner /> : "Create"}</Button>
            </Box>
        </Dialog>
    );
};



export const EditUserDialog = ({
    open,
    onClose,
    fields = [],
    defaulteditValues = {},
    onSubmit,
    loading = false,
    addUserFiledsSchema,
    theme,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        control
    } = useForm({
        resolver: yupResolver(addUserFiledsSchema),
        mode: 'onChange',
    });

    // ✅ When selectedUser (defaulteditValues) change, update the form
    useEffect(() => {
        if (defaulteditValues) {
            reset(defaulteditValues);
        }
    }, [defaulteditValues, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);

    };
    console.log(defaulteditValues, "Default Values");


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    bgcolor: theme.palette.background.paper,
                    borderBottom: `2px solid ${theme.palette.background.default}`,
                }}
            >
                Edit User
            </DialogTitle>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent sx={{ bgcolor: theme.palette.background.paper }}>
                    {fields.map((field, index) => (
                        <ValidatedTextField
                            key={index}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            icon={field.icon}
                            register={register}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]?.message}
                            control={control}

                        />
                    ))}
                </DialogContent>
                <DialogActions sx={{ bgcolor: theme.palette.background.paper }}>
                    <Button
                        sx={{
                            bgcolor: theme.palette.cancelButton?.main,
                            color: theme.palette.cancelButton?.contrastText,
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button disabled={!isValid} type="submit" variant="contained">
                        {loading ? <CSpinner /> : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};



export const DeleteUserDialog = ({
    open,
    onClose,
    onSubmit,
    selectedUser,
    theme

}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent dividers>
                <Typography>
                    Are you sure you want to delete{' '}
                    <strong>{selectedUser?.username}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                    bgcolor: theme.palette.cancelButton?.main,
                    color: theme.palette.cancelButton?.contrastText,
                }} onClick={onClose}>Cancel</Button>
                <Button sx={{ backgroundColor: theme.palette.background.error }} variant="contained" color="error" onClick={onSubmit}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};


