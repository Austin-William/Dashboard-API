import React from "react";
import Home from "./routes/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}
export default App;