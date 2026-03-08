import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Info } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const steps = ["Search", "Select Flight", "Passengers", "Confirm"];
const columns = ["A", "B", "C", "", "D", "E", "F"];
const TOTAL_ROWS = 28;

type SeatStatus = "available" | "occupied" | "legroom";

const seatType = (col: string): string => {
  if (col === "A" || col === "F") return "Window";
  if (col === "C" || col === "D") return "Aisle";
  return "Middle";
};

const rowPosition = (row: number): string => {
  if (row <= 10) return "Front";
  if (row <= 20) return "Middle";
  return "Back";
};

// Generate seat map
const generateSeats = (): Record<string, SeatStatus> => {
  const seats: Record<string, SeatStatus> = {};
  const occupiedSeats = new Set([
    "4A","4B","5C","5D","6A","6F","7B","7E","8C","8D",
    "9A","10F","11B","11E","12C","14D","15A","16F",
    "18B","19E","22C","25D"
  ]);
  for (let row = 1; row <= TOTAL_ROWS; row++) {
    for (const col of ["A","B","C","D","E","F"]) {
      const id = `${row}${col}`;
      if (occupiedSeats.has(id)) {
        seats[id] = "occupied";
      } else if (row <= 3) {
        seats[id] = "legroom";
      } else {
        seats[id] = "available";
      }
    }
  }
  return seats;
};

const SeatSelection = () => {
  const navigate = useNavigate();
  const seats = useMemo(generateSeats, []);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCol = selected ? selected.replace(/\d/g, "") : null;
  const selectedRow = selected ? parseInt(selected) : null;
  const isLegroom = selected ? seats[selected] === "legroom" : false;
  const extraCharge = isLegroom ? 25 : 0;
  const total = 489 + extraCharge;

  const handleSeatClick = (id: string) => {
    const status = seats[id];
    if (status === "occupied") return;
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background bg-grid pb-24">
      <Header />

      <main className="container max-w-5xl pt-24 pb-10">
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
                  i === 2 ? "bg-primary text-primary-foreground"
                    : i < 2 ? "bg-success/20 text-success"
                    : "bg-accent text-muted-foreground"
                )}>
                  {i + 1}
                </div>
                <span className={cn(
                  "hidden text-sm font-medium sm:inline",
                  i === 2 ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && <div className="h-px w-6 bg-border sm:w-10" />}
            </div>
          ))}
        </motion.div>

        {/* Flight Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">AI</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">DEL → AMS</span>
                <span className="rounded-full border border-primary/30 bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">Sabre GDS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                15 March 2025 · AI302 · Air India · <span className="font-semibold text-success">€489</span> per person
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/passengers")}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Passengers
          </Button>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Seat Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h2 className="text-xl font-semibold text-foreground">Select Your Seat</h2>
            <p className="mb-4 text-sm text-muted-foreground">Boeing 787 · Economy Class · 28 rows</p>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4">
              {[
                { color: "bg-success", label: "Available" },
                { color: "bg-primary", label: "Selected" },
                { color: "bg-muted", label: "Occupied" },
                { color: "bg-yellow-500", label: "Extra Legroom (+€25)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={cn("h-4 w-4 rounded-sm", item.color)} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="overflow-x-auto rounded-lg border border-border bg-card p-4">
              {/* Column headers */}
              <div className="mb-2 grid gap-1" style={{ gridTemplateColumns: "2rem repeat(7, 2rem)" }}>
                <div />
                {columns.map((col, i) => (
                  <div key={i} className="flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {col}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="space-y-1">
                {Array.from({ length: TOTAL_ROWS }, (_, rowIdx) => {
                  const row = rowIdx + 1;
                  return (
                    <div key={row} className="grid gap-1" style={{ gridTemplateColumns: "2rem repeat(7, 2rem)" }}>
                      <div className="flex items-center justify-center text-xs font-mono text-muted-foreground">
                        {row}
                      </div>
                      {columns.map((col, colIdx) => {
                        if (col === "") {
                          return <div key={colIdx} className="w-8" />;
                        }
                        const id = `${row}${col}`;
                        const status = seats[id];
                        const isSelected = selected === id;
                        return (
                          <button
                            key={id}
                            onClick={() => handleSeatClick(id)}
                            disabled={status === "occupied"}
                            className={cn(
                              "h-8 w-8 rounded-sm text-[10px] font-bold transition-all",
                              isSelected
                                ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1 ring-offset-background"
                                : status === "occupied"
                                ? "cursor-not-allowed bg-muted text-muted-foreground/50"
                                : status === "legroom"
                                ? "bg-yellow-500/80 text-yellow-950 hover:bg-yellow-400"
                                : "bg-success/70 text-success-foreground hover:bg-success"
                            )}
                            title={
                              status === "occupied"
                                ? "Occupied"
                                : `Seat ${id} · ${seatType(col)}${status === "legroom" ? " · +€25" : " · €0"}`
                            }
                          >
                            {isSelected ? "✓" : ""}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full shrink-0 space-y-6 lg:w-72"
          >
            {/* Selected Seat Info */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-foreground">Selected Seat</h3>
              {selected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Seat</span>
                    <span className="font-mono text-lg font-bold text-primary">{selected}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm text-foreground">{seatType(selectedCol!)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Extra Charge</span>
                    <span className={cn("text-sm font-medium", isLegroom ? "text-yellow-400" : "text-success")}>
                      {isLegroom ? "+€25" : "€0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Position</span>
                    <span className="text-sm text-foreground">{rowPosition(selectedRow!)}</span>
                  </div>
                  {isLegroom && (
                    <div className="flex items-start gap-2 rounded-md bg-yellow-500/10 p-2 text-xs text-yellow-400">
                      <Info className="mt-0.5 h-3 w-3 shrink-0" />
                      Extra legroom seat — additional €25 applies
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Click a green seat on the map to select</p>
              )}
            </div>

            {/* SSR */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold text-foreground">Special Requests</h3>
              <div className="space-y-3">
                {[
                  "Wheelchair assistance",
                  "Special meal preference",
                  "Infant bassinet",
                  "Unaccompanied minor",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Checkbox id={item} />
                    <Label htmlFor={item} className="text-sm text-foreground cursor-pointer">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex max-w-5xl items-center justify-between py-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {selected ? `Seat ${selected} selected` : "No seat selected"} · Total
            </p>
            <p className="text-2xl font-bold text-success">€{total}</p>
          </div>
          <Button size="lg" className="glow-blue-strong">
            Continue to Review
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
