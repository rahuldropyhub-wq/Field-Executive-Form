import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Star, Building2, Wallet } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20">
      
      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden">
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
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white/5 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-black/10 blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16 lg:mb-24">
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg flex items-center justify-center">
              <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-8 w-auto object-contain" />
            </div>
            <Button 
              variant="secondary" 
              className="hidden sm:flex bg-white text-primary hover:bg-slate-100 rounded-full px-6 shadow-md font-semibold"
              onClick={() => navigate("/register")}
            >
              Apply Now
            </Button>
          </header>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
                <Star className="h-4 w-4 text-yellow-300" fill="currentColor" />
                <span className="text-sm font-medium">Hiring in 50+ Cities</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Accelerate Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">PhonePe</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed font-light">
                Join India's leading digital payments platform as a Field Executive. Empower local merchants and build a highly rewarding career with uncapped earning potential.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/register")} 
                  className="h-14 px-8 text-lg font-bold rounded-xl bg-white text-primary hover:bg-slate-50 shadow-xl shadow-black/10 transition-all hover:-translate-y-1"
                >
                  Start Application <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right side visual */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-400 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10 border border-white/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Field Executive</h3>
                      <p className="text-slate-500 text-sm">Full-Time Role</p>
                    </div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Hiring Now
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><MapPin className="h-4 w-4 mr-2" /> Location</span>
                    <span className="font-semibold text-slate-900">Your Home City</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Wallet className="h-4 w-4 mr-2" /> Earning</span>
                    <span className="font-semibold text-slate-900">Fixed + Incentives</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Building2 className="h-4 w-4 mr-2" /> Experience</span>
                    <span className="font-semibold text-slate-900">0-3 Years</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-sm text-slate-600 italic">
                    "PhonePe transformed my career. The flexibility and incentive structure are unmatched."
                  </p>
                  <p className="text-xs font-bold text-slate-900 mt-2">— Rahul, Top Performer 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Why Choose PhonePe?</h2>
          <p className="text-slate-500">We invest heavily in our people. When you grow, we grow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Uncapped Earnings", 
              desc: "Get a strong base salary plus highly rewarding performance incentives that scale with your effort.", 
              icon: TrendingUp,
              color: "text-blue-600",
              bg: "bg-blue-50"
            },
            { 
              title: "Work Locally", 
              desc: "No need to relocate. We deploy you in your home district so you can leverage your local expertise.", 
              icon: MapPin,
              color: "text-emerald-600",
              bg: "bg-emerald-50"
            },
            { 
              title: "Rapid Career Growth", 
              desc: "Top performers are fast-tracked into Team Lead and Managerial roles within 12-18 months.", 
              icon: ShieldCheck,
              color: "text-purple-600",
              bg: "bg-purple-50"
            },
          ].map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1">
                <div className={`${benefit.bg} ${benefit.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Responsibilities */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">Your Role as a Field Executive</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              You will be the vital link between PhonePe and local businesses, helping merchants transition to digital payments seamlessly.
            </p>
            
            <ul className="space-y-6">
              {[
                "Identify and onboard new merchants and retail shop owners to the platform.",
                "Install PhonePe QR codes, Soundboxes, and POS devices at merchant locations.",
                "Educate merchants on effectively using the PhonePe Business App for daily tracking.",
                "Build lasting relationships and provide exceptional ground-level support.",
              ].map((item, i) => (
                <li key={i} className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="bg-emerald-100 p-1.5 rounded-full mr-4 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-200 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
             <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Ready to take the next step?</h3>
             <p className="text-slate-600 mb-10 relative z-10">Our application process takes less than 2 minutes. No resume required for the initial step.</p>
             
             <Button 
                onClick={() => navigate("/register")} 
                size="lg"
                className="w-full sm:w-auto h-14 rounded-xl px-10 text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all relative z-10"
              >
                Apply for this Role <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
