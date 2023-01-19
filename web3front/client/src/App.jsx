import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./pages";
import { Web3Provider } from "./context/Web3Context";

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <AppRouter />
      </div>
    </Web3Provider>
  );
}

export default App;
