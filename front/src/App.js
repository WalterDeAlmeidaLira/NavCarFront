import React from "react";
import { BrowserRouter as Router} from 'react-router-dom'
import RoutesSwitch from './routes'

function App() {
  return (
    <Router>
      <RoutesSwitch />
    </Router>
  );
}

export default App;
