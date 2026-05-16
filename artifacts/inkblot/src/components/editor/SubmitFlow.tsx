import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubmitFlowProps {
  mode: "tree" | "shadow";
  title: string;
  onSubmitComplete: () => void;
}

export function SubmitFlow({ mode, title, onSubmitComplete }: SubmitFlowProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const isShadow = mode === "shadow";
  const disabled = title.trim().length === 0 || submitting || success;

  const handleSubmit = () => {
    setSubmitting(true);
    // Simulate delay
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="mt-12 max-w-md w-full relative">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="submit-btn"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full flex flex-col items-center"
          >
            <button
              onClick={handleSubmit}
              disabled={disabled}
              className={`w-full py-4 px-8 rounded-sm font-serif text-xl tracking-wide transition-all duration-500 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed ${
                isShadow 
                  ? "bg-[#3b0764] text-[#fdf4ff] shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.6)] border border-[#c026d3]/50" 
                  : "bg-indigo-950 text-indigo-50 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.6)] border border-indigo-500/50"
              }`}
            >
              {submitting && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                  <div className={`w-6 h-6 rounded-full border-t-2 border-r-2 ${isShadow ? "border-[#c026d3]" : "border-indigo-400"} animate-spin`} />
                </div>
              )}
              <span className="relative z-10">{isShadow ? "Release into the Shadow" : "Submit for Canonization"}</span>
              
              {!disabled && (
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${
                  isShadow 
                    ? "bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.4)_0%,transparent_100%)]" 
                    : "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.4)_0%,transparent_100%)]"
                }`} />
              )}
            </button>
            <p className="text-xs text-white/40 mt-4 text-center px-4">
              {isShadow 
                ? "Your Node will appear immediately in the Shadow. No approval required." 
                : "Your Node will enter a pending canonization queue. The Universe creator reviews all Tree submissions."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full text-center space-y-4"
          >
            {isShadow ? (
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#c026d3]/20 blur-[50px] rounded-full" />
                <h3 className="font-serif text-2xl text-[#e9d5ff] mb-2 drop-shadow-[0_0_10px_#c026d3]">Your Node lives in the Shadow.</h3>
                <p className="text-sm text-[#d8b4fe]/60 mb-6">It may grow. It may fork. It may mutate.</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full" />
                <h3 className="font-serif text-2xl text-indigo-100 mb-2 drop-shadow-[0_0_10px_#6366f1]">Your Node has been submitted to the Canon queue.</h3>
                <p className="text-sm text-indigo-200/60 mb-6">A keeper of the Trunk will review your contribution.</p>
              </div>
            )}
            
            <button
              onClick={onSubmitComplete}
              className={`px-6 py-2 rounded-full text-sm font-medium border ${
                isShadow 
                  ? "border-[#c026d3]/50 text-[#e9d5ff] hover:bg-[#c026d3]/10" 
                  : "border-indigo-500/50 text-indigo-100 hover:bg-indigo-500/10"
              }`}
            >
              Return to Universe
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
