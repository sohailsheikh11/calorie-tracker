import { useState, useRef, useCallback } from "react";

const API_BASE = "/api/food/analyze";

export default function FoodImageUpload({ onFoodDetected, enteries, setEnteries}) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const loadPreview = (f) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
    setStatus("idle");
    setMessage("");
  };

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) {
      setMessage("Please upload an image file.");
      setStatus("error");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setMessage("Image must be under 10MB.");
      setStatus("error");
      return;
    }
    loadPreview(f);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`http://localhost:3000${API_BASE}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed (${res.status})`);

      const data = await res.json();

      console.log(data.data);
      setEnteries([...enteries, data.data]);
      setStatus("success");
      setMessage(data.message ?? "Food logged successfully!");
      if (onFoodDetected) onFoodDetected(data);
    } catch (err) {
      setStatus("error");
      setMessage(err.message ?? "Something went wrong.");
    }
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setStatus("idle");
    setMessage("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md mx-auto font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&display=swap');
        .upload-wrap * { font-family: 'Syne', sans-serif; }
        .upload-wrap .mono { font-family: 'Space Mono', monospace; }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.3s ease forwards; }
        .uploading-ring { animation: spin 0.9s linear infinite; }
        .success-pulse { animation: pulse-ring 1.5s ease infinite; }
      `}</style>

      <div className="upload-wrap bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">

        {/* Title */}
        <div>
          <h2 className="text-base font-black text-white tracking-tight">Snap Your Meal</h2>
          <p className="text-xs mono text-zinc-500 mt-0.5">Upload a photo to log food</p>
        </div>

        {/* Drop Zone */}
        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`
              relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200
              flex flex-col items-center justify-center gap-3 py-12 px-6 text-center
              ${dragging
                ? "border-green-400 bg-green-950/20 scale-[1.01]"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"}
            `}
          >
            <div className={`text-4xl transition-transform duration-200 ${dragging ? "scale-125" : ""}`}>
              📸
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {dragging ? "Drop it!" : "Drag & drop or click to browse"}
              </p>
              <p className="text-xs mono text-zinc-600 mt-1">JPG, PNG, WEBP · Max 10MB</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          /* Preview */
          <div className="relative rounded-xl overflow-hidden fade-up group">
            <img
              src={preview}
              alt="Food preview"
              className="w-full h-56 object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <button
                onClick={reset}
                className="bg-zinc-950 border border-zinc-700 text-white text-xs mono px-4 py-2 rounded-full hover:border-red-500 hover:text-red-400 transition-colors"
              >
                × Remove
              </button>
            </div>
            {/* File badge */}
            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur text-xs mono text-zinc-300 px-2 py-1 rounded-lg truncate max-w-[70%]">
              {file?.name}
            </div>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <div
            className={`fade-up text-xs mono px-3 py-2 rounded-lg border ${
              status === "error"
                ? "text-red-400 bg-red-950/30 border-red-900"
                : "text-green-400 bg-green-950/30 border-green-900"
            }`}
          >
            {status === "success" ? "✓ " : "✗ "}{message}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {preview && (
            <button
              onClick={reset}
              disabled={status === "uploading"}
              className="flex-1 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white text-sm font-bold py-3 rounded-xl transition-colors disabled:opacity-40"
            >
              Clear
            </button>
          )}
          <button
            onClick={preview ? handleUpload : () => inputRef.current?.click()}
            disabled={status === "uploading"}
            className={`
              flex-1 flex items-center justify-center gap-2 text-sm font-black py-3 rounded-xl transition-all
              ${status === "success"
                ? "bg-green-500 text-black success-pulse"
                : status === "uploading"
                ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-400 text-black"}
            `}
          >
            {status === "uploading" ? (
              <>
                <svg className="uploading-ring w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Uploading…
              </>
            ) : status === "success" ? (
              "✓ Logged!"
            ) : preview ? (
              "Upload & Log"
            ) : (
              "Choose Photo"
            )}
          </button>
        </div>

        {/* Camera shortcut on mobile */}
        {!preview && (
          <button
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.setAttribute("capture", "environment");
                inputRef.current.click();
              }
            }}
            className="w-full border border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-white text-xs mono py-2.5 rounded-xl transition-colors"
          >
            📷 Use Camera
          </button>
        )}
      </div>
    </div>
  );
}