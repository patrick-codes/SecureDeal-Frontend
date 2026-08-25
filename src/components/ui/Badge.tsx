import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "success" | "warning" | "danger" | "neutral" | "primary";
  className?: string;
}

const tones = {
  success: "bg-green-100 text-success",
  warning: "bg-amber-100 text-warning",
  danger: "bg-red-100 text-danger",
  primary: "bg-primary/10 text-primary",
  neutral: "bg-slate-100 text-slate-700",
};

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
