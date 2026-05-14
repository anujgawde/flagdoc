import { CircleCheck, CircleX, TriangleAlert, Circle } from "lucide-react";
import type { CheckStatus } from "@/types/playbook";

const config = {
  pass: { icon: CircleCheck, className: "text-emerald-600" },
  fail: { icon: CircleX, className: "text-red-600" },
  warning: { icon: TriangleAlert, className: "text-amber-500" },
  pending: { icon: Circle, className: "text-gray-300" },
} as const;

export function StatusIcon({
  status,
  className = "size-4",
}: {
  status: CheckStatus;
  className?: string;
}) {
  const { icon: Icon, className: colorClass } = config[status];
  return <Icon className={`${className} ${colorClass} shrink-0`} />;
}
