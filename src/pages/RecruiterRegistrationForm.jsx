import React, { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { 
  CalendarIcon, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  MapPin, 
  AlertCircle,
  Briefcase,
  Laptop
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { submitRecruiterApplication } from "@/lib/api"
import { cn } from "@/lib/utils"
import { statesAndDistricts } from "@/lib/statesAndDistricts"

const qualifications = [
  "B.Tech", "Degree", "B.Com", "MBA", "Other"
]

const statesList = Object.keys(statesAndDistricts)

// Age calculation helper
const calculateAge = (dob) => {
  if (!dob) return null
  const today = new Date()
  const birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const formSchema = z.object({
  full_name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine((val) => val.toLowerCase().endsWith("@gmail.com"), {
      message: "Only Gmail addresses are accepted (e.g. name@gmail.com).",
    }),
  mobile_number: z.string().regex(/^[6-9]\d{9}$/, { message: "Invalid Indian mobile number." }),
  gender: z.string().min(1, { message: "Please select your gender." }),
  qualification: z.string().min(1, { message: "Please select a qualification." }),
  date_of_birth: z.date({ required_error: "A date of birth is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  district: z.string().min(1, { message: "Please select a district." }),
})

export default function RecruiterRegistrationForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Document checkboxes state
  const [documents, setDocuments] = useState({
    laptop: false,
    aadhar: false,
    pan: false,
  })
  const [documentsError, setDocumentsError] = useState("")

  // Age eligibility state
  const [ageError, setAgeError] = useState("")

  useEffect(() => {
    document.title = "Dropyhub Recruiter Registration"
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      mobile_number: "",
      gender: "Female",
      qualification: "",
      state: "",
      district: "",
    },
  })

  // Watch state to update districts
  const selectedState = form.watch("state")
  const districtsList = selectedState ? statesAndDistricts[selectedState] || [] : []

  // Check age whenever DOB changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'date_of_birth' && value.date_of_birth) {
        const age = calculateAge(value.date_of_birth);
        if (age < 18 || age > 28) {
          setAgeError(`You are ${age} years old. This role requires candidates between 18 and 28 years.`);
        } else {
          setAgeError("");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleDocumentChange = (doc) => {
    setDocuments(prev => ({
      ...prev,
      [doc]: !prev[doc]
    }))
    setDocumentsError("")
  }

  async function onSubmit(values) {
    // Manual Validations before submit
    
    // 1. Validate Gender
    if (values.gender !== "Female") {
        toast({
            title: "Eligibility Criteria Not Met",
            description: "This role is only open to Female candidates.",
            variant: "destructive",
        })
        return;
    }

    // 2. Validate Age
    const age = calculateAge(values.date_of_birth);
    if (age < 18 || age > 28) {
      setAgeError(`You are ${age} years old. This role requires candidates between 18 and 28 years.`);
      toast({
        title: "Age Eligibility Failed",
        description: "You must be between 18 and 28 years old to apply.",
        variant: "destructive",
      })
      return;
    }

    // 3. Validate Documents & Laptop
    if (!documents.laptop || !documents.aadhar || !documents.pan) {
      setDocumentsError("You must have a Laptop, Aadhaar Card, and PAN Card to proceed.")
      return;
    }

    setIsSubmitting(true)
    try {
      const apiData = {
        ...values,
        date_of_birth: format(values.date_of_birth, "yyyy-MM-dd"),
        laptop_mandatory: documents.laptop,
        documents_verified: (documents.aadhar && documents.pan)
      }

      await submitRecruiterApplication(apiData);

      toast({
        title: "Application Submitted Successfully! 🎉",
        description: "We have received your details. We will contact you soon.",
        variant: "default",
      })
      navigate("/success")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#131b2f] p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-slate-800">
          
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="/dropyhub-logo.jpg" alt="Dropyhub Logo" className="h-16 object-contain rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.2)]" />
            </div>
            <div className="inline-flex items-center justify-center bg-pink-500/10 text-pink-400 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-pink-500/20">
              <Briefcase className="w-4 h-4 mr-2" />
              Recruiter Hiring (Work From Office)
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Application Form</h1>
            <p className="text-slate-400">Fill out your details to apply for the Recruiter position.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold flex items-center"><User className="w-4 h-4 mr-1 text-cyan-400" /> Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" className="bg-[#0a0f1c] border-slate-700 text-white h-11 placeholder:text-slate-500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold flex items-center"><Phone className="w-4 h-4 mr-1 text-cyan-400" /> Mobile Number</FormLabel>
                      <FormControl>
                        <Input type="tel" maxLength={10} placeholder="10-digit mobile number" className="bg-[#0a0f1c] border-slate-700 text-white h-11 placeholder:text-slate-500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300 font-semibold flex items-center"><Mail className="w-4 h-4 mr-1 text-cyan-400" /> Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@gmail.com" type="email" className="bg-[#0a0f1c] border-slate-700 text-white h-11 placeholder:text-slate-500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold">Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0a0f1c] border-slate-700 text-white h-11">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold flex items-center"><GraduationCap className="w-4 h-4 mr-1 text-cyan-400" /> Qualification</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0a0f1c] border-slate-700 text-white h-11">
                            <SelectValue placeholder="Select qualification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {qualifications.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-300 font-semibold">Date of birth (18 to 28 Years Only)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-11 bg-[#0a0f1c] border-slate-700 text-white justify-start text-left font-normal hover:bg-slate-800 hover:text-white",
                              !field.value && "text-slate-500"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1950-01-01")
                          }
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1980}
                          toYear={2015}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    {ageError && (
                      <p className="text-[0.8rem] font-medium text-destructive mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {ageError}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold flex items-center"><MapPin className="w-4 h-4 mr-1 text-cyan-400" /> State</FormLabel>
                      <Select onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("district", ""); 
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0a0f1c] border-slate-700 text-white h-11">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statesList.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 font-semibold">District</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0a0f1c] border-slate-700 text-white h-11">
                            <SelectValue placeholder={selectedState ? "Select district" : "Select state first"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districtsList.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Laptop and Documents Section */}
              <div className="pt-4 pb-2">
                <div className="bg-[#0a0f1c] border border-cyan-500/20 rounded-xl p-5 mb-4">
                  <label className="text-white font-bold mb-4 block flex items-center text-base">
                     Mandatory Requirements
                  </label>
                  <p className="text-sm text-slate-400 mb-4 font-medium leading-relaxed">
                    Please confirm that you have the following requirements. This is mandatory for the Recruiter role.
                  </p>
                  
                  <div className="space-y-4">
                    <label className={cn(
                      "flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer",
                      documents.laptop ? "bg-[#131b2f] border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]" : "bg-[#131b2f]/50 border-slate-700 hover:border-cyan-500/50"
                    )}>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-600 bg-[#0a0f1c] text-cyan-500 focus:ring-cyan-500" 
                        checked={documents.laptop}
                        onChange={() => handleDocumentChange('laptop')}
                      />
                      <span className="font-semibold text-slate-200 flex items-center">
                        <Laptop className="w-4 h-4 mr-2 text-cyan-400" />
                        I have a Laptop
                      </span>
                    </label>

                    <label className={cn(
                      "flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer",
                      documents.aadhar ? "bg-[#131b2f] border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]" : "bg-[#131b2f]/50 border-slate-700 hover:border-cyan-500/50"
                    )}>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-600 bg-[#0a0f1c] text-cyan-500 focus:ring-cyan-500" 
                        checked={documents.aadhar}
                        onChange={() => handleDocumentChange('aadhar')}
                      />
                      <span className="font-semibold text-slate-200">Aadhaar Card</span>
                    </label>

                    <label className={cn(
                      "flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer",
                      documents.pan ? "bg-[#131b2f] border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]" : "bg-[#131b2f]/50 border-slate-700 hover:border-cyan-500/50"
                    )}>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-600 bg-[#0a0f1c] text-cyan-500 focus:ring-cyan-500" 
                        checked={documents.pan}
                        onChange={() => handleDocumentChange('pan')}
                      />
                      <span className="font-semibold text-slate-200">PAN Card</span>
                    </label>
                  </div>
                  {documentsError && <p className="text-sm font-medium text-destructive mt-3 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> {documentsError}</p>}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-bold rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-colors shadow-[0_0_20px_rgba(219,39,119,0.3)] border-0 text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
