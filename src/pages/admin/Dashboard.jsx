import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, FileText, Users, MapPin, Calendar, Briefcase, Phone, Mail, Loader2, LogOut, Search, Filter, Code2, Globe, GitBranch, ExternalLink } from "lucide-react";
import { getDropyCandidates } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const parseList = (val) => {
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val || "[]"); } catch { return []; }
};

// Opens Base64 PDF in a new tab using a Blob URL (Chrome blocks data: URLs in new tabs)
const openPdfBlob = (base64DataUrl) => {
  try {
    // base64DataUrl is like "data:application/pdf;base64,XXXX"
    const base64 = base64DataUrl.split(",")[1]
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const blob = new Blob([bytes], { type: "application/pdf" })
    const blobUrl = URL.createObjectURL(blob)
    window.open(blobUrl, "_blank")
  } catch (e) {
    alert("Could not open PDF. Please try downloading instead.")
  }
}

// Downloads Base64 PDF as a file
const downloadPdfBlob = (base64DataUrl, filename) => {
  try {
    const base64 = base64DataUrl.split(",")[1]
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const blob = new Blob([bytes], { type: "application/pdf" })
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = blobUrl
    a.download = filename || "resume.pdf"
    a.click()
    URL.revokeObjectURL(blobUrl)
  } catch (e) {
    alert("Could not download PDF. Please try again.")
  }
}

