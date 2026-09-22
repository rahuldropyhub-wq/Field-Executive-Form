import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Briefcase, Code2, Rocket, GitBranch, CheckCircle2, ArrowRight,
  Sparkles, Award, Zap, Users, HelpCircle, MapPin, Layers,
  Terminal, ChevronRight, GraduationCap, Star, Database,
  MonitorSmartphone, Wrench, Clock, Shield,
  AlertTriangle, FileCheck, CreditCard, Building2, Banknote, IndianRupee
} from "lucide-react"

export default function CandidateLanding() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    document.title = "Full Stack Developer (Fresher) | DropyHub Careers"
    window.scrollTo(0, 0)
  }, [])

  const handleApplyClick = () => setShowModal(true)

  const responsibilities = [
    "Develop and maintain full-stack web applications across frontend and backend environments.",
    "Write clean, efficient, and well-structured code following industry best development practices.",
    "Build and scale real-world features using modern web technologies.",
    "Collaborate closely with designers, backend engineers, and product teams to bring concepts to life.",
    "Debug issues, conduct testing, and optimize web applications for speed and responsiveness.",
    "Learn and adapt rapidly to new developer tools, frameworks, and internal workflows.",
    "Contribute actively to ongoing feature enhancements and continuous product improvements.",
  ]

  const technicalSkills = [
    {
      icon: <MonitorSmartphone className="w-5 h-5" />,
      label: "Frontend",
      color: "blue",
      skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React.js or Next.js", "Tailwind CSS or Bootstrap", "Responsive Design"]
    },
    {
      icon: <Terminal className="w-5 h-5" />,
      label: "Backend (any one)",
      color: "violet",
      skills: ["Node.js with Express.js", "Python – Django or Flask", "Java – Spring Boot"]
    },
    {
      icon: <Database className="w-5 h-5" />,
      label: "Databases",
      color: "emerald",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Core SQL Knowledge"]
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      label: "Tools & Deployment",
      color: "orange",
      skills: ["Git & GitHub", "VS Code & Postman", "Vercel / Render / Netlify", "Basic CI/CD awareness"]
    },
  ]

  const colorMap = {
    blue: {
      bg: "bg-blue-50", border: "border-blue-200", icon: "bg-blue-100 text-blue-600",
      badge: "bg-blue-100 text-blue-700", header: "text-blue-700"
    },
    violet: {
      bg: "bg-violet-50", border: "border-violet-200", icon: "bg-violet-100 text-violet-600",
      badge: "bg-violet-100 text-violet-700", header: "text-violet-700"
    },
    emerald: {
      bg: "bg-emerald-50", border: "border-emerald-200", icon: "bg-emerald-100 text-emerald-600",
      badge: "bg-emerald-100 text-emerald-700", header: "text-emerald-700"
    },
    orange: {
      bg: "bg-orange-50", border: "border-orange-200", icon: "bg-orange-100 text-orange-600",
      badge: "bg-orange-100 text-orange-700", header: "text-orange-700"
    },
  }

  const requirements = [
    { text: "Good understanding of core programming fundamentals, data structures, and algorithms.", must: true },
    { text: "Genuine passion and curiosity for both frontend and backend web development.", must: true },
    { text: "Hands-on experience on personal or college web development projects.", must: true },
    { text: "Proficiency with version control basics using Git and GitHub.", must: true },
    { text: "Final year student (2024 / 2025 / 2026 batch) or recent graduate.", must: true },
    { text: "Proactive problem-solving attitude with eagerness to absorb feedback and grow.", must: true },
    { text: "Strong communication skills and ability to collaborate effectively in a team.", must: true },
  ]

  const goodToHave = [
    "Familiarity with TypeScript for type-safe JavaScript development.",
    "Conceptual understanding of authentication mechanisms — JWT, basic OAuth workflows.",
    "Exposure to designing and building custom REST APIs.",
    "Basic familiarity with cloud platforms (AWS, Vercel, Render) and CI/CD pipelines.",
    "Prior hands-on experience experimenting with additional libraries or frameworks.",
  ]

  const whyJoin = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Real-World Products",
      description: "Work directly on live production products with real users and immediate feedback — from day one.",
      color: "indigo"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Mentorship",
      description: "Learn from experienced engineering professionals through direct collaboration, pair programming and code reviews.",
      color: "violet"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Accelerated Growth",
      description: "Fast-track your developer skills and career trajectory with high-ownership, high-impact work.",
      color: "amber"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Open Culture",
      description: "An open, supportive, and learning-focused environment that values initiative, creativity, and collaboration.",
      color: "emerald"
    },
  ]

  const whyColorMap = {
    indigo: { bg: "bg-indigo-50", icon: "bg-indigo-100 text-indigo-600", title: "text-indigo-700" },
    violet: { bg: "bg-violet-50", icon: "bg-violet-100 text-violet-600", title: "text-violet-700" },
    amber:  { bg: "bg-amber-50",  icon: "bg-amber-100  text-amber-600",  title: "text-amber-700"  },
    emerald:{ bg: "bg-emerald-50",icon: "bg-emerald-100 text-emerald-600",title:"text-emerald-700"},
  }

  const hiringSteps = [
    { step: "01", title: "Submit Application", icon: <Code2 className="w-5 h-5" />, description: "Fill out the online application form with your details, skills, live project links, GitHub repositories, and your PDF resume." },
    { step: "02", title: "Profile & Code Review", icon: <GitBranch className="w-5 h-5" />, description: "Our engineering leads personally review your GitHub, portfolio projects, and technical profile to assess your skills." },
    { step: "03", title: "Technical Discussion", icon: <Terminal className="w-5 h-5" />, description: "A friendly, conversational technical round focused on your problem-solving approach, past projects, and thought process." },
    { step: "04", title: "Offer & Onboarding", icon: <Award className="w-5 h-5" />, description: "Receive your offer letter and join our engineering team to start building impactful technology from day one." },
  ]

  const faqs = [
    { q: "Can freshers or final year students apply?", a: "Yes! We prioritize practical coding ability and real project experience over years of work experience. Students graduating in 2024, 2025, and 2026 are all eligible to apply." },
    { q: "Is a GitHub profile mandatory?", a: "Yes — a GitHub profile with at least some project activity is mandatory. It helps our team directly evaluate your hands-on coding experience and development style." },
    { q: "What format should my resume be in?", a: "Please upload your resume as a PDF file (maximum size: 5 MB) on the application form." },
    { q: "How soon will I hear back after applying?", a: "Our team evaluates candidates continuously. You can typically expect a response via email or phone within 2 to 3 business days of submitting your application." },
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-600 selection:text-white">

      {/* ─── Guidelines Modal ─── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,23,42,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-red-600 to-rose-600 rounded-t-3xl px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-base leading-tight">Read Before You Apply</p>
                    <p className="text-red-200 text-xs">DropyHub Application Guidelines</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors text-lg font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">

              {/* Never Pay Banner */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold text-red-700 text-sm">DropyHub will NEVER ask you to pay money</p>
                  <p className="text-red-600 text-xs mt-1 leading-relaxed">
                    No registration fee · No application fee · No placement fee · No EMI deductions.
                    If anyone claims to be from DropyHub and asks for payment — <strong>do not pay and report it.</strong>
                  </p>
                </div>
              </div>

              {/* Guidelines List */}
              <div className="space-y-3">

                <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">100% Free Platform</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">DropyHub is completely free for students. No hidden charges of any kind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">DropyHub Payroll Onboarding</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">Selected candidates are onboarded under DropyHub payroll for full transparency. We do not collect placement fees or EMIs under any circumstance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Multiple Company Opportunities</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">Based on your profile and skills, you may be considered for openings across multiple hiring partner companies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-violet-50 border border-violet-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Assessment & Assignment Process</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">After shortlisting, you will be notified via email. You must complete the given assignment and the DropyHub payroll onboarding process.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Required Documents</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">Keep your <strong>PAN Card</strong> and <strong>Aadhaar Card</strong> ready for employment and payroll verification during onboarding.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
                    <Banknote className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Bank Account Facility (Optional)</p>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">DropyHub may provide a bank-account-opening facility as part of onboarding. This is entirely optional and subject to your consent.</p>
                  </div>
                </div>

              </div>

              {/* Proceed Button */}
              <div className="pt-2">
                <button
                  onClick={() => { setShowModal(false); navigate("/candidate/apply") }}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  I Understand — Proceed to Apply <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-slate-400 mt-3">
                  By proceeding, you confirm you have read and understood the DropyHub Application Guidelines.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/candidate")}>
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
              <img src="/dropyhub-logo.jpg" alt="DropyHub" className="h-10 w-auto object-contain" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 leading-none">DropyHub</p>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">Careers</p>
            </div>
          </div>
          <Button onClick={handleApplyClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-11 font-semibold shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 text-sm">
            Apply Now <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-[#1a1250] to-slate-900 text-white pt-14 pb-24">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <svg className="w-full h-full"><defs><pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32V0H32" fill="none" stroke="white" strokeWidth="0.6"/>
          </pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>
        </div>
        <div className="absolute -top-24 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute bottom-0 -left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"/>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Open badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-bold mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Actively Hiring — Immediate Opening
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="text-indigo-300 text-sm font-semibold mb-2 tracking-wide uppercase">Software Engineering Role</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Full Stack Developer
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-300 mt-1">
                    (Fresher)
                  </span>
                </h1>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Briefcase className="w-3.5 h-3.5" />, text: "Full-time · Fresher Role" },
                  { icon: <MapPin className="w-3.5 h-3.5" />, text: "On-site" },
                  { icon: <GraduationCap className="w-3.5 h-3.5" />, text: "Batch 2024 / 2025 / 2026" },
                  { icon: <GitBranch className="w-3.5 h-3.5" />, text: "GitHub Required" },
                ].map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-full">
                    {m.icon} {m.text}
                  </span>
                ))}
              </div>

              {/* About */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> About Dropyhub
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Kickstart your software engineering career by building scalable web applications that make a tangible impact.
                  At Dropyhub, fresh ideas drive meaningful innovation. As a Full Stack Developer (Fresher), you will join our 
                  engineering team to code, create, and grow — working on <span className="text-white font-semibold">practical, 
                  production-level products from day one.</span>
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-3">
                  If you are eager to build across both client and server layers, take ownership of real features, and learn 
                  alongside seasoned professionals — <span className="text-indigo-300 font-semibold">this role is your launchpad.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button onClick={handleApplyClick}
                  className="h-12 px-8 text-sm font-bold rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 transition-all hover:-translate-y-1">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <a href="#jd-details"
                  className="inline-flex items-center justify-center h-12 px-8 text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all">
                  View Full JD <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            {/* Right — Quick Info Card */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Position Snapshot</p>
                {[
                  { label: "Role", value: "Full Stack Developer" },
                  { label: "Type", value: "Full-time" },
                  { label: "Mode", value: "On-site" },
                  { label: "Level", value: "Fresher / Entry-level" },
                  { label: "Eligible Batches", value: "2024 · 2025 · 2026" },
                  { label: "GitHub", value: "Mandatory" },
                  { label: "Projects", value: "Academic / Personal" },
                  { label: "Response Time", value: "2–3 Business Days" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm">
                    <span className="text-slate-400 font-medium">{r.label}</span>
                    <span className="text-white font-semibold text-right">{r.value}</span>
                  </div>
                ))}
                <Button onClick={handleApplyClick}
                  className="w-full mt-4 h-11 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white text-sm">
                  Fill Application Form →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── JD Sections ─── */}
      <div id="jd-details" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">

        {/* ── What You'll Do ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">What You'll Do</h2>
              <p className="text-slate-500 text-sm mt-0.5">Day-to-day responsibilities & expectations</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {responsibilities.map((item, i) => (
              <div key={i} className="flex items-start gap-3.5 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-black text-indigo-600">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-slate-200" />

        {/* ── Technical Skills ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Technical Skills You Need</h2>
              <p className="text-slate-500 text-sm mt-0.5">Core technologies required for this role</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {technicalSkills.map((item, i) => {
              const c = colorMap[item.color]
              return (
                <div key={i} className={`${c.bg} border ${c.border} rounded-2xl p-5`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
                      {item.icon}
                    </div>
                    <h3 className={`font-bold text-base ${c.header}`}>{item.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((s, j) => (
                      <span key={j} className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${c.badge}`}>{s}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <div className="border-t border-slate-200" />

        {/* ── Requirements ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">What You Should Know & Bring</h2>
              <p className="text-slate-500 text-sm mt-0.5">Eligibility criteria & must-have qualities</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            {requirements.map((item, i) => (
              <div key={i} className={`flex items-start gap-4 px-6 py-4 ${i !== requirements.length - 1 ? "border-b border-slate-100" : ""} hover:bg-slate-50/60 transition-colors`}>
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                <span className="ml-auto shrink-0 text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">Required</span>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-slate-200" />

        {/* ── Good to Have ── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Good to Have</h2>
              <p className="text-slate-500 text-sm mt-0.5">Bonus skills — not mandatory, but will make you stand out</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goodToHave.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200/80 rounded-2xl p-4">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="w-3 h-3 text-amber-500" />
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Why Join Section ─── */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Why DropyHub?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight">Why Join Dropyhub?</h2>
            <p className="text-slate-400 mt-2 text-base max-w-xl mx-auto">
              This isn't just a job — it's where your engineering career takes off.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoin.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-indigo-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust & Security Banner ─── */}
      <section className="py-12 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-emerald-900/5 border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                  <Shield className="w-4 h-4" /> Official Dropyhub Guarantee
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                  100% Free & Secure Jobs
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                  We believe talent shouldn't pay to work. Once you pass the technical rounds and secure the job, you will be officially onboarded onto the <span className="font-bold text-slate-900">Dropyhub Payroll</span>.
                </p>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl font-black text-emerald-600">₹0</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Zero Hidden Charges</p>
                    <p className="text-xs text-slate-500">We never ask for placement fees.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Direct Dropyhub Payroll</p>
                    <p className="text-xs text-slate-500">Official employee status & benefits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Application Guidelines ─── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" /> Important — Read Before Applying
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              DropyHub Student Job Application Guidelines
            </h2>
            <p className="text-slate-500 mt-3 text-base max-w-2xl mx-auto">
              Please read these guidelines carefully before submitting your application.
            </p>
          </div>

          {/* ⚠️ Never Pay Warning Banner */}
          <div className="mb-10 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-red-600/25 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full"><defs><pattern id="warn-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 30L30 0H15L0 15M30 30V15L15 30" stroke="white" strokeWidth="0.6" fill="none"/>
              </pattern></defs><rect width="100%" height="100%" fill="url(#warn-grid)"/></svg>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg sm:text-xl font-extrabold tracking-tight mb-1">DropyHub will NEVER ask you to pay money</p>
                <p className="text-red-100 text-sm leading-relaxed">
                  We do not charge any <strong className="text-white">registration fee, application fee, placement fee, or EMI</strong> from candidates — ever. Your talent and skills should be evaluated, not your ability to pay.
                </p>
              </div>
              <div className="shrink-0 bg-white/20 border border-white/30 rounded-2xl px-6 py-3 text-center">
                <p className="text-2xl font-black">₹0</p>
                <p className="text-xs font-bold text-red-100 uppercase tracking-wider">Always Free</p>
              </div>
            </div>
          </div>

          {/* Guidelines Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* 1 - 100% Free */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Guideline 1</p>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">100% Free Platform</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  DropyHub is completely free for students and job seekers. No registration fee, no application fee, no placement fee, no hidden charges — whatsoever.
                </p>
              </div>
            </div>

            {/* 2 - DropyHub Payroll */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Guideline 2</p>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Why DropyHub Payroll?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Candidates are onboarded under the <strong>DropyHub payroll</strong> for full transparency. We do not collect placement fees or EMIs. If placed through any other arrangement with salary deductions, DropyHub is not responsible.
                </p>
              </div>
            </div>

            {/* 3 - Multiple Companies */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Guideline 3</p>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Multiple Company Opportunities</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  DropyHub works with multiple hiring partners. Based on your profile, skills, and eligibility, your profile may be considered for suitable openings across different companies.
                </p>
              </div>
            </div>

            {/* 4 - Application Process */}
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-1">Guideline 4</p>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Application & Assessment Process</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Once shortlisted, next steps are communicated via your registered email. You may receive an assignment to complete. Candidates must finish both the <strong>assessment process</strong> and the DropyHub <strong>payroll onboarding</strong>.
                </p>
              </div>
            </div>

            {/* 5 - Documents */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Guideline 5</p>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Required Documents</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Keep your <strong>PAN Card</strong> and <strong>Aadhaar Card</strong> details ready for the employment and payroll verification process during onboarding.
                </p>
              </div>
            </div>

            {/* 6 - Bank Account */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-200 flex items-center justify-center">
                <Banknote className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Guideline 6</p>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">Bank Account Facility</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  DropyHub may provide a <strong>bank-account-opening facility</strong> as part of onboarding. This is completely <strong>optional</strong> and subject to the candidate's consent.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Assurance Strip */}
          <div className="mt-10 bg-slate-900 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center gap-4 text-white">
            <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
            <p className="text-sm text-slate-300 leading-relaxed text-center sm:text-left">
              <strong className="text-white">Official DropyHub Commitment:</strong> We will never ask candidates to pay money in exchange for a job opportunity. If anyone claiming to be from DropyHub asks you for payment, please do not pay and report it immediately.
            </p>
            <div className="shrink-0">
              <span className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap">✓ 100% Verified</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Hiring Process ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              Hiring Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Simple 4-Step Process
            </h2>
            <p className="text-slate-500 mt-2 text-base">Transparent, fast, and candidate-friendly.</p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 z-0" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {hiringSteps.map((s, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center mb-5 shadow-lg shadow-indigo-600/30">
                    {s.icon}
                    <span className="text-[10px] font-black tracking-widest mt-1 opacity-70">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button onClick={handleApplyClick}
              className="h-13 px-9 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1">
              Start Step 01 — Submit Application <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              Have Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-start gap-4 p-6">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full"><defs><pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="0.6" fill="none"/>
          </pattern></defs><rect width="100%" height="100%" fill="url(#cta-grid)"/></svg>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Immediate Hiring — Don't Miss Out
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Launch Your Engineering Career?
          </h2>
          <p className="text-indigo-100 text-base max-w-xl mx-auto leading-relaxed">
            Applications are reviewed immediately. Showcase your GitHub, your projects, and your skills — and take the next big step.
          </p>
          <Button onClick={handleApplyClick}
            className="h-14 px-10 text-base font-bold rounded-xl bg-white text-indigo-700 hover:bg-slate-100 shadow-2xl transition-all hover:-translate-y-1">
            Apply for Full Stack Developer (Fresher) <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-indigo-200 text-xs">Takes only 3 minutes · Instant submission confirmation</p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/dropyhub-logo.jpg" alt="DropyHub" className="h-8 w-auto object-contain brightness-0 invert opacity-70" />
            <span className="text-sm font-semibold text-white">DropyHub Careers</span>
          </div>
          <p className="text-xs text-slate-500 text-center">
            &copy; 2026 DropyHub. All rights reserved. &nbsp;·&nbsp; Full Stack Developer – Fresher Hiring Portal.
          </p>
        </div>
      </footer>
    </div>
  )
}
