import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobList from './pages/JobList';
import JobForm from './pages/JobForm';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/jobs/new" element={<JobForm />} />
                  <Route path="/jobs/edit/:id" element={<JobForm />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
