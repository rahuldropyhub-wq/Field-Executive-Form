import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ShieldCheck, Users, Briefcase } from "lucide-react"
import { loginAdmin } from "@/lib/api"
import { cn } from "@/lib/utils"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const isTideDomain = typeof window !== 'undefined' && window.location.hostname.includes("tide");

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await loginAdmin(email, password)
      
      if (result.token) {
        localStorage.setItem("admin_authenticated", "true")
        navigate("/secure-portal/dashboard")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side: Branding / Content */}
      <div className={cn(
        "hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white",
        isTideDomain ? "bg-[#103FEF]" : "bg-primary"
      )}>
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl pointer-events-none z-0"></div>
        <div className={cn(
          "absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-3xl pointer-events-none z-0",
          isTideDomain ? "bg-blue-950/40" : "bg-purple-900/40"
        )}></div>

        <div className="relative z-10">
          {isTideDomain ? (
            <div className="inline-flex items-center justify-center rounded-2xl mb-12 shadow-lg overflow-hidden border border-white/20">
              <img src="/tide-logo.png" alt="Tide Logo" className="h-16 w-auto object-contain" />
            </div>
          ) : (
            <div className="bg-white inline-flex items-center justify-center p-4 rounded-2xl mb-12 shadow-lg border border-slate-100">
               <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-8 w-auto" />
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Field Executive <br />
            <span className={isTideDomain ? "text-blue-100" : "text-purple-200"}>Admin Portal</span>
          </h1>
          <p className="text-slate-200 text-lg max-w-md font-light leading-relaxed">
            Manage field executive applications, review candidate details, and streamline your hiring process securely from one centralized dashboard.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center text-white/80">
            <div className="bg-white/10 p-2 rounded-lg mr-4 shadow-sm border border-white/10">
              <Users className={cn("h-5 w-5", isTideDomain ? "text-blue-100" : "text-purple-100")} />
            </div>
            <span className={cn("font-medium", isTideDomain ? "text-blue-50" : "text-purple-50")}>View and filter hundreds of applications instantly</span>
          </div>
          <div className="flex items-center text-white/80">
            <div className="bg-white/10 p-2 rounded-lg mr-4 shadow-sm border border-white/10">
              <Briefcase className={cn("h-5 w-5", isTideDomain ? "text-blue-100" : "text-purple-100")} />
            </div>
            <span className={cn("font-medium", isTideDomain ? "text-blue-50" : "text-purple-50")}>Export candidate data to Excel or PDF with one click</span>
          </div>
          <div className="flex items-center text-white/80">
            <div className="bg-white/10 p-2 rounded-lg mr-4 shadow-sm border border-white/10">
              <ShieldCheck className={cn("h-5 w-5", isTideDomain ? "text-blue-100" : "text-purple-100")} />
            </div>
            <span className={cn("font-medium", isTideDomain ? "text-blue-50" : "text-purple-50")}>Secure, authenticated access for authorized personnel</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10 shadow-[-20px_0_40px_rgb(0,0,0,0.05)]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mx-auto w-fit">
            {isTideDomain ? (
              <img src="/tide-logo.png" alt="Tide Logo" className="h-12 w-auto object-contain rounded-lg" />
            ) : (
              <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-8 w-auto" />
            )}
          </div>
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 mt-2 text-lg">Please enter your admin credentials to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder={isTideDomain ? "admin@tide.com" : "admin@phonepe.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "h-12 rounded-xl border-slate-200 transition-all bg-slate-50/50 focus:outline-none focus:ring-2",
                  isTideDomain 
                    ? "focus:border-[#103FEF] focus:ring-[#103FEF]/20" 
                    : "focus:border-primary focus:ring-primary/20"
                )}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  "h-12 rounded-xl border-slate-200 transition-all bg-slate-50/50 focus:outline-none focus:ring-2",
                  isTideDomain 
                    ? "focus:border-[#103FEF] focus:ring-[#103FEF]/20" 
                    : "focus:border-primary focus:ring-primary/20"
                )}
              />
            </div>

            <Button 
              type="submit" 
              className={cn(
                "w-full h-12 rounded-xl text-base font-semibold transition-all mt-4 text-white shadow-lg",
                isTideDomain
                  ? "bg-[#103FEF] hover:bg-[#0d34cc] shadow-[#103FEF]/20"
                  : "bg-primary hover:bg-primary/90 shadow-primary/20"
              )} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>
          
          <div className="mt-12 text-center text-sm text-slate-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Protected by advanced security protocols</span>
            </div>
            <p>&copy; {new Date().getFullYear()} {isTideDomain ? "Tide Field Operations" : "PhonePe Field Operations"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
