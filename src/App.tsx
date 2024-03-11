import { Provider } from "react-redux";
import store from "./app/store";
import Box from "@mui/material/Box";
import AppThemeProvider from "./components/AppThemeProvider";
import AppRoutes from "./routes/AppRoutes";
import SuccessMessage from "./components/SuccessMessage";

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <AppRoutes />
        {/* <Box
          sx={{
            zIndex: 1400,
            position: "fixed",
            left: "50%",
            bottom: 0,
          }}
        >
          <SuccessMessage
            open={true}
            message="success1"
            sx={{ position: "static" }}
          />
          <SuccessMessage
            open={true}
            message="success2"
            sx={{ position: "static" }}
          />
          <SuccessMessage
            open={true}
            message="success3"
            sx={{ position: "static" }}
          />
        </Box> */}
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
