import { useEffect, useState } from 'react';
import { Sun, Moon } from '../icons';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};
