import "./App.css";
import "./styles/colors.css";
import Navbar from "./components/Navbar/Navbar";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
