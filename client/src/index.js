import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Create from "./routes/Create";
import Delete from "./routes/Delete";
import LoginScreen from "./routes/LoginScreen";
import RegisterScreen from "./routes/RegisterScreen";
import Dashboard from "./routes/Dashboard";
import Help from "./routes/Help";
import Error from "./routes/Error";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create/" element={<Create />} />
      <Route path="/delete/" element={<Delete />} />
      <Route path="/help/" element={<Help />} />
      <Route path="/login/" element={<LoginScreen />} />
      <Route path="/register/" element={<RegisterScreen />} />
      <Route path="/dashboard/" element={<Dashboard />} />
      <Route
        path="*"
        element={<Error />}
        options={{ status: 404 }}
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);