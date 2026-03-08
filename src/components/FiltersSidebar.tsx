import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [stops, setStops] = useState({ direct: true, oneStop: true, twoPlus: true });
  const [providers, setProviders] = useState({ gds: true, ndc: true, lcc: true });
  const [departureTime, setDepartureTime] = useState<"morning" | "afternoon" | "evening" | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold text-foreground">Filter Results</h2>

      {/* Price Range */}
      <div className="mt-6">
        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Price Range
        </Label>
        <div className="mt-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={1500}
            step={50}
            className="w-full"
          />
          <div className="mt-2 flex justify-between text-sm font-mono text-muted-foreground">
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Stops */}
      <div className="mt-6">
        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Stops
        </Label>
        <div className="mt-3 space-y-3">
          {[
            { key: "direct", label: "Direct" },
            { key: "oneStop", label: "1 Stop" },
            { key: "twoPlus", label: "2+ Stops" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={stops[key as keyof typeof stops]}
                onCheckedChange={(checked) =>
                  setStops((prev) => ({ ...prev, [key]: checked }))
                }
              />
              <label
                htmlFor={key}
                className="text-sm text-foreground cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Provider */}
      <div className="mt-6">
        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Provider
        </Label>
        <div className="mt-3 space-y-3">
          {[
            { key: "gds", label: "Sabre GDS" },
            { key: "ndc", label: "Sabre NDC" },
            { key: "lcc", label: "IndiGo LCC" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={`provider-${key}`}
                checked={providers[key as keyof typeof providers]}
                onCheckedChange={(checked) =>
                  setProviders((prev) => ({ ...prev, [key]: checked }))
                }
              />
              <label
                htmlFor={`provider-${key}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="mt-6">
        <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Departure Time
        </Label>
        <div className="mt-3 flex gap-1 rounded-lg bg-accent p-1">
          {(["morning", "afternoon", "evening"] as const).map((time) => (
            <button
              key={time}
              onClick={() => setDepartureTime(departureTime === time ? null : time)}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium capitalize transition-all ${
                departureTime === time
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <Button className="mt-6 w-full">Apply Filters</Button>
    </div>
  );
};

export default FiltersSidebar;
