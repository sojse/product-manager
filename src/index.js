import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import UserAuthenticationProvider from "./provider/UserAuthenticationProvider";
import ProductProvider from "./provider/ProductProvider";
import CategoriesProvider from './provider/CategoriesProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserAuthenticationProvider>
      <ProductProvider> 
        <CategoriesProvider>
                <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </CategoriesProvider>

      </ProductProvider>
      </UserAuthenticationProvider>
    </Router>
  </React.StrictMode>
);