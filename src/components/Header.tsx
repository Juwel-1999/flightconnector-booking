import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";
import { NavLink } from "./NavLink";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Search", to: "/" },
  { label: "Results", to: "/results" },
  { label: "Connector", to: "/connector" },
  { label: "Architecture", to: "/architecture" },
  { label: "About", to: "/about" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            FlightConnector
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs font-mono text-muted-foreground">
              Live Demo — Sabre GDS · Sabre NDC · LCC
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden animate-fade-in">
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
