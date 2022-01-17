import { useAuth } from '@statrookie/core';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const ProtectedRoute = ({ ...props }: RouteProps) => {
  const { authorizedUser } = useAuth();
  if (!authorizedUser) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...props} />;
};
