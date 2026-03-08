import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Cloud, 
  Key, 
  Server, 
  ArrowRight, 
  RefreshCw, 
  Database,
  Layers
} from "lucide-react";

const providerData = {
  "sabre-gds": {
    name: "Sabre GDS",
    raw: `<FlightSegment 
  DepartureDateTime="2025-03-15T06:30" 
  ArrivalDateTime="2025-03-15T11:15"
  FlightNumber="302" 
  ResBookDesigCode="Y">
  <DepartureAirport LocationCode="DEL"/>
  <ArrivalAirport LocationCode="AMS"/>
  <MarketingAirline Code="AI" FlightNumber="302"/>
  <DisclosureAirline Code="AI"/>
  <OperatingAirline Code="AI"/>
  <Equipment AirEquipType="787"/>
  <FareBasis>YOWUS</FareBasis>
  <TotalFare Amount="489.00" CurrencyCode="EUR"/>
  <BaggageAllowance>
    <Piece>1</Piece>
    <Weight>23</Weight>
    <Unit>KG</Unit>
  </BaggageAllowance>
  <CabinClass>Y</CabinClass>
</FlightSegment>`,
    normalized: {
      flightId: "CONN-82741",
      provider: "SABRE_GDS",
      departure: {
        airport: "DEL",
        datetime: "2025-03-15T06:30:00"
      },
      arrival: {
        airport: "AMS",
        datetime: "2025-03-15T11:15:00"
      },
      airline: {
        code: "AI",
        name: "Air India",
        flightNumber: "AI302"
      },
      pricing: {
        total: 489.00,
        currency: "EUR",
        cabin: "ECONOMY"
      },
      baggage: {
        included: true,
        weightKg: 23
      }
    }
  },
  "sabre-ndc": {
    name: "Sabre NDC",
    raw: `<Offer OfferID="NDC-LH-39182">
  <OfferItem>
    <Service>
      <FlightRef>FL001</FlightRef>
    </Service>
    <Price>
      <SimpleCurrencyPrice Code="EUR">612.00</SimpleCurrencyPrice>
    </Price>
  </OfferItem>
  <Flight FlightKey="FL001">
    <Departure>
      <AirportCode>DEL</AirportCode>
      <Date>2025-03-15</Date>
      <Time>09:15</Time>
    </Departure>
    <Arrival>
      <AirportCode>AMS</AirportCode>
      <Date>2025-03-15</Date>
      <Time>18:30</Time>
    </Arrival>
    <MarketingCarrier>
      <AirlineID>LH</AirlineID>
      <FlightNumber>761</FlightNumber>
    </MarketingCarrier>
    <CabinType>
      <Code>M</Code>
      <Name>Economy</Name>
    </CabinType>
  </Flight>
</Offer>`,
    normalized: {
      flightId: "CONN-39182",
      provider: "SABRE_NDC",
      departure: {
        airport: "DEL",
        datetime: "2025-03-15T09:15:00"
      },
      arrival: {
        airport: "AMS",
        datetime: "2025-03-15T18:30:00"
      },
      airline: {
        code: "LH",
        name: "Lufthansa",
        flightNumber: "LH761"
      },
      pricing: {
        total: 612.00,
        currency: "EUR",
        cabin: "ECONOMY"
      },
      baggage: {
        included: true,
        weightKg: 23
      }
    }
  },
  "lcc": {
    name: "IndiGo LCC",
    raw: `{
  "flight_id": "6E1721",
  "route": {
    "origin": "DEL",
    "destination": "AMS",
    "departure_utc": "2025-03-15T05:00:00Z",
    "arrival_utc": "2025-03-15T09:30:00Z"
  },
  "carrier": {
    "iata": "6E",
    "name": "IndiGo",
    "flight_no": 1721
  },
  "fare": {
    "base_fare": 290.00,
    "taxes": 50.00,
    "total": 340.00,
    "currency": "EUR"
  },
  "cabin_class": "economy",
  "baggage_kg": 15,
  "refundable": false,
  "seats_available": 42
}`,
    normalized: {
      flightId: "CONN-11294",
      provider: "LCC",
      departure: {
        airport: "DEL",
        datetime: "2025-03-15T05:00:00"
      },
      arrival: {
        airport: "AMS",
        datetime: "2025-03-15T09:30:00"
      },
      airline: {
        code: "6E",
        name: "IndiGo",
        flightNumber: "6E1721"
      },
      pricing: {
        total: 340.00,
        currency: "EUR",
        cabin: "ECONOMY"
      },
      baggage: {
        included: true,
        weightKg: 15
      }
    }
  }
};

