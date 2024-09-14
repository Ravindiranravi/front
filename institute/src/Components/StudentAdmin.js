import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import {
  Container,
  Typography,
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
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const StudentAdmin = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    useEffect(() => {
      fetchStudents();
      fetchCourses();
    }, []);
  
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://localhost:7256/api/Student');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setSnackbarMessage('Error fetching students');
        setSnackbarOpen(true);
      }
    };
  
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://localhost:7256/api/Course');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setSnackbarMessage('Error fetching courses');
        setSnackbarOpen(true);
      }
    };
  
    const handleUpdateStudent = async () => {
      if (!selectedStudent) return;
  
      try {
        await axios.put(`https://localhost:7256/api/Student/${selectedStudent.studentId}`, selectedStudent);
        fetchStudents();
        setEditDialogOpen(false);
        setSnackbarMessage('Student updated successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error updating student:', error);
        const errorMessage = error.response?.data?.message || 'Error updating student';
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
      }
    };
  
    const handleDeleteStudent = async (studentId) => {
      try {
        await axios.delete(`https://localhost:7256/api/Student/${studentId}`);
        fetchStudents();
        setSnackbarMessage('Student deleted successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error deleting student:', error);
        const errorMessage = error.response?.data?.message || 'Error deleting student';
        setSnackbarMessage(errorMessage);
        setSnackbarOpen(true);
      }
    };
  
    const handleEditStudentChange = (e) => {
      setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
    };
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Student Dashboard
        </Typography>
  
        <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
          Students
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell>Interest to Study</TableCell>
                <TableCell>Date of Join</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.username || ''}</TableCell>
                  <TableCell>{student.email || ''}</TableCell>
                  <TableCell>{student.contact || ''}</TableCell>
                  <TableCell>{student.gender || ''}</TableCell>
                  <TableCell>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{student.address || ''}</TableCell>
                  <TableCell>{student.qualification || ''}</TableCell>
                  <TableCell>{student.interestToStudy || ''}</TableCell>
                  <TableCell>{student.dateOfJoin ? new Date(student.dateOfJoin).toLocaleDateString() : ''}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => { setSelectedStudent(student); setEditDialogOpen(true); }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteStudent(student.studentId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Edit Student Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>
            Edit Student
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setEditDialogOpen(false)}
              aria-label="close"
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedStudent && Object.keys(selectedStudent).map((key) => (
              <TextField
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').trim()}
                name={key}
                value={selectedStudent[key] || ''}
                onChange={handleEditStudentChange}
                fullWidth
                margin="normal"
                type={key.includes('Date') ? 'date' : 'text'}
                InputLabelProps={key.includes('Date') ? { shrink: true } : {}}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateStudent} color="primary">
              Update
            </Button>
            <Button onClick={() => setEditDialogOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    );
}

export default StudentAdmin