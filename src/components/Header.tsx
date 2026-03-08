import { Plane } from "lucide-react";
import { NavLink } from "./NavLink";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            FlightConnector
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {["Search", "Results", "Architecture", "About"].map((link) => (
            <NavLink key={link} to={link === "Search" ? "/" : `/${link.toLowerCase()}`}>
              {link}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs font-mono text-muted-foreground">
              Live Demo — Sabre GDS · Sabre NDC · LCC
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
