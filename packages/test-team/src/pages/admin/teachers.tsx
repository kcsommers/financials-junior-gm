import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { CoreTeachersPage } from '@statrookie/core/src/pages/admin/teachers';
import { API_BASE_URL } from '../../constants/api-base-url';

const TeachersPage = () => {
  return <CoreTeachersPage apiBaseUrl={API_BASE_URL} />;
};

export default () => {
  return (
    <ProtectedRoute
      apiBaseUrl={API_BASE_URL}
      permittedRoles={[UserRoles.ADMIN]}
    >
      <TeachersPage />
    </ProtectedRoute>
  );
};
