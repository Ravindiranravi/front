import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Box,
} from '@mui/material';

const TeacherDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]); // New state for batches
  const [open, setOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchTeachers();
    fetchStudents();
    fetchCourses();
    fetchBatches(); // Fetch batches data
  }, []);

  // Fetch teachers using GET method
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('https://localhost:7256/api/Teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // Fetch students using GET method
  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://localhost:7256/api/RecentlyPlacedStudents');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch courses using GET method
  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://localhost:7256/api/Course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch batches using GET method
  const fetchBatches = async () => {
    try {
      const response = await axios.get('https://localhost:7256/api/Batch'); // Corrected the endpoint
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleOpen = (teacher = null) => {
    setIsEditing(!!teacher);
    setCurrentTeacher(
      teacher || {
        TeacherId: 0,
        Username: '',
        Password: '',
        Address: '',
        DateOfJoin: '',
        Email: '',
        DateOfBirth: '',
        Qualification: '',
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTeacher(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add New Teacher
      </Button>

      {/* Teachers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.length ? (
              teachers.map((teacher) => (
                <TableRow key={teacher.teacherId}>
                  <TableCell>{teacher.teacherId}</TableCell>
                  <TableCell>{teacher.username}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleOpen(teacher)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => {/* Delete logic here */}}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Placed Students Table */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Recently Placed Students
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Course Studied</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Date of Placement</TableCell>
                <TableCell>Company Placed</TableCell>
                <TableCell>Contact Mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length ? (
                students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.courseStudied}</TableCell>
                    <TableCell>{student.package}</TableCell>
                    <TableCell>{new Date(student.dateOfPlaced).toLocaleDateString()}</TableCell>
                    <TableCell>{student.companyPlaced}</TableCell>
                    <TableCell>{student.contactMail}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No students available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Courses Table */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Courses
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Course Duration</TableCell>
                <TableCell>Course Fees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.length ? (
                courses.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell>{course.courseId}</TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.courseDuration}</TableCell>
                    <TableCell>{course.courseFees}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No courses available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Batches Table */}
      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Batches
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Batch ID</TableCell>
                <TableCell>Batch Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batches.length ? (
                batches.map((batch) => (
                  <TableRow key={batch.batchId}>
                    <TableCell>{batch.batchId}</TableCell>
                    <TableCell>{batch.batchName}</TableCell>
                    <TableCell>{new Date(batch.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(batch.endDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No batches available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={currentTeacher?.Username || ''}
            onChange={handleChange}
          />
          {/* Add other fields similarly */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {/* Submit logic here */}} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeacherDashboard;
