import { AuthProvider } from '@statrookie/core';
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { BASE_URL } from './api';
import { HomePage } from './pages/game/HomePage';
import { StudentLogin } from './pages/login/StudentLogin';
import { Dashboard } from './pages/teacher/Dashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { Location, History } from 'history';

export const AppRouter2 = () => {
  const location: Location = useLocation();
  const history: History = useHistory();

  return (
    <AuthProvider history={history} location={location} baseUrl={BASE_URL}>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={HomePage}
          // render={(_props: RouteComponentProps) => <HomePage {..._props} />}
        />
        <Route
          exact
          path="/login/student"
          render={(props) => <StudentLogin {...props} isLoggedIn={false} />}
        />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </AuthProvider>
  );
};
