import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './pages/App';
import Search from './pages/Search'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  <React.StrictMode>

   <Router>
      <Routes>
        <Route path ="/" element={<App />} />
        <Route path ="/search" element={<Search />} />
      </Routes>

   </Router>
  </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
