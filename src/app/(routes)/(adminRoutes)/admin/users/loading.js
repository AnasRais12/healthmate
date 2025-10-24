"use client"
import { CircularProgress } from "@mui/material";
export default function Loading() {
    // You can add any loading indicator here, e.g., a spinner, skeleton UI, or text
    return (
        <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>
    );
}