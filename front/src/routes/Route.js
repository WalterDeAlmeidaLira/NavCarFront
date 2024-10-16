import { Navigate } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const loading = false;
  const signed = false;

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!signed && isPrivate) {
    return <Navigate to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/register" />;
  }

  return <Component {...rest} />;
}