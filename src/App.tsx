import { Provider } from "react-redux";
import store from "./app/store";
import AppThemeProvider from "./components/AppThemeProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <AppRoutes />
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
