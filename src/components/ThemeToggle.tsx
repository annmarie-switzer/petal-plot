import { useEffect, useState } from 'react';
import { Moon, Sun } from '../icons';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button id="theme-toggle" onClick={() => setIsDark(!isDark)}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};
