import { Briefcase } from "lucide-react";

const OpenToWorkBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 shadow-lg backdrop-blur-sm">
      <Briefcase className="h-3.5 w-3.5 text-success" />
      <span className="text-xs text-muted-foreground">
        Built by <span className="font-medium text-foreground">Juwel Thomas Anil</span>{" "}
        · Open to Work in Netherlands
      </span>
    </div>
  );
};

export default OpenToWorkBadge;
