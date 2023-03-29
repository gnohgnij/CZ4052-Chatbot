import logo from "./logo.svg";
import "./App.css";
import { PDFViewer } from "@react-pdf/renderer";

import Resume from "./components/Resume";

const App = () => {
  return (
    <div className="App">
      <Resume />
    </div>
  );
};

export default App;
