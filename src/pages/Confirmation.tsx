import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Download, CalendarPlus, Plane, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const traceSteps = [
  { time: "14:42:01", method: "GetToken()", status: "200 OK", ms: 142 },
  { time: "14:42:01", method: "AvailabilityInt()", status: "200 OK", ms: 387 },
  { time: "14:42:02", method: "PricingInt()", status: "200 OK", ms: 203 },
  { time: "14:42:02", method: "TravelItineraryInt()", status: "200 OK", ms: 445 },
  { time: "14:42:03", method: "BookingInt()", status: "200 OK", ms: 612 },
  { time: "14:42:03", method: "SSRInfo()", status: "200 OK", ms: 189 },
];

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container max-w-3xl pt-24 pb-20">
        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 rounded-xl border border-success/30 bg-success/10 p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, times: [0, 0.6, 1] }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/20"
          >
            <CheckCircle2 className="h-8 w-8 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Booking Confirmed</h1>
          <p className="mt-2 font-mono text-3xl font-bold text-success">DEMO-AMS-4821</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Issued by Sabre GDS Connector · 14 March 2025, 15:42 IST
          </p>
        </motion.div>

        {/* E-Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 overflow-hidden rounded-xl border border-border bg-card"
        >
          {/* Ticket header */}
          <div className="flex items-center justify-between border-b border-border bg-accent/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                AI
              </div>
              <div>
                <p className="font-semibold text-foreground">Air India · AI302</p>
                <p className="text-xs text-muted-foreground">Economy · Boeing 787</p>
              </div>
            </div>
            <Badge className="bg-success/20 text-success border-success/30">CONFIRMED</Badge>
          </div>

          {/* Route */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">06:30</p>
                <p className="font-mono text-lg font-semibold text-primary">DEL</p>
                <p className="text-xs text-muted-foreground">15 Mar 2025</p>
              </div>
              <div className="flex-1 mx-6 flex flex-col items-center gap-1">
                <div className="flex w-full items-center gap-1">
                  <div className="h-px flex-1 bg-border" />
                  <Plane className="h-5 w-5 text-primary" />
                  <div className="h-px flex-1 bg-border" />
                </div>
                <span className="text-xs text-muted-foreground">9h 45m · Direct</span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">11:15</p>
                <p className="font-mono text-lg font-semibold text-primary">AMS</p>
                <p className="text-xs text-muted-foreground">15 Mar 2025</p>
              </div>
            </div>

            {/* Passenger details grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Passenger", "Mr Juwel Thomas Anil"],
                ["Seat", "14C · Economy"],
                ["Baggage", "23kg + 15kg"],
                ["Meal", "Vegetarian"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Barcode area */}
          <div className="border-t border-dashed border-border bg-accent/30 px-6 py-4 text-center">
            <div className="mx-auto mb-2 flex h-10 max-w-xs items-center justify-center gap-px">
              {Array.from({ length: 40 }, (_, i) => (
                <div
                  key={i}
                  className="h-full bg-foreground"
                  style={{ width: `${Math.random() > 0.5 ? 3 : 1.5}px`, opacity: Math.random() > 0.3 ? 1 : 0.4 }}
                />
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              DEMO-AMS-4821 · SABRE-TXN-92841
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10 grid gap-3 sm:grid-cols-3"
        >
          <Button variant="outline" className="border-border">
            <Download className="mr-2 h-4 w-4" />
            Download E-Ticket
          </Button>
          <Button variant="outline" className="border-border">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
          <Button onClick={() => navigate("/")}>
            Book Another Flight
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Connector Trace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <div className="border-b border-border bg-accent/50 px-5 py-3">
            <h2 className="font-semibold text-foreground">Booking API Trace</h2>
            <p className="text-xs text-muted-foreground">The complete connector call chain for this booking</p>
          </div>
          <div className="p-5 font-mono text-sm">
            <div className="space-y-2">
              {traceSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-wrap items-center gap-2 rounded-md bg-accent/30 px-3 py-2"
                >
                  <span className="text-muted-foreground">{step.time}</span>
                  <span className="text-foreground font-medium">{step.method}</span>
                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-success">✅ {step.status}</span>
                    <span className="text-muted-foreground text-xs">{step.ms}ms</span>
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-3 flex items-center justify-between">
              <span className="text-muted-foreground">Total booking time</span>
              <span className="font-bold text-primary">1.978 seconds</span>
            </div>
          </div>
          <div className="border-t border-border bg-accent/30 px-5 py-3">
            <p className="text-xs text-muted-foreground italic">
              This trace mirrors the actual .NET async call chain in the Sabre GDS connector microservice at AkbarTravels.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
