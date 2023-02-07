import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ApiHelper } from '../../server/api/api-helper';
import { useAuth } from '../../auth/context/auth-context';
import { LoadingSpinner } from '../LoadingSpinner';

export const ProtectedRoute = ({ children, apiBaseUrl }) => {
  const { isLoggedIn, authInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && !isLoggedIn) {
      router.push('/login');
      ApiHelper.logout(apiBaseUrl);
    }
  }, [authInitialized, isLoggedIn]);

  if (!authInitialized) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return isLoggedIn && children;
};