const flowSteps = [
  { icon: Cloud, label: "Provider API", desc: "Raw endpoint call" },
  { icon: Key, label: "Auth Token", desc: "Bearer authentication" },
  { icon: Server, label: "Connector Service", desc: ".NET microservice" },
  { icon: Layers, label: "Response Mapper", desc: "Schema transformation" },
  { icon: Database, label: "Unified Schema", desc: "Normalized output" },
  { icon: RefreshCw, label: "Booking Engine", desc: "Consumer ready" },
];

const authSteps = [
  {
    step: 1,
    title: "Request Auth Token",
    desc: "Connector requests auth token from provider using client credentials"
  },
  {
    step: 2,
    title: "Token in Headers",
    desc: "Token passed in Authorization header for all subsequent API calls"
  },
  {
    step: 3,
    title: "Request Chain",
    desc: "Availability → Pricing → Booking chain executed with same token"
  },
  {
    step: 4,
    title: "Auto Refresh",
    desc: "Token refreshed automatically before expiry using refresh grant"
  },
];

const ConnectorDeepDive = () => {
  const [activeProvider, setActiveProvider] = useState<keyof typeof providerData>("sabre-gds");
  const currentData = providerData[activeProvider];

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container pt-24 pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            How the Connector Works
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Raw provider response → Normalized unified schema
          </p>
        </motion.div>

        {/* Provider Tabs */}
        <Tabs
          value={activeProvider}
          onValueChange={(v) => setActiveProvider(v as keyof typeof providerData)}
          className="w-full"
        >
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3 bg-card">
            <TabsTrigger value="sabre-gds" className="font-mono text-xs">
              Sabre GDS
            </TabsTrigger>
            <TabsTrigger value="sabre-ndc" className="font-mono text-xs">
              Sabre NDC
            </TabsTrigger>
            <TabsTrigger value="lcc" className="font-mono text-xs">
              IndiGo LCC
            </TabsTrigger>
          </TabsList>

          {Object.keys(providerData).map((provider) => (
            <TabsContent key={provider} value={provider}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Two Panel Code Comparison */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Raw API Response */}
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border bg-accent/50 px-4 py-3">
                      <span className="font-semibold text-foreground">
                        Raw API Response
                      </span>
                      <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                        Provider Format
                      </Badge>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <pre className="p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                        <code>{currentData.raw}</code>
                      </pre>
                    </ScrollArea>
                  </div>

                  {/* Normalized Response */}
                  <div className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border bg-accent/50 px-4 py-3">
                      <span className="font-semibold text-foreground">
                        Normalized Connector Response
                      </span>
                      <Badge className="bg-success/20 text-success border-success/30">
                        Unified Schema
                      </Badge>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <pre className="p-4 font-mono text-xs leading-relaxed text-success">
                        <code>{JSON.stringify(currentData.normalized, null, 2)}</code>
                      </pre>
                    </ScrollArea>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
            Data Flow Pipeline
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center min-w-[120px]">
                  <step.icon className="h-6 w-6 text-primary" />
                  <span className="font-mono text-xs font-medium text-foreground">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {step.desc}
                  </span>
                </div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Auth Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="mb-2 text-center text-xl font-semibold text-foreground">
            Token-Based Auth Flow
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            OAuth 2.0 client credentials flow for provider authentication
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {authSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
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

export default ConnectorDeepDive;
