import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div className={cn("gamer-card p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-gamer-gold">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-green-400",
                changeType === "negative" && "text-red-400",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="h-12 w-12 rounded-lg bg-gamer-red/20 flex items-center justify-center">
            <Icon className="h-6 w-6 text-gamer-red" />
          </div>
        )}
      </div>
    </div>
  );
}