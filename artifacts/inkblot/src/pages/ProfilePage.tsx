import { useEffect, useState } from "react";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ContributionMap } from "@/components/profile/ContributionMap";
import { UniverseParticipation } from "@/components/profile/UniverseParticipation";
import { LineageInfluence } from "@/components/profile/LineageInfluence";
import { ContributionHistory } from "@/components/profile/ContributionHistory";
import { PROFILE_DATA } from "@/components/profile/data";

export function ProfilePage() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background" data-testid="profile-page">
      {/* Sticky Top Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 h-14 z-50 flex items-center border-b border-border/50 bg-background/80 backdrop-blur-md transition-all duration-500 px-6 ${
          showStickyBar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg text-foreground tracking-wide">{PROFILE_DATA.displayName}</span>
            <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 text-primary-foreground text-[9px] uppercase tracking-widest hidden sm:inline-block">
              {PROFILE_DATA.role}
            </span>
          </div>
          <div className="text-sm font-sans text-muted-foreground hidden sm:block">
            The Hollow Sea · <span className="text-foreground/80 font-medium">Keeper</span>
          </div>
        </div>
      </div>

      <ProfileHero />
      <ContributionMap />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <UniverseParticipation />
            </div>
            <div className="lg:col-span-1">
              <LineageInfluence />
            </div>
          </div>
        </div>
      </section>

      <ContributionHistory />
    </div>
  );
}