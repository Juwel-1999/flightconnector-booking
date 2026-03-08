import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

const SearchForm = () => {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-xl border border-border bg-card p-6 glow-blue sm:p-8">
      {/* Trip type toggle */}
      <div className="mb-6 flex items-center gap-1 rounded-lg bg-accent p-1">
        <button
          onClick={() => setTripType("oneway")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
            tripType === "oneway"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          One Way
        </button>
        <button
          onClick={() => setTripType("roundtrip")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
            tripType === "roundtrip"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Round Trip
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Origin */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Origin
          </Label>
          <Input
            placeholder="DEL — New Delhi"
            className="h-12 border-border bg-accent font-mono text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Destination
          </Label>
          <Input
            placeholder="AMS — Amsterdam"
            className="h-12 border-border bg-accent font-mono text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Departure Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full justify-start border-border bg-accent font-mono text-sm",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Return Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={tripType === "oneway"}
                className={cn(
                  "h-12 w-full justify-start border-border bg-accent font-mono text-sm",
                  !returnDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : tripType === "oneway" ? "N/A" : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Passengers */}
      <div className="mt-4 space-y-2">
        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Passengers
        </Label>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-border bg-accent"
            onClick={() => setPassengers(Math.max(1, passengers - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-mono text-lg font-semibold text-foreground">
            {passengers}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-border bg-accent"
            onClick={() => setPassengers(Math.min(9, passengers + 1))}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Submit */}
      <Button className="mt-6 h-12 w-full text-base font-semibold glow-blue-strong">
        <Search className="mr-2 h-4 w-4" />
        Search All Providers
      </Button>
    </div>
  );
};

export default SearchForm;
