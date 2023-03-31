import { PDFViewer } from "@react-pdf/renderer";

import Resume from "./components/Resume";

const App = () => {
  return (
    <PDFViewer width={window.innerWidth} height={window.innerHeight}>
      <Resume />
    </PDFViewer>
  );
};

export default App;
