import type { RiskLevel } from "@/types/analysis";
import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";

const config: Record<RiskLevel, { label: string; dotClass: string; icon: typeof ShieldAlert }> = {
  high: { label: "HIGH", dotClass: "bg-red-600", icon: ShieldAlert },
  medium: { label: "MED", dotClass: "bg-amber-500", icon: AlertTriangle },
  low: { label: "LOW", dotClass: "bg-emerald-600", icon: ShieldCheck },
};

interface RiskBadgeProps {
  level: RiskLevel;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function RiskBadge({ level, showLabel = true, size = "sm" }: RiskBadgeProps) {
  const { label, dotClass, icon: Icon } = config[level];
  const dotSize = size === "sm" ? "size-2" : "size-2.5";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`${dotSize} shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
      <Icon className="size-3 shrink-0 text-gray-400" aria-hidden="true" />
      {showLabel && (
        <span className={`${textSize} font-semibold tracking-wide text-gray-500`}>{label}</span>
      )}
    </span>
  );
}
