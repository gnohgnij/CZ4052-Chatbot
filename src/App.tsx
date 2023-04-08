import EmbeddedWebchat from "./EmbeddedWebchat/index";

const BOT_ID = "0b1a2d2a-732f-486d-b7d9-f0dcb7f514c1";
const App = () => {
  return (
    <div className="App">
      <EmbeddedWebchat botID={BOT_ID} />
    </div>
  );
};

export default App;
