import React, { useState, useEffect } from 'react';
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

const CourseDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editCourseDialogOpen, setEditCourseDialogOpen] = useState(false);
  const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    CourseName: '',
    CourseDuration: '',
    CourseFees: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://localhost:7256/api/Course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddCourseChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleEditCourseChange = (e) => {
    setSelectedCourse({ ...selectedCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    try {
      await axios.post('https://localhost:7256/api/Course', newCourse);
      fetchCourses();
      setAddCourseDialogOpen(false);
      setSnackbarMessage('Course added successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse) return;
     console.log(selectedCourse)
    try {
      await axios.put(`https://localhost:7256/api/Course/${selectedCourse.courseId}`, selectedCourse);
      fetchCourses();
      setEditCourseDialogOpen(false);
      setSnackbarMessage('Course updated successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    console.log(id)
    try {
      await axios.delete(`https://localhost:7256/api/Course/${id}`);
      fetchCourses();
      setSnackbarMessage('Course deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Course Dashboard
      </Typography>

      <Button variant="contained" color="primary" onClick={() => setAddCourseDialogOpen(true)}>
        Add New Course
      </Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.courseId}>
                <TableCell>{course.courseId}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.courseDuration}</TableCell>
                <TableCell>{course.courseFees}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => { setSelectedCourse(course); setEditCourseDialogOpen(true); }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteCourse(course.courseId)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCourseDialog
        open={addCourseDialogOpen}
        onClose={() => setAddCourseDialogOpen(false)}
        onAdd={handleAddCourse}
        course={newCourse}
        onChange={handleAddCourseChange}
      />

      <EditCourseDialog
        open={editCourseDialogOpen}
        onClose={() => setEditCourseDialogOpen(false)}
        onUpdate={handleUpdateCourse}
        course={selectedCourse}
        onChange={handleEditCourseChange}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

const AddCourseDialog = ({ open, onClose, onAdd, course, onChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Add New Course</DialogTitle>
    <DialogContent>
      <TextField
        label="Course Name"
        name="CourseName"
        fullWidth
        value={course.CourseName}
        onChange={onChange}
        margin="dense"
      />
      <TextField
        label="Course Duration"
        name="CourseDuration"
        fullWidth
        value={course.CourseDuration}
        onChange={onChange}
        margin="dense"
      />
      <TextField
        label="Course Fees"
        name="CourseFees"
        fullWidth
        value={course.CourseFees}
        onChange={onChange}
        margin="dense"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onAdd} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
);

const EditCourseDialog = ({ open, onClose, onUpdate, course, onChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Course</DialogTitle>
    <DialogContent>
      <TextField
        label="Course Name"
        name="CourseName"
        fullWidth
        value={course?.CourseName || ''}
        onChange={onChange}
        margin="dense"
      />
      <TextField
        label="Course Duration"
        name="CourseDuration"
        fullWidth
        value={course?.CourseDuration || ''}
        onChange={onChange}
        margin="dense"
      />
      <TextField
        label="Course Fees"
        name="CourseFees"
        fullWidth
        value={course?.CourseFees || ''}
        onChange={onChange}
        margin="dense"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onUpdate} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default CourseDashboard;
