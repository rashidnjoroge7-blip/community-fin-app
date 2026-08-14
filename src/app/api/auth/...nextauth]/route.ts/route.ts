import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Community Finance
            </p>
            <p className="text-xs text-slate-500">
              Savings, Loans, Last Respect
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">
                {session.user.name ?? session.user.email}
              </p>
              <p className="text-xs text-slate-500">{session.user.role}</p>
            </div>

            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">{children}</main>
    </div>
  );
}