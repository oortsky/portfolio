import { useTheme } from "@/components/theme-provider";
import { m } from "@/paraglide/messages.js";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label={
            isDark
              ? m["navbar.mode_toggle.label.light"]()
              : m["navbar.mode_toggle.label.dark"]()
          }
          onClick={toggleTheme}
        >
          <Sun className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Moon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">
            {isDark
              ? m["navbar.mode_toggle.label.light"]()
              : m["navbar.mode_toggle.label.dark"]()}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{m["navbar.mode_toggle.tooltip"]()}</p>
      </TooltipContent>
    </Tooltip>
  );
}
