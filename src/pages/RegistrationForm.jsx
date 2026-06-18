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
  Clock,
  MapPinOff,
  Navigation,
  Users,
  FileText,
  AlertCircle,
  Briefcase
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { submitApplication } from "@/lib/api"
import { cn } from "@/lib/utils"
import { statesAndDistricts } from "@/lib/statesAndDistricts"

const qualifications = [
  "SSC", "Intermediate", "Diploma", "Degree", "B.Tech", "M.Tech", "MBA", "MCA", "BCA", "ITI", "Other"
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
  previous_experience: z.string().min(1, { message: "Please select your experience." }),
  date_of_birth: z.date({ required_error: "A date of birth is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  district: z.string().min(1, { message: "Please select a district." }),
})

export default function RegistrationForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [coords, setCoords] = useState(null)
  const [locationAddress, setLocationAddress] = useState(null)

  // Document checkboxes state
  const [documents, setDocuments] = useState({
    driving_licence: false,
    aadhar: false,
    pan: false,
  })
  const [documentsError, setDocumentsError] = useState("")

  // Age eligibility state
  const [ageError, setAgeError] = useState("")

  // Location mandatory error
  const [locationRequired, setLocationRequired] = useState("")

  useEffect(() => {
    document.title = "PhonePe Field Executive Registration"
    const favicon = document.querySelector("link[rel='icon']")
    if (favicon) {
      favicon.href = "/favicon.svg"
    }
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      mobile_number: "",
      gender: "",
      qualification: "",
      previous_experience: "",
      state: "",
      district: "",
    },
  })

  // Watch state to update district options
  const selectedState = form.watch("state")
  const districtOptions = selectedState ? statesAndDistricts[selectedState] || [] : []

  const getLocation = () => {
    setIsLocating(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      setIsLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ latitude: lat, longitude: lng });
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();
          if (data && data.address) {
            const { city, state_district, state, town, village, county } = data.address;
            const locality = city || town || village || county || "Unknown City";
            const dist = state_district || "";
            const st = state || "";
            
            const addressParts = [locality, dist, st].filter(Boolean);
            setLocationAddress(addressParts.join(", "));
          } else {
            setLocationAddress("Location found (Address unknown)");
          }
        } catch (err) {
          setLocationAddress("Location found (Address unknown)");
        }
        
        setIsLocating(false)
      },
      (error) => {
        setLocationError("Unable to retrieve your location")
        setIsLocating(false)
      }
    )
  }

  const handleDocumentChange = (doc) => {
    setDocuments((prev) => ({ ...prev, [doc]: !prev[doc] }))
    setDocumentsError("")
  }

  async function onSubmit(values) {
    // Validate age (18-30)
    const age = calculateAge(values.date_of_birth)
    if (age === null || age < 18) {
      setAgeError("You must be at least 18 years old to apply.")
      return
    }
    if (age > 30) {
      setAgeError("Sorry, applicants above 30 years of age are not eligible.")
      return
    }
    setAgeError("")

    // Validate location
    if (!coords) {
      setLocationRequired("Please capture your current location before submitting.")
      return
    }
    setLocationRequired("")

    // Validate documents
    const allDocsChecked = documents.driving_licence && documents.aadhar && documents.pan
    if (!allDocsChecked) {
      setDocumentsError("Please confirm you have all 3 required documents.")
      return
    }
    setDocumentsError("")

    try {
      setIsSubmitting(true)
      await submitApplication({
        full_name: values.full_name,
        email: values.email,
        mobile_number: values.mobile_number,
        gender: values.gender,
        qualification: values.qualification,
        previous_experience: values.previous_experience,
        date_of_birth: values.date_of_birth.toISOString().split("T")[0],
        state: values.state,
        district: values.district,
        documents_verified: true,
        latitude: coords?.latitude || null,
        longitude: coords?.longitude || null,
        location_address: locationAddress || null,
      })
      
      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      })
      navigate("/success")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-100/50 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50 overflow-hidden z-10 relative">
        <div className="pt-8 pb-4 flex flex-col items-center px-8 relative">
          <button 
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center justify-center">
            <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">Join PhonePe</h2>
          <p className="mt-2 text-slate-500 text-sm text-center">Register for the Field Executive role and become part of our growing team.</p>
        </div>
        
        <div className="px-8 pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Full Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-slate-400" />
                        </div>
                        <Input placeholder="John Doe" {...field} className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Email Address <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <Input placeholder="john@example.com" type="email" {...field} className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Field */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Gender <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <Users className="h-4 w-4 text-slate-400" />
                          </div>
                          <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Male" className="rounded-lg">Male</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Contact Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-slate-400" />
                        </div>
                        <Input 
                          placeholder="9876543210" 
                          type="tel" 
                          {...field}
                          maxLength={10}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            field.onChange(value);
                          }}
                          className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl" 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Qualification <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <GraduationCap className="h-4 w-4 text-slate-400" />
                          </div>
                          <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl">
                            <SelectValue placeholder="Select qualification" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        {qualifications.map(q => (
                          <SelectItem key={q} value={q} className="rounded-lg">{q}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Previous Experience Field */}
              <FormField
                control={form.control}
                name="previous_experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Previous Experience <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <Briefcase className="h-4 w-4 text-slate-400" />
                          </div>
                          <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="0 Years (Fresher)" className="rounded-lg">0 Years (Fresher)</SelectItem>
                        <SelectItem value="1 Year" className="rounded-lg">1 Year</SelectItem>
                        <SelectItem value="2 Years" className="rounded-lg">2 Years</SelectItem>
                        <SelectItem value="3 Years" className="rounded-lg">3 Years</SelectItem>
                        <SelectItem value="4 Years" className="rounded-lg">4 Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Date of Birth <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <Input 
                          type="date" 
                          max={new Date().toISOString().split("T")[0]}
                          {...field}
                          value={field.value ? (field.value instanceof Date ? field.value.toISOString().split("T")[0] : field.value) : ""}
                          onChange={(e) => {
                            setAgeError("")
                            if (e.target.value) {
                                const dob = new Date(e.target.value)
                                field.onChange(dob)
                                const age = calculateAge(dob)
                                if (age !== null && age < 18) {
                                  setAgeError("You must be at least 18 years old to apply.")
                                } else if (age !== null && age > 30) {
                                  setAgeError("Sorry, applicants above 30 years of age are not eligible.")
                                }
                            } else {
                                field.onChange(undefined);
                            }
                          }}
                          className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl font-medium text-slate-700" 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    {ageError && (
                      <div className="flex items-center gap-1.5 mt-1 text-red-500 text-xs font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {ageError}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Work State <span className="text-red-500">*</span></FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("district", ""); // Reset district when state changes
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                              <MapPin className="h-4 w-4 text-slate-400" />
                            </div>
                            <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          {statesList.map(s => (
                            <SelectItem key={s} value={s} className="rounded-lg">{s}</SelectItem>
                          ))}
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
                      <FormLabel className="text-slate-700 font-medium">Work District <span className="text-red-500">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                              <MapPin className="h-4 w-4 text-slate-400" />
                            </div>
                            <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl disabled:bg-slate-50 disabled:opacity-100">
                              <SelectValue placeholder={selectedState ? "Select district" : "Select state first"} />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent className="rounded-xl max-h-[250px]">
                          {districtOptions.map(d => (
                            <SelectItem key={d} value={d} className="rounded-lg">{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>



              {/* Required Documents Section */}
              <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-slate-700 font-semibold">Required Documents <span className="text-red-500">*</span></span>
                </div>
                <p className="text-xs text-slate-500 -mt-1">Confirm you have the following documents ready for verification.</p>
                <div className="space-y-2 mt-2">
                  {[
                    { key: "driving_licence", label: "Driving Licence *" },
                    { key: "aadhar", label: "Aadhar Card *" },
                    { key: "pan", label: "PAN Card *" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                        documents[key]
                          ? "bg-purple-50 border-purple-300 text-purple-800"
                          : "bg-white border-slate-200 text-slate-700 hover:border-purple-200"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={documents[key]}
                        onChange={() => handleDocumentChange(key)}
                        className="w-4 h-4 accent-purple-600 cursor-pointer"
                      />
                      <span className="text-sm font-medium">{label}</span>
                      {documents[key] && (
                        <span className="ml-auto text-xs text-purple-600 font-semibold">✓ Confirmed</span>
                      )}
                    </label>
                  ))}
                </div>
                {documentsError && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {documentsError}
                  </div>
                )}
              </div>

              <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm text-slate-700 font-medium">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-slate-500">Capture your exact GPS location (required)</p>
                  </div>
                  <Button 
                    type="button" 
                    variant={coords ? "default" : "outline"}
                    size="sm"
                    className={cn("rounded-lg", coords && "bg-emerald-600 hover:bg-emerald-700")}
                    onClick={() => { setLocationRequired(""); getLocation() }}
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : coords ? (
                      <><MapPin className="h-4 w-4 mr-2" /> Location Captured</>
                    ) : (
                      <><Navigation className="h-4 w-4 mr-2" /> Get Location</>
                    )}
                  </Button>
                </div>
                {locationError && (
                  <p className="text-xs font-medium text-destructive flex items-center">
                    <MapPinOff className="h-3 w-3 mr-1" />
                    {locationError}
                  </p>
                )}
                {coords && (
                  <div className="text-xs font-medium text-emerald-600 flex flex-col gap-1">
                    <div className="flex items-center">
                      Lat: {coords.latitude.toFixed(4)}, Lng: {coords.longitude.toFixed(4)}
                    </div>
                    {locationAddress && (
                      <div className="text-slate-600 font-normal">
                        {locationAddress}
                      </div>
                    )}
                  </div>
                )}
                {locationRequired && (
                  <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium mt-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {locationRequired}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0" 
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
