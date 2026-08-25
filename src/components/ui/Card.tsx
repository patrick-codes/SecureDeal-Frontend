import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-white shadow-card ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
