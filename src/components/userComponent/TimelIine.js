"use client";
import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { useAppUtils, useReduxState } from "@/hooks/useAppUtils";

export default function Timeline() {
    const { vitalData, reportData } = useReduxState();
    const { theme, router } = useAppUtils()

    const combined = [
        ...(vitalData || []), // agar vitalData null/undefined ho to empty array
        ...(reportData || []) // agar reportData null/undefined ho to empty array
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <SidebarWrapper headerText="Timeline">
            {combined.length == 0 ? (
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center", color: theme.palette.primary, mt: 4, height: '60vh', display: "flex", justifyContent: 'center', alignItems: 'center' }}
                >
                    No records found
                </Typography>
            ) : (
                <Stack spacing={3} sx={{ position: "relative" }}>
                    {combined.map((item, index) => {
                        const isReport =
                            item.type === "image/jpeg" ||
                            item.type === "application/pdf" ||
                            item.type === "image/png";

                        return (
                            <Box key={index} sx={{ position: "relative", }}>
                                {/* Timeline Dot */}


                                {/* Card */}
                                <Card
                                    sx={{
                                        borderLeft: `4px solid ${isReport ? "green" : "green"}`,
                                        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
                                        borderRadius: 2,
                                        transition: "0.3s",
                                        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
                                    }}
                                >
                                    <CardContent>
                                        {/* Date + Label */}
                                        <Stack
                                            direction="row"

                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ mb: 2, pb: 1, borderBottom: '2px solid #E7E7E7' }}
                                        >
                                            <Typography variant="body2" color="text.primary">
                                                {new Date(item.date).toLocaleDateString("en-GB")}
                                            </Typography>
                                            <Typography onClick={() => isReport ? router.push('/report') : router.push('/vitals')}
                                                variant="subtitle2"
                                                color={isReport ? "green" : "green"}
                                                sx={{ fontWeight: 600, cursor: "pointer" }}
                                            >
                                                {isReport ? "AI Report" : "Vitals"}
                                            </Typography>
                                        </Stack>

                                        {/* Content */}
                                        {isReport ? (
                                            <>
                                                <Typography mb={2} variant="subtitle2" fontWeight={600}>
                                                    {item.filename || "Report"}
                                                </Typography>
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        English Summary:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        sx={{ mt: 0.5, mb: 2 }}
                                                    >
                                                        {item.aiInsightId?.summary_en ||
                                                            "No AI Summary available"}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Roman Summary:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        sx={{ mt: 0.5 }}
                                                    >
                                                        {item.aiInsightId?.summary_roman ||
                                                            "No AI Summary available"}
                                                    </Typography>
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                <Typography sx={{ mb: 2 }} variant="subtitle2" fontWeight={600}>
                                                    Manual Vitals
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
                                                    <Typography variant="body2" color="text.primary">
                                                        BP : {item.bp || "-"}
                                                    </Typography>

                                                    <Typography variant="body2" color="text.primary">
                                                        Sugar : {item.sugar || "-"}

                                                    </Typography>
                                                    <Typography variant="body2" color="text.primary">

                                                        Weight : {item.weight || "-"} kg
                                                    </Typography>
                                                </Box>
                                                {item.notes && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ mt: 0.5, display: "block" }}
                                                    >
                                                        🗒 {item.notes}
                                                    </Typography>
                                                )}
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </SidebarWrapper>
    );
}
