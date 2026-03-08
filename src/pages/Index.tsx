import { motion } from "framer-motion";
import { Server, Zap, Globe } from "lucide-react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import Footer from "@/components/Footer";

const providerBadges = ["Sabre GDS", "Sabre NDC", "IndiGo LCC"];

const stats = [
  { icon: Server, label: "3 Providers Connected" },
  { icon: Globe, label: "1,000+ Daily Bookings" },
  { icon: Zap, label: "~20ms Normalized Response" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container pt-32 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Unified Flight Search{" "}
            <span className="text-primary">Aggregator</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Connecting Sabre GDS, Sabre NDC, and LCC carriers through normalized
            connector microservices
          </p>

          {/* Provider badges */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {providerBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border bg-accent px-4 py-1.5 font-mono text-xs text-muted-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <SearchForm />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
