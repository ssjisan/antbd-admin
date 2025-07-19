import { BrowserRouter } from "react-router-dom";
import Theme from "./Theme/index";
import DataProcessing from "./DataProcessing/DataProcessing";
import MainRouters from "./Routes/MainRouters";

function App() {
  return (
    <DataProcessing>
      <Theme>
        <BrowserRouter>
          <MainRouters />
        </BrowserRouter>
      </Theme>
    </DataProcessing>
  );
}

export default App;
