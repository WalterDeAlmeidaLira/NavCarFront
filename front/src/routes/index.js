import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';
import RouteWrapper from './Route'; // Importação correta do wrapper

export default function RoutesSwitch() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<RouteWrapper component={Home} isPrivate={false} />} 
      />
      <Route 
        path="/login" 
        element={<RouteWrapper component={SingIn} isPrivate={false} />} 
      />
      <Route 
        path="/register" 
        element={<RouteWrapper component={SingUp} isPrivate={false} />} 
      />
    </Routes>
  );
}