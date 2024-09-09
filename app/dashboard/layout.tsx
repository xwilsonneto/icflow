import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/navbar/user-nav";
import { MainNav } from "@/components/navbar/main-nav";
import TeamSwitcher from "@/components/navbar/team-switcher";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      <main className={cn('min-h-screen bg-dark-300 font-sans antialiased')}>
        {children}
      </main>
    </div>
  );
}
