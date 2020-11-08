import "./App.css";
import Routes from "./routes";
import { ListItemProvider } from './context/ListItemProvider';
function App() {
  return (
    <>
      <ListItemProvider>
        <Routes />
      </ListItemProvider>
    </>

  );
}

export default App;
