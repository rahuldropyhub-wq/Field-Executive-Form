import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, IndianRupee, Calendar, ArrowRight, CheckCircle2, ChevronRight, GraduationCap, Smartphone, Target, Users, FileText, Gift, Activity, Compass, UserCheck } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()

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
                Start Your Career as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white">Field Executive</span>
              </h1>
              
              <div className="space-y-4 mb-8">
                <p className="text-lg text-primary-foreground/90 leading-relaxed font-light">
                  We are looking for energetic and motivated Field Executives to help <span className="font-semibold text-white">expand our user base</span> and <span className="font-semibold text-white">increase brand awareness</span>. The primary responsibility of this role is to <span className="font-semibold text-white">approach individuals in public places</span>, explain the benefits of our platform, assist them in <span className="font-semibold text-white">downloading and installing the mobile application</span>, and help them <span className="font-semibold text-white">complete the registration process</span>.
                </p>
                <p className="text-lg text-primary-foreground/90 leading-relaxed font-light">
                  During the initial growth phase, the focus will be on <span className="font-semibold text-white">user acquisition and registrations</span>. As the platform grows, the role will also involve conducting <span className="font-semibold text-white">brand awareness activities</span> and supporting <span className="font-semibold text-white">customer engagement initiatives</span>.
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
                      <h3 className="font-bold text-slate-900 text-lg">Field Executive</h3>
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
                    <span className="text-slate-500 flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Freshers</span>
                    <span className="font-semibold text-emerald-600">17K - 20K / month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Experienced</span>
                    <span className="font-semibold text-emerald-600">20K - 25K / month</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center"><Calendar className="h-4 w-4 mr-2" /> Working Days</span>
                    <span className="font-semibold text-slate-900">6 Days / Week</span>
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
                    <span className="text-sm font-bold text-purple-700">18 – 29 Years</span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-primary">Ideal Candidate:</span> A self-motivated and energetic individual who enjoys meeting new people, explaining products and services, helping users adopt digital platforms, and contributing to the company's growth through user acquisition and brand awareness activities.
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
            <Target className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Key Responsibilities</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* User Acquisition */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-primary/20 transition-colors">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Users className="h-5 w-5 mr-3 text-emerald-500" />
                User Acquisition
              </h3>
              <ul className="space-y-4">
                {[
                  "Identify and approach potential users in assigned locations.",
                  "Explain the company's services, products, and benefits.",
                  "Assist users in downloading and installing the mobile application.",
                  "Help users complete account registration and profile setup.",
                  "Educate users on how to use the application and its features.",
                  "Encourage active usage of the platform."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand Awareness */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-primary/20 transition-colors">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Activity className="h-5 w-5 mr-3 text-purple-500" />
                Brand Awareness Activities
              </h3>
              <ul className="space-y-4">
                {[
                  "Promote the company's brand and services in the assigned territory.",
                  "Participate in marketing campaigns and awareness programs.",
                  "Distribute promotional materials when required.",
                  "Create awareness about the company among the public.",
                  "Collect customer feedback and market insights."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Field Operations */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:border-primary/20 transition-colors">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Compass className="h-5 w-5 mr-3 text-blue-500" />
                Field Operations
              </h3>
              <ul className="space-y-4">
                {[
                  "Conduct daily field visits according to assigned plans.",
                  "Maintain records of registrations, installations, and user interactions.",
                  "Submit daily, weekly, and monthly activity reports.",
                  "Mark attendance and activity updates through company-approved systems.",
                  "Achieve assigned targets within specified timelines."
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Age:</b> 18 - 29 Years only. (Above 29 not eligible)</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Gender:</b> Only Male candidates are eligible.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700"><b>Minimum Qualification:</b> 10th Pass.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700">Must be able to read and understand basic English and/or the local language.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700">Must know how to use a smartphone and mobile applications.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700">Freshers and experienced candidates are welcome to apply.</span></li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0 mt-0.5" /><span className="text-slate-700">Field sales, marketing, or customer acquisition experience is an added advantage.</span></li>
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
                  "Bank Account Details", 
                  "Passport Size Photograph", 
                  "Any additional documents required by the company"
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
                  "Fixed Monthly Salary",
                  "Attractive Performance-Based Incentives",
                  "Career Growth Opportunities",
                  "Training and Development Support",
                  "Recognition and Performance Rewards"
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

        {/* KPIs & Working Conditions */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-purple-400" />
              Key Performance Indicators (KPIs)
            </h3>
            <ul className="space-y-4">
              {[
                "Number of app installations completed.",
                "Number of successful user registrations.",
                "User activation rate.",
                "Daily and monthly target achievement.",
                "Brand awareness activities conducted.",
                "Quality and accuracy of registrations."
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
                "Field-based role involving outdoor activities.",
                "Regular travel within the assigned territory.",
                "Direct interaction with customers and the general public.",
                "Six working days per week."
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
