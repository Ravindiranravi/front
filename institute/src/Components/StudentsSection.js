// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Grid,
//   Card,
//   CardContent,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Snackbar,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";

// const AdminDashboard = () => {
//   const [statistics, setStatistics] = useState(null);
//   const [batches, setBatches] = useState([]);
//   const [batch, setBatch] = useState(null);
//   const [batchId, setBatchId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(""); // To show success message
//   const [statisticsOpen, setStatisticsOpen] = useState(false);
//   const [batchesOpen, setBatchesOpen] = useState(false);
//   const [addBatchOpen, setAddBatchOpen] = useState(false);
//   const [batchDetailsOpen, setBatchDetailsOpen] = useState(false); // For Batch by ID
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // Confirmation for delete
//   const [batchToDelete, setBatchToDelete] = useState(null); // Batch to be deleted
//   const [newBatch, setNewBatch] = useState({
//     BatchName: "",
//     StartDate: "",
//     StartYear: "",
//     EndYear: "",
//     CourseId: "",
//   });

//   // Fetch Statistics Data
//   const fetchStatistics = async () => {
//     try {
//       const response = await axios.get("https://localhost:7256/api/Admin/Statistics");
//       setStatistics(response.data);
//     } catch (err) {
//       setError("Failed to fetch statistics.");
//     }
//   };

//   // Fetch Batch Data
//   const fetchBatches = async () => {
//     try {
//       const response = await axios.get("https://localhost:7256/api/Batch");
//       setBatches(response.data);
//     } catch (err) {
//       setError("Failed to fetch batches.");
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     Promise.all([fetchStatistics(), fetchBatches()]).finally(() => setLoading(false));
//   }, []);

//   // Fetch Batch by ID
//   const fetchBatchById = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://localhost:7256/api/Batch/${batchId}`);
//       setBatch(response.data);
//       setBatchDetailsOpen(true); // Open batch details dialog
//       setError(""); // Clear any previous errors
//     } catch (err) {
//       setError("Failed to fetch batch.");
//       setBatch(null); // Clear any previous data
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete batch by ID
//   const deleteBatch = async (id) => {
//     try {
//       setLoading(true);
//       await axios.delete(`https://localhost:7256/api/Batch/${id}`);
//       setSuccess("Batch deleted successfully!");
//       fetchBatches(); // Refresh the batch list after deletion
//     } catch (err) {
//       setError("Failed to delete batch.");
//     } finally {
//       setLoading(false);
//       setDeleteConfirmOpen(false); // Close delete confirmation dialog
//     }
//   };

//   // Open/Close Dialogs
//   const handleStatisticsOpen = () => setStatisticsOpen(true);
//   const handleStatisticsClose = () => setStatisticsOpen(false);

//   const handleBatchesOpen = () => setBatchesOpen(true);
//   const handleBatchesClose = () => setBatchesOpen(false);

//   const handleAddBatchOpen = () => setAddBatchOpen(true);
//   const handleAddBatchClose = () => setAddBatchOpen(false);

//   const handleBatchDetailsClose = () => setBatchDetailsOpen(false);

//   const handleDeleteConfirmOpen = (batch) => {
//     setBatchToDelete(batch);
//     setDeleteConfirmOpen(true);
//   };
//   const handleDeleteConfirmClose = () => setDeleteConfirmOpen(false);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewBatch((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle create new batch
//   const handleAddBatch = async () => {
//     try {
//       await axios.post("https://localhost:7256/api/Batch", newBatch);
//       setNewBatch({
//         BatchName: "",
//         StartDate: "",
//         StartYear: "",
//         EndYear: "",
//         CourseId: "",
//       });
//       handleAddBatchClose();
//       fetchBatches(); // Refresh the batch list
//     } catch (err) {
//       setError("Failed to create batch.");
//     }
//   };

//   // Loading/Error handling
//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!statistics) return null;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={handleStatisticsOpen}>
//             Show Statistics
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={handleBatchesOpen}>
//             Show Batches
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant="contained" color="secondary" onClick={handleAddBatchOpen}>
//             Add New Batch
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Get Batch by ID */}
//       <Grid container spacing={2} style={{ marginTop: 20 }}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Batch ID"
//             value={batchId}
//             onChange={(e) => setBatchId(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={fetchBatchById}>
//             Get Batch by ID
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Statistics Dialog */}
//       <Dialog open={statisticsOpen} onClose={handleStatisticsClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Statistics
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleStatisticsClose}
//             aria-label="close"
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={3}>{/* Display your statistics here */}</Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleStatisticsClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Batch Details Dialog (for get by ID) */}
//       <Dialog open={batchDetailsOpen} onClose={handleBatchDetailsClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Batch Details
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleBatchDetailsClose}
//             aria-label="close"
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           {batch ? (
//             <Grid container spacing={2}>{/* Display batch details */}</Grid>
//           ) : (
//             <Typography variant="h6" color="error">
//               No batch data found.
//             </Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleBatchDetailsClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* List of Batches Dialog */}
//       <Dialog open={batchesOpen} onClose={handleBatchesClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Batches List
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleBatchesClose}
//             aria-label="close"
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Batch Name</TableCell>
//                   <TableCell>Start Date</TableCell>
//                   <TableCell>Start Year</TableCell>
//                   <TableCell>End Year</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {batches.map((batch) => (
//                   <TableRow key={batch.BatchId}>
//                     <TableCell>{batch.BatchName}</TableCell>
//                     <TableCell>{batch.StartDate}</TableCell>
//                     <TableCell>{batch.StartYear}</TableCell>
//                     <TableCell>{batch.EndYear}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteConfirmOpen(batch)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleBatchesClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add New Batch Dialog */}
//       <Dialog open={addBatchOpen} onClose={handleAddBatchClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Add New Batch
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleAddBatchClose}
//             aria-label="close"
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Batch Name"
//                 name="BatchName"
//                 value={newBatch.BatchName}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Start Date"
//                 name="StartDate"
//                 value={newBatch.StartDate}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Start Year"
//                 name="StartYear"
//                 value={newBatch.StartYear}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="End Year"
//                 name="EndYear"
//                 value={newBatch.EndYear}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Course ID"
//                 name="CourseId"
//                 value={newBatch.CourseId}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddBatch} color="primary">
//             Save
//           </Button>
//           <Button onClick={handleAddBatchClose} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to delete batch {batchToDelete?.BatchName}?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => deleteBatch(batchToDelete.BatchId)} color="primary">
//             Yes
//           </Button>
//           <Button onClick={handleDeleteConfirmClose} color="secondary">
//             No
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Success Snackbar */}
//       <Snackbar
//         open={Boolean(success)}
//         autoHideDuration={3000}
//         onClose={() => setSuccess("")}
//         message={success}
//       />
//     </Container>
//   );
// };

// export default AdminDashboard;
