"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Divider,
    Grid,
    Button,
    Stack,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { useAppUtils, useReduxState } from "@/hooks/useAppUtils";
import CloseIcon from "@mui/icons-material/Close";
import { deleteFileByIdService, } from "@/service/reportService";
import AlertModal from "../modal/AlertModal";
import CSpinner from "../common/CSpinner";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

export default function ViewReport() {
    const { id } = useParams();
    const { reportData } = useReduxState();
    const { theme, dispatch, router } = useAppUtils()
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [showRoman, setShowRoman] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            let filteredData = reportData.find((item) => item?._id == id);
            setFile(filteredData);
        };
        fetchData();
    }, [id]);

    const handleDeleteReport = async () => {
        try {
            setLoading(true);
            console.log("hello")
            const response = await dispatch(deleteFileByIdService({ id: file?._id }));
            AlertModal({ type: "success", message: "Report deleted successfully." });
            router.push('/dashboard');
        } catch (error) {
            AlertModal({ type: "error", message: error?.message || "Something Went Wrong" });

        } finally {
            setDeleteUser(false);
            setLoading(false);

        }
    };
    const questionsArrayEng = file?.aiInsightId?.questions_en?.split("\n*")?.map(q => q.replace("*", "").trim())?.filter(q => q.length > 0);
    const questionsArrayRom = file?.aiInsightId?.questions_roman?.split("\n*")?.map(q => q.replace("*", "").trim())?.filter(q => q.length > 0);
