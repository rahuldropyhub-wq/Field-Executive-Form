import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Calendar, ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Smartphone, Target, Users, FileText, Gift, Activity, Compass, UserCheck } from "lucide-react"

export default function TideLandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Tide Field Executive Portal"
    const favicon = document.querySelector("link[rel='icon']")
    if (favicon) {
      favicon.href = "/tide-favicon.svg"
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#103FEF]/20">
      
      {/* Hero Section */}
      <div className="relative bg-[#103FEF] overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern-tide" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="1" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-tide)" />
          </svg>
        </div>
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-black/20 blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16 lg:mb-24">
            <div className="bg-transparent flex items-center justify-center">
              <img src="/tide-logo.png" alt="Tide Logo" className="h-20 w-auto object-contain rounded-xl shadow-md" />
            </div>
            <Button 
              className="bg-white hover:bg-slate-100 text-[#103FEF] rounded-full px-6 shadow-md font-semibold transition-all hover:scale-105"
              onClick={() => navigate("/tide-register")}
              id="tide-header-apply-btn"
            >
              Apply Now
            </Button>
          </header>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
                <MapPin className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Districts & Towns Location</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Field Executive</span> at Tide
              </h1>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-blue-50 leading-relaxed font-light">
                  We are hiring motivated Field Executives to drive growth, onboarding, and awareness. Your core responsibilities include <span className="font-semibold text-white">onboarding delivery executives</span>, guiding candidates through <span className="font-semibold text-white">Tide KYC and registrations</span>, and working in your local district/town.
                </p>
                <p className="text-lg text-blue-50 leading-relaxed font-light">
                  You will partner with local colleges for awareness programs, manage KYC verification pipelines (both online and offline), and submit daily activity logs to your reporting manager.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/tide-register")} 
                  className="h-14 px-8 text-lg font-bold rounded-xl bg-white text-[#103FEF] hover:bg-slate-100 shadow-xl shadow-black/10 transition-all hover:-translate-y-1"
                  id="tide-hero-apply-btn"
                >
                  Start Tide Application <ArrowRight className="ml-2 h-5 w-5 text-[#103FEF]" />
                </Button>
              </div>
            </div>

            {/* Right side visual: Job Card */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#103FEF] to-blue-400 rounded-3xl transform rotate-3 scale-105 opacity-30 blur-lg"></div>
              <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-8 relative z-10 border border-slate-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#103FEF]/10 p-3 rounded-2xl text-[#103FEF]">
                      <Briefcase className="h-8 w-8 text-[#103FEF]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Field Executive</h3>
                      <p className="text-slate-500 text-sm">Tide Onboarding Operations</p>
                    </div>
                  </div>
                  <div className="bg-[#103FEF]/10 text-[#103FEF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Immediate Hiring
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><MapPin className="h-4 w-4 mr-2 text-[#103FEF]" /> Location</span>
                    <span className="font-semibold text-slate-900">Your Local District / Town</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Calendar className="h-4 w-4 mr-2 text-[#103FEF]" /> Schedule</span>
                    <span className="font-semibold text-slate-900">Monday to Saturday</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Users className="h-4 w-4 mr-2 text-[#103FEF]" /> Reporting To</span>
                    <span className="font-semibold text-slate-900 font-medium text-slate-700">Team Lead / Manager</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Activity className="h-4 w-4 mr-2 text-[#103FEF]" /> Working Days</span>
                    <span className="font-semibold text-slate-900">6 Days / Week</span>
                  </div>
                </div>

                {/* Eligibility Highlights */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center">
                    <Smartphone className="h-5 w-5 text-[#103FEF] mb-1" />
                    <span className="text-xs text-slate-500 font-medium">Device</span>
                    <span className="text-sm font-bold text-slate-800">Smartphone Required</span>
                  </div>
                  <div className="flex-1 bg-[#103FEF]/5 border border-[#103FEF]/20 rounded-xl p-3 flex flex-col items-center text-center">
                    <Calendar className="h-5 w-5 text-[#103FEF] mb-1" />
                    <span className="text-xs text-[#103FEF] font-medium">Age Limit</span>
                    <span className="text-sm font-bold text-[#103FEF]">18 – 27 Years</span>
                  </div>
                </div>

                <div className="bg-[#103FEF]/5 rounded-2xl p-4 border border-[#103FEF]/10 text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#103FEF]">Work Scope:</span> Engage local delivery executives, explain the benefits of Tide, complete verification KYC online/offline, coordinate with educational institutions, and achieve growth targets.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Work Process / Key Responsibilities */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-8 w-8 text-[#103FEF]" />
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Work Process & Core Responsibilities</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Work Process */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-[#103FEF]/30 transition-colors">
              <h3 className="text-xl font-bold text-[#103FEF] mb-6 flex items-center">
                <Compass className="h-5 w-5 mr-3 text-[#103FEF]" />
                Daily Work Process
              </h3>
              <ul className="space-y-4">
                {[
                  "Visit assigned locations as per the daily plan.",
                  "Conduct field activities and customer interactions.",
                  "Onboard delivery executives and assist with registrations.",
                  "Complete Tide KYC and registration processes (online/offline).",
                  "Coordinate with colleges for partnerships and awareness programs.",
                  "Capture screenshots/photos of completed activities.",
                  "Submit daily reports to the reporting manager.",
                  "Work towards achieving weekly and monthly targets."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-[#103FEF]/30 transition-colors">
              <h3 className="text-xl font-bold text-[#103FEF] mb-6 flex items-center">
                <Activity className="h-5 w-5 mr-3 text-[#103FEF]" />
                Job Responsibilities
              </h3>
              <ul className="space-y-4">
                {[
                  "Create brand awareness through field marketing activities.",
                  "Onboard delivery executives from districts and towns.",
                  "Explain products and services to potential customers.",
                  "Work in your local locations only (districts and towns).",
                  "Build and maintain relationships with colleges and local communities.",
                  "Promote services among 18–35 age group via field and digital channels.",
                  "Represent the company professionally during all field activities.",
                  "Achieve assigned onboarding, registration, and awareness targets.",
                  "Provide regular updates on field activities and progress."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#103FEF] mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Eligibility & Requirements vs Skills */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left Column: Eligibility & Mandatory requirements */}
          <div className="space-y-12">
            {/* Eligibility Criteria */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-7 w-7 text-[#103FEF]" />
                <h2 className="text-2xl font-bold text-slate-900">Eligibility Criteria</h2>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#103FEF] mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-700"><b>Age Limit:</b> 18 to 27 years old.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#103FEF] mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-700"><b>Location:</b> Work in your local districts and towns only.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#103FEF] mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Open to both freshers and experienced professionals.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#103FEF] mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-700">Strong communication and target-oriented approach.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-7 w-7 text-[#103FEF]" />
                <h2 className="text-2xl font-bold text-slate-900">Mandatory Requirements</h2>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center">
                <Smartphone className="h-10 w-10 text-[#103FEF] mr-4 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-800">Android Smartphone</h4>
                  <p className="text-sm text-slate-500">Must own a working smartphone to install applications and run onboarding registration verification.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skills Required */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="h-7 w-7 text-[#103FEF]" />
              <h2 className="text-2xl font-bold text-slate-900">Skills Required</h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Good communication & interpersonal skills",
                  "Basic sales and marketing knowledge",
                  "Customer handling & relationship building",
                  "Ability to explain products effectively",
                  "Lead generation and networking skills",
                  "Basic smartphone & internet operations",
                  "KYC and registration process understanding",
                  "Time management & organizational skills",
                  "Problem-solving and decision-making",
                  "Target-oriented and self-motivated"
                ].map((item, i) => (
                  <div key={i} className="flex items-start bg-slate-50/50 p-3 rounded-xl border border-slate-100 hover:border-[#103FEF]/20 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#103FEF] mt-2 mr-2 shrink-0"></div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Call to Action */}
      <div className="bg-[#103FEF] border-t border-white/10 relative overflow-hidden text-white">
        <div className="absolute -top-[50%] -right-[10%] w-[50%] h-[150%] bg-white/5 rotate-12 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
             <h3 className="text-4xl font-extrabold mb-6">Ready to Onboard with Tide?</h3>
             <p className="text-slate-300 mb-10 text-xl font-light">Join us as a Field Executive. Your application takes just a minute to submit.</p>
             
             <Button 
                onClick={() => navigate("/tide-register")} 
                size="lg"
                className="w-full sm:w-auto h-14 rounded-xl px-12 text-lg font-bold bg-white text-[#103FEF] hover:bg-slate-100 shadow-xl shadow-black/20 hover:-translate-y-1 transition-all"
                id="tide-footer-apply-btn"
              >
                Apply for Tide Role <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
        </div>
      </div>
      
    </div>
  )
}
