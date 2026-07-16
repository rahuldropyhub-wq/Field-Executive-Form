import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function Success() {
  const navigate = useNavigate()
  const location = useLocation()

  const isRecruiterDomain = typeof window !== 'undefined' && window.location.hostname.includes("recruiter");

  // Default values for fallback (PhonePe Field Executive)
  const roleName = location.state?.role || (isRecruiterDomain ? "Dropyhub Recruiter" : "PhonePe Field Executive")
  const backUrl = location.state?.backUrl || (isRecruiterDomain ? "/recruiter-register" : "/")
  
  const isTide = roleName.toLowerCase().includes("tide")
  const isRecruiter = isRecruiterDomain || roleName.toLowerCase().includes("recruiter")

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center p-4",
      isRecruiter ? "bg-[#0a0f1c]" : "bg-slate-50"
    )}>
      <div className={cn(
        "max-w-md w-full p-8 text-center",
        isRecruiter 
          ? "bg-[#131b2f] rounded-3xl border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.3)]" 
          : "bg-white rounded-2xl border border-slate-100 shadow-xl"
      )}>
        <div className="flex justify-center mb-6">
          <div className={cn(
            "rounded-full p-3",
            isRecruiter ? "bg-cyan-500/10" : "bg-green-100"
          )}>
            <CheckCircle className={cn(
              "w-16 h-16",
              isRecruiter ? "text-cyan-400" : "text-green-600"
            )} />
          </div>
        </div>
        <h1 className={cn(
          "text-3xl font-bold mb-2",
          isRecruiter ? "text-white" : "text-slate-900"
        )}>
          Thank You For Applying
        </h1>
        <p className={cn(
          "mb-8 leading-relaxed",
          isRecruiter ? "text-slate-400" : "text-slate-600"
        )}>
          Your application for the <span className={cn("font-semibold", isRecruiter ? "text-white" : "text-slate-900")}>{roleName}</span> role has been successfully submitted.<br/><br/>
          Our recruitment team will review your profile and contact you if your profile matches our requirements.
        </p>
        <Button 
          onClick={() => navigate(backUrl)} 
          className={cn(
            "w-full h-12 text-lg rounded-xl font-semibold transition-colors border-0",
            isRecruiter 
              ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(219,39,119,0.3)]"
              : isTide 
                ? "bg-[#103FEF] hover:bg-[#0d34cc] text-white shadow-lg shadow-[#103FEF]/20" 
                : "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
          )}
        >
          Submit Another Application
        </Button>
      </div>
    </div>
  )
}
