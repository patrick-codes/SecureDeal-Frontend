import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function NotFoundPage() {
  return <PublicLayout><section className="mx-auto max-w-xl px-4 py-16"><Card className="p-8 text-center"><p className="text-sm font-semibold uppercase tracking-wider text-primary">404 · Not found</p><h1 className="mt-3 text-3xl font-bold">This SafeTra page is unavailable</h1><p className="mt-3 text-textSecondary">Check the address or return to the home page.</p><Button asChild className="mt-6"><Link to="/">Go to SafeTra home</Link></Button></Card></section></PublicLayout>;
}
