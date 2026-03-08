import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Globe, 
  Router, 
  Server, 
  Database, 
  Package,
  GitBranch,
  Container,
  Cloud,
  ArrowDown,
  Shield,
  Layers,
  Key,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const connectors = [
  {
    name: "Sabre GDS Connector",
    tech: ".NET Core · Docker · SOAP/XML",
    borderColor: "border-primary",
    bgColor: "bg-primary/10",
    api: "Sabre GDS API"
  },
  {
    name: "Sabre NDC Connector",
    tech: ".NET Core · Docker · REST/XML",
    borderColor: "border-purple-500",
    bgColor: "bg-purple-500/10",
    api: "Sabre NDC API"
  },
  {
    name: "IndiGo LCC Connector",
    tech: ".NET Core · Docker · REST/JSON",
    borderColor: "border-orange-500",
    bgColor: "bg-orange-500/10",
    api: "IndiGo REST API"
  }
];

const principles = [
  {
    icon: Shield,
    title: "Provider Isolation",
    desc: "One provider failing doesn't affect others"
  },
  {
    icon: Layers,
    title: "Unified Schema",
    desc: "Booking engine sees one consistent data shape"
  },
  {
    icon: Key,
    title: "Token Chain Auth",
    desc: "Acquire once, pass through availability → booking"
  },
  {
    icon: RefreshCw,
    title: "Zero-Downtime Deploy",
    desc: "ECS rolling updates via GitLab pipeline"
  }
];

const Architecture = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container pt-24 pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Microservices Architecture
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each airline provider runs as an isolated .NET Core Docker container 
            deployed on AWS ECS
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center gap-4"
        >
          {/* LAYER 1 — User */}
          <div className="rounded-lg border-2 border-border bg-card px-8 py-4 flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <div className="text-center">
              <div className="font-semibold text-foreground">AkbarTravels Web / App</div>
              <div className="text-xs text-muted-foreground font-mono">Consumer Application</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-mono">Search Request</span>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </div>

          {/* LAYER 2 — Gateway */}
          <div className="rounded-lg border-2 border-primary bg-primary/10 px-8 py-4 flex items-center gap-3 glow-blue">
            <Router className="h-6 w-6 text-primary" />
            <div className="text-center">
              <div className="font-semibold text-foreground">WebConnect API Gateway</div>
              <div className="text-xs text-muted-foreground font-mono">Route · Auth · Load Balance</div>
            </div>
          </div>

          {/* Fan out arrow */}
          <div className="relative h-12 w-full max-w-2xl">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 48" fill="none" preserveAspectRatio="xMidYMid meet">
              <path d="M300 0 L300 16 L100 40" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" />
              <path d="M300 0 L300 16 L300 40" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" />
              <path d="M300 0 L300 16 L500 40" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" />
              <polygon points="100,36 96,44 104,44" fill="hsl(var(--muted-foreground))" />
              <polygon points="300,36 296,44 304,44" fill="hsl(var(--muted-foreground))" />
              <polygon points="500,36 496,44 504,44" fill="hsl(var(--muted-foreground))" />
            </svg>
          </div>

          {/* LAYER 3 — Connector Microservices */}
          <div className="grid gap-4 w-full max-w-4xl grid-cols-1 md:grid-cols-3">
            {connectors.map((connector) => (
              <div
                key={connector.name}
                className={`rounded-lg border-2 ${connector.borderColor} ${connector.bgColor} p-4 flex flex-col items-center gap-2`}
              >
                <Server className="h-6 w-6 text-foreground" />
                <div className="font-semibold text-foreground text-center text-sm">
                  {connector.name}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono text-center">
                  {connector.tech}
                </div>
              </div>
            ))}
          </div>

          {/* Arrows down */}
          <div className="grid gap-4 w-full max-w-4xl grid-cols-1 md:grid-cols-3">
            {connectors.map((connector) => (
              <div key={`arrow-${connector.name}`} className="flex justify-center">
                <ArrowDown className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>

          {/* LAYER 4 — External Provider APIs */}
          <div className="grid gap-4 w-full max-w-4xl grid-cols-1 md:grid-cols-3">
            {connectors.map((connector) => (
              <div
                key={connector.api}
                className="rounded-lg border border-border bg-accent/50 p-3 flex items-center justify-center gap-2"
              >
                <Cloud className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">
                  {connector.api}
                </span>
              </div>
            ))}
          </div>

          {/* Merge arrow back up */}
          <div className="relative h-12 w-full max-w-2xl">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 48" fill="none" preserveAspectRatio="xMidYMid meet">
              <path d="M100 8 L100 24 L300 40" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
              <path d="M300 8 L300 40" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
              <path d="M500 8 L500 24 L300 40" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
            </svg>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono">
              Response Aggregation
            </span>
          </div>

          {/* LAYER 5 — Data Layer */}
          <div className="grid gap-4 w-full max-w-xl grid-cols-1 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <div className="font-semibold text-foreground text-sm">SQL Server</div>
                <div className="text-[10px] text-muted-foreground font-mono">Booking · Logs · Cache</div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
              <Package className="h-6 w-6 text-success" />
              <div>
                <div className="font-semibold text-foreground text-sm">Shared .NET Library</div>
                <div className="text-[10px] text-muted-foreground font-mono">Auth · Logging · Errors</div>
              </div>
            </div>
          </div>

          {/* LAYER 6 — DevOps */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="border-border bg-card px-4 py-2 font-mono text-xs">
              <GitBranch className="h-3.5 w-3.5 mr-2" />
              GitLab CI/CD
            </Badge>
            <Badge variant="outline" className="border-border bg-card px-4 py-2 font-mono text-xs">
              <Container className="h-3.5 w-3.5 mr-2" />
              Docker Images
            </Badge>
            <Badge variant="outline" className="border-border bg-card px-4 py-2 font-mono text-xs">
              <Cloud className="h-3.5 w-3.5 mr-2" />
              AWS ECS
            </Badge>
          </div>
        </motion.div>

        {/* Architecture Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
            Architecture Principles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <item.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Architecture;
