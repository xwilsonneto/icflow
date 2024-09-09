'use client';

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

type Team = {
  label: string;
  value: string;
};

export default function TeamSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team>({
    label: "Loading...",
    value: "loading",
  });
  const { data: session } = useSession();

  const groups = React.useMemo(() => {
    return [
      {
        label: "Pessoal",
        teams: [
          {
            label: session?.user?.name || "Pessoal",
            value: "pessoal",
          },
        ],
      },
      {
        label: "Departamentos",
        teams: [
          {
            label: "Elaboração",
            value: "elaboracao",
          },
          {
            label: "Financeiro",
            value: "financeiro",
          },
          {
            label: "Gestão",
            value: "gestao",
          },
          {
            label: "Novos negócios",
            value: "novos",
          },
        ],
      },
    ];
  }, [session?.user?.name]);

  React.useEffect(() => {
    if (groups.length > 0) {
      setSelectedTeam(groups[0].teams[0]);
    }
  }, [groups]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-[200px] justify-between bg-dark-400 border border-gray-700 text-white hover:bg-gray-700"
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
              alt={selectedTeam.label}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedTeam.label}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-dark-500 border border-gray-700 p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Pesquise usuário..."
              className="bg-dark-500 text-white placeholder-gray-500"
            />
            <CommandEmpty className="text-gray-400">No team found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label} className="text-white">
                {group.teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className={`text-sm text-white hover:bg-dark-400 ${selectedTeam.value === team.value ? "bg-dark-400" : ""}`}
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.value}.png`}
                        alt={team.label}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team.label}
                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${selectedTeam.value === team.value ? "opacity-100" : "opacity-0"}`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
