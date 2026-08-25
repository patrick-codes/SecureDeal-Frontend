import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-darkBlue shadow-sm",
  secondary:
    "bg-softBlue text-primary border border-primary/10 hover:bg-lightBlue",
  ghost: "bg-white text-textPrimary border border-border hover:bg-slate-50",
  danger: "bg-danger text-white hover:bg-red-600",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`.trim();

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: `${(children.props as { className?: string }).className ?? ""} ${classes}`.trim(),
      ...props,
    });
  }

  return (
    <button type={type ?? "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
