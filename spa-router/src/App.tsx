import React, { useState } from 'react';
import Route from './components/Route';
import Router from './components/Router';
import Root from './pages/Root';
import About from './pages/About';

function App() {
  React.useEffect(() => {
    console.log('window.location', window.location);
  }, [window.location]);

  return (
    <Router>
      <Route path="/" component={<Root />} />
      <Route path="/about" component={<About />} />
    </Router>
  );
}

export default App;
