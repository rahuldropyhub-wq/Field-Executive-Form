import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Success() {
  const navigate = useNavigate()

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
          Your application for the PhonePe Field Executive role has been successfully submitted.<br/><br/>
          Our recruitment team will review your profile and contact you if your profile matches our requirements.
        </p>
        <Button onClick={() => navigate("/")} className="w-full h-12 text-lg">
          Submit Another Application
        </Button>
      </div>
    </div>
  )
}
