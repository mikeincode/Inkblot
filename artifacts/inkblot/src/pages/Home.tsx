import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Globe, GitMerge, GitBranch, GitCommit, Infinity, ArrowRight, Activity, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import ashfallImg from "@assets/ashfall-kingdoms.png";
import neonImg from "@assets/neon-hollow.png";
import eclipseImg from "@assets/eclipse-protocol.png";
import hollowImg from "@assets/hollow-sea.png";

const NAV_LINKS = ["Explore", "Universes", "Shadow", "Community"];

const CONCEPTS = [
  { icon: Globe, title: "Universe", description: "Entire worlds built collaboratively." },
  { icon: GitCommit, title: "Trunk", description: "The official canon path." },
  { icon: GitBranch, title: "Branches", description: "Diverging possibilities and alternate realities." },
  { icon: GitMerge, title: "Timelines", description: "Stories that grow beyond their origins." },
  { icon: Infinity, title: "Shadow", description: "Open creative chaos without restrictions." }
];

const UNIVERSES = [
  { title: "Ashfall Kingdoms", desc: "ash-choked medieval fantasy", img: ashfallImg, branches: 142, contributors: 89, time: "2m ago" },
  { title: "Neon Hollow", desc: "cyberpunk underground city", img: neonImg, branches: 45, contributors: 21, time: "15m ago" },
  { title: "Eclipse Protocol", desc: "near-future military sci-fi", img: eclipseImg, branches: 210, contributors: 154, time: "1h ago" },
  { title: "The Hollow Sea", desc: "surreal oceanic mythology", img: hollowImg, branches: 88, contributors: 42, time: "3h ago" }
];

function AnimatedTreeSVG() {
  return (
    <svg viewBox="0 0 800 800" className="w-full h-full opacity-30 blur-[1px]">
      <motion.path
        d="M 400 800 C 400 600 400 400 400 200"
        stroke="var(--color-accent)"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M 400 600 C 300 500 200 400 100 300"
        stroke="var(--color-primary)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.path
        d="M 400 500 C 500 400 600 300 700 200"
        stroke="var(--color-secondary)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 3.5, ease: "easeInOut", delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.circle cx="400" cy="200" r="8" fill="var(--color-accent)" 
        initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
      <motion.circle cx="100" cy="300" r="6" fill="var(--color-primary)" 
        initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }} />
      <motion.circle cx="700" cy="200" r="6" fill="var(--color-secondary)" 
        initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatType: "reverse" }} />
    </svg>
  );
}

