import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FiltersSidebar from "@/components/FiltersSidebar";
import FlightCard from "@/components/FlightCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Provider = "sabre-gds" | "sabre-ndc" | "lcc";

export interface Flight {
  id: string;
  provider: Provider;
  providerRawId: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  duration: string;
  stops: number;
  price: number;
  baggage: string;
  cabin: string;
  refundable: boolean;
}

const flightsData: Flight[] = [
  {
    id: "1",
    provider: "sabre-gds",
    providerRawId: "SABRE-TXN-82741",
    airline: "Air India",
    airlineCode: "AI",
    flightNumber: "AI 127",
    departureTime: "06:30",
    departureAirport: "DEL",
    arrivalTime: "11:15",
    arrivalAirport: "AMS",
    duration: "9h 45m",
    stops: 0,
    price: 489,
    baggage: "23kg included",
    cabin: "Economy",
    refundable: true,
  },
  {
    id: "2",
    provider: "sabre-gds",
    providerRawId: "SABRE-TXN-82742",
    airline: "KLM",
    airlineCode: "KL",
    flightNumber: "KL 872",
    departureTime: "14:20",
    departureAirport: "DEL",
    arrivalTime: "22:45",
    arrivalAirport: "AMS",
    duration: "12h 25m",
    stops: 1,
    price: 567,
    baggage: "30kg included",
    cabin: "Economy",
    refundable: true,
  },
  {
    id: "3",
    provider: "sabre-ndc",
    providerRawId: "NDC-LH-39182",
    airline: "Lufthansa",
    airlineCode: "LH",
    flightNumber: "LH 761",
    departureTime: "09:15",
    departureAirport: "DEL",
    arrivalTime: "18:30",
    arrivalAirport: "AMS",
    duration: "13h 15m",
    stops: 1,
    price: 612,
    baggage: "23kg included",
    cabin: "Economy",
    refundable: false,
  },
  {
    id: "4",
    provider: "sabre-ndc",
    providerRawId: "NDC-EK-45721",
    airline: "Emirates",
    airlineCode: "EK",
    flightNumber: "EK 501",
    departureTime: "22:45",
    departureAirport: "DEL",
    arrivalTime: "12:30",
    arrivalAirport: "AMS",
    duration: "15h 45m",
    stops: 2,
    price: 890,
    baggage: "35kg included",
    cabin: "Business",
    refundable: true,
  },
  {
    id: "5",
    provider: "lcc",
    providerRawId: "LCC-6E-11294",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 1721",
    departureTime: "05:00",
    departureAirport: "DEL",
    arrivalTime: "09:30",
    arrivalAirport: "AMS",
    duration: "9h 30m",
    stops: 0,
    price: 340,
    baggage: "15kg included",
    cabin: "Economy",
    refundable: false,
  },
  {
    id: "6",
    provider: "lcc",
    providerRawId: "LCC-6E-11295",
    airline: "IndiGo",
    airlineCode: "6E",
    flightNumber: "6E 1845",
    departureTime: "17:30",
    departureAirport: "DEL",
    arrivalTime: "06:15",
    arrivalAirport: "AMS",
    duration: "14h 45m",
    stops: 2,
    price: 398,
    baggage: "15kg included",
    cabin: "Economy",
    refundable: false,
  },
];

const Results = () => {
  const [sortBy, setSortBy] = useState("best");

  const sortedFlights = [...flightsData].sort((a, b) => {
    if (sortBy === "cheapest") return a.price - b.price;
    if (sortBy === "fastest") {
      const durationToMinutes = (d: string) => {
        const match = d.match(/(\d+)h\s*(\d+)?m?/);
        return match ? parseInt(match[1]) * 60 + (parseInt(match[2]) || 0) : 0;
      };
      return durationToMinutes(a.duration) - durationToMinutes(b.duration);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container pt-24 pb-20">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <FiltersSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  DEL → AMS{" "}
                  <span className="font-normal text-muted-foreground">
                    · March 15 · 1 Passenger
                  </span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-mono text-primary">12 flights</span> found
                  across <span className="font-mono text-primary">3 providers</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 border-border bg-accent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best">Best</SelectItem>
                    <SelectItem value="cheapest">Cheapest</SelectItem>
                    <SelectItem value="fastest">Fastest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Flight cards */}
            <div className="space-y-4">
              {sortedFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FlightCard flight={flight} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
