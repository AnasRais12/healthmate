"use client";
import React, { useState } from "react";
import {
    Stack,
    Card,
    CardContent,
    Typography,
    Button,
    LinearProgress,
    Box,
    IconButton,
} from "@mui/material";
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { AddVitals } from "@/constant/formField";
import { AddVitalsSchema } from "@/validation/authSchema";
import { useAppUtils, useReactFormUtils, useReduxState } from "@/hooks/useAppUtils";
import ValidatedTextField from "@/components/common/ValidatedTextField";
import useFormHandler from "@/hooks/useFormHandler";
import { AddVitalsService, updateVitalService } from "@/service/vitalsService";
import { RxCross1 } from "react-icons/rx";
import CustomTable from "../layout/CustomTable";
import { MoreVert } from "@mui/icons-material";
import CSpinner from "../common/CSpinner";


export default function Vitals() {
    const { userInfo, vitalData } = useReduxState()
    const { dispatch } = useAppUtils()
    const { register, control, errors, isValid, handleSubmit, reset } = useReactFormUtils(AddVitalsSchema)
    const [showUploadReportForm, setShowUploadReportForm] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null)
    const [editInfo, setEditInfo] = useState(false)

    const { loading, handleSubmit: handleForm, } = useFormHandler({
        apiFunction: (data) =>
            dispatch(AddVitalsService({ ...data, userId: userInfo?._id })),
        successMessage: { title: 'Vitals!', text: 'Add Vitals', buttonText: 'Ok', },
        modalClose: () => setShowUploadReportForm(false)
    });
    const { loading: editLoading, handleSubmit: handleEditForm, } = useFormHandler({
        apiFunction: (data) =>
            dispatch(updateVitalService(data)),
        successMessage: { title: 'Vitals!', text: 'Updated Vitals', buttonText: 'Ok', },
        modalClose: () => setEditInfo(false)
    });

    const handleFormSubmit = (data,) => {
        handleForm(data, reset)
    }
    const handleEditSubmit = (data,) => {
        handleEditForm({ ...data, vitalId: selectedUser?._id, date: data?.createdDate }, reset)
    }
    const handleActionsMenu = (e, user) => {
        setAnchorEl(e.currentTarget);
        setSelectedUser(user)
    }
    const columns = [
        {
            field: 'username',
            headerName: 'Name',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => params?.row?.userId?.username,
        },
        {
            field: 'bp',
            headerName: 'BP',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => params?.row?.userId?.username,
        },
        {
            field: 'weight',
            headerName: 'Weight',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => params?.row?.userId?.email,
        },
        {
            field: 'sugar',
            headerName: 'Sugar',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => params?.row?.userId?.email,
        },
        {
            field: 'notes',
            headerName: 'Notes',
            minWidth: 250,
            flex: 1,
            renderCell: (params) => params?.row?.userId?.email,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => new Date(params?.value).toLocaleDateString(),
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            minWidth: 180,
            flex: 1,
            renderCell: (params) => new Date(params?.value).toLocaleDateString(),
        },
        {
            field: '_id',
            headerName: 'Action',
            flex: 1,
            minWidth: 180,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return (
                    <IconButton onClick={(e) => handleActionsMenu(e, params?.row)}>
                        <MoreVert
                            sx={{
                                fontSize: {
                                    xs: '18px',
                                    md: '22px',
                                },
                            }}
                        />
                    </IconButton>
                )
            },
        },
    ];

    const fieldsWithFixedValue = AddVitals.map((field) => {
        switch (field.name) {
            case "createdDate":
                return {
                    ...field,
                    defaultValue: selectedUser?.date
                        ? new Date(selectedUser.date).toISOString().split("T")[0]
                        : ""
                }
            case "notes":
                return { ...field, defaultValue: selectedUser?.notes || "" }
            case "sugar":
                return { ...field, defaultValue: selectedUser?.sugar || "Not Set" }
            case "weight":
                return { ...field, defaultValue: selectedUser?.weight || "Not Set" }
            case "bp":
                return { ...field, defaultValue: selectedUser?.bp || "Not Set" }
            case "username":
                return { ...field, defaultValue: selectedUser?.username || "Not Set" }
            default:
                return field;
        }
    })

    return (
        <SidebarWrapper headerText={'Vitals'}>
            {showUploadReportForm || editInfo ? (
                <>
                    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "fit-content" }}>
                        <Card
                            elevation={3}
                            sx={{
                                width: "100%",
                                borderRadius: "16px",
                                bgcolor: "background.paper",
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                                    <Typography
                                        variant="h5"
                                        fontWeight={600}
                                        mb={2}
                                        color="primary"
                                    >
                                        {editInfo ? "Edit Manual Vitals" : "Add Manual Vitals"}
                                    </Typography>
                                    <Typography onClick={() => {
                                        setShowUploadReportForm(false)
                                        setEditInfo(false)
                                        reset()
                                    }}
                                        sx={{ cursor: "pointer" }}
                                        fontWeight={600}
                                        mb={2}
                                        color="primary"
                                    >
                                        <RxCross1 />

                                    </Typography>
                                </Box>
                                <Stack spacing={2}>
                                    {showUploadReportForm && (
                                        <Box onSubmit={handleSubmit(handleFormSubmit)} component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>
                                            {showUploadReportForm && (
                                                AddVitals?.map((field, index) => (
                                                    <ValidatedTextField
                                                        key={index}
                                                        label={field.label}
                                                        name={field.name}
                                                        type={field.type}
                                                        icon={field.icon}
                                                        register={register}
                                                        control={control}
                                                        errors={errors}
                                                        helperText={errors[field.name]?.message}
                                                    />
                                                ))
                                            )}



                                            <Button disabled={!isValid} type="submit" variant="contained" size="large">
                                                {loading ? <CSpinner /> : "Add Vital"}
                                            </Button>



                                        </Box>
                                    )}
                                    {editInfo && (
                                        <Box onSubmit={handleSubmit(handleEditSubmit)} component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>
                                            {editInfo && (
                                                fieldsWithFixedValue.map((items, index) => (
                                                    <ValidatedTextField
                                                        key={index}
                                                        label={items.label}
                                                        name={items.name}
                                                        type={items.type}
                                                        icon={items.icon}
                                                        register={register}
                                                        control={control}
                                                        errors={errors}
                                                        helperText={errors[items.name]?.message}
                                                        defaultValue={items.defaultValue}

                                                    />
                                                ))
                                            )}


                                            <Button disabled={!isValid} type="submit" variant="contained" size="large">
                                                {editLoading ? <CSpinner /> : "Save Changes"}
                                            </Button>



                                        </Box>
                                    )}
                                    {loading && <LinearProgress />}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </>
            )
                :
                <>
                    <CustomTable
                        title="Vital"
                        data={vitalData}
                        columns={columns}
                        loading={loading}
                        showAddButton={true}
                        openModalAddButton={setShowUploadReportForm}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        selectedUser={selectedUser}
                        setEditInfo={setEditInfo}
                    />
                </>
            }



        </SidebarWrapper>
    );
}