function SectionHeading({ title, subtitle, align = "center" }: { title: string, subtitle?: string, align?: "left" | "center" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function Home() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden selection:bg-primary/30">
      {/* 1. NAV */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-4" : "bg-transparent border-transparent py-6"
        }`}
        data-testid="navigation"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-background mix-blend-overlay" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-foreground">Inkblot</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/profile/lorekeeper" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">
              Profile
            </Link>
            <Button onClick={() => setLocation("/create")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-none tracking-wide shadow-[0_0_20px_rgba(55,48,163,0.3)] hover:shadow-[0_0_30px_rgba(55,48,163,0.5)] transition-all">
              Enter Inkblot
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden" data-testid="hero-section">
        {/* Abstract animated background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <AnimatedTreeSVG />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="container relative z-10 px-6 mx-auto text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight text-foreground mb-6 drop-shadow-2xl"
          >
            Where Worlds <span className="italic text-accent/90">Take Root.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light mb-12"
          >
            Grow universes. Shape canon. Explore infinite timelines.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button onClick={() => setLocation("/create")} size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-none shadow-[0_0_30px_rgba(55,48,163,0.4)]">
              Enter Inkblot <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-border hover:bg-white/5 rounded-none">
              Explore Universes
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. CORE CONCEPTS */}
      <section className="py-32 relative z-10 bg-background" data-testid="core-concepts">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="The Anatomy of a World" 
            subtitle="Understand the building blocks of collaborative mythology."
          />
          
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 snap-x snap-mandatory hide-scrollbar">
            {CONCEPTS.map((concept, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="snap-center shrink-0 w-[280px] md:w-[320px]"
              >
                <Card className="h-full bg-card border-card-border hover:border-primary/50 transition-colors duration-500 rounded-none group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10 flex flex-col h-full">
                    <concept.icon className="w-12 h-12 text-accent mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="font-serif text-2xl mb-4 text-foreground">{concept.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed flex-grow">
                      {concept.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED UNIVERSES */}
      <section className="py-32 bg-card relative" data-testid="featured-universes">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Living Universes" 
            subtitle="Explore worlds actively being shaped by thousands of creators."
            align="left"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UNIVERSES.map((universe, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-none cursor-pointer"
              >
                <img 
                  src={universe.img} 
                  alt={universe.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                
                <Link href="/universe/ashfall-kingdoms">
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">{universe.title}</h3>
                      <p className="text-white/70 font-light mb-6">{universe.desc}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-accent" />
                          <span>{universe.branches} branches</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-secondary" />
                          <span>{universe.contributors} creators</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <Activity className="w-4 h-4 text-primary" />
                          <span>{universe.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TREE VISUALIZATION */}
      <section className="py-40 bg-background overflow-hidden relative" data-testid="tree-visualization">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <SectionHeading 
            title="How Stories Grow" 
            subtitle="A visual representation of canonical and divergent timelines."
          />
          
          <div className="w-full max-w-4xl aspect-[4/3] relative mt-12 border border-border/50 bg-card/30 backdrop-blur-sm">
            <svg viewBox="0 0 800 600" className="w-full h-full absolute inset-0">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />
              
              {/* Main Trunk */}
              <motion.path
                d="M 100 500 L 700 100"
                stroke="var(--color-primary)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Branch 1 */}
              <motion.path
                d="M 250 400 Q 300 300 400 200"
                stroke="var(--color-secondary)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              />
              
              {/* Branch 2 */}
              <motion.path
                d="M 400 300 Q 500 400 650 350"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              />

              {/* Nodes */}
              {[
                { cx: 100, cy: 500, color: "var(--color-primary)", delay: 0.2 },
                { cx: 250, cy: 400, color: "var(--color-primary)", delay: 0.8 },
                { cx: 400, cy: 300, color: "var(--color-primary)", delay: 1.2 },
                { cx: 550, cy: 200, color: "var(--color-primary)", delay: 1.6 },
                { cx: 700, cy: 100, color: "var(--color-primary)", delay: 2.0 },
                { cx: 400, cy: 200, color: "var(--color-secondary)", delay: 2.5 },
                { cx: 650, cy: 350, color: "var(--color-accent)", delay: 3.0 }
              ].map((node, i) => (
                <motion.g key={i}>
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r="12"
                    fill={node.color}
                    opacity="0.2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 2, 1.5] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: node.delay, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r="6"
                    fill={node.color}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: node.delay, type: "spring" }}
                  />
                </motion.g>
              ))}
              
              {/* Labels */}
              <motion.text x="50" y="530" fill="var(--color-muted-foreground)" fontSize="12"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>Origin</motion.text>
              <motion.text x="710" y="90" fill="var(--color-primary)" fontSize="14" fontWeight="bold"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }}>TRUNK CANON</motion.text>
              <motion.text x="410" y="190" fill="var(--color-secondary)" fontSize="12"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.7 }}>Alternate Reality B</motion.text>
            </svg>
          </div>
        </div>
      </section>

      {/* 6. SHADOW SECTION */}
      <section className="py-40 relative bg-[#020204] overflow-hidden" data-testid="shadow-section">
        {/* Smoky dark background effect */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#1a1025,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#0a0515,_transparent_50%)]" />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <Infinity className="w-20 h-20 text-purple-900/50 mx-auto mb-8" />
            <h2 className="font-serif text-5xl md:text-7xl font-medium tracking-wider text-[#dcdce5] mb-6 drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              The Shadow
            </h2>
            <p className="text-xl text-purple-200/50 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              A lawless open-creation ecosystem where anyone can freely expand worlds, remix timelines, and create alternate realities without canon restrictions.
            </p>
            <Button size="lg" variant="outline" className="h-14 px-8 border-purple-900/50 text-purple-200 hover:bg-purple-900/20 hover:text-white rounded-none">
              Enter The Shadow
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 7. COMMUNITY SECTION */}
      <section className="py-32 bg-background border-t border-border/50" data-testid="community-section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-16 italic">
            "Every world begins with a single root."
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-20 max-w-3xl mx-auto">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="w-14 h-14 rounded-full border-2 border-background shadow-lg flex items-center justify-center font-serif text-lg font-bold"
                style={{ 
                  backgroundColor: `hsl(${Math.random() * 360}, 30%, 20%)`,
                  color: `hsl(${Math.random() * 360}, 60%, 80%)`
                }}
              >
                {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { label: "creators", value: "12,847" },
              { label: "universes", value: "4,291" },
              { label: "nodes written", value: "89,032" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-5xl md:text-6xl font-light text-foreground mb-2 font-serif tracking-tight">{stat.value}</span>
                <span className="text-muted-foreground uppercase tracking-widest text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-card py-16 border-t border-border" data-testid="footer">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-muted-foreground flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-card" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-muted-foreground">Inkblot</span>
            </div>
            <p className="text-sm text-muted-foreground/60">Mythology built together.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["Explore", "Universes", "Shadow", "Community", "About Inkblot"].map(link => (
              <a key={link} href="#" className="hover:text-foreground transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
