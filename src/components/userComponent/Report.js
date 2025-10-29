"use client";
import React, { useEffect, useState } from "react";
import {
    Stack,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    IconButton,
    Fade,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AddReport } from "@/constant/formField";
import { CloudUpload } from "@mui/icons-material";
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { useAppUtils, useReactFormUtils, useReduxState } from "@/hooks/useAppUtils";
import { AddReportSchema } from "@/validation/authSchema";
import ValidatedTextField from "@/components/common/ValidatedTextField";
import useFormHandler from "@/hooks/useFormHandler";
import { AddReportService } from "@/service/reportService";
import { reportTypes } from "@/constant/routes";
import CustomTable from "../layout/CustomTable";
import { RxCross1 } from "react-icons/rx";
import CSpinner from "../common/CSpinner";

export default function UploadReport() {

    const { userInfo, reportData } = useReduxState()
    const { dispatch, theme, router } = useAppUtils()
    const [showUploadReportForm, setShowUploadReportForm] = useState(false)
      const [showMessage, setShowMessage] = useState(false);
 const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const { register, control, errors, isValid, handleSubmit, reset } = useReactFormUtils(AddReportSchema)
    const { loading, handleSubmit: handleForm, } = useFormHandler({
        apiFunction: (data) =>
            dispatch(AddReportService({ ...data, userId: userInfo?._id, file: file })),
        successMessage: { title: 'Report!', text: 'Add Report', buttonText: 'Ok', },
        modalClose: () => setShowUploadReportForm(false),


    });
   useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setShowMessage(true), 4000); 
    } else {
      setShowMessage(false); 
    }

    return () => clearTimeout(timer);
  }, [loading]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(fileUrl);
        }
    };
    const handleFormSubmit = (data,) => {
        try{
        handleForm(data, reset)

        }
        finally{
            setFile(null);
            setPreviewUrl("");
        }
    }


    const columns = [
        {
            field: 'filename',
            headerName: 'File Name',
            minWidth: 280,
            flex: 1,
            renderCell: (params) => {
                const nameWithoutExt = params.row.filename.replace(/\.[^/.]+$/, '');
                return nameWithoutExt;
            },
        },
        {
            field: 'title',
            headerName: 'Title',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => params?.row?.userId?.email,
        },
        {
            field: 'type',
            headerName: 'Type',
            minWidth: 200,
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
            field: 'aiInsightId',
            headerName: 'Action',
            flex: 1,
            minWidth: 180,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <IconButton
                    onClick={() => router.push(`/view/${params?.formattedValue?.fileId}`)}
                    sx={{
                        color: theme.palette.primary.main,
                        '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
            ),
        },
    ];
    return (
        <SidebarWrapper headerText={'Add Report '}>
            {showUploadReportForm ? (
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
                                    Add Your Report
                                </Typography>
                                <Typography onClick={() => setShowUploadReportForm(false)}
                                    sx={{ cursor: "pointer" }}
                                    fontWeight={600}
                                    mb={2}
                                    color="primary"
                                >
                                    <RxCross1 />

                                </Typography>
                            </Box>

                            <Stack spacing={2}>
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <CloudUpload className="text-blue-500 mb-2" fontSize="large" />
                                    <Typography variant="body2" color="text.primary">
                                        {file ? file.name : "Click to upload PDF or Image"}
                                    </Typography>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="application/pdf,image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>

                                {/* 👇 Preview Section */}
                                {previewUrl && (
                                    <div className="mt-3 flex justify-center">
                                        {file.type.startsWith("image/") ? (
                                            <img
                                                src={previewUrl}
                                                alt="preview"
                                                className="max-h-60 rounded-lg border shadow-sm"
                                            />
                                        ) : (
                                            <iframe
                                                src={previewUrl}
                                                title="PDF Preview"
                                                className="w-full h-60 border rounded-lg"
                                            />
                                        )}
                                    </div>
                                )}

                                <Box onSubmit={handleSubmit(handleFormSubmit)} component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>

                                    {AddReport.map((field, index) => (
                                        <ValidatedTextField
                                            key={index}
                                            label={field.label}
                                            name={field.name}
                                            type={field.type}
                                            icon={field.icon}
                                            register={register}
                                            options={reportTypes || []}
                                            control={control}
                                            errors={errors}
                                            helperText={errors[field.name]?.message}
                                        />
                                    ))}



                                    <Button disabled={!isValid} type="submit" variant="contained" size="large">
                                        {loading ? (
                                            <>
                                             {showMessage ? (
                                            <>
                                             <Fade in={showMessage}>
            <Box component="span">AI is generating the response for your report, Please wait...</Box>
          </Fade>
                                            </>
                                        ) : <CSpinner size={20} /> }
                                            </>
                                        ): "Upload Report"}
                                       
                                          
         
                                    </Button>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            ) : (
                <>
                    <CustomTable
                        title="Report"
                        data={reportData}
                        columns={columns}
                        loading={loading}
                        showAddButton={true}
                        openModalAddButton={setShowUploadReportForm}

                    />
                </>
            )}

        </SidebarWrapper>
    );
}








