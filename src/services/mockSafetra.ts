export type TransactionState =
  | "DRAFT"
  | "INVITED"
  | "ACCEPTED"
  | "PAYMENT_PENDING"
  | "FUNDED"
  | "SELLER_PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "INSPECTION"
  | "RELEASE_PENDING"
  | "RELEASED"
  | "DISPUTED"
  | "UNDER_REVIEW"
  | "REFUNDED"
  | "PARTIALLY_SETTLED"
  | "CANCELLED"
  | "EXPIRED";

export type DemoRole =
  | "USER"
  | "SUPPORT_AGENT"
  | "DISPUTE_AGENT"
  | "FINANCE_ADMIN"
  | "FRAUD_ANALYST"
  | "SUPER_ADMIN";

export interface DemoSession {
  role: DemoRole;
  email: string;
  name: string;
  phone?: string;
  userType?: "BUYER" | "SELLER";
}

export interface MockTransaction {
  id: string;
  productName: string;
  description: string;
  amount: number;
  buyerFee: number;
  sellerFee: number;
  totalBuyerPayment: number;
  sellerNetAmount: number;
  buyerName: string;
  sellerName: string;
  buyerEmail: string;
  sellerContact: string;
  deliveryMethod: "PHYSICAL" | "DIGITAL";
  deliveryDetails: string;
  inspectionPeriodHours: number;
  status: TransactionState;
  paymentStatus:
    | "INITIALIZED"
    | "PENDING"
    | "SUCCESS"
    | "FAILED"
    | "REVERSED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED";
  escrowStatus:
    | "PENDING"
    | "HELD"
    | "RELEASE_PENDING"
    | "RELEASED"
    | "REFUNDED"
    | "PARTIALLY_SETTLED"
    | "FROZEN";
  paymentReference?: string;
  createdAt: string;
}

export interface MockDispute {
  id: string;
  transactionId: string;
  reason: string;
  description: string;
  status: "OPEN" | "WAITING_FOR_BUYER" | "WAITING_FOR_SELLER" | "UNDER_REVIEW" | "ESCALATED" | "RESOLVED" | "CLOSED";
  evidenceNames: string[];
  createdAt: string;
}

const STORAGE_KEY = "safetra.demo.transactions.v1";
const DISPUTES_KEY = "safetra.demo.disputes.v1";
const transitions: Partial<Record<TransactionState, TransactionState[]>> = {
  DRAFT: ["INVITED", "CANCELLED"],
  INVITED: ["PAYMENT_PENDING", "EXPIRED", "CANCELLED"],
  ACCEPTED: ["PAYMENT_PENDING", "SELLER_PREPARING", "CANCELLED"],
  PAYMENT_PENDING: ["FUNDED", "EXPIRED", "CANCELLED"],
  FUNDED: ["ACCEPTED", "DISPUTED"],
  SELLER_PREPARING: ["SHIPPED", "DISPUTED"],
  SHIPPED: ["DELIVERED", "DISPUTED"],
  DELIVERED: ["INSPECTION", "DISPUTED"],
  INSPECTION: ["RELEASE_PENDING", "DISPUTED"],
  RELEASE_PENDING: ["RELEASED"],
  DISPUTED: ["UNDER_REVIEW", "RELEASED", "REFUNDED", "PARTIALLY_SETTLED", "CANCELLED"],
  UNDER_REVIEW: ["RELEASED", "REFUNDED", "PARTIALLY_SETTLED", "CANCELLED"],
};

export const statusLabel: Record<string, string> = {
  INITIALIZED: "Initialized",
  PENDING: "Pending",
  SUCCESS: "Success",
  FAILED: "Failed",
  REVERSED: "Reversed",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially refunded",
  HELD: "Held in workflow",
  RELEASE_PENDING: "Release pending",
  RELEASED: "Released",
  PARTIALLY_SETTLED: "Partially settled",
  FROZEN: "Frozen for dispute",
  OPEN: "Open",
  WAITING_FOR_BUYER: "Waiting for buyer",
  WAITING_FOR_SELLER: "Waiting for seller",
  UNDER_REVIEW: "Under review",
  ESCALATED: "Escalated",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  PROCESSING: "Processing",
  PARTIALLY_PAID: "Partially paid",
};

