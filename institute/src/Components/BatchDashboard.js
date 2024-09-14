// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Box
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   card: {
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     transition: "transform 0.3s ease-in-out",
//     "&:hover": {
//       transform: "scale(1.05)",
//     },
//   },
//   dialogContent: {
//     padding: theme.spacing(3),
//   },
//   dialogActions: {
//     padding: theme.spacing(2),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
// }));

// const BatchDashboard = () => {
//   const classes = useStyles();
//   const [batches, setBatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [open, setOpen] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState(null);

//   useEffect(() => {
//     const fetchBatches = async () => {
//       try {
//         const response = await axios.get("https://localhost:7256/api/Batches");
//         setBatches(response.data);
//       } catch (err) {
//         setError("Failed to fetch batches.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBatches();
//   }, []);

//   const handleClickOpen = (batch) => {
//     setSelectedBatch(batch);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedBatch(null);
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Batch Dashboard</Typography>
//       <Button variant="contained" color="primary" onClick={() => handleClickOpen(null)}>
//         Add New Batch
//       </Button>
//       <Grid container spacing={3}>
//         {batches.map((batch) => (
//           <Grid item xs={12} sm={6} md={4} key={batch.BatchId}>
//             <Card className={classes.card}>
//               <CardContent>
//                 <Typography variant="h5" component="div">{batch.BatchName}</Typography>
//                 <Typography variant="body1" color="textSecondary">Start Date: {batch.StartDate}</Typography>
//                 <Typography variant="body1" color="textSecondary">Start Year: {batch.StartYear}</Typography>
//                 <Typography variant="body1" color="textSecondary">End Year: {batch.EndYear}</Typography>
//                 <Button variant="contained" color="secondary" onClick={() => handleClickOpen(batch)}>
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           {selectedBatch ? "Batch Details" : "Add New Batch"}
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleClose}
//             aria-label="close"
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent className={classes.dialogContent}>
//           {selectedBatch ? (
//             <Box>
//               <Typography variant="h6" gutterBottom>Batch Name: {selectedBatch.BatchName}</Typography>
//               <Typography variant="body1">Start Date: {selectedBatch.StartDate}</Typography>
//               <Typography variant="body1">Start Year: {selectedBatch.StartYear}</Typography>
//               <Typography variant="body1">End Year: {selectedBatch.EndYear}</Typography>
//               <Typography variant="body1">Course: {selectedBatch.CourseId}</Typography>
//             </Box>
//           ) : (
//             <Box>
//               <TextField
//                 fullWidth
//                 label="Batch Name"
//                 margin="normal"
//                 variant="outlined"
//               />
//               <TextField
//                 fullWidth
//                 label="Start Date"
//                 margin="normal"
//                 variant="outlined"
//               />
//               <TextField
//                 fullWidth
//                 label="Start Year"
//                 margin="normal"
//                 variant="outlined"
//               />
//               <TextField
//                 fullWidth
//                 label="End Year"
//                 margin="normal"
//                 variant="outlined"
//               />
//               <TextField
//                 fullWidth
//                 label="Course"
//                 margin="normal"
//                 variant="outlined"
//               />
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions className={classes.dialogActions}>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//           {selectedBatch && (
//             <Button variant="contained" color="primary">
//               Save Changes
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default BatchDashboard;
