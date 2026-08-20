import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Dashboard</p>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome, {session.user.name ?? session.user.email}
        </h1>
        <p className="mt-1 text-slate-600">Your community finance overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Savings", "Coming soon"],
          ["Loans", "Coming soon"],
          ["Insurance", "Coming soon"],
          ["Merry-go-round", "Coming soon"],
        ].map(([title, value]) => (
          <article key={title} className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-3 text-xl font-semibold text-slate-900">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
