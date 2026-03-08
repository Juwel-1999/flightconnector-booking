import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane, User, Receipt, Info, CheckCircle2, ArrowRight,
  ChevronLeft, Luggage, UtensilsCrossed, Armchair
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";

const steps = ["Search", "Select Flight", "Passengers", "Confirm"];

const bookingSteps = [
  "Request sent to Sabre GDS connector service",
  "Connector acquires fresh auth token",
  "PricingInt called to lock fare",
  "TravelItineraryInt creates the booking record",
  "BookingInt sends final reservation to airline",
  "PNR returned and stored in SQL Server",
  "Confirmation sent to passenger email",
];

const Itinerary = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container max-w-4xl pt-24 pb-20">
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-center gap-2"
        >
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                  i === 3 ? "bg-primary text-primary-foreground"
                    : "bg-success/20 text-success"
                )}>
                  {i < 3 ? "✓" : i + 1}
                </div>
                <span className={cn(
                  "hidden text-sm font-medium sm:inline",
                  i === 3 ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && <div className="h-px w-6 bg-border sm:w-10" />}
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Review Your Booking</h1>
          <p className="mt-1 text-sm text-muted-foreground">Check all details before confirming</p>
        </motion.div>

        <div className="space-y-6">
          {/* SECTION 1 — Flight Itinerary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-accent/50 px-5 py-3">
              <Plane className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Flight Details</span>
            </div>
            <div className="p-5">
              {/* Flight row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">Wed, 15 March 2025</div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">06:30</p>
                    <p className="text-xs text-muted-foreground">DEL</p>
                    <p className="text-[10px] text-muted-foreground">Indira Gandhi Intl</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <div className="h-px w-10 border-t border-dashed border-muted-foreground" />
                      <Plane className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="h-px w-10 border-t border-dashed border-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">9h 45m · Direct</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">11:15</p>
                    <p className="text-xs text-muted-foreground">AMS</p>
                    <p className="text-[10px] text-muted-foreground">Amsterdam Schiphol</p>
                  </div>
                </div>
                <div className="rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  AI302 · Air India
                </div>
              </div>

              {/* Details below flight */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Armchair className="h-4 w-4 text-primary" /> Economy
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Luggage className="h-4 w-4 text-primary" /> 23kg + 15kg
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UtensilsCrossed className="h-4 w-4 text-primary" /> Vegetarian
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Armchair className="h-4 w-4 text-primary" /> Seat 14C · Window
                </div>
              </div>

              {/* Provider ref */}
              <div className="mt-4 rounded-md bg-accent/50 px-3 py-2 font-mono text-xs text-muted-foreground">
                Connector Ref: CONN-82741 · Provider: SABRE_GDS · PNR will be generated on confirmation
              </div>
            </div>
          </motion.div>

          {/* SECTION 2 — Passenger Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-accent/50 px-5 py-3">
              <User className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Passenger 1</span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3">
              {[
                ["Full Name", "Mr. John Doe"],
                ["Date of Birth", "15 Jan 1990"],
                ["Nationality", "India"],
                ["Passport", "A1234567"],
                ["Email", "john@example.com"],
                ["Phone", "+91 9876543210"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SECTION 3 — Fare Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-accent/50 px-5 py-3">
              <Receipt className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">Price Breakdown</span>
            </div>
            <div className="p-5 space-y-3">
              {[
                ["Base Fare", "€440"],
                ["Taxes & Fees", "€49"],
                ["Extra Baggage (15kg)", "€45"],
                ["Seat Selection (14C)", "€0"],
                ["SSR Charges", "€0"],
              ].map(([label, amount]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono text-foreground">{amount}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-success">€534</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Price guaranteed for 15 minutes · Charged in EUR
              </p>
            </div>
          </motion.div>

          {/* SECTION 4 — Booking Flow Explainer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">What happens when you confirm</span>
            </div>
            <div className="space-y-2">
              {bookingSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground italic">
              This demo simulates steps 1–7. In production this is a chain of .NET async API calls.
            </p>
          </motion.div>

          {/* Confirm Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
              />
              <Label htmlFor="agree" className="text-sm text-foreground cursor-pointer">
                I agree to the fare rules and cancellation policy
              </Label>
            </div>
            <Button
              size="lg"
              disabled={!agreed}
              className="w-full glow-blue-strong text-base"
              onClick={() => setShowSuccess(true)}
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Confirm Booking
            </Button>
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => navigate("/seats")}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Seat Selection
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="border-border bg-card text-center sm:max-w-md">
          <DialogHeader className="items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-success/20"
            >
              <CheckCircle2 className="h-8 w-8 text-success" />
            </motion.div>
            <DialogTitle className="text-xl text-foreground">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your flight has been booked successfully
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3 rounded-lg bg-accent/50 p-4 text-left font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">PNR</span>
              <span className="font-bold text-primary">DEMO-AMS-4821</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connector Ref</span>
              <span className="text-foreground">SABRE-TXN-92841</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Flight</span>
              <span className="text-foreground">AI302 · DEL → AMS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success">Confirmed</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            A confirmation has been sent to john@example.com
          </p>
          <Button className="mt-4 w-full" onClick={() => { setShowSuccess(false); navigate("/confirmation"); }}>
            View Booking Summary
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Itinerary;
