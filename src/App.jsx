import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

import CandidateLanding from "./pages/CandidateLanding"
import CandidateRegistrationForm from "./pages/CandidateRegistrationForm"
import Success from "./pages/Success"
import QRCodeGenerator from "./pages/QRCodeGenerator"
import AdminLogin from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CandidateLanding />} />
        <Route path="/register" element={<CandidateRegistrationForm />} />

        {/* DropyHub Candidate – Primary Dedicated URLs */}
        <Route path="/candidate" element={<CandidateLanding />} />
        <Route path="/candidate/apply" element={<CandidateRegistrationForm />} />
        <Route path="/candidate/register" element={<CandidateRegistrationForm />} />

        {/* DropyHub Candidate – Alias Routes */}
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
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Legacy Admin Routes (Kept so old links still work) */}
        <Route path="/secure-portal" element={<Navigate to="/admin/login" replace />} />
        <Route path="/secure-portal/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/secure-portal/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
