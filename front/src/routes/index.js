import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';
import Rent from '../pages/Rent';
import Aluguel from '../pages/Aluguel';
import Pagamento from '../pages/Pagamento';
import Usuario from '../pages/Usuario';
import RouteWrapper from './Route'; 

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
      <Route 
        path="/user/rent" 
        element={<RouteWrapper component={Rent} isPrivate={true} />} 
      />
      <Route 
        path="/car/rent/:id" 
        element={<RouteWrapper component={Aluguel} isPrivate={true} />} 
      />
      <Route 
        path="/car/pagamento/:id" 
        element={<RouteWrapper component={Pagamento} isPrivate={true} />} 
      />
      <Route 
        path="/user/perfil/:id" 
        element={<RouteWrapper component={Usuario} isPrivate={true} />} 
      />
    </Routes>
  );
}