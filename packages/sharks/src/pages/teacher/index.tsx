import { UserRoles } from '@statrookie/core/src/auth/users/user-roles';
import { ProtectedRoute } from '@statrookie/core/src/components/ProtectedRoute';
import { CoreTeacherDashboard } from '@statrookie/core/src/pages/teacher/teacher';
import { API_BASE_URL } from '../../constants/api-base-url';

const TeacherDashboard = () => {
  return <CoreTeacherDashboard apiBaseUrl={API_BASE_URL} />;
};

export default () => {
  return (
    <ProtectedRoute
      apiBaseUrl={API_BASE_URL}
      permittedRoles={[UserRoles.ADMIN, UserRoles.TEACHER]}
    >
      <TeacherDashboard />
    </ProtectedRoute>
  );
};
