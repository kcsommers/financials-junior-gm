import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/auth-context';
import { UserRole } from '../../auth/users/user-roles';
import { ApiHelper } from '../../api/api-helper';
import { LoadingSpinner } from '../LoadingSpinner';

type ProtectedRouteProps = PropsWithChildren<{
  apiBaseUrl: string;
  permittedRoles?: '*' | UserRole[];
}>;

export const ProtectedRoute = ({
  children,
  apiBaseUrl,
  permittedRoles = [],
}: ProtectedRouteProps) => {
  const { isLoggedIn, authInitialized, authorizedUser, logUserOut } = useAuth();
  const router = useRouter();

  const [isPermitted, setIsPermitted] = useState(false);

  const checkPermissions = () => {
    const userRole = authorizedUser?.role;
    const isPermitted =
      permittedRoles === '*' || permittedRoles.includes(userRole);
    return isPermitted;
  };

  useEffect(() => {
    if (!authInitialized) {
      return;
    }

    (async () => {
      if (!isLoggedIn) {
        await ApiHelper.logout(apiBaseUrl);
        logUserOut();
        router.push('/');
        return;
      }
      if (!checkPermissions()) {
        router.push('/');
        return;
      }
      setIsPermitted(true);
    })();
  }, [authInitialized, isLoggedIn]);

  if (!authInitialized) {
    return (
      <div className="text-center py-8 h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return isPermitted && <>{children}</>;
};
