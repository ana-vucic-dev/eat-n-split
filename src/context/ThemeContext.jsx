import { createContext, useState } from 'react';

const ThemeContext = createContext();
export default ThemeContext;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ||
      (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  );

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
