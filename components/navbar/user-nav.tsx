"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Função para gerar as iniciais do nome
const getInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map(name => name[0]).join("");
  return initials.toUpperCase();
};
/* teste */
export function UserNav() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full bg-dark-400 border border-dark-500 hover:bg-dark-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/avatars/01.png" // Substitua pela URL real se necessário
              alt={session?.user?.name || "User"}
              className="grayscale"
            />
            <AvatarFallback>
              {session?.user?.name ? getInitials(session.user.name) : "NN"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-dark-400 text-white border border-dark-500 shadow-lg rounded-md"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
            <p className="text-xs leading-none text-dark-600">
              {session?.user?.email || "email@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-dark-500" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-dark-500">
            Notificações
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-dark-500">
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-dark-500">
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-dark-500" />
        <DropdownMenuItem className="hover:bg-dark-500">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
