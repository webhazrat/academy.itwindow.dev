import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeChanger({ theme, setTheme }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={(e) => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <span className="sr-only">Theme Changer</span>
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
