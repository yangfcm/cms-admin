import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mdTheme = createTheme({
    // Add customised theme.
    palette: {
      // mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
