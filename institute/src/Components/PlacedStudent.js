
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Typography,
    Box,
  } from "@mui/material";
  const PlacedStudent = () => {
    const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    studentName: "",
    courseStudied: "",
    courseDuration: "",
    package: "",
    dateOfPlaced: "",
    companyPlaced: "",
    contactMail: "",
  });

  // Fetch students from API
  useEffect(() => {
    axios
      .get("https://localhost:7256/api/RecentlyPlacedStudents")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Add New Student
  const addStudent = () => {
    axios
      .post("https://localhost:7256/api/RecentlyPlacedStudents", newStudent)
      .then((response) => {
        setStudents([...students, response.data]);
        setNewStudent({
          studentName: "",
          courseStudied: "",
          courseDuration: "",
          package: "",
          dateOfPlaced: "",
          companyPlaced: "",
          contactMail: "",
        });
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  // Delete Student
  const deleteStudent = (id) => {
    axios
      .delete(`https://localhost:7256/api/RecentlyPlacedStudents/${id}`)
      .then(() => setStudents(students.filter((student) => student.studentId !== id)))
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recently Placed Students
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" gutterBottom>
          Add New Student
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Student Name"
            name="studentName"
            value={newStudent.studentName}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            label="Course Studied"
            name="courseStudied"
            value={newStudent.courseStudied}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            label="Course Duration"
            name="courseDuration"
            value={newStudent.courseDuration}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            label="Package"
            name="package"
            value={newStudent.package}
            onChange={handleInputChange}
            type="number"
            variant="outlined"
          />
          <TextField
            label="Date of Placement"
            name="dateOfPlaced"
            value={newStudent.dateOfPlaced}
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            label="Company Placed"
            name="companyPlaced"
            value={newStudent.companyPlaced}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            label="Contact Mail"
            name="contactMail"
            value={newStudent.contactMail}
            onChange={handleInputChange}
            type="email"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={addStudent}>
            Add Student
          </Button>
        </Box>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom>
          Student List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Course Studied</TableCell>
                <TableCell>Course Duration</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Date of Placement</TableCell>
                <TableCell>Company Placed</TableCell>
                <TableCell>Contact Mail</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length ? (
                students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.courseStudied}</TableCell>
                    <TableCell>{student.courseDuration}</TableCell>
                    <TableCell>{student.package}</TableCell>
                    <TableCell>{new Date(student.dateOfPlaced).toLocaleDateString()}</TableCell>
                    <TableCell>{student.companyPlaced}</TableCell>
                    <TableCell>{student.contactMail}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteStudent(student.studentId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>No students available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
  
  
  


export default PlacedStudent
