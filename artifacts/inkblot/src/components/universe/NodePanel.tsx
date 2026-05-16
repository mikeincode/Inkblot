import { motion, AnimatePresence } from "framer-motion";
import { X, GitBranch, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NodePanelProps {
  selectedNode: any | null;
  onClose: () => void;
}

export function NodePanel({ selectedNode, onClose }: NodePanelProps) {
  return (
    <AnimatePresence>
      {selectedNode && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl overflow-y-auto"
          >
            <div className="p-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="mb-8 mt-4">
                <div className="text-accent uppercase tracking-widest text-xs font-semibold mb-3">
                  {selectedNode.type || "Branch"}
                </div>
                <h2 className="font-serif text-4xl text-foreground mb-4">
                  {selectedNode.label}
                </h2>
                
                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  {selectedNode.summary || "No summary available for this node."}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10 pb-10 border-b border-border/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif">
                  A
                </div>
                <span>Contributed by Anon</span>
              </div>

              {selectedNode.nodes && (
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <GitBranch className="w-4 h-4" />
                      <span className="text-sm">Nodes</span>
                    </div>
                    <div className="text-3xl font-serif text-foreground">{selectedNode.nodes}</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Contributors</span>
                    </div>
                    <div className="text-3xl font-serif text-foreground">{selectedNode.contributors}</div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 mt-auto">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg shadow-[0_0_20px_rgba(55,48,163,0.3)]">
                  Explore Branch
                </Button>
                {selectedNode.nodes && (
                  <Button variant="outline" className="w-full h-12 text-lg border-red-900/30 text-red-400 hover:bg-red-900/10 hover:text-red-300">
                    Canonize
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
