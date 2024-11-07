import React from "react";
import { BrowserRouter as Router} from 'react-router-dom'
import RoutesSwitch from './routes'
import AuthProvider from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesSwitch />
      </Router>
    </AuthProvider>
  );
}

export default App;
