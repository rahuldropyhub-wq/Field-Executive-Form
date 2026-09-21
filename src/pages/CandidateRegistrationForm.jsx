import React, { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Link2, 
  Code2, 
  Globe, 
  GitBranch, 
  FileText, 
  UploadCloud, 
  X, 
  Plus, 
  Trash2, 
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { submitDropyCandidateApplication } from "@/lib/api"
import { cn } from "@/lib/utils"

const SUGGESTED_SKILLS = [
  "React", "Node.js", "JavaScript", "Python", "Django", "Flask", "FastAPI",
  "TypeScript", "Tailwind CSS", "SQL", "PostgreSQL", "MongoDB", "Express", "Git"
]

const formSchema = z.object({
  full_name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." }),
  mobile_number: z.string().regex(/^[6-9]\d{9}$/, { message: "Invalid 10-digit Indian mobile number." }),
  linkedin_url: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid URL (starting with http:// or https://)",
    })
    .optional()
    .or(z.literal("")),
})

export default function CandidateRegistrationForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Skills state
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState("")
  const [skillsError, setSkillsError] = useState("")

  // Dynamic project & repo fields
  const [projects, setProjects] = useState([""])
  const [githubRepos, setGithubRepos] = useState([""])

  // Resume state
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeBase64, setResumeBase64] = useState(null)
  const [resumeError, setResumeError] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    document.title = "Candidate Application | Dropy Hub"
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      mobile_number: "",
      linkedin_url: "",
    },
  })

  // Skills handlers
  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || skillInput).trim().replace(/,/g, "")
    if (!trimmed) return

    if (skills.includes(trimmed)) {
      setSkillInput("")
      return
    }

    setSkills([...skills, trimmed])
    setSkillInput("")
    setSkillsError("")
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const handleKeyDownSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  // Dynamic projects handlers
  const handleAddProject = () => {
    setProjects([...projects, ""])
  }

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const handleProjectChange = (index, value) => {
    const updated = [...projects]
    updated[index] = value
    setProjects(updated)
  }

  // Dynamic repos handlers
  const handleAddRepo = () => {
    setGithubRepos([...githubRepos, ""])
  }

  const handleRemoveRepo = (index) => {
    setGithubRepos(githubRepos.filter((_, i) => i !== index))
  }

  const handleRepoChange = (index, value) => {
    const updated = [...githubRepos]
    updated[index] = value
    setGithubRepos(updated)
  }

  // Resume file handling
  const processFile = (file) => {
    if (!file) return

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setResumeError("Only PDF files are allowed.")
      return
    }

    if (file.size > 3 * 1024 * 1024) {
      setResumeError("File size exceeds the 3MB limit.")
      return
    }

    setResumeError("")
    setResumeFile(file)

    // Convert to base64 for reliable transmission and storage
    const reader = new FileReader()
    reader.onload = () => {
      setResumeBase64(reader.result)
    }
    reader.onerror = () => {
      setResumeError("Failed to read the file. Please try again.")
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveResume = () => {
    setResumeFile(null)
    setResumeBase64(null)
    setResumeError("")
  }

  // Form submission
  const onSubmit = async (values) => {
    let hasError = false

    if (skills.length === 0) {
      setSkillsError("Please add at least one technical or professional skill.")
      hasError = true
    }

    if (!resumeFile) {
      setResumeError("Please upload your resume in PDF format.")
      hasError = true
    }

    if (hasError) {
      toast({
        variant: "destructive",
        title: "Incomplete details",
        description: "Please provide all required skills and upload your resume.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const filteredProjects = projects.map((p) => p.trim()).filter(Boolean)
      const filteredRepos = githubRepos.map((r) => r.trim()).filter(Boolean)

      const payload = {
        full_name: values.full_name.trim(),
        email: values.email.trim().toLowerCase(),
        mobile_number: values.mobile_number.trim(),
        linkedin_url: values.linkedin_url ? values.linkedin_url.trim() : null,
        skills,
        projects: filteredProjects,
        github_repos: filteredRepos,
        resume_filename: resumeFile.name,
        resume_data: resumeBase64,
      }

      await submitDropyCandidateApplication(payload)

      toast({
        title: "Application Submitted!",
        description: "Your application has been received successfully.",
      })

      navigate("/success", {
        state: {
          role: "Candidate Application (Dropy Hub)",
          backUrl: "/candidate-register",
        },
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "Failed to submit application. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-white to-slate-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative ambient background blur shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[15%] -right-[10%] w-[55%] h-[55%] rounded-full bg-indigo-100/60 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden z-10 relative my-auto">
        {/* Header Area */}
        <div className="pt-8 pb-4 flex flex-col items-center px-6 sm:px-8 relative">
          <button 
            type="button"
            onClick={() => navigate("/candidate")}
            className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-5 flex items-center justify-center">
            <img 
              src="/dropy-logo.png" 
              alt="Dropy Hub Logo" 
              className="h-12 sm:h-14 w-auto object-contain" 
              onError={(e) => { e.currentTarget.src = "/dropyhub-logo.jpg" }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-center">Join Our Team</h1>
          <p className="mt-2 text-slate-500 text-sm text-center max-w-sm">
            We're looking for passionate individuals. Tell us about yourself and showcase your best work.
          </p>
        </div>

        <div className="px-6 sm:px-8 pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* SECTION 1: Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs">1</span>
                  <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
                </div>

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm">Full Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            placeholder="e.g. Rahul Sharma" 
                            className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Address */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm">Email Address <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            type="email" 
                            placeholder="e.g. rahul@example.com" 
                            className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mobile Number */}
                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm">Phone Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            type="tel" 
                            placeholder="e.g. 9876543210" 
                            maxLength={10}
                            className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn URL */}
                <FormField
                  control={form.control}
                  name="linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium text-sm">LinkedIn URL <span className="text-slate-400 text-xs font-normal">(Optional)</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Link2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                          <Input 
                            type="url"
                            placeholder="https://linkedin.com/in/username" 
                            className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* SECTION 2: Technical & Professional Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs">2</span>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-slate-900">Technical & Professional Skills <span className="text-red-500">*</span></h2>
                    <p className="text-xs text-slate-500">Add key technologies or competencies you work with.</p>
                  </div>
                </div>

                {/* Input row */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Code2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleKeyDownSkill}
                      placeholder="Type a skill and press Enter..."
                      className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleAddSkill()}
                    variant="outline"
                    className="h-12 px-4 rounded-xl font-medium border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add
                  </Button>
                </div>

                {/* Added Skill Chips */}
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-semibold animate-in fade-in zoom-in-95 duration-150"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500 transition-colors focus:outline-none"
                          title="Remove skill"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {skillsError && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {skillsError}
                  </div>
                )}

                {/* Suggestions */}
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-2">Suggested skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_SKILLS.map((suggested) => {
                      const isAdded = skills.includes(suggested)
                      return (
                        <button
                          key={suggested}
                          type="button"
                          disabled={isAdded}
                          onClick={() => handleAddSkill(suggested)}
                          className={cn(
                            "text-xs px-2.5 py-1 rounded-md transition-all font-medium",
                            isAdded
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : "bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 border border-transparent"
                          )}
                        >
                          + {suggested}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Portfolio & Projects */}
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs">3</span>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-slate-900">Portfolio & Projects</h2>
                    <p className="text-xs text-slate-500">Share links to your live websites and code repositories.</p>
                  </div>
                </div>

                {/* Live Projects */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-500" /> Live Projects
                    </label>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                    >
                      + Add Project
                    </button>
                  </div>

                  <div className="space-y-2">
                    {projects.map((proj, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          type="url"
                          placeholder="https://your-project.com"
                          value={proj}
                          onChange={(e) => handleProjectChange(idx, e.target.value)}
                          className="h-11 rounded-xl border-slate-200 text-sm focus-visible:ring-indigo-500"
                        />
                        {projects.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveProject(idx)}
                            className="h-11 w-11 shrink-0 rounded-xl border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* GitHub Repos */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-slate-700" /> GitHub Repositories
                    </label>
                    <button
                      type="button"
                      onClick={handleAddRepo}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                    >
                      + Add Repo
                    </button>
                  </div>

                  <div className="space-y-2">
                    {githubRepos.map((repo, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          type="url"
                          placeholder="https://github.com/username/repository"
                          value={repo}
                          onChange={(e) => handleRepoChange(idx, e.target.value)}
                          className="h-11 rounded-xl border-slate-200 text-sm focus-visible:ring-indigo-500"
                        />
                        {githubRepos.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveRepo(idx)}
                            className="h-11 w-11 shrink-0 rounded-xl border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 4: Resume / CV Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs">4</span>
                  <div className="flex-1">
                    <h2 className="text-base font-bold text-slate-900">Resume / CV <span className="text-red-500">*</span></h2>
                    <p className="text-xs text-slate-500">Upload your latest resume in PDF format (Max 3MB).</p>
                  </div>
                </div>

                {!resumeFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("resume-input").click()}
                    className={cn(
                      "p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer flex flex-col items-center justify-center",
                      isDragging
                        ? "border-indigo-500 bg-indigo-50/70"
                        : "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 bg-slate-50/40"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center mb-3 shadow-sm">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PDF files only (maximum size: 3MB)
                    </p>
                    <input
                      id="resume-input"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{resumeFile.name}</p>
                        <p className="text-xs text-slate-500">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • PDF
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveResume}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {resumeError && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {resumeError}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 gap-2" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-slate-400 z-10">
        &copy; 2026 Dropy Hub. All rights reserved.
      </div>
    </div>
  )
}
