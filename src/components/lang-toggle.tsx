"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { US, ID, KR, JP } from "country-flag-icons/react/3x2";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Define the allowed locale values
type Locale = "en" | "id" | "kr" | "jp";

export function LangToggle() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="glossy" size="icon-lg" className="rounded-full">
          <Languages className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 relative mt-7 overflow-hidden rounded-2xl border-0 bg-background/10 backdrop-blur-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Language</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(value) => changeLocale(value as Locale)}
          >
            <DropdownMenuRadioItem value="en">
              <US title="United States" className="size-4 mr-2" />
              English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="id">
              <ID title="Indonesia" className="size-4 mr-2" />
              Indonesian
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="kr">
              <KR title="South Korea" className="size-4 mr-2" />
              Korean
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="jp">
              <JP title="Japan" className="size-4 mr-2" />
              Japanese
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