const seedTransactions: MockTransaction[] = [
  {
    id: "ST-83921",
    productName: "iPhone 15 Pro",
    description: "256 GB, natural titanium, excellent condition.",
    amount: 1200000,
    buyerFee: 6000,
    sellerFee: 6000,
    totalBuyerPayment: 1206000,
    sellerNetAmount: 1194000,
    buyerName: "Kofi Mensah",
    sellerName: "Kwame Asante",
    buyerEmail: "kofi@example.test",
    sellerContact: "+233 24 123 4567",
    deliveryMethod: "PHYSICAL",
    deliveryDetails: "Courier delivery to Osu, Accra",
    inspectionPeriodHours: 24,
    status: "SHIPPED",
    paymentStatus: "SUCCESS",
    escrowStatus: "HELD",
    paymentReference: "DEMO-PAY-83921",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "ST-77290",
    productName: "MacBook Air M3",
    description: "13-inch laptop, 16 GB memory, 512 GB storage.",
    amount: 950000,
    buyerFee: 4750,
    sellerFee: 4750,
    totalBuyerPayment: 954750,
    sellerNetAmount: 945250,
    buyerName: "Ama Boateng",
    sellerName: "Kofi Mensah",
    buyerEmail: "ama@example.test",
    sellerContact: "+233 20 765 4321",
    deliveryMethod: "PHYSICAL",
    deliveryDetails: "Meet-up at a mutually agreed public location in Accra",
    inspectionPeriodHours: 24,
    status: "INSPECTION",
    paymentStatus: "SUCCESS",
    escrowStatus: "HELD",
    paymentReference: "DEMO-PAY-77290",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "ST-66831",
    productName: "Sony A7 IV Camera",
    description: "Camera body and agreed accessories.",
    amount: 1800000,
    buyerFee: 9000,
    sellerFee: 9000,
    totalBuyerPayment: 1809000,
    sellerNetAmount: 1791000,
    buyerName: "Kofi Mensah",
    sellerName: "Michael Owusu",
    buyerEmail: "kofi@example.test",
    sellerContact: "+233 55 111 2233",
    deliveryMethod: "PHYSICAL",
    deliveryDetails: "Insured courier to Kumasi",
    inspectionPeriodHours: 48,
    status: "DISPUTED",
    paymentStatus: "SUCCESS",
    escrowStatus: "FROZEN",
    paymentReference: "DEMO-PAY-66831",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "ST-55211",
    productName: "Samsung S24 Ultra",
    description: "512 GB, sealed box.",
    amount: 1150000,
    buyerFee: 5750,
    sellerFee: 5750,
    totalBuyerPayment: 1155750,
    sellerNetAmount: 1144250,
    buyerName: "Akosua Mensima",
    sellerName: "Kofi Mensah",
    buyerEmail: "akosua@example.test",
    sellerContact: "+233 27 234 5678",
    deliveryMethod: "PHYSICAL",
    deliveryDetails: "Courier to East Legon, Accra",
    inspectionPeriodHours: 24,
    status: "RELEASED",
    paymentStatus: "SUCCESS",
    escrowStatus: "RELEASED",
    paymentReference: "DEMO-PAY-55211",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

function readTransactions(): MockTransaction[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedTransactions;
  try {
    return JSON.parse(stored) as MockTransaction[];
  } catch {
    throw new Error("Local demo transactions are corrupted. Clear this prototype's browser storage to reset them.");
  }
}

function saveTransactions(transactions: MockTransaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export const formatGhs = (amountInPesewas: number) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(amountInPesewas / 100);

export const calculateDemoFees = (amountInPesewas: number) => {
  const buyerFee = Math.round(amountInPesewas * 0.005);
  const sellerFee = Math.round(amountInPesewas * 0.005);
  return {
    buyerFee,
    sellerFee,
    totalBuyerPayment: amountInPesewas + buyerFee,
    sellerNetAmount: amountInPesewas - sellerFee,
  };
};

export const transactionStatusLabel: Record<TransactionState, string> = {
  DRAFT: "Draft",
  INVITED: "Awaiting seller",
  ACCEPTED: "Accepted",
  PAYMENT_PENDING: "Awaiting payment",
  FUNDED: "Funded",
  SELLER_PREPARING: "Preparing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  INSPECTION: "Inspection",
  RELEASE_PENDING: "Release pending",
  RELEASED: "Released",
  DISPUTED: "Disputed",
  UNDER_REVIEW: "Under review",
  REFUNDED: "Refunded",
  PARTIALLY_SETTLED: "Partially settled",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
};

export const canTransition = (from: TransactionState, to: TransactionState) =>
  transitions[from]?.includes(to) ?? false;

export function getMockTransactions(): MockTransaction[] {
  return readTransactions();
}

export function getMockTransaction(id: string): MockTransaction | undefined {
  return readTransactions().find((transaction) => transaction.id === id);
}

export function getMockDisputes(): MockDispute[] {
  const stored = localStorage.getItem(DISPUTES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as MockDispute[];
    } catch {
      throw new Error("Local demo dispute records are corrupted. Clear this prototype's browser storage to reset them.");
    }
  }
  return [{
      id: "DSP-DEMO-66831",
      transactionId: "ST-66831",
      reason: "DAMAGED_ITEM",
      description: "Sample case: item condition differs from the agreed description.",
      status: "UNDER_REVIEW",
      evidenceNames: ["delivery-photo-demo.jpg"],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }];
}

export async function openMockDispute(input: {
  transactionId: string;
  reason: string;
  description: string;
  evidenceNames: string[];
}): Promise<MockDispute> {
  await new Promise((resolve) => window.setTimeout(resolve, 350));
  const transaction = getMockTransaction(input.transactionId);
  if (!transaction) throw new Error("Transaction not found in this demo.");
  if (!canTransition(transaction.status, "DISPUTED")) {
    throw new Error(`A dispute cannot be opened from ${transactionStatusLabel[transaction.status]}.`);
  }
  const dispute: MockDispute = {
    ...input,
    id: `DSP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
  const disputes = getMockDisputes();
  localStorage.setItem(DISPUTES_KEY, JSON.stringify([dispute, ...disputes]));
  await transitionMockTransaction(input.transactionId, "DISPUTED");
  return dispute;
}

export async function createMockTransaction(input: {
  productName: string;
  description: string;
  amount: number;
  sellerContact: string;
  deliveryMethod: "PHYSICAL" | "DIGITAL";
  deliveryDetails: string;
  inspectionPeriodHours: number;
}): Promise<MockTransaction> {
  await new Promise((resolve) => window.setTimeout(resolve, 450));
  if (!input.productName.trim() || !Number.isSafeInteger(input.amount) || input.amount < 100) {
    throw new Error("Enter a product name and an amount of at least GH₵1.00.");
  }
  const fees = calculateDemoFees(input.amount);
  const transaction: MockTransaction = {
    ...input,
    ...fees,
    id: `ST-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    buyerName: getDemoSession()?.name ?? "Kofi Mensah",
    buyerEmail: getDemoSession()?.email ?? "kofi@example.test",
    sellerName: input.sellerContact || "Invited seller",
    status: "INVITED",
    paymentStatus: "INITIALIZED",
    escrowStatus: "PENDING",
    createdAt: new Date().toISOString(),
  };
  saveTransactions([transaction, ...readTransactions()]);
  return transaction;
}

export async function transitionMockTransaction(
  id: string,
  next: TransactionState,
): Promise<MockTransaction> {
  await new Promise((resolve) => window.setTimeout(resolve, 350));
  const transactions = readTransactions();
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index < 0) throw new Error("This demo transaction could not be found.");
  const transaction = transactions[index];
  if (!canTransition(transaction.status, next)) {
    throw new Error(`The demo does not allow ${transaction.status} to move to ${next}.`);
  }
  transaction.status = next;
  if (next === "PAYMENT_PENDING") transaction.paymentStatus = "PENDING";
  if (next === "FUNDED") {
    transaction.paymentStatus = "SUCCESS";
    transaction.escrowStatus = "HELD";
    transaction.paymentReference ??= `DEMO-PAY-${id.slice(-6)}`;
  }
  if (next === "DISPUTED" || next === "UNDER_REVIEW") transaction.escrowStatus = "FROZEN";
  if (next === "RELEASE_PENDING") transaction.escrowStatus = "RELEASE_PENDING";
  if (next === "RELEASED") transaction.escrowStatus = "RELEASED";
  if (next === "REFUNDED") {
    transaction.paymentStatus = "REFUNDED";
    transaction.escrowStatus = "REFUNDED";
  }
  if (next === "PARTIALLY_SETTLED") transaction.escrowStatus = "PARTIALLY_SETTLED";
  transactions[index] = transaction;
  saveTransactions(transactions);
  return transaction;
}

export const demoAccounts: { role: DemoRole; email: string; name: string }[] = [
  { role: "USER", email: "kofi@example.test", name: "Kofi Mensah (Buyer / Seller)" },
  { role: "SUPPORT_AGENT", email: "support@example.test", name: "Support agent" },
  { role: "DISPUTE_AGENT", email: "disputes@example.test", name: "Dispute agent" },
  { role: "FINANCE_ADMIN", email: "finance@example.test", name: "Finance admin" },
  { role: "FRAUD_ANALYST", email: "risk@example.test", name: "Fraud analyst" },
  { role: "SUPER_ADMIN", email: "admin@example.test", name: "Super admin" },
];

const SESSION_KEY = "safetra.demo.session.v1";
export function getDemoSession(): DemoSession | null {
  const value = localStorage.getItem(SESSION_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as DemoSession;
  } catch {
    throw new Error("Local demo session is corrupted. Sign in again after clearing this prototype's browser storage.");
  }
}
export function setDemoSession(email: string) {
  const account = demoAccounts.find((item) => item.email === email);
  if (!account) throw new Error("Choose one of the listed mock accounts.");
  localStorage.setItem(SESSION_KEY, JSON.stringify(account));
  return account;
}
export function clearDemoSession() {
  localStorage.removeItem(SESSION_KEY);
}

const PENDING_PROFILE_KEY = "safetra.demo.pending-profile.v1";
export function setPendingDemoProfile(profile: { email: string; name: string; phone: string; userType: "BUYER" | "SELLER" }) {
  localStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(profile));
}
export function completeDemoRegistration() {
  const raw = localStorage.getItem(PENDING_PROFILE_KEY);
  if (!raw) return setDemoSession(demoAccounts[0].email);
  try {
    const profile = JSON.parse(raw) as { email: string; name: string; phone: string; userType: "BUYER" | "SELLER" };
    const session = { role: "USER" as const, ...profile };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.removeItem(PENDING_PROFILE_KEY);
    return session;
  } catch {
    throw new Error("The pending demo registration could not be read. Please sign up again.");
  }
}

export const rolePermissions: Record<DemoRole, string[]> = {
  USER: ["transaction.create", "transaction.view", "transaction.accept", "transaction.cancel", "transaction.ship", "transaction.confirmDelivery", "transaction.dispute", "payment.create", "payment.view"],
  SUPPORT_AGENT: ["transaction.view", "transaction.cancel", "dispute.view", "user.view", "user.suspend"],
  DISPUTE_AGENT: ["dispute.view", "dispute.review", "dispute.resolve"],
  FINANCE_ADMIN: ["settlement.view", "settlement.approve", "transaction.view", "payment.view"],
  FRAUD_ANALYST: ["transaction.view", "payment.view", "user.view"],
  SUPER_ADMIN: ["*"],
};
