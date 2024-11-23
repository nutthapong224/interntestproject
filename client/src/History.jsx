import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Button,
    Box,
} from "@mui/material";
import axios from "axios";

const HistoryTable = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch history on load
    const fetchHistory = () => {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from localStorage or wherever you store it
        
        axios
            .get(`${import.meta.env.VITE_API_URL}/history`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching history:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchHistory();
    }, []);

    // Handle delete action
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this URL?")) {
            axios
                .delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
                .then(() => {
                    fetchHistory(); // Refresh the table after deletion
                })
                .catch((error) => {
                    console.error("Error deleting URL:", error);
                });
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ padding: 2 }}
        >
            <Paper elevation={3} sx={{ width: '100%', maxWidth: 1500, padding: 4 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                    ประวัติการใช้งาน Short URL
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowX: "auto" }}>
                    <Table stickyHeader size="medium"> {/* Increase table size */}
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}><b>URL ต้นฉบับ</b></TableCell>
                                <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}><b>Short URL</b></TableCell>
                                <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}><b>จำนวนคลิ๊ก</b></TableCell>
                                <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}><b>เวลาที่สร้าง</b></TableCell>
                                <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}><b>ลบข้อมูล</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{row.original_url}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                                        <a
                                            href={`${import.meta.env.VITE_API_URL2}/${row.short_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: "#1976d2", textDecoration: "none" }}
                                        >
                                            {import.meta.env.VITE_API_URL2}/{row.short_url}
                                        </a>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{row.clicks}</TableCell>
                                    <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                                    <TableCell sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
    {new Date(row.created_at).toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })}{" "}
    {new Date(row.created_at).toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })}
</TableCell>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDelete(row.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default HistoryTable;
