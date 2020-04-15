import React, { useEffect } from 'react';
import Routes from './src/screens/Routes';

import DatabaseInit from './db/database-init';

export default function App() {

  useEffect(() => {
    new DatabaseInit;
    console.log('database init');
  }, []);

  return (
    <Routes />
  );
} 