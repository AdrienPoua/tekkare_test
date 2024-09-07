import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "../contexts/theme-provider"

export default function DarkAndLightButton() {
  const { setTheme, theme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ?
        <Sun /> :
        <Moon />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
