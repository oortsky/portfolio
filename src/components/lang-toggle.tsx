import { getLocale, setLocale } from "@/paraglide/runtime.js";
import { m } from "@/paraglide/messages.js";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

export function LangToggle() {
  const locale = getLocale();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Tabs
          defaultValue={locale}
          onValueChange={value => setLocale(value as "en" | "id")}
        >
          <TabsList className="h-10 px-1.5 rounded-full">
            <TabsTrigger value="en" className="rounded-full">
              EN
            </TabsTrigger>
            <TabsTrigger value="id" className="rounded-full">
              ID
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{m["navbar.lang_toggle.tooltip"]()}</p>
      </TooltipContent>
    </Tooltip>
  );
}
