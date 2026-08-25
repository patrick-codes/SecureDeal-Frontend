import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";

export type ToastTone = "success" | "error" | "info";

interface ToastProps {
  message: string;
  tone?: ToastTone;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

const toneStyles: Record<ToastTone, string> = {
  success: "border-success/20 bg-success/10 text-success",
  error: "border-danger/20 bg-danger/10 text-danger",
  info: "border-primary/20 bg-softBlue text-primary",
};

export default function Toast({
  message,
  tone = "success",
  show,
  onClose,
  duration = 2200,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onClose, show]);

  if (!show) return null;

  const Icon =
    tone === "error" ? AlertCircle : tone === "info" ? Info : CheckCircle2;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border bg-white p-4 shadow-lg shadow-slate-900/10">
      <div
        className={`flex items-start gap-3 rounded-xl border px-3 py-2 ${toneStyles[tone]}`}
      >
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/70">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 pr-2 text-sm font-medium">{message}</div>
        <button
          type="button"
          className="mt-0.5 text-current/70 transition hover:text-current"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
