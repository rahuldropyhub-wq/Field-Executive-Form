import React, { useState } from "react"
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
  Navigation
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

const noticePeriods = [
  "Immediate Joiner", "7 Days", "15 Days", "30 Days", "45 Days", "60 Days", "90 Days"
]

const formSchema = z.object({
  full_name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobile_number: z.string().regex(/^[6-9]\d{9}$/, { message: "Invalid Indian mobile number." }),
  qualification: z.string().min(1, { message: "Please select a qualification." }),
  date_of_birth: z.date({ required_error: "A date of birth is required." }),
  state: z.string().min(1, { message: "Please select a state." }),
  district: z.string().min(1, { message: "Please select a district." }),
  notice_period: z.string().min(1, { message: "Please select a notice period." }),
})

export default function RegistrationForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState(null)
  const [coords, setCoords] = useState(null)
  const [locationAddress, setLocationAddress] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      mobile_number: "",
      qualification: "",
      state: "",
      district: "",
      notice_period: "",
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

  async function onSubmit(values) {
    try {
      setIsSubmitting(true)
      await submitApplication({
        full_name: values.full_name,
        email: values.email,
        mobile_number: values.mobile_number,
        qualification: values.qualification,
        date_of_birth: values.date_of_birth.toISOString().split("T")[0],
        state: values.state,
        district: values.district,
        notice_period: values.notice_period,
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
                    <FormLabel className="text-slate-700 font-medium">Full Name</FormLabel>
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
                    <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
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

              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Contact Number</FormLabel>
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
                    <FormLabel className="text-slate-700 font-medium">Qualification</FormLabel>
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

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Date of Birth</FormLabel>
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
                            if (e.target.value) {
                                field.onChange(new Date(e.target.value));
                            } else {
                                field.onChange(undefined);
                            }
                          }}
                          className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl font-medium text-slate-700" 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Work State</FormLabel>
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
                      <FormLabel className="text-slate-700 font-medium">Work District</FormLabel>
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

              <FormField
                control={form.control}
                name="notice_period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Notice Period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                            <Clock className="h-4 w-4 text-slate-400" />
                          </div>
                          <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 hover:border-primary/50 transition-colors rounded-xl">
                            <SelectValue placeholder="Select notice period" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        {noticePeriods.map(n => (
                          <SelectItem key={n} value={n} className="rounded-lg">{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm text-slate-700 font-medium">Current Location</label>
                    <p className="text-xs text-slate-500">Capture your exact GPS location</p>
                  </div>
                  <Button 
                    type="button" 
                    variant={coords ? "default" : "outline"}
                    size="sm"
                    className={cn("rounded-lg", coords && "bg-emerald-600 hover:bg-emerald-700")}
                    onClick={getLocation}
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
