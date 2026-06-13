import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function Success() {
  const navigate = useNavigate()
  const location = useLocation()

  // Default values for fallback (PhonePe Field Executive)
  const roleName = location.state?.role || "PhonePe Field Executive"
  const backUrl = location.state?.backUrl || "/"
  const isTide = roleName.toLowerCase().includes("tide")

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Thank You For Applying</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Your application for the <span className="font-semibold text-slate-900">{roleName}</span> role has been successfully submitted.<br/><br/>
          Our recruitment team will review your profile and contact you if your profile matches our requirements.
        </p>
        <Button 
          onClick={() => navigate(backUrl)} 
          className={cn(
            "w-full h-12 text-lg rounded-xl font-semibold",
            isTide 
              ? "bg-[#103FEF] hover:bg-[#0d34cc] text-white shadow-lg shadow-[#103FEF]/20" 
              : "bg-primary hover:bg-primary/90 text-white"
          )}
        >
          Submit Another Application
        </Button>
      </div>
    </div>
  )
}
