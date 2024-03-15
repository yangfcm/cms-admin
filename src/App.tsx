import { Provider } from "react-redux";
import store from "./app/store";
import AppThemeProvider from "./components/AppThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import SnackbarProvider from "./components/SnackbarProvider";

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <SnackbarProvider>
          <AppRoutes />
        </SnackbarProvider>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
