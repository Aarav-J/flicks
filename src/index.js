import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import Search from "./pages/Search";
import Watched from "./pages/Watched";
import Nav from "./components/Nav";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Nav />
      <Router>
        <Routes>
          <Route path="/flicks" element={<App />} />
          <Route path="/flicks/search" element={<Search />} />
          <Route path="/flicks/watched" element={<Watched />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
