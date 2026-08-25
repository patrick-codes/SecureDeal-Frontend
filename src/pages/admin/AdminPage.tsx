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
import { adminMetrics } from "../../mock/data";

const volumeData = [
  { name: "Jan", volume: 1200, revenue: 400 },
  { name: "Feb", volume: 1450, revenue: 500 },
  { name: "Mar", volume: 1380, revenue: 470 },
  { name: "Apr", volume: 1680, revenue: 620 },
  { name: "May", volume: 1820, revenue: 770 },
  { name: "Jun", volume: 2050, revenue: 840 },
];

export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary">
            Admin overview
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {adminMetrics.map((metric) => (
            <Card key={metric.label} className="p-5">
              <div className="text-sm text-textSecondary">{metric.label}</div>
              <div className="mt-3 text-2xl font-bold text-textPrimary">
                {metric.value}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-5">
            <div className="mb-5 text-xl font-bold text-textPrimary">
              Transaction volume
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
              Revenue
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
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-border bg-slate-50 px-5 py-4 text-lg font-bold text-textPrimary">
            Recent transactions
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
                {[
                  [
                    "SD-83921",
                    "Kofi Mensah",
                    "Michael Owusu",
                    "GH₵ 12,500",
                    "Active",
                    "Low",
                    "2026-08-20",
                  ],
                  [
                    "SD-82344",
                    "Ama Boateng",
                    "Kwame Asante",
                    "GH₵ 9,400",
                    "Completed",
                    "Low",
                    "2026-08-18",
                  ],
                  [
                    "SD-81290",
                    "Akosua Mensima",
                    "Abena Koomson",
                    "GH₵ 18,000",
                    "Disputed",
                    "Medium",
                    "2026-08-16",
                  ],
                ].map(([id, buyer, seller, amount, status, risk, created]) => (
                  <tr key={id} className="border-t border-border">
                    <td className="px-5 py-4 font-medium text-textPrimary">
                      {id}
                    </td>
                    <td className="px-5 py-4 text-textSecondary">{buyer}</td>
                    <td className="px-5 py-4 text-textSecondary">{seller}</td>
                    <td className="px-5 py-4 font-semibold text-textPrimary">
                      {amount}
                    </td>
                    <td className="px-5 py-4 text-textPrimary">{status}</td>
                    <td className="px-5 py-4 text-textSecondary">{risk}</td>
                    <td className="px-5 py-4 text-textSecondary">{created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
