import { Moon, Sun, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button  className={"px-7 w-full flex justify-start items-center bg-background border border-primary dark:text-white text-black hover:text-white"} size={"icon"}>
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "light" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
          <p className="first-letter:capitalize">{theme}</p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={7} align="end">
        {["light", "dark"].map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => setTheme(item)}
            className="flex items-center justify-between"
          >
            <span className="capitalize">{item}</span>
            {theme === item && <Check className="w-4 h-4 opacity-80" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