export default function Dashboard() {
  const [dropyCandidates, setDropyCandidates] = useState([]);
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
      const dData = await getDropyCandidates();
      setDropyCandidates(dData);
    } catch (err) {
      setError(err.message || "Failed to fetch candidates");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCandidates = dropyCandidates.filter((c) => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const skillsArray = parseList(c.skills);
    const matchesSearch =
      (c.full_name && c.full_name.toLowerCase().includes(searchLower)) ||
      (c.email && c.email.toLowerCase().includes(searchLower)) ||
      (c.mobile_number && c.mobile_number.includes(searchTerm)) ||
      skillsArray.some((s) => typeof s === "string" && s.toLowerCase().includes(searchLower));

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

    const dataToExport = filteredCandidates.map((c, index) => ({
      "Application ID": `APP-DEV-${String(filteredCandidates.length - index).padStart(4, '0')}`,
      "Full Name": c.full_name,
      "Email Address": c.email,
      "Mobile Number": c.mobile_number,
      "Gender": c.gender || "N/A",
      "Degree": c.degree || "N/A",
      "College Name": c.college_name || "N/A",
      "Year of Passing": c.year_of_passing || "N/A",
      "LinkedIn": c.linkedin_url || "N/A",
      "Technical Skills": parseList(c.skills).join(", "),
      "Live Projects": parseList(c.projects).join(", "),
      "GitHub Repositories": parseList(c.github_repos).join(", "),
      "Resume Filename": c.resume_filename || "N/A",
      "Applied On": new Date(c.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dropy Candidates");

    const getFileDateSuffix = () => {
      if (startDate && endDate) return startDate === endDate ? startDate : `${startDate}_to_${endDate}`;
      if (startDate) return `${startDate}_onwards`;
      if (endDate) return `up_to_${endDate}`;
      return new Date().toISOString().split('T')[0];
    };

    XLSX.writeFile(workbook, `Dropy_Candidates_${getFileDateSuffix()}.xlsx`);
  };

  const exportToPDF = async () => {
    if (filteredCandidates.length === 0) return;

    try {
      const doc = new jsPDF('landscape');

      doc.setFontSize(22);
      doc.setTextColor(79, 70, 229);
      doc.setFont("helvetica", "bold");
      doc.text("DropyHub", 14, 22);

      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text("DropyHub Technical Candidates Report", 14, 32);

      const dateStr = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);

      let filterText = "";
      if (startDate && endDate) {
        filterText = startDate === endDate ? ` (Filtered: ${startDate})` : ` (Filtered: ${startDate} to ${endDate})`;
      }
      doc.text(`Generated on: ${dateStr}${filterText}`, 14, 38);

      const tableColumn = ["Full Name", "Email", "Mobile", "Gender", "Education", "LinkedIn", "Skills", "Live Projects", "GitHub Repos", "Resume", "Date Applied"];
      const tableRows = [];

      filteredCandidates.forEach(c => {
        tableRows.push([
          c.full_name,
          c.email,
          c.mobile_number,
          c.gender || "N/A",
          c.degree ? `${c.degree} (${c.year_of_passing || 'N/A'}) - ${c.college_name || 'N/A'}` : "N/A",
          c.linkedin_url || "N/A",
          parseList(c.skills).join(", "),
          parseList(c.projects).join(", "),
          parseList(c.github_repos).join(", "),
          c.resume_filename || (c.resume_data ? "PDF Available" : "N/A"),
          new Date(c.created_at).toLocaleString()
        ]);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [79, 70, 229], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [248, 250, 252] }
      });

      const getFileDateSuffix = () => {
        if (startDate && endDate) return startDate === endDate ? startDate : `${startDate}_to_${endDate}`;
        if (startDate) return `${startDate}_onwards`;
        if (endDate) return `up_to_${endDate}`;
        return new Date().toISOString().split('T')[0];
      };

      doc.save(`Dropy_Candidates_${getFileDateSuffix()}.pdf`);
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
            <img
              src="/dropy-logo.png"
              alt="Dropy Logo"
              className="h-10 w-auto object-contain rounded-md"
              onError={(e) => { e.currentTarget.src = "/dropyhub-logo.jpg"; }}
            />
            <h1 className="text-xl font-bold text-slate-800 border-l border-slate-200 pl-4">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={exportToExcel}
              disabled={filteredCandidates.length === 0}
              className="hidden sm:flex"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToPDF}
              disabled={filteredCandidates.length === 0}
              className="hidden sm:flex border-indigo-200 hover:bg-indigo-50 text-indigo-600"
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={fetchData} className="text-slate-600 hover:text-indigo-600" title="Refresh data">
              <Loader2 className={cn("h-4 w-4 sm:mr-2", isLoading && "animate-spin")} />
              <span className="hidden sm:inline">Refresh</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Candidates</p>
              <h3 className="text-2xl font-bold text-slate-900">{dropyCandidates.length}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
            <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Filtered Results</p>
              <h3 className="text-2xl font-bold text-slate-900">{filteredCandidates.length}</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Resumes Uploaded</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {dropyCandidates.filter(c => c.resume_data || c.resume_filename).length}
              </h3>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, email, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (!val) return;

                const today = new Date();
                let start, end;
                if (val === "today") {
                  start = new Date(today);
                  end = new Date(today);
                } else if (val === "yesterday") {
                  start = new Date(today);
                  start.setDate(start.getDate() - 1);
                  end = new Date(start);
                } else if (val === "day_before") {
                  start = new Date(today);
                  start.setDate(start.getDate() - 2);
                  end = new Date(start);
                }

                const formatDate = (date) => {
                  const d = new Date(date);
                  let month = '' + (d.getMonth() + 1);
                  let day = '' + d.getDate();
                  const year = d.getFullYear();
                  if (month.length < 2) month = '0' + month;
                  if (day.length < 2) day = '0' + day;
                  return [year, month, day].join('-');
                };

                setStartDate(formatDate(start));
                setEndDate(formatDate(end));
                e.target.value = ""; // reset dropdown
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <option value="">Quick Date</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="day_before">Day Before Yesterday</option>
            </select>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
              <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">From:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent border-none text-sm focus:outline-none text-slate-700 w-full sm:w-auto"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
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
            <h2 className="font-semibold text-slate-800">
              DropyHub Candidate Applications
              <span className="ml-2 bg-indigo-100 text-indigo-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
                {filteredCandidates.length}
              </span>
            </h2>
            <div className="flex gap-2 sm:hidden w-full">
              <Button variant="outline" size="sm" onClick={exportToExcel} disabled={filteredCandidates.length === 0} className="flex-1">
                <Download className="h-4 w-4 mr-2" /> Excel
              </Button>
              <Button variant="outline" size="sm" onClick={exportToPDF} disabled={filteredCandidates.length === 0} className="flex-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                <FileText className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto hidden md:block">
            {/* Dropy Developer Candidates Table */}
            <table className="w-full text-sm text-left">
              <thead className="bg-indigo-50 text-indigo-700 font-medium border-b border-indigo-100">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">#</th>
                  <th className="px-6 py-4 whitespace-nowrap">Full Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 whitespace-nowrap">Mobile & Gender</th>
                  <th className="px-6 py-4 whitespace-nowrap">Education</th>
                  <th className="px-6 py-4 whitespace-nowrap">LinkedIn</th>
                  <th className="px-6 py-4 whitespace-nowrap">Skills</th>
                  <th className="px-6 py-4 whitespace-nowrap">Live Projects</th>
                  <th className="px-6 py-4 whitespace-nowrap">GitHub Repos</th>
                  <th className="px-6 py-4 whitespace-nowrap">Resume</th>
                  <th className="px-6 py-4 whitespace-nowrap">Applied On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-8 text-center text-slate-500">
                      No candidate applications match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate, idx) => (
                    <tr key={candidate.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4 text-slate-400 text-xs font-mono">
                        {String(filteredCandidates.length - idx).padStart(4, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900">
                        {candidate.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        <a href={`mailto:${candidate.email}`} className="hover:text-indigo-600 hover:underline">{candidate.email}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 flex flex-col gap-1">
                        <span>{candidate.mobile_number}</span>
                        {candidate.gender && <span className="text-xs text-slate-400">{candidate.gender}</span>}
                      </td>
                      <td className="px-6 py-4 min-w-[200px]">
                        {candidate.degree ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium text-slate-700">{candidate.degree}</span>
                            <span className="text-xs text-slate-500">{candidate.college_name}</span>
                            <span className="text-xs text-slate-400">Class of {candidate.year_of_passing}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.linkedin_url ? (
                          <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:underline text-xs">
                            <ExternalLink className="h-3 w-3" /> LinkedIn
                          </a>
                        ) : <span className="text-slate-400 italic text-xs">N/A</span>}
                      </td>
                      <td className="px-6 py-4 min-w-[280px]">
                        <div className="flex flex-wrap flex-row gap-1">
                          {parseList(candidate.skills).slice(0, 6).map((s, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">{s}</span>
                          ))}
                          {parseList(candidate.skills).length > 6 && (
                            <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">+{parseList(candidate.skills).length - 6}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[180px]">
                        <div className="flex flex-col gap-1">
                          {parseList(candidate.projects).filter(Boolean).map((p, i) => (
                            <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 hover:underline truncate max-w-[160px]">
                              <Globe className="h-3 w-3 shrink-0" />{p.replace(/^https?:\/\//, '')}
                            </a>
                          ))}
                          {parseList(candidate.projects).filter(Boolean).length === 0 && <span className="text-slate-400 italic text-xs">None</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[180px]">
                        <div className="flex flex-col gap-1">
                          {parseList(candidate.github_repos).filter(Boolean).map((r, i) => (
                            <a key={i} href={r} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 hover:underline truncate max-w-[160px]">
                              <GitBranch className="h-3 w-3 shrink-0" />{r.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
                            </a>
                          ))}
                          {parseList(candidate.github_repos).filter(Boolean).length === 0 && <span className="text-slate-400 italic text-xs">None</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(() => {
                          // resume_data: Base64 string OR legacy JSON {viewUrl, downloadUrl}
                          let base64Data = null, legacyViewUrl = null, legacyDownloadUrl = null
                          if (candidate.resume_data) {
                            try {
                              const parsed = JSON.parse(candidate.resume_data)
                              // Legacy Cloudinary JSON format
                              legacyViewUrl = parsed.viewUrl
                              legacyDownloadUrl = parsed.downloadUrl
                            } catch {
                              // New format: Base64 data URI
                              if (candidate.resume_data.startsWith("data:")) {
                                base64Data = candidate.resume_data
                              } else {
                                // Plain URL (very old records)
                                legacyViewUrl = candidate.resume_data
                                legacyDownloadUrl = candidate.resume_data
                              }
                            }
                          }

                          if (base64Data) {
                            return (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openPdfBlob(base64Data)}
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-blue-200 shadow-sm"
                                >
                                  <ExternalLink className="h-3 w-3" /> View
                                </button>
                                <button
                                  onClick={() => downloadPdfBlob(base64Data, candidate.resume_filename || `resume-${candidate.full_name}.pdf`)}
                                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-emerald-200 shadow-sm"
                                >
                                  <Download className="h-3 w-3" /> Download
                                </button>
                              </div>
                            )
                          }

                          if (legacyViewUrl) {
                            return (
                              <div className="flex gap-2">
                                <a
                                  href={legacyViewUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-blue-200 shadow-sm"
                                >
                                  <ExternalLink className="h-3 w-3" /> View
                                </a>
                                <a
                                  href={legacyDownloadUrl}
                                  download={candidate.resume_filename || `resume-${candidate.full_name}.pdf`}
                                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-emerald-200 shadow-sm"
                                >
                                  <Download className="h-3 w-3" /> Download
                                </a>
                              </div>
                            )
                          }

                          return candidate.resume_filename ? (
                            <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                              <FileText className="h-3 w-3" /> Old Record
                            </span>
                          ) : (
                            <span className="bg-red-50 text-red-500 text-xs px-2.5 py-1 rounded-full">No Resume</span>
                          )
                        })()}
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap text-xs">
                        {new Date(candidate.created_at).toLocaleString()}
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
                      <p className="text-xs text-slate-500">{candidate.email}</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                      {new Date(candidate.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-y-3 mt-4 text-sm">
                    <div className="flex items-start text-slate-600">
                      <Phone className="h-4 w-4 mr-2 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Mobile</p>
                        <p className="text-slate-700">{candidate.mobile_number}</p>
                      </div>
                    </div>
                    {candidate.linkedin_url && (
                      <div className="flex items-start text-slate-600">
                        <ExternalLink className="h-4 w-4 mr-2 text-indigo-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-400 font-medium">LinkedIn</p>
                          <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all text-xs">{candidate.linkedin_url}</a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start">
                      <Code2 className="h-4 w-4 mr-2 text-indigo-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {parseList(candidate.skills).map((s, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                          {parseList(candidate.skills).length === 0 && <span className="text-slate-400 italic text-xs">None listed</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Globe className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">Live Projects</p>
                        {parseList(candidate.projects).filter(Boolean).map((p, i) => (
                          <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="block text-xs text-indigo-600 hover:underline break-all">{p}</a>
                        ))}
                        {parseList(candidate.projects).filter(Boolean).length === 0 && <span className="text-slate-400 italic text-xs">None</span>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <GitBranch className="h-4 w-4 mr-2 text-slate-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">GitHub Repos</p>
                        {parseList(candidate.github_repos).filter(Boolean).map((r, i) => (
                          <a key={i} href={r} target="_blank" rel="noopener noreferrer" className="block text-xs text-indigo-600 hover:underline break-all">{r}</a>
                        ))}
                        {parseList(candidate.github_repos).filter(Boolean).length === 0 && <span className="text-slate-400 italic text-xs">None</span>}
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-medium mb-1">Resume</p>
                        {candidate.resume_data ? (
                          <div className="flex gap-2">
                            {candidate.resume_data.startsWith("data:") ? (
                              <>
                                <button
                                  onClick={() => openPdfBlob(candidate.resume_data)}
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-blue-200"
                                >
                                  <ExternalLink className="h-3 w-3" /> View
                                </button>
                                <button
                                  onClick={() => downloadPdfBlob(candidate.resume_data, candidate.resume_filename || `resume-${candidate.full_name}.pdf`)}
                                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-emerald-200"
                                >
                                  <Download className="h-3 w-3" /> Download
                                </button>
                              </>
                            ) : (
                              <>
                                <a
                                  href={candidate.resume_data}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-blue-200"
                                >
                                  <ExternalLink className="h-3 w-3" /> View
                                </a>
                                <a
                                  href={candidate.resume_data}
                                  download={candidate.resume_filename || `resume-${candidate.full_name}.pdf`}
                                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors border border-emerald-200"
                                >
                                  <Download className="h-3 w-3" /> Download
                                </a>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">
                            {candidate.resume_filename ? `${candidate.resume_filename} (no URL)` : "Not uploaded"}
                          </span>
                        )}
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
