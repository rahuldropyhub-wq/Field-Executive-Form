import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, FileText, Users, MapPin, Calendar, Briefcase, Phone, Mail, Loader2, LogOut, Search, Filter } from "lucide-react";
import { getCandidates } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check using localStorage
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";
    if (!isAuthenticated) {
      navigate("/secure-portal/login");
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

  const filteredCandidates = candidates.filter((c) => {
    // Search filter
    const matchesSearch = 
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.mobile_number.includes(searchTerm);
    
    // Date filter
    const appliedDate = new Date(c.created_at);
    let matchesDate = true;
    
    if (startDate) {
      const sDate = new Date(startDate);
      sDate.setHours(0, 0, 0, 0);
      if (appliedDate < sDate) matchesDate = false;
    }
    if (endDate) {
      const eDate = new Date(endDate);
      eDate.setHours(23, 59, 59, 999);
      if (appliedDate > eDate) matchesDate = false;
    }

    return matchesSearch && matchesDate;
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/secure-portal/login");
  };

  const exportToExcel = () => {
    if (filteredCandidates.length === 0) return;

    // Formatting data for Excel
    const dataToExport = filteredCandidates.map((c, index) => ({
      "Application ID": `APP-${String(filteredCandidates.length - index).padStart(4, '0')}`,
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
    
    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `PhonePe_Field_Executives_${dateStr}.xlsx`);
  };

  const exportToPDF = async () => {
    if (filteredCandidates.length === 0) return;
    
    try {
      const doc = new jsPDF('landscape');
      
      try {
        // Load SVG and draw to canvas to get a PNG data URL for jsPDF
        const img = new Image();
        img.src = '/phonepe-logo.svg';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 200;
        canvas.height = img.height || 50;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        
        // Add Logo
        doc.addImage(dataUrl, 'PNG', 14, 10, 40, 40 * (canvas.height/canvas.width));
      } catch (e) {
        console.warn("Could not load logo for PDF", e);
        doc.setFontSize(22);
        doc.setTextColor(95, 37, 159);
        doc.text("PhonePe", 14, 22);
      }
      
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text("Field Executives Application Report", 14, 32);
      
      const dateStr = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${dateStr}`, 14, 38);

      const tableColumn = ["Full Name", "Email", "Mobile", "Qualification", "DOB", "Work Location", "Notice Period", "Captured Location", "Date Applied"];
      const tableRows = [];

      filteredCandidates.forEach(c => {
        tableRows.push([
          c.full_name,
          c.email,
          c.mobile_number,
          c.qualification,
          new Date(c.date_of_birth).toLocaleDateString(),
          c.work_location,
          c.notice_period,
          c.location_address || "N/A",
          new Date(c.created_at).toLocaleDateString()
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [95, 37, 159], textColor: [255, 255, 255] }, // PhonePe Purple
        alternateRowStyles: { fillColor: [248, 250, 252] }
      });

      const dateStrFile = new Date().toISOString().split('T')[0];
      doc.save(`PhonePe_Field_Executives_${dateStrFile}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to generate PDF. Please check console for details.");
    }
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="outline" size="sm" onClick={exportToExcel} disabled={candidates.length === 0} className="hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF} disabled={candidates.length === 0} className="hidden sm:flex text-red-600 border-red-200 hover:bg-red-50">
              <FileText className="h-4 w-4 mr-2" />
              PDF
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
              <h3 className="text-2xl font-bold text-slate-900">{filteredCandidates.length} {filteredCandidates.length !== candidates.length && <span className="text-sm text-slate-400 font-normal ml-2"> (Filtered from {candidates.length})</span>}</h3>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
              <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">From:</span>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border-none text-sm focus:outline-none text-slate-700 w-full sm:w-auto"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">To:</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none text-sm focus:outline-none text-slate-700 w-full sm:w-auto"
              />
            </div>

            {(searchTerm || startDate || endDate) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { setSearchTerm(""); setStartDate(""); setEndDate(""); }}
                className="text-slate-500 hover:text-slate-700 w-full sm:w-auto whitespace-nowrap"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-8">
            {error}
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 gap-4">
            <h2 className="font-semibold text-slate-800">Applications</h2>
            <div className="flex gap-2 sm:hidden w-full">
              <Button variant="outline" size="sm" onClick={exportToExcel} disabled={filteredCandidates.length === 0} className="flex-1">
                <Download className="h-4 w-4 mr-2" /> Excel
              </Button>
              <Button variant="outline" size="sm" onClick={exportToPDF} disabled={filteredCandidates.length === 0} className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                <FileText className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto hidden md:block">
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
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-slate-500">
                      No applications match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => (
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

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredCandidates.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No applications match your filters.</div>
            ) : (
              filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{candidate.full_name}</h3>
                      <p className="text-xs text-slate-500">{candidate.qualification}</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      {new Date(candidate.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-y-3 mt-4 text-sm">
                    <div className="flex items-start text-slate-600">
                      <Phone className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Mobile Number</p>
                        <p className="text-slate-700">{candidate.mobile_number}</p>
                      </div>
                    </div>
                    <div className="flex items-start text-slate-600">
                      <Mail className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Email Address</p>
                        <p className="text-slate-700 break-all">{candidate.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start text-slate-600">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Date of Birth</p>
                        <p className="text-slate-700">{new Date(candidate.date_of_birth).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start text-slate-600">
                      <Briefcase className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Work Location & Notice</p>
                        <p className="text-slate-700">{candidate.work_location} ({candidate.notice_period})</p>
                      </div>
                    </div>
                    <div className="flex items-start text-slate-600 bg-slate-50 p-3 rounded-xl mt-2 border border-slate-100">
                      <MapPin className="h-4 w-4 mr-2 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">Captured Location</p>
                        <p className="text-slate-700 text-xs leading-relaxed">{candidate.location_address || "No GPS Data"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
