import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, IndianRupee, Calendar, ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Smartphone, Target, Users } from "lucide-react"

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
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium">Hiring strictly in Hyderabad</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Start Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">PhonePe</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed font-light">
                We are actively looking for dynamic Field Executives in Hyderabad. Whether you are a fresher starting out or an experienced sales professional, build your future with India's leading payments platform.
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

            {/* Right side visual: Job Card */}
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
                    <span className="font-semibold text-slate-900">Hyderabad</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Salary</span>
                    <span className="font-semibold text-emerald-600">₹17,000 – ₹23,000 / month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Calendar className="h-4 w-4 mr-2" /> Working Days</span>
                    <span className="font-semibold text-slate-900">Monday to Saturday</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><GraduationCap className="h-4 w-4 mr-2" /> Eligibility</span>
                    <span className="font-semibold text-slate-900">10th / Inter / Degree</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-sm text-amber-800">
                  <span className="font-bold">Note for Experienced:</span> Prior field sales candidates must provide previous company pay slips and relevant documents.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Job Responsibilities</h2>
          <p className="text-slate-500">What you will be doing day-to-day on the field.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            "Promote PhonePe services and increase brand awareness in the assigned territory.",
            "Visit shops and local businesses to onboard new merchants.",
            "Open PhonePe accounts for shopkeepers and users.",
            "Assist merchants and users with PhonePe app installation and setup.",
            "Explain PhonePe features, benefits, and digital payment solutions.",
            "Build and maintain strong relationships with shopkeepers and customers.",
            "Achieve daily and monthly onboarding targets.",
            "Submit regular activity and performance reports to the supervisor.",
          ].map((item, i) => (
            <div key={i} className="flex items-start bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="bg-primary/10 p-1.5 rounded-full mr-4 shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills and Eligibility Section */}
      <div className="bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Eligibility */}
            <div>
               <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-8 flex items-center">
                 <GraduationCap className="mr-3 h-7 w-7 text-primary"/> Eligibility Criteria
               </h3>
               <ul className="space-y-4">
                 <li className="flex items-center text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                   <span className="font-semibold w-full">Minimum qualification: 10th / Intermediate / Any Degree.</span>
                 </li>
                 <li className="flex items-center text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                   <span className="font-semibold w-full">Freshers and experienced candidates can apply.</span>
                 </li>
                 <li className="flex items-center text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-200/60">
                   <span className="font-semibold w-full">Ability to travel within the assigned area in Hyderabad.</span>
                 </li>
               </ul>
            </div>

            {/* Skills */}
            <div>
               <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-8 flex items-center">
                 <Target className="mr-3 h-7 w-7 text-primary"/> Skills Required
               </h3>
               <div className="grid sm:grid-cols-2 gap-4">
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center">
                   <Users className="h-8 w-8 text-emerald-600 mb-3" />
                   <p className="font-medium text-slate-800">Communication & Interpersonal Skills</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center">
                   <Briefcase className="h-8 w-8 text-blue-600 mb-3" />
                   <p className="font-medium text-slate-800">Customer Handling & Relationship Building</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center">
                   <Smartphone className="h-8 w-8 text-purple-600 mb-3" />
                   <p className="font-medium text-slate-800">Basic Smartphone Knowledge</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 flex flex-col items-center text-center">
                   <Target className="h-8 w-8 text-red-500 mb-3" />
                   <p className="font-medium text-slate-800">Target-Oriented Approach</p>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer Call to Action */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
             <h3 className="text-3xl font-bold text-slate-900 mb-6">Ready to Join Us?</h3>
             <p className="text-slate-600 mb-10 text-lg">Your application takes less than a minute. Apply now to secure your interview slot.</p>
             
             <Button 
                onClick={() => navigate("/register")} 
                size="lg"
                className="w-full sm:w-auto h-14 rounded-xl px-12 text-lg font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
              >
                Apply for this Role <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
        </div>
      </div>
      
    </div>
  )
}
