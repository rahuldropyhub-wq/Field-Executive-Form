import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

export default function Success() {
  const navigate = useNavigate()
  const location = useLocation()

  const roleName = location.state?.role || "DropyHub Candidate"
  const backUrl = location.state?.backUrl || "/"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50">
      <div className="max-w-md w-full p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="rounded-full p-3 bg-indigo-100">
            <CheckCircle className="w-16 h-16 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-slate-900">
          Thank You For Applying
        </h1>
        <p className="mb-8 leading-relaxed text-slate-600">
          Your application for the <span className="font-semibold text-slate-900">{roleName}</span> role has been successfully submitted.<br /><br />
          Our recruitment team will review your profile and contact you if your profile matches our requirements.
        </p>
        <Button
          onClick={() => navigate(backUrl)}
          className="w-full h-12 text-lg rounded-xl font-semibold transition-colors border-0 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
        >
          Submit Another Application
        </Button>
      </div>
    </div>
  )
}
