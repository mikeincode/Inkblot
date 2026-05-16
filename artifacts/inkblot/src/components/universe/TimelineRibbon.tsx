import { motion } from "framer-motion";
import { GitMerge } from "lucide-react";
import { Card } from "@/components/ui/card";

const TIMELINES = [
  { title: "The Long Cinder War", nodes: 45, contributors: 12, color: "var(--color-primary)" },
  { title: "Ashur's Last Dream", nodes: 89, contributors: 34, color: "var(--color-accent)" },
  { title: "Post-Burning Migrations", nodes: 23, contributors: 8, color: "var(--color-secondary)" },
  { title: "The Obsidian Thrones", nodes: 56, contributors: 19, color: "var(--color-primary)" },
  { title: "Shadows of the First", nodes: 12, contributors: 4, color: "var(--color-accent)" },
];

export function TimelineRibbon() {
  return (
    <div className="py-16 bg-card border-y border-border/50 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8">
        <h3 className="font-serif text-2xl text-foreground mb-2">Active Timelines</h3>
        <p className="text-muted-foreground font-light text-sm">Flows of narrative diverging from main branches.</p>
      </div>
      
      <div className="flex overflow-x-auto pb-8 px-6 gap-6 snap-x snap-mandatory hide-scrollbar">
        {TIMELINES.map((timeline, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="snap-center shrink-0 w-[300px]"
          >
            <Card className="bg-background/80 backdrop-blur border-border/50 h-full rounded-none overflow-hidden group cursor-pointer hover:bg-background transition-colors">
              <div 
                className="w-1 h-full absolute left-0 top-0 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: timeline.color, boxShadow: `0 0 10px ${timeline.color}` }}
              />
              <div className="p-6 pl-8">
                <h4 className="font-serif text-xl text-foreground mb-4 group-hover:text-accent transition-colors">{timeline.title}</h4>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><GitMerge className="w-3 h-3" /> {timeline.nodes} nodes</span>
                  <span>{timeline.contributors} creators</span>
                </div>
                <div className="w-full h-1 bg-border/50 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    style={{ backgroundColor: timeline.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.random() * 60 + 20}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
