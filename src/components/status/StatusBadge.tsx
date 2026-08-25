import Badge from "../ui/Badge";

export default function StatusBadge({ status }: { status: string }) {
  const toneMap: Record<
    string,
    "success" | "warning" | "danger" | "neutral" | "primary"
  > = {
    "Funds Secured": "success",
    Delivered: "primary",
    Disputed: "danger",
    Pending: "warning",
    Completed: "success",
    "Under Review": "warning",
    Active: "primary",
    Cancelled: "neutral",
  };

  return <Badge tone={toneMap[status] ?? "neutral"}>{status}</Badge>;
}
