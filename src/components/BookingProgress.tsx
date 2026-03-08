import { cn } from "@/lib/utils";

const steps = ["Search", "Select", "Passengers", "Seats", "Review", "Confirm"];

interface BookingProgressProps {
  activeStep: number; // 0-indexed
}

const BookingProgress = ({ activeStep }: BookingProgressProps) => {
  return (
    <div className="mb-8 flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold sm:h-8 sm:w-8 sm:text-xs",
                i === activeStep
                  ? "bg-primary text-primary-foreground"
                  : i < activeStep
                  ? "bg-success/20 text-success"
                  : "bg-accent text-muted-foreground"
              )}
            >
              {i < activeStep ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-xs font-medium sm:inline sm:text-sm",
                i === activeStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="h-px w-4 bg-border sm:w-8" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingProgress;
