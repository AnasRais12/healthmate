'use client';
import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Stack,
    IconButton,
    Fade,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomTable from '@/components/layout/CustomTable';
import { useAppUtils } from '@/hooks/useAppUtils';
import { useReduxState } from '@/hooks/useAppUtils';
import { SidebarWrapper } from '@/components/layout/SidebarWrapper';
import { getTimeDifference } from '@/helpers/Common';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const { reportData, vitalData,userInfo } = useReduxState();
    const combined = [...vitalData, ...reportData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
    const { router, theme } = useAppUtils();

    const limitedVitals = vitalData?.slice(0, 10);
    const limitedReports = reportData?.slice(0, 10);


    const columnsVitals = [
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

    ];

    const columnsReports = [
        {
            field: 'filename', headerName: 'File Name', flex: 1, minWidth: 280,
            renderCell: (params) => {
                const nameWithoutExt = params.row.filename.replace(/\.[^/.]+$/, '');
                return nameWithoutExt;
            },
        },
        { field: 'title', headerName: 'Title', flex: 1, minWidth: 150 },
        {
            field: 'type',
            headerName: 'Type',
            minWidth: 150,
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
            field: 'action',
            headerName: 'Action',
            minWidth: 150,
            flex: 1,
            renderCell: (params) => (
                <IconButton
                    onClick={() => router.push(`/view/${params.row._id}`)}
                    sx={{ color: theme.palette.primary.main }}
                >
                    <VisibilityIcon />
                </IconButton>
            ),
        },
    ];

    console.log(userInfo,"userInfo---")

    return (
        <SidebarWrapper headerText="HealthMate Dashboard">
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                }}
            >
                {/* --- Top Stats Cards --- */}
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                >
                    {[
                        {
                            label: 'Total Reports',
                            value: reportData?.length || 0,
                        },
                        {
                            label: 'Total Vitals',
                            value: vitalData?.length || 0,
                        },

                        {
                            label: 'Last Upload',
                            value: combined[0]?.createdAt
                                ? getTimeDifference(combined[0]?.createdAt)
                                : 'No Data',
                        },
    {
                            label: `Latest ${combined.length === 0 ? "Activity" : combined[0]?.aiInsightId ? 'AI Insight' : 'Vital'}`,
                          value:
  combined.length === 0
    ? "No activity yet"
    : combined[0]?.aiInsightId
    ? `${combined[0]?.reportType}`
    : "Manual Vital"
                        },
                    ].map((item, i) => (
                        <Card
                            key={i}
                            sx={{
                                bgcolor: theme.palette.background.default,
                                flex: 1,
                                borderRadius: '10px',
                                transition: '0.3s ease-in-out',
                                mb: 4,
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 6px 25px rgba(0,0,0,0.12)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 1, fontWeight: 500, color: 'green' }}
                                >
                                    {item.label}
                                </Typography>
                                <Typography variant="h6" color="text.primary"sx={{fontWeight:"700"}}>
                                    {item.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 3,
                    mt: 10,
                    p: { xs: 1, sm: 2 },

                }}
            >


                {limitedVitals.length > 0 ? (
                    <CustomTable
                        title="Vital"
                        data={limitedVitals}
                        columns={columnsVitals}
                        loading={loading}
                        footer={false}

                    />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                                 py:2,
                            gap: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'text.primary' }}>
                            No Vitals recorded yet.
                        </Typography>

                        <Button
                            onClick={() => router.push('/vitals')}
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff',
                                textTransform: 'none',
                                fontSize: '1rem',
                                borderRadius: '12px',
                                px: 4,
                                py: 1.5,
                                transition: '0.3s',
                               
                            }}
                        >
                            Add Vitals
                        </Button>
                    </Box>
                )}


            </Box>

            {/* --- Reports Section --- */}
            <Box
                sx={{
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 3,
                    mt: 10,
                    mb:2,
                    p: { xs: 1, sm: 2 },

                }}
            >

                {limitedReports.length > 0 ? (
                    <CustomTable
                        title="Report"
                        data={limitedReports}
                        columns={columnsReports}
                        loading={loading}
                        footer={false}
                    />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            py:2,
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'text.primary' }}>
                            No reports uploaded yet.
                        </Typography>

                        <Button
                            onClick={() => router.push('/report')}
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff',
                                textTransform: 'none',
                                fontSize: '1rem',
                                borderRadius: '12px',
                                px: 4,
                                py: 1.5,
                                transition: '0.3s',
                              
                            }}
                        >
                            Upload Report
                        </Button>
                    </Box>
                )}
            </Box>
        </SidebarWrapper>
    );
}
