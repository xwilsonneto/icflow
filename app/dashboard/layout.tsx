import { ReactNode } from "react";
import Header from "@/components/Header"; // Ajuste o caminho conforme necessário
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <Header />
      <main className={cn('min-h-screen bg-dark-300 font-sans antialiased')}>
        {children}
      </main>
    </div>
  );
}
