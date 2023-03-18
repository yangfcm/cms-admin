import { Provider } from "react-redux";
import store from "./app/store";
import AppThemeProvider from "./components/AppThemeProvider";

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <div>App is running</div>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
