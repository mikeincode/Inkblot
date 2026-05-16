import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { StepNaming } from "@/components/create/StepNaming";
import { StepCreationMyth } from "@/components/create/StepCreationMyth";
import { StepGovernance } from "@/components/create/StepGovernance";
import { StepEcology } from "@/components/create/StepEcology";
import { PlantingCeremony } from "@/components/create/PlantingCeremony";

export type UniverseData = {
  name: string;
  tagline: string;
  creationMyth: string;
  rootNodeTitle: string;
  governance: string;
  shadowEnabled: boolean;
  freeForks: boolean;
  mutationsAllowed: boolean;
  shadowCanInfluenceCanon: boolean;
};

const DEFAULT_DATA: UniverseData = {
  name: "",
  tagline: "",
  creationMyth: "",
  rootNodeTitle: "",
  governance: "",
  shadowEnabled: true,
  freeForks: true,
  mutationsAllowed: true,
  shadowCanInfluenceCanon: false,
};

export function CreateUniversePage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [data, setData] = useState<UniverseData>(DEFAULT_DATA);

  const updateData = (updates: Partial<UniverseData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 5) as any);
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1) as any);

  const isNextDisabled = () => {
    if (currentStep === 1) return data.name.length < 3;
    if (currentStep === 2) return data.rootNodeTitle.length < 3 || data.creationMyth.length < 20;
    if (currentStep === 3) return data.governance === "";
    return false;
  };

  if (currentStep === 5) {
    return <PlantingCeremony data={data} />;
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col selection:bg-primary/30 text-foreground overflow-x-hidden">
      {/* Top Progress Bar */}
      <header className="w-full pt-8 pb-4 px-6 md:px-12 flex flex-col items-center sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/10">
        <div className="flex items-center w-full max-w-sm justify-between relative mb-2">
          {/* Connecting line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border/40 -z-10" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-primary -z-10"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 10px var(--color-primary)" }}
          />

          {[1, 2, 3, 4].map((step) => {
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;
            return (
              <div key={step} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive ? "bg-primary shadow-[0_0_15px_var(--color-primary)] scale-125" 
                    : isCompleted ? "bg-primary/60 scale-100" 
                    : "bg-background border border-border/50 scale-100"
                  }`}
                />
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between w-full max-w-sm text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className={currentStep >= 1 ? "text-primary/80" : ""}>Name</span>
          <span className={currentStep >= 2 ? "text-primary/80" : ""}>Root</span>
          <span className={currentStep >= 3 ? "text-primary/80" : ""}>Governance</span>
          <span className={currentStep >= 4 ? "text-primary/80" : ""}>Ecology</span>
        </div>
      </header>

      {/* Step Content */}
      <main className="flex-1 relative w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {currentStep === 1 && <StepNaming data={data} updateData={updateData} />}
            {currentStep === 2 && <StepCreationMyth data={data} updateData={updateData} />}
            {currentStep === 3 && <StepGovernance data={data} updateData={updateData} />}
            {currentStep === 4 && <StepEcology data={data} updateData={updateData} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <footer className="w-full p-6 md:p-8 flex items-center justify-between z-40 bg-background">
        <div>
          {currentStep > 1 && (
            <Button variant="ghost" onClick={prevStep} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}
          {currentStep === 1 && (
            <Button variant="ghost" onClick={() => setLocation("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
            </Button>
          )}
        </div>
        
        <Button 
          onClick={nextStep} 
          disabled={isNextDisabled()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 h-12 shadow-[0_0_20px_rgba(55,48,163,0.3)] transition-all"
        >
          {currentStep === 4 ? "Plant the World" : "Continue"}
        </Button>
      </footer>
    </div>
  );
}