"use client";
import React from "react";
import {
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiAlertCircle,
  FiUpload,
} from "react-icons/fi";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { SidebarWrapper } from "@/components/layout/SidebarWrapper";
import { useAppUtils } from "@/hooks/useAppUtils";
import { DataGrid } from "@mui/x-data-grid";

// ---------- Summary Cards ----------
const summaryCards = [
  {
    title: "Active Loan",
    amount: "$50,000",
    trend: 12,
    icon: <FiDollarSign />,
    color: "bg-indigo-100",
    description: "Current outstanding amount",
  },
  {
    title: "Upcoming Appointments",
    amount: "3",
    trend: -1,
    icon: <FiCalendar />,
    color: "bg-blue-100",
    description: "Scheduled meetings this week",
  },
  {
    title: "Account Balance",
    amount: "$12,345",
    trend: 8,
    icon: <FiDollarSign />,
    color: "bg-green-100",
    description: "Available in your savings",
  },
  {
    title: "Pending Actions",
    amount: "5",
    trend: 2,
    icon: <FiFileText />,
    color: "bg-purple-100",
    description: "Require your attention",
  },
];

// ---------- Reminders ----------
const reminders = [
  {
    date: "Aug 10, 2025",
    reminder: "Pay Credit Card Bill",
    type: "Payment",
    icon: <FiAlertCircle size={18} />,
    action: "Pay Now",
  },
  {
    date: "Aug 12, 2025",
    reminder: "Meeting with Advisor",
    type: "Appointment",
    icon: <FiCalendar size={18} />,
    action: "Join",
  },
  {
    date: "Aug 15, 2025",
    reminder: "Upload Income Proof",
    type: "Document",
    icon: <FiUpload size={18} />,
    action: "Upload",
  },
];

const activities = [
  {
    id: 1,
    type: "Payment",
    description: "Loan EMI of $1,200 due tomorrow",
    date: "Today, 10:30 AM",
    status: "Pending",
    action: "Pay Now",
  },
  {
    id: 2,
    type: "Appointment",
    description: "Annual financial review with advisor",
    date: "Yesterday, 2:15 PM",
    status: "Confirmed",
    action: "Reschedule",
  },
];

const columns = [
  { field: "type", headerName: "Type", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "action", headerName: "Action", flex: 1 },
];

const page = () => {
  const { theme } = useAppUtils();

  return (
    <SidebarWrapper headerText="Dashboard">
      {/* Summary Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {summaryCards.map((card, index) => {
          const isPositive = card.trend > 0;
          const trendIcon = isPositive ? (
            <BiTrendingUp color="green" size={20} />
          ) : (
            <BiTrendingDown color="red" size={20} />
          );

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  backgroundColor:
                    card.color || theme.palette.background.paper,
                  borderRadius: 4,
                  py: 2,
                  border: `2px solid ${theme.palette.background.paper}`,
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography
                      variant="subtitle1"
                      color={theme.palette.text.primary}
                    >
                      {card.title}
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: `${card.color || theme.palette.primary.main}50`,
                        width: 32,
                        height: 32,
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Box>

                  <Typography variant="h5" mb={1}>
                    {card.amount}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {card.description}
                  </Typography>

                  <Box display="flex" alignItems="center">
                    {trendIcon}
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color={isPositive ? "green" : "red"}
                      ml={1}
                    >
                      {Math.abs(card.trend)}%{" "}
                      {isPositive ? "increase" : "decrease"} from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Reminders */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ my: 4 }}>
        {reminders.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
            <Paper elevation={1} sx={{ px: 4, py: 4, borderRadius: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {item.date}
                </Typography>
                <Chip
                  size="small"
                  label={item.type}
                  color={
                    item.type === "Payment"
                      ? "warning"
                      : item.type === "Appointment"
                      ? "success"
                      : "info"
                  }
                  variant="outlined"
                />
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <Box mr={1}>{item.icon}</Box>
                <Typography variant="body1" fontWeight={500}>
                  {item.reminder}
                </Typography>
              </Box>

              <Button size="small" variant="outlined">
                {item.action}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Data Grid */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Paper
          elevation={1}
          sx={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
            p: 2,
          }}
        >
          <DataGrid
            rows={activities}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>
    </SidebarWrapper>
  );
};

export default page;
