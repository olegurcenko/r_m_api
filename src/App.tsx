import React from 'react';
import { AppRouter } from './appRouter';
import { Header } from './sections/components/header';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Header/>
        <AppRouter/>
      </>
    </Router>
  );
}

export default App;
