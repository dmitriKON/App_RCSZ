import React from 'react';
import './App.css';
import Main from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
      <React.StrictMode>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </React.StrictMode>
  );
}

export default App;
