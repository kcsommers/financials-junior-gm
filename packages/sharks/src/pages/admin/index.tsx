import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { CoreAdminPage } from '@statrookie/core/src/pages/admin/admin';
import { API_BASE_URL } from '../../constants/api-base-url';

const AdminPage = () => {
  return <CoreAdminPage apiBaseUrl={API_BASE_URL} />;
};

export default () => {
  return (
    <ProtectedRoute
      apiBaseUrl={API_BASE_URL}
      permittedRoles={[UserRoles.ADMIN]}
    >
      <AdminPage />
    </ProtectedRoute>
  );
};
