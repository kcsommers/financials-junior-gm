import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { ScoutPage } from './pages/ScoutPage';
import { BudgetPage } from './pages/BudgetPage';
import { Dashboard } from './pages/Dashboard';
import { TrophiesPage } from './pages/TrophiesPage';
import { SeasonPage } from './pages/SeasonPage';
import { TeacherLogin } from './pages/login/TeacherLogin.jsx';
import { StudentLogin } from './pages/login/StudentLogin.jsx';
import TeacherDashboard from './pages/TeacherDashboard';
import PageNotFound from './components/page-not-found';
import { TeacherPortal } from './pages/portal/TeacherPortal';
import Signup from './pages/Signup';
import { IceBackground } from '@components';
import { StudentPortal } from './pages/portal/StudentPortal';
import { AdminPage } from './pages/admin/AdminPage';
import { AdminLogin } from './pages/login/AdminLogin';
import { AdminPortal } from './pages/portal/AdminPortal';

const protectedRoutes = [
  '/home',
  '/team',
  '/budget',
  '/season',
  '/scout',
  '/trophies',
  '/teacher/home',
];

export const AppRouter = ({ isLoggedIn, userRole }) => {
  return isLoggedIn ? (
    <Router>
      <Switch>
        <Route
          exact
          path="/home"
          render={(props) => (
            <StudentPortal
              pageName="home"
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<HomePage {...props} />}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/team"
          render={(props) => (
            <StudentPortal
              pageName="team"
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<TeamPage {...props} />}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/scout"
          render={(props) => (
            <StudentPortal
              pageName="scout"
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<ScoutPage {...props} />}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/budget"
          render={(props) => (
            <StudentPortal
              pageName="budget"
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<BudgetPage {...props} />}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/season"
          render={(props) => (
            <StudentPortal
              pageName="season"
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<SeasonPage {...props} />}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/trophies"
          render={(props) => (
            <StudentPortal
              pageName="trophies"
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<TrophiesPage {...props} />}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/teacher/home"
          render={(props) => (
            <TeacherPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<TeacherDashboard {...props} />}
            />
          )}
        />
        <Route
          exact
          path={['/admin', '/admin/teachers']}
          render={(props) => (
            <AdminPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<AdminPage {...props} />}
            />
          )}
        />
        <Route
          exact
          path="/login/teacher"
          render={(props) => (
            <TeacherLogin {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          exact
          path="/login/student"
          render={(props) => (
            <StudentLogin {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          exact
          path="/admin/login"
          render={(props) => <AdminLogin {...props} isLoggedIn={isLoggedIn} />}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/home" />
        <Route component={PageNotFound} />
      </Switch>
      <IceBackground />
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route
          exact
          path="/login/teacher"
          render={(props) => <TeacherLogin {...props} />}
        />
        <Route
          exact
          path="/login/student"
          render={(props) => (
            <StudentLogin {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          exact
          path="/admin/login"
          render={(props) => <AdminLogin {...props} isLoggedIn={isLoggedIn} />}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
        {protectedRoutes.includes(window.location.pathname) && (
          <Redirect to="/dashboard" />
        )}
        {window.location.pathname === '/admin' && (
          <Redirect to="/admin/login" />
        )}
        <Redirect from="/" to="/dashboard" />
        <Route component={PageNotFound} />
      </Switch>
      <IceBackground />
    </Router>
  );
};
