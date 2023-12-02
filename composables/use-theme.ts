export const useTheme = () => {
  const themeMode = useState('theme', () => 'light');

  const setTheme = (theme: any) => {
    themeMode.value = theme;
    localStorage.setItem('theme', themeMode.value);
  };

  const getTheme = () => {
    themeMode.value = localStorage.getItem('theme') || 'light';
  };

  return { setTheme, getTheme, themeMode };
};
