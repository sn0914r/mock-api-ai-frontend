import { useState } from "react";
import { Zap, Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../../app/theme";
import {
  Nav,
  LogoGroup,
  LogoBadge,
  LogoText,
  LogoAccent,
  ThemeButton,
} from "./Navbar.styles";

export const Navbar = () => {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  const handleToggle = () => {
    toggleTheme();
    setIsDark((prev) => !prev);
  };

  return (
    <Nav>
      <LogoGroup>
        <LogoBadge>
          <Zap size={16} />
        </LogoBadge>
        <LogoText>
          Mock<LogoAccent>-api-ai</LogoAccent>
        </LogoText>
      </LogoGroup>

      <ThemeButton onClick={handleToggle} aria-label="Toggle theme">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </ThemeButton>
    </Nav>
  );
};
