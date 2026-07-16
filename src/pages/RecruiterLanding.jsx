import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, IndianRupee, Calendar, ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Smartphone, Target, Users, FileText, Gift, Activity, Compass, UserCheck, Laptop } from "lucide-react"

export default function RecruiterLanding() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Dropyhub Recruiter Portal"
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f1c] font-sans selection:bg-pink-500/30 text-white">
      
      {/* Hero Section */}
      <div className="relative bg-[#0a0f1c] overflow-hidden">
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
            <div className="flex items-center justify-center">
              <img src="/dropyhub-logo.jpg" alt="Dropyhub Logo" className="h-12 md:h-16 object-contain rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.2)]" />
            </div>
            <Button 
              className="hidden sm:flex bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 border-0 rounded-full px-6 shadow-[0_0_15px_rgba(219,39,119,0.3)] font-semibold"
              onClick={() => navigate("/recruiter-register")}
            >
              Apply Now
            </Button>
          </header>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-pink-500/20">
                <Briefcase className="h-4 w-4 text-pink-400" />
                <span className="text-sm font-medium text-pink-100">Hiring Recruiters</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Start Your Career as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">Recruiter</span> at Dropyhub
              </h1>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  We are looking for enthusiastic and dedicated <span className="font-semibold text-white">Recruiters</span> to join our team. Handle end-to-end recruitment activities, coordinate mega drives, and support employer branding initiatives.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/recruiter-register")} 
                  className="h-14 px-8 text-lg font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1"
                >
                  Start Application <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right side visual: Job Card */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-pink-500 rounded-3xl transform rotate-3 scale-105 opacity-30 blur-xl"></div>
              <div className="bg-[#131b2f] rounded-3xl shadow-2xl p-8 relative z-10 border border-slate-700/50 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-500/20 p-3 rounded-2xl text-pink-400">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Recruiter</h3>
                      <p className="text-slate-400 text-sm">Full-Time Role</p>
                    </div>
                  </div>
                  <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
                    Hiring Now
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center"><MapPin className="h-4 w-4 mr-2" /> Mode</span>
                    <span className="font-semibold text-white">Work From Office</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center"><Laptop className="h-4 w-4 mr-2" /> Requirement</span>
                    <span className="font-semibold text-pink-400">Laptop is Mandatory</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center"><Calendar className="h-4 w-4 mr-2" /> Working Days</span>
                    <span className="font-semibold text-white">Monday to Saturday</span>
                  </div>
                </div>

                {/* Eligibility Highlights */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-pink-900/20 border border-pink-700/30 rounded-xl p-3 flex flex-col items-center text-center">
                    <Users className="h-5 w-5 text-pink-400 mb-1" />
                    <span className="text-xs text-pink-300/70 font-medium">Gender</span>
                    <span className="text-sm font-bold text-pink-300">Female Only</span>
                  </div>
                  <div className="flex-1 bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-3 flex flex-col items-center text-center">
                    <Calendar className="h-5 w-5 text-cyan-400 mb-1" />
                    <span className="text-xs text-cyan-300/70 font-medium">Age Limit</span>
                    <span className="text-sm font-bold text-cyan-300">18 – 28 Years</span>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-2xl p-4 border border-blue-700/30 text-sm text-slate-300 leading-relaxed">
                  <span className="font-bold text-cyan-400">Important Note:</span> You must have a laptop and be ready to work from the office Monday to Saturday.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Key Responsibilities */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-8 w-8 text-pink-500" />
            <h2 className="text-3xl font-bold text-white tracking-tight">Key Responsibilities</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "In-depth Research", desc: "Conduct research on Government and Private sector information, examination notifications, previous year question papers, and preparation-related content." },
              { title: "Mega Recruitment Drives", desc: "Plan and coordinate Mega Recruitment Drives effectively." },
              { title: "End-to-End Recruitment", desc: "Handle end-to-end recruitment and hiring activities." },
              { title: "Job Postings", desc: "Create and manage job postings across multiple recruitment platforms." },
              { title: "Hiring Requirements", desc: "Manage Voice Process, Non-Voice Process, IT, and Campus Hiring requirements." },
              { title: "Employer Branding", desc: "Support employer branding initiatives and drive social media awareness campaigns." }
            ].map((item, i) => (
              <div key={i} className="bg-[#131b2f] rounded-2xl p-6 border border-slate-800 shadow-[0_2px_15px_rgba(0,0,0,0.2)] hover:border-pink-500/30 transition-all hover:-translate-y-1">
                <div className="bg-pink-500/10 w-10 h-10 rounded-xl flex items-center justify-center text-pink-400 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2 Column Section: Eligibility & Requirements vs Skills & KPIs */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left Column */}
          <div className="space-y-12">
            {/* Eligibility Criteria */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-7 w-7 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Eligibility Criteria</h2>
              </div>
              <div className="bg-[#131b2f] rounded-2xl p-6 border border-slate-800">
                <ul className="space-y-4">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 shrink-0 mt-0.5" /><span className="text-slate-300"><b>Gender:</b> Female Candidates Only</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 shrink-0 mt-0.5" /><span className="text-slate-300"><b>Age:</b> 18 to 28 Years only.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 shrink-0 mt-0.5" /><span className="text-slate-300"><b>Qualification:</b> B.Tech, Degree, B.Com, MBA, or equivalent</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 shrink-0 mt-0.5" /><span className="text-slate-300"><b>Equipment:</b> Laptop is Mandatory</span></li>
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-7 w-7 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Required Documents</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Aadhaar Card", 
                  "PAN Card"
                ].map((item, i) => (
                  <div key={i} className="bg-[#131b2f] border border-slate-800 rounded-xl p-4 flex items-center shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mr-3 shrink-0" />
                    <span className="text-sm font-medium text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Required Skills */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <UserCheck className="h-7 w-7 text-pink-400" />
                <h2 className="text-2xl font-bold text-white">Required Skills</h2>
              </div>
              <div className="bg-[#131b2f] rounded-2xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.2)] border border-slate-800">
                <ul className="space-y-4">
                  {[
                    "Research Analysis & Information Gathering",
                    "Recruitment & Talent Acquisition",
                    "Job Posting Management",
                    "Campus Hiring Coordination",
                    "Employer Branding",
                    "Social Media Awareness & Marketing",
                    "Communication & Coordination Skills",
                    "Analytical Thinking",
                    "Time Management & Multitasking"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 mr-4 shrink-0"></div>
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Working Conditions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Compass className="h-7 w-7 text-pink-400" />
                <h2 className="text-2xl font-bold text-white">Working Conditions</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Mode: Work From Office",
                  "Working Days: Monday to Saturday",
                  "Fast-paced and dynamic environment"
                ].map((item, i) => (
                  <div key={i} className="bg-[#131b2f] rounded-xl p-4 border border-slate-800 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-pink-400 mr-3 shrink-0" />
                    <span className="text-sm font-medium text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Call to Action */}
      <div className="bg-gradient-to-r from-[#0a0f1c] to-[#131b2f] border-t border-slate-800 relative overflow-hidden">
        <div className="absolute -top-[50%] -right-[10%] w-[50%] h-[150%] bg-white/5 rotate-12 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
             <h3 className="text-4xl font-extrabold text-white mb-6">Ready to Join Dropyhub?</h3>
             <p className="text-slate-400 mb-10 text-xl font-light">Your application takes less than a minute. Apply now to secure your interview slot.</p>
             
             <Button 
                onClick={() => navigate("/recruiter-register")} 
                size="lg"
                className="w-full sm:w-auto h-14 rounded-xl px-12 text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:-translate-y-1 hover:from-pink-500 hover:to-purple-500 transition-all border-0"
              >
                Apply for this Role <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
        </div>
      </div>
      
    </div>
  )
}
