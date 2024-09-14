import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './Components/SignInPage';
import StudentNewUser from './Components/StudentNewUser';
import AdminDashboard from './Components/AdminDashboard';
import StudentDashboard from './Components/StudentDashboard';
import TraineeDashboard from './Components/TeacherDashboard';
import StudentsSection from './Components/StudentsSection';
import BatchDashboard from './Components/BatchDashboard';
import CourseDashboard from './Components/CourseDashboard';
import TeacherDashboard from './Components/TeacherDashboard';
import StudentAdmin from './Components/StudentAdmin';
import TeacherAdmin from './Components/TeacherAdmin';
import PlacedStudent from './Components/PlacedStudent';

function App() {
  return (
   <Router>
    <Routes>
    <Route path="/" element={<SignInPage />} />
    <Route path="/student-new-user" element={<StudentNewUser />} />
    <Route path="/AdminDashboard" element={<AdminDashboard />}/>
    <Route path="/studentDashboard" element={<StudentDashboard />} />
    <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
    <Route path="/StudentsSection" element={<StudentsSection />} />
    <Route path="/CourseDashboard" element={<CourseDashboard />} />
    <Route path="/StudentAdmin" element={<StudentAdmin />} />
    <Route path="/TeachacherAdmin" element={<TeacherAdmin />} />
    <Route path="/Placement" element={<PlacedStudent/>} />
    </Routes>
   </Router>
  );
}

export default App;
