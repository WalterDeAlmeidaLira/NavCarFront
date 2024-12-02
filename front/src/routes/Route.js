import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {

  const {signed, loading} = useContext(AuthContext)
   
  if (loading) {
    return <div>Carregando...</div>;
  }

  
  if (!signed && isPrivate) {
    return <Navigate to="/register" />;
  }
  

  return <Component {...rest} />;
}