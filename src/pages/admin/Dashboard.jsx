import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { Download, Users, MapPin, Calendar, Briefcase, Phone, Mail, Loader2, LogOut } from "lucide-react";
import { getCandidates } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check using localStorage
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err.message || "Failed to fetch candidates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/admin/login");
  };

  const exportToExcel = () => {
    if (candidates.length === 0) return;

    // Formatting data for Excel
    const dataToExport = candidates.map((c) => ({
      "Application ID": c.id,
      "Full Name": c.full_name,
      "Email Address": c.email,
      "Mobile Number": c.mobile_number,
      "Qualification": c.qualification,
      "Date of Birth": c.date_of_birth,
      "Work Location": c.work_location,
      "Notice Period": c.notice_period,
      "GPS Latitude": c.latitude || "N/A",
      "GPS Longitude": c.longitude || "N/A",
      "Exact Address (Auto)": c.location_address || "N/A",
      "Applied On": new Date(c.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    
    XLSX.writeFile(workbook, "PhonePe_Field_Executives.xlsx");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/phonepe-logo.svg" alt="PhonePe Logo" className="h-8" />
            <h1 className="text-xl font-bold text-slate-800 border-l border-slate-200 pl-4">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={exportToExcel} disabled={candidates.length === 0} className="hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600 hover:text-red-600">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Applications</p>
              <h3 className="text-2xl font-bold text-slate-900">{candidates.length}</h3>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-8">
            {error}
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Recent Applications</h2>
            <Button variant="outline" size="sm" onClick={exportToExcel} disabled={candidates.length === 0} className="sm:hidden">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Full Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 whitespace-nowrap">Mobile Number</th>
                  <th className="px-6 py-4 whitespace-nowrap">Qualification</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date of Birth</th>
                  <th className="px-6 py-4 whitespace-nowrap">Work Location</th>
                  <th className="px-6 py-4 whitespace-nowrap">Notice Period</th>
                  <th className="px-6 py-4 whitespace-nowrap">Captured Location</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-slate-500">
                      No applications found yet.
                    </td>
                  </tr>
                ) : (
                  candidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                        {candidate.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {candidate.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {candidate.mobile_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {candidate.qualification}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {new Date(candidate.date_of_birth).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {candidate.work_location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {candidate.notice_period}
                      </td>
                      <td className="px-6 py-4 min-w-[250px]">
                        {candidate.location_address ? (
                          <div className="flex items-start text-slate-600">
                            <MapPin className="h-4 w-4 mr-2 text-emerald-600 shrink-0 mt-0.5" /> 
                            <span className="line-clamp-2" title={candidate.location_address}>
                              {candidate.location_address}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No GPS Data</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {new Date(candidate.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
