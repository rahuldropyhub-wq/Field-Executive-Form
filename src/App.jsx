import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

import LandingPage from "./pages/Landing"
import RegistrationForm from "./pages/RegistrationForm"
import Success from "./pages/Success"
import QRCodeGenerator from "./pages/QRCodeGenerator"
import AdminLogin from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/qrcode" element={<QRCodeGenerator />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
