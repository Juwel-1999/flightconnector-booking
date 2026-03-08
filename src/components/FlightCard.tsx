import { useState } from "react";
import { ChevronDown, ChevronUp, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Flight, Provider } from "@/pages/Results";

const providerConfig: Record<Provider, { label: string; className: string }> = {
  "sabre-gds": {
    label: "Sabre GDS",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  "sabre-ndc": {
    label: "Sabre NDC",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  lcc: {
    label: "LCC",
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
};

const airlineColors: Record<string, string> = {
  AI: "bg-red-600",
  KL: "bg-sky-500",
  LH: "bg-yellow-500",
  EK: "bg-red-500",
  "6E": "bg-indigo-500",
};

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const provider = providerConfig[flight.provider];

  const stopsLabel =
    flight.stops === 0
      ? "Direct"
      : flight.stops === 1
      ? "1 Stop"
      : `${flight.stops} Stops`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Airline logo */}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white",
              airlineColors[flight.airlineCode] || "bg-muted"
            )}
          >
            {flight.airlineCode}
          </div>

          <div>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                provider.className
              )}
            >
              {provider.label}
            </span>
            <p className="mt-1 text-sm font-medium text-foreground">
              {flight.airline}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {flight.flightNumber}
            </p>
          </div>
        </div>

        {/* Center section */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Departure */}
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {flight.departureTime}
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              {flight.departureAirport}
            </p>
          </div>

          {/* Duration */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-px w-12 bg-border sm:w-20" />
              <Plane className="h-4 w-4" />
              <div className="h-px w-12 bg-border sm:w-20" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {flight.duration} · {stopsLabel}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {flight.arrivalTime}
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              {flight.arrivalAirport}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2">
          <div className="text-right">
            <p className="text-2xl font-bold text-success">€{flight.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
              View Details
            </Button>
            <Button size="sm">Book Now</Button>
          </div>
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-1 border-t border-border bg-accent/50 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {expanded ? (
          <>
            Hide details <ChevronUp className="h-3 w-3" />
          </>
        ) : (
          <>
            Show details <ChevronDown className="h-3 w-3" />
          </>
        )}
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="grid grid-cols-2 gap-4 border-t border-border bg-accent/30 p-5 sm:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Baggage
            </p>
            <p className="mt-1 text-sm text-foreground">{flight.baggage}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Cabin
            </p>
            <p className="mt-1 text-sm text-foreground">{flight.cabin}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Refundable
            </p>
            <p className="mt-1 text-sm text-foreground">
              {flight.refundable ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Provider ID
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {flight.providerRawId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