console.log(file,"FILE IS HERE ")

    return (
        <SidebarWrapper headerText={"View Report"}>
            <Box sx={{ ml: { lg: -2, xs: 0 } }} >
                {file ? (
                    <Grid spacing={4} sx={{ display: 'flex', flexDirection: { xs: "column", md: 'row' }, width: "100%", gap: 2 }}  >
                        {/* Left: PDF / Image Preview */}
                        <Grid item sx={{ width: { xs: "100%", md: '50%' } }} xs={12} md={12}>
                            <Card
                                sx={{
                                    px: { xs: 1, sm: 2 },
                                    py: 2,
                                    height: "fit-content",
                                    borderRadius: 3,
                                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                                }}
                            >
                                <Typography variant="h5" fontWeight={600} mb={0.5}>
                                    {file?.filename
                                        ? file.filename.replace(/\.[^/.]+$/, "")
                                        : "Report Details"}
                                </Typography>

                                <Typography variant="body2" color="text.primary" sx={{ pb: 0 }}>
                                    {new Date(file?.date).toLocaleString()}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6" fontWeight={600} mb={1}>
                                    Report Preview
                                </Typography>

                                {/* Image / PDF box */}
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        height: { xs: "300px", lg: "700px", sm: "400px" },
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        border: "1px solid #ddd",
                                        backgroundColor: "#f9f9f9",
                                    }}
                                >
                                    {file?.type?.includes("image") ? (
                                        <>
                                            <img
                                                src={file.url}
                                                alt="Report Preview"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />

                                            {/* 🔍 View Full Image Button */}
                                            <Button
                                                variant="contained"
                                                onClick={handleOpen}
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 16,
                                                    right: 16,
                                                    textTransform: "none",
                                                    borderRadius: 20,
                                                    backgroundColor: "rgba(0,0,0,0.6)",
                                                    color: "white",
                                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                                                }}
                                            >
                                                View Full Image
                                            </Button>
                                        </>
                                    ) : file?.type?.includes("pdf") ? (
     <object
    data={file.url}
    type="application/pdf"
    width="100%"
    height="100%"
  >
    <iframe
      src={file.url}
      width="100%"
      height="100%"
      title="PDF Viewer"
      style={{ border: "none" }}
    >
      This browser does not support PDFs. Please download the file to view it.
    </iframe>
  </object>
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                            }}
                                        >
                                            PDF / Image preview here
                                        </Typography>
                                    )}
                                </Box>

                                {/* Fullscreen Image Dialog */}
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    fullScreen
                                    PaperProps={{
                                        sx: { backgroundColor: "rgba(0,0,0,0.9)" },
                                    }}
                                >
                                    <IconButton
                                        onClick={handleClose}
                                        sx={{
                                            position: "absolute",
                                            top: 20,
                                            right: 20,
                                            color: "white",
                                            zIndex: 2,
                                        }}
                                    >
                                        <CloseIcon fontSize="large" />
                                    </IconButton>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100vh",
                                        }}
                                    >
                                        <img
                                            src={file.url}
                                            alt="Full Preview"
                                            style={{
                                                maxWidth: "95%",
                                                maxHeight: "95%",
                                                borderRadius: "8px",
                                                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                                            }}
                                        />
                                    </Box>
                                </Dialog>
                            </Card>
                        </Grid>

                        {/* Right: AI Summary */}
                        <Grid sx={{ width: { xs: "100%", md: '50%' } }} item xs={12} md={12}>
                            <Card
                                sx={{
                                    px: { xs: 1, sm: 2 },
                                    py: 2,
                                    borderRadius: 3,
                                    height: "fit-content",
                                    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                                }}
                            >
                                <Box sx={{ display: "flex", }} justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight={600}>
                                        AI Summary
                                    </Typography>
                                    <Typography
                                        onClick={() => setShowRoman(!showRoman)}
                                        sx={{
                                            color: "primary.main",
                                            cursor: "pointer",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Toggle: {showRoman ? "Roman Urdu" : "English"}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />


                                {showRoman ? (
                                    <Typography variant="body1" lineHeight={1.8}>
                                        {file?.aiInsightId?.summary_roman ||
                                            "Roman Urdu summary not available."}
                                    </Typography>
                                ) : (
                                    <Typography variant="body1" lineHeight={1.8}>
                                        {file?.aiInsightId?.summary_en || "English summary not available."}
                                    </Typography>
                                )}



                                {/* Recommendations */}
                                {file?.aiInsightId?.recommendations?.length > 0 && (
                                    <>
                                        <Typography variant="h6" mt={3}>
                                            💡 Recommendations
                                        </Typography>
                                        <ul>
                                            {file.aiInsightId.recommendations.map((r, i) => (
                                                <li key={i}>{r}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {(questionsArrayEng?.length > 0 || questionsArrayRom?.length > 0) && (
                                    <Box sx={{ mt: 4 }} justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" fontWeight={600}>
                                            Ask Doctor
                                        </Typography>
                                        <Divider sx={{ my: 1, mb: 2 }} />

                                        <Typography variant="body2" color="black" lineHeight={1.8}>
                                            {!showRoman ? (
                                                <>
                                                    {questionsArrayEng ? questionsArrayEng.map((q, index) => (
                                                        <Box key={index} sx={{ mb: 1 }}>
                                                            {`${index + 1})`}   {q}
                                                        </Box>
                                                    ))
                                                        : "English question not available."}
                                                </>
                                            ) :
                                                questionsArrayRom ? questionsArrayRom.map((q, index) => (
                                                    <Box key={index} sx={{ mb: 1 }}>
                                                        {`${index + 1})`}   {q}
                                                    </Box>
                                                ))
                                                    : "Roman Urdu question not available."}

                                        </Typography>
                                    </Box>
                                )}




                                <Stack direction={{ xs: "column", lg: "row" }} spacing={2} mt={3}>
                                    <Button onClick={() => setDeleteUser(true)}
                                        sx={{ py: 0.7 }}
                                        variant="contained"
                                        color="error"
                                        fullWidth
                                    >
                                        Delete Report
                                    </Button>

                                </Stack>
                            </Card>
                        </Grid>
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh',
                            flexDirection: 'column',
                            gap: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" sx={{ color: 'text.primary' }}>
                            No records found
                        </Typography>


                    </Box>
                )}
                {/* Layout */}



            </Box>
            <Dialog open={deleteUser} onClose={() => setDeleteUser(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Delete {file?.filename}</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Are you sure you want to delete{' '}
                        <strong>This {file?.filename}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button sx={{
                        bgcolor: theme.palette.cancelButton?.main,
                        color: theme.palette.cancelButton?.contrastText,
                    }} onClick={() => setDeleteUser(false)}>Cancel</Button>
                    <Button onClick={() => handleDeleteReport()} sx={{ backgroundColor: theme.palette.background.error }} variant="contained" color="error" >
                        {loading ? <CSpinner /> : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </SidebarWrapper>
    );
}