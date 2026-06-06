import React, { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Copy, Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Determine the base URL dynamically based on where the app is running
    const baseUrl = window.location.origin
    setUrl(baseUrl)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("registration-qr")
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "registration-qr.png"
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }
    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Scan to Apply</h1>
        <p className="text-slate-600 mb-8">
          Candidates can scan this QR code to access the PhonePe Field Executive registration form directly.
        </p>
        
        <div className="flex justify-center mb-8 p-4 bg-white border border-slate-100 rounded-xl shadow-inner mx-auto w-64 h-64 items-center">
          <QRCodeSVG 
            id="registration-qr"
            value={url} 
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-6 flex items-center justify-between">
          <span className="text-sm text-slate-600 truncate mr-3">{url}</span>
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="shrink-0">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <Button onClick={downloadQRCode} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </div>
    </div>
  )
}
