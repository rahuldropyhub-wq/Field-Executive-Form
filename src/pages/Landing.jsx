import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, IndianRupee, Calendar, ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Smartphone, Target, Users, FileText, Gift, Activity, Compass, UserCheck } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "PhonePe Field Executive Portal"
    const favicon = document.querySelector("link[rel='icon']")
    if (favicon) {
      favicon.href = "/favicon.svg"
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20">
      
      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden">
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
                <span className="text-sm font-medium">Telangana & AP selected district</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Start Your Career as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">Local Field Executive</span>
              </h1>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-primary-foreground/90 leading-relaxed font-light">
                  We are looking for enthusiastic and dedicated <span className="font-semibold text-white">Local Field Executives</span> to join our team. The primary responsibility of this role is to <span className="font-semibold text-white">create brand awareness</span> in the local area, assist customers with registrations, and guide them through the <span className="font-semibold text-white">onboarding and KYC process</span>.
                </p>
              </div>
              
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
                      <h3 className="font-bold text-slate-900 text-lg">Local Field Executive</h3>
                      <p className="text-slate-500 text-sm">Full-Time Role</p>
                    </div>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Hiring Now
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><MapPin className="h-4 w-4 mr-2" /> Location</span>
                    <span className="font-semibold text-slate-900">Telangana and AP selected district</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Salary Range</span>
                    <span className="font-semibold text-emerald-600">₹15,000 - ₹30,000 / month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Calendar className="h-4 w-4 mr-2" /> Working Days</span>
                    <span className="font-semibold text-slate-900">Monday to Saturday</span>
                  </div>
                </div>

                {/* Eligibility Highlights */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col items-center text-center">
                    <Users className="h-5 w-5 text-blue-600 mb-1" />
                    <span className="text-xs text-blue-500 font-medium">Gender</span>
                    <span className="text-sm font-bold text-blue-700">Male Only</span>
                  </div>
                  <div className="flex-1 bg-purple-50 border border-purple-200 rounded-xl p-3 flex flex-col items-center text-center">
                    <Calendar className="h-5 w-5 text-purple-600 mb-1" />
                    <span className="text-xs text-purple-500 font-medium">Age Limit</span>
                    <span className="text-sm font-bold text-purple-700">18 – 30 Years</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-primary">Important Note:</span> This role does not require visiting shops. Customer data and leads will be provided by the company.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* About the Role Video */}
        <div className="mb-20 bg-white border border-slate-200/60 rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            
            {/* Left side: Animated Text & Arrow */}
            <div className="order-1 lg:order-1 lg:col-span-2 space-y-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide animate-pulse">
                <Activity className="h-4 w-4" />
                Job Description
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                For more about the job description, <br className="hidden lg:block" /> check this video!
              </h2>
              
              <div className="flex items-center gap-4 mt-6 text-primary">
                {/* Arrow pointing Right (towards video on desktop) */}
                <div className="hidden lg:flex items-center gap-4">
                  <span className="text-xl font-black uppercase tracking-widest">Watch Now</span>
                  <div className="bg-primary/10 p-3 rounded-full animate-bounce-x">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
                {/* Arrow pointing Down (on mobile) */}
                <div className="flex lg:hidden flex-col items-center gap-3 mt-4">
                  <span className="text-xl font-black uppercase tracking-widest">Watch Now</span>
                  <div className="bg-primary/10 p-3 rounded-full animate-bounce">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Video */}
            <div className="order-2 lg:order-2 lg:col-span-3 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 p-2 w-full mx-auto lg:mr-0">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/5">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/PuiYf2jBySA?si=BKefJlPEaIOi8oKW" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Key Responsibilities</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Brand Awareness", desc: "Create social media brand awareness in your local area." },
              { title: "Professional Explanation", desc: "Explain company services and opportunities to potential customers in a professional manner." },
              { title: "Lead Contact", desc: "Contact customers whose details are provided by the company." },
              { title: "KYC Guidance", desc: "Guide customers through the registration and KYC process over phone calls." },
              { title: "Onboarding Support", desc: "Assist customers until their onboarding process is successfully completed." },
              { title: "Professionalism", desc: "Maintain professional communication with customers at all times." },
              { title: "Guidelines", desc: "Follow company guidelines and assigned work procedures." }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-primary/20 transition-all hover:-translate-y-1">
                <div className="bg-primary/5 w-10 h-10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
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
                <GraduationCap className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">Eligibility Criteria</h2>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                <ul className="space-y-4">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Gender:</b> Male Candidates Only</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Age:</b> 18 to 30 Years only. (Above 30 not eligible)</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Smartphone:</b> Must own a Smartphone</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Communication:</b> Good Communication Skills</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Customer Interaction:</b> Ability to interact confidently with customers</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Location:</b> Willing to work in the assigned local area</span></li>
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">Requirements</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Android Smartphone (Mandatory)", 
                  "Aadhaar Card", 
                  "PAN Card", 
                  "Driving Licence",
                  "Bank Account Details", 
                  "Passport Size Photograph"
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
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
                <UserCheck className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">Required Skills</h2>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100">
                <ul className="space-y-4">
                  {[
                    "Good communication and interpersonal skills.",
                    "Ability to interact confidently with the public.",
                    "Basic sales and persuasion skills.",
                    "Positive attitude and willingness to learn.",
                    "Ability to work independently and achieve targets.",
                    "Basic smartphone and mobile application knowledge."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-4 shrink-0"></div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compensation & Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gift className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">Compensation & Benefits</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Monthly Salary: ₹15,000 - ₹30,000",
                  "Performance-based growth opportunities",
                  "Training and support provided by the company"
                ].map((item, i) => (
                  <div key={i} className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Important Notes & Working Conditions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-3 text-purple-400" />
              Important Notes
            </h3>
            <ul className="space-y-4">
              {[
                "This role does not require visiting shops.",
                "Customer data and leads will be provided by the company.",
                "The candidate's responsibility is to contact customers, guide them through KYC, and complete the onboarding process.",
                "Only serious and interested candidates should apply."
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-purple-400 mr-2 shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center text-slate-900">
              <Compass className="h-6 w-6 mr-3 text-emerald-500" />
              Working Conditions
            </h3>
            <ul className="space-y-5">
              {[
                "Full-Time Role.",
                "Working Days: Monday to Saturday.",
                "Guidance & KYC completed over phone calls.",
                "Local area operations and brand awareness creation."
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="bg-emerald-100 p-1 rounded-full mr-4 shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer Call to Action */}
      <div className="bg-primary border-t border-white/10 relative overflow-hidden">
        <div className="absolute -top-[50%] -right-[10%] w-[50%] h-[150%] bg-white/5 rotate-12 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center relative z-10">
             <h3 className="text-4xl font-extrabold text-white mb-6">Ready to Join Us?</h3>
             <p className="text-primary-foreground/80 mb-10 text-xl font-light">Your application takes less than a minute. Apply now to secure your interview slot.</p>
             
             <Button 
                onClick={() => navigate("/register")} 
                size="lg"
                className="w-full sm:w-auto h-14 rounded-xl px-12 text-lg font-bold bg-white text-primary shadow-xl shadow-black/20 hover:-translate-y-1 hover:bg-slate-50 transition-all"
              >
                Apply for this Role <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
        </div>
      </div>
      
    </div>
  )
}
