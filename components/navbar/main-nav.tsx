"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard/projects"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/dashboard/projects" || "/dashboard/resume"
            ? "text-gray-300 bg-dark-500 rounded-md p-2"  // Cor clara para o link ativo
            : "text-gray-400",  // Cor dos links inativos
          "hover:bg-dark-600 hover:text-white"
        )}
      >
        Projetos
      </Link>
      <Link
        href="/dashboard/calendar"
        className={cn(
          "text-sm font-medium transition-colors",
          pathname === "/dashboard/calendar"
            ? "text-gray-300 bg-dark-500 rounded-md p-2"  // Cor clara para o link ativo
            : "text-gray-400",  
          "hover:bg-dark-600 hover:text-white"
        )}
      >
        Calendário
      </Link>
    </nav>
  );
}
