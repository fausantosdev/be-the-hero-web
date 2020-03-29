import React, { useState } from 'react';

import Routes from './routes'

import './global.css'

function App() {

  const { teste, setTeste } = useState(0)

  return (
    <Routes />
  );
}

export default App;
