import Badge from "../ui/Badge";
import { statusLabel, transactionStatusLabel, TransactionState } from "../../services/mockSafetra";

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
    DRAFT: "neutral",
    INVITED: "warning",
    ACCEPTED: "primary",
    PAYMENT_PENDING: "warning",
    FUNDED: "success",
    SELLER_PREPARING: "primary",
    SHIPPED: "primary",
    DELIVERED: "primary",
    INSPECTION: "warning",
    RELEASE_PENDING: "warning",
    RELEASED: "success",
    DISPUTED: "danger",
    UNDER_REVIEW: "warning",
    REFUNDED: "neutral",
    PARTIALLY_SETTLED: "warning",
    CANCELLED: "neutral",
    EXPIRED: "neutral",
  };

  const label = status in transactionStatusLabel
    ? transactionStatusLabel[status as TransactionState]
    : statusLabel[status] ?? status;
  return <Badge tone={toneMap[status] ?? "neutral"}>{label}</Badge>;
}
