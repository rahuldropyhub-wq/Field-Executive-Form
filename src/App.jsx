import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

import LandingPage from "./pages/Landing"
import RegistrationForm from "./pages/RegistrationForm"
import TideLanding from "./pages/TideLanding"
import TideRegistrationForm from "./pages/TideRegistrationForm"
import Success from "./pages/Success"
import QRCodeGenerator from "./pages/QRCodeGenerator"
import RecruiterLanding from "./pages/RecruiterLanding"
import RecruiterRegistrationForm from "./pages/RecruiterRegistrationForm"
import CandidateLanding from "./pages/CandidateLanding"
import CandidateRegistrationForm from "./pages/CandidateRegistrationForm"
import AdminLogin from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  const isTideDomain = typeof window !== 'undefined' && window.location.hostname.includes("tide");
  const isRecruiterDomain = typeof window !== 'undefined' && window.location.hostname.includes("recruiter");
  const isCareersDomain = typeof window !== 'undefined' && (
    window.location.hostname.includes("career") || 
    window.location.hostname.includes("dropy") || 
    window.location.hostname.includes("candidate")
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          isCareersDomain ? <CandidateLanding /> :
          isRecruiterDomain ? <RecruiterLanding /> : 
          isTideDomain ? <TideLanding /> : <LandingPage />
        } />
        <Route path="/register" element={
          isCareersDomain ? <CandidateRegistrationForm /> :
          isRecruiterDomain ? <RecruiterRegistrationForm /> :
          isTideDomain ? <TideRegistrationForm /> : <RegistrationForm />
        } />
        <Route path="/tide" element={<TideLanding />} />
        <Route path="/tide-register" element={<TideRegistrationForm />} />
        <Route path="/recruiter" element={<RecruiterLanding />} />
        <Route path="/recruiter-register" element={<RecruiterRegistrationForm />} />

        {/* ─── Dropy Hub Candidate – Primary Dedicated URLs ─── */}
        <Route path="/candidate" element={<CandidateLanding />} />
        <Route path="/candidate/apply" element={<CandidateRegistrationForm />} />
        <Route path="/candidate/register" element={<CandidateRegistrationForm />} />

        {/* Dropy Hub Candidate – Alias Routes */}
        <Route path="/careers" element={<CandidateLanding />} />
        <Route path="/dropy" element={<CandidateLanding />} />
        <Route path="/jobs" element={<CandidateLanding />} />
        <Route path="/details" element={<CandidateLanding />} />
        <Route path="/candidate-register" element={<CandidateRegistrationForm />} />
        <Route path="/dropy-register" element={<CandidateRegistrationForm />} />
        <Route path="/details/apply" element={<CandidateRegistrationForm />} />
        <Route path="/apply" element={<CandidateRegistrationForm />} />
        <Route path="/join" element={<CandidateRegistrationForm />} />

        <Route path="/success" element={<Success />} />
        <Route path="/qrcode" element={<QRCodeGenerator />} />



        {/* Admin Routes */}
        <Route path="/secure-portal" element={<Navigate to="/secure-portal/login" replace />} />
        <Route path="/secure-portal/login" element={<AdminLogin />} />
        <Route path="/secure-portal/dashboard" element={<Dashboard />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
