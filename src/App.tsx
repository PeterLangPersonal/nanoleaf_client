import React from 'react';

import { Graph, Header } from './components';
import { GraphProvider } from './contexts/graph';

function App() {
  return (
    <GraphProvider>
      <Header/>
      <Graph/>
    </GraphProvider>
  );
}

export default App;
