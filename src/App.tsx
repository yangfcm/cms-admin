import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <div>App is running</div>
    </Provider>
  );
}

export default App;
