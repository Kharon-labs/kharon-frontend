import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <Icons.spinner
      className={cn("animate-spin", sizeClasses[size], className)}
    />
  );
}
