import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, User, Plane, ArrowRight, ChevronLeft, Luggage, UtensilsCrossed } from "lucide-react";
import Header from "@/components/Header";
import BookingProgress from "@/components/BookingProgress";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";



const baggageOptions = [
  { id: "none", label: "No Extra", desc: "Included 23kg", price: 0 },
  { id: "15kg", label: "+15kg", desc: "Total 38kg", price: 45 },
  { id: "23kg", label: "+23kg", desc: "Total 46kg", price: 75 },
];

const Passengers = () => {
  const navigate = useNavigate();
  const [dob, setDob] = useState<Date>();
  const [passportExpiry, setPassportExpiry] = useState<Date>();
  const [baggage, setBaggage] = useState("none");
  const [meal, setMeal] = useState("none");

  const baggagePrice = baggageOptions.find((b) => b.id === baggage)?.price || 0;
  const total = 489 + baggagePrice;

  return (
    <div className="min-h-screen bg-background bg-grid pb-24">
      <Header />

      <main className="container max-w-4xl pt-24 pb-10">
        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-center gap-2"
        >
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    i === 2
                      ? "bg-primary text-primary-foreground"
                      : i < 2
                      ? "bg-success/20 text-success"
                      : "bg-accent text-muted-foreground"
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    i === 2 ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px w-6 bg-border sm:w-10" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Flight Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">DEL → AMS</span>
                <span className="rounded-full border border-primary/30 bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  Sabre GDS
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                15 March 2025 · AI302 · Air India · <span className="font-semibold text-success">€489</span> per person
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => navigate("/results")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Change Flight
          </Button>
        </motion.div>

        {/* Passenger Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-foreground">Passenger Details</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            As per passport — required for airline booking
          </p>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Passenger 1</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Title</Label>
                <Select defaultValue="mr">
                  <SelectTrigger className="border-border bg-accent"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr</SelectItem>
                    <SelectItem value="mrs">Mrs</SelectItem>
                    <SelectItem value="ms">Ms</SelectItem>
                    <SelectItem value="dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">First Name</Label>
                <Input placeholder="John" className="border-border bg-accent" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last Name</Label>
                <Input placeholder="Doe" className="border-border bg-accent" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start border-border bg-accent", !dob && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dob ? format(dob, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dob} onSelect={setDob} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nationality</Label>
                <Select defaultValue="india">
                  <SelectTrigger className="border-border bg-accent"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="netherlands">Netherlands</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="uae">UAE</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Passport Number</Label>
                <Input placeholder="A1234567" className="border-border bg-accent font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Passport Expiry</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start border-border bg-accent", !passportExpiry && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {passportExpiry ? format(passportExpiry, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={passportExpiry} onSelect={setPassportExpiry} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input type="email" placeholder="john@example.com" className="border-border bg-accent" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</Label>
                <div className="flex gap-2">
                  <div className="flex h-10 items-center rounded-md border border-border bg-accent px-3 text-sm text-muted-foreground font-mono">+91</div>
                  <Input placeholder="9876543210" className="border-border bg-accent font-mono" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-foreground">Contact Details</h3>
          <div className="grid gap-4 rounded-lg border border-border bg-card p-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Emergency Contact Name</Label>
              <Input placeholder="Jane Doe" className="border-border bg-accent" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Emergency Contact Phone</Label>
              <div className="flex gap-2">
                <div className="flex h-10 items-center rounded-md border border-border bg-accent px-3 text-sm text-muted-foreground font-mono">+91</div>
                <Input placeholder="9876543210" className="border-border bg-accent font-mono" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Baggage Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h3 className="mb-1 text-lg font-semibold text-foreground flex items-center gap-2">
            <Luggage className="h-5 w-5 text-primary" />
            Add Extra Baggage
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">Select additional checked baggage</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {baggageOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setBaggage(opt.id)}
                className={cn(
                  "rounded-lg border-2 p-4 text-left transition-all",
                  baggage === opt.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-muted-foreground"
                )}
              >
                <p className="font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
                <p className="mt-2 font-mono text-sm font-semibold text-success">
                  {opt.price === 0 ? "Included" : `+€${opt.price}`}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Meal Preference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h3 className="mb-1 text-lg font-semibold text-foreground flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            Meal Preference
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">Optional — subject to airline availability</p>
          <RadioGroup value={meal} onValueChange={setMeal} className="flex flex-wrap gap-3">
            {["No Preference", "Vegetarian", "Vegan", "Halal"].map((m) => {
              const val = m.toLowerCase().replace(" ", "-");
              return (
                <Label
                  key={val}
                  htmlFor={val}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-3 transition-all",
                    meal === val
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-muted-foreground"
                  )}
                >
                  <RadioGroupItem value={val} id={val} />
                  <span className="text-sm text-foreground">{m}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </motion.div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex max-w-4xl items-center justify-between py-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-success">€{total}</p>
          </div>
          <Button size="lg" className="glow-blue-strong" onClick={() => navigate("/seats")}>
            Continue to Seat Selection
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Passengers;
