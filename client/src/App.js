import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Banner from './components/Banners';
import About from './components/AboutUs';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardBanner from './layouts/DashboardBanner';
import LoginForm from './layouts/LoginForm';
import DashboardAbout from './layouts/DashboardAbout';
import DashboardSkills from './layouts/DashboardSkills';
import DashboardExperience from './layouts/DashboardExperience';
import DashboardProject from './layouts/DashboardProject';
import Chat from './components/Chat';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ClientSite = () => (
    <>
      <Banner />
      <About />
      <Experience />
      <Projects />
      <Chat />
    </>
  );

  return (
    <Router>
    <Routes>
      <Route path="/" element={<ClientSite />} />

      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Navigate to="/dashboard/home" replace /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />
        }
      />

      <Route
        path="/dashboard/*"
        element={
          isLoggedIn ? <DashboardLayout /> : <Navigate to="/dashboard" replace />
        }
      >
        <Route path="banner" element={<DashboardBanner />} />
        <Route path="about" element={<DashboardAbout />} />
        <Route path="skills" element={<DashboardSkills />} />
        <Route path="experience" element={<DashboardExperience />} />
        <Route path="project" element={<DashboardProject />} />

      </Route>
    </Routes>
  </Router>
  );
};

export default App;
