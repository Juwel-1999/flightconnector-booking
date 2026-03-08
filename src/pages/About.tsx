import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, MapPin, ExternalLink, Github } from "lucide-react";

const skills = {
  Backend: ["C#", ".NET Core", "ASP.NET Web API", "Entity Framework", "LINQ"],
  Domain: ["Sabre GDS", "Sabre NDC", "LCC Integration", "SOAP/XML", "REST"],
  DevOps: ["Docker", "AWS ECS", "GitLab CI/CD", "SQL Server", "Redis"],
};

const About = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="container max-w-3xl pt-24 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-2xl font-bold text-primary">
            JT
          </div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Juwel Thomas Anil
          </h1>
          <p className="mt-2 text-lg text-primary font-medium">
            .NET Backend Engineer · Flight Domain Specialist
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Kochi, India → Open to Netherlands
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <a
              href="mailto:juwelthomasanil.job@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              Email
            </a>
            <a
              href="https://linkedin.com/in/juwelthomasanil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            >
              <Linkedin className="h-4 w-4 text-primary" />
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-12 space-y-4 text-muted-foreground leading-relaxed"
        >
          <p>
            I built this demo to show exactly the kind of work I do at Benzy
            Infotech (IT division of AkbarTravels). For 3 years I've been
            writing the connector microservices that sit between the booking
            platform and airline APIs — Sabre GDS, Sabre NDC, and multiple LCC
            carriers. This app replicates that architecture with mock data.
          </p>
          <p>
            I'm actively looking for backend engineering roles in the
            Netherlands with HSM visa sponsorship. If you're building anything
            in travel tech, OTA platforms, or microservices architecture — I'd
            like to talk.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            What I actually know
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {Object.entries(skills).map(([category, tags]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground font-mono">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-border bg-card font-mono text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* This Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            This Project
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <span className="text-foreground font-medium">Built with:</span>{" "}
                React, Tailwind, shadcn/ui (Lovable)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <span className="text-foreground font-medium">Backend in real life:</span>{" "}
                .NET Core microservices on AWS ECS
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <span className="text-foreground font-medium">Purpose:</span>{" "}
                Portfolio demo for Netherlands job search
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <a
                href="https://github.com/juwelthomasanil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub Repository
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button asChild size="lg" className="px-8">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              View My Resume
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
