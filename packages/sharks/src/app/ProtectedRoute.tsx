import { LoadingSpinner, useAuth } from '@statrookie/core';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export const ProtectedRoute = ({ ...props }: RouteProps) => {
  const { authorizedUser, initialized } = useAuth();
  if (!initialized) {
    return <LoadingSpinner />;
  }
  if (!authorizedUser) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...props} />;
};