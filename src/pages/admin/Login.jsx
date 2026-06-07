import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ShieldCheck, Users, Briefcase } from "lucide-react"
import { loginAdmin } from "@/lib/api"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

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
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
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
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-900/40 blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm inline-flex items-center justify-center p-4 rounded-2xl mb-12 border border-white/20">
             <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-8 w-auto brightness-0 invert" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Field Executive <br />
            <span className="text-purple-200">Admin Portal</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md font-light leading-relaxed">
            Manage field executive applications, review candidate details, and streamline your hiring process securely from one centralized dashboard.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center text-white/80">
            <div className="bg-white/10 p-2 rounded-lg mr-4 shadow-sm border border-white/10">
              <Users className="h-5 w-5 text-purple-100" />
            </div>
            <span className="font-medium text-purple-50">View and filter hundreds of applications instantly</span>
          </div>
          <div className="flex items-center text-white/80">
            <div className="bg-white/10 p-2 rounded-lg mr-4 shadow-sm border border-white/10">
              <Briefcase className="h-5 w-5 text-purple-100" />
            </div>
            <span className="font-medium text-purple-50">Export candidate data to Excel or PDF with one click</span>
          </div>
          <div className="flex items-center text-white/80">
            <div className="bg-white/10 p-2 rounded-lg mr-4 shadow-sm border border-white/10">
              <ShieldCheck className="h-5 w-5 text-purple-100" />
            </div>
            <span className="font-medium text-purple-50">Secure, authenticated access for authorized personnel</span>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10 shadow-[-20px_0_40px_rgb(0,0,0,0.05)]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
             <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-10 w-auto" />
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
                placeholder="admin@phonepe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 transition-all bg-slate-50/50"
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
                className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20 transition-all bg-slate-50/50"
              />
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all mt-4" disabled={isLoading}>
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
            <p>&copy; {new Date().getFullYear()} PhonePe Field Operations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
