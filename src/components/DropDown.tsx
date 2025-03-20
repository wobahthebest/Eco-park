"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuCheckboxes() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("english");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-foreground text-primary-foreground hover:bg-muted"
        asChild
      >
        <Button variant="outline">Lan</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-muted">
        <DropdownMenuLabel className="text-lg">Languages</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={setSelectedLanguage}
        >
          <DropdownMenuRadioItem value="english">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="russian">Русский</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
