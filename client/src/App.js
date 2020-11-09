import Routes from "./routes";
import { ListItemProvider } from './Context/ListItemProvider';
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
