import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import { getDemoSession, getMockTransactions, rolePermissions, DemoRole, formatGhs } from "../../services/mockSafetra";

const volumeData = [
  { name: "Jan", volume: 1200, revenue: 400 },
  { name: "Feb", volume: 1450, revenue: 500 },
  { name: "Mar", volume: 1380, revenue: 470 },
  { name: "Apr", volume: 1680, revenue: 620 },
  { name: "May", volume: 1820, revenue: 770 },
  { name: "Jun", volume: 2050, revenue: 840 },
];

export default function AdminPage() {
  const session = getDemoSession();
  const role = session?.role ?? "USER";
  const permissions = rolePermissions[role as DemoRole] ?? [];
  const can = (permission: string) => permissions.includes("*") || permissions.includes(permission);
  const transactions = getMockTransactions();
  const metrics = [
    ...(can("transaction.view") ? [{ label: "Demo transactions", value: String(transactions.length) }] : []),
    ...(can("payment.view") ? [{ label: "Sample payments verified", value: String(transactions.filter((transaction) => transaction.paymentStatus === "SUCCESS").length) }] : []),
    ...(can("dispute.view") ? [{ label: "Disputed transactions", value: String(transactions.filter((transaction) => ["DISPUTED", "UNDER_REVIEW"].includes(transaction.status)).length) }] : []),
    ...(can("settlement.view") ? [{ label: "Pending settlement examples", value: String(transactions.filter((transaction) => transaction.status === "RELEASE_PENDING").length) }] : []),
  ];
  const workspaces = [
    { label: "User review", description: "View or suspend users where permitted.", permission: "user.view" },
    { label: "Transaction monitoring", description: "Inspect transaction lifecycle examples.", permission: "transaction.view" },
    { label: "Payment and webhook visibility", description: "Review sample payment states; no provider events are received.", permission: "payment.view" },
    { label: "Dispute queue", description: "Review dispute cases and authorized outcomes.", permission: "dispute.view" },
    { label: "Settlement monitoring", description: "Review pending, processing, failed and reversed sample payouts.", permission: "settlement.view" },
    { label: "Fraud and risk review", description: "Use backend-authorized risk signals; no real risk assessment occurs here.", permission: "user.view" },
    { label: "Audit context", description: "Demonstration audit reasons only; no server audit log is written.", permission: "dispute.review" },
  ].filter((workspace) => can(workspace.permission));
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
            Operations overview
          </h1>
          <p className="mt-2 text-sm text-textSecondary">{role} · role-scoped local demonstration. Backend permissions remain authoritative.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <div className="text-sm text-textSecondary">{metric.label}</div>
              <div className="mt-3 text-2xl font-bold text-textPrimary">
                {metric.value}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-5"><h2 className="text-lg font-semibold">Role-available workspaces</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{workspaces.map((workspace) => <div key={workspace.label} className="rounded-xl border border-border p-4"><h3 className="font-semibold">{workspace.label}</h3><p className="mt-2 text-sm text-textSecondary">{workspace.description}</p>{workspace.permission === "dispute.view" && <a href="/admin/disputes/ST-66831" className="mt-3 inline-block text-sm font-semibold text-primary">Open sample dispute</a>}</div>)}</div></Card>

        {(role === "FINANCE_ADMIN" || role === "SUPER_ADMIN") && <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-5">
            <div className="mb-5 text-xl font-bold text-textPrimary">
              Illustrative transaction volume · mock
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="volumeFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#0A1F4D" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0A1F4D" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#DDE7F5" strokeDasharray="4 4" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#0A1F4D"
                    strokeWidth={3}
                    fill="url(#volumeFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-5 text-xl font-bold text-textPrimary">
              Illustrative revenue · mock
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient
                      id="revenueFill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3F7CFF" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#3F7CFF" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#DDE7F5" strokeDasharray="4 4" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3F7CFF"
                    strokeWidth={3}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>}

        {can("transaction.view") && <Card className="overflow-hidden">
          <div className="border-b border-border bg-slate-50 px-5 py-4 text-lg font-bold text-textPrimary">
            Recent demo transactions · GHS estimates
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-textSecondary">
                <tr>
                  <th className="px-5 py-3">Transaction</th>
                  <th className="px-5 py-3">Buyer</th>
                  <th className="px-5 py-3">Seller</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Risk</th>
                  <th className="px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-border">
                    <td className="px-5 py-4 font-medium text-textPrimary">{transaction.id}</td>
                    <td className="px-5 py-4 text-textSecondary">{transaction.buyerName}</td>
                    <td className="px-5 py-4 text-textSecondary">{transaction.sellerName}</td>
                    <td className="px-5 py-4 font-semibold text-textPrimary">{formatGhs(transaction.amount)}</td>
                    <td className="px-5 py-4 text-textPrimary">{transaction.status}</td>
                    <td className="px-5 py-4 text-textSecondary">Not assessed</td>
                    <td className="px-5 py-4 text-textSecondary">{new Date(transaction.createdAt).toLocaleDateString("en-GH")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>}
      </div>
    </DashboardLayout>
  );
}
