import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import ScoutPage from './pages/ScoutPage';
import BudgetPage from './pages/BudgetPage';
import { Dashboard } from './pages/Dashboard';
import TrophiesPage from './pages/TrophiesPage';
import SeasonPage from './pages/SeasonPage';
import { TeacherLogin } from './pages/login/TeacherLogin.jsx';
import { StudentLogin } from './pages/login/StudentLogin.jsx';
import TeacherDashboard from './pages/TeacherDashboard';
import PageNotFound from './components/page-not-found';
import { TeacherPortal } from './pages/portal/TeacherPortal';
import Signup from './pages/Signup';
import { IceBackground } from '@components';
import { StudentPortal } from './pages/portal/StudentPortal';
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
          path='/home'
          render={(props) => (
            <StudentPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<HomePage {...props} />}
            />
          )}
        />
        <Route
          exact
          path='/team'
          render={(props) => (
            <StudentPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<TeamPage {...props} />}
            />
          )}
        />
        <Route
          exact
          path='/scout'
          render={(props) => (
            <StudentPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<ScoutPage {...props} />}
            />
          )}
        />
        <Route
          exact
          path='/budget'
          render={(props) => (
            <StudentPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<BudgetPage {...props} />}
            />
          )}
        />
        <Route
          exact
          path='/season'
          render={(props) => (
            <StudentPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<SeasonPage {...props} />}
            />
          )}
        />
        <Route
          exact
          path='/trophies'
          render={(props) => (
            <StudentPortal
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              screen={<TrophiesPage {...props} />}
            />
          )}
        />
        <Route
          exact
          path='/teacher/home'
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
          path='/login/teacher'
          render={(props) => (
            <TeacherLogin {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route
          exact
          path='/login/student'
          render={(props) => (
            <StudentLogin {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Redirect from='/' to='/home' />
        <Route component={PageNotFound} />
      </Switch>
      <IceBackground />
    </Router>
  ) : (
    <Router>
      <Switch>
        <Route
          exact
          path='/login/teacher'
          render={(props) => <TeacherLogin {...props} />}
        />
        <Route
          exact
          path='/login/student'
          render={(props) => (
            <StudentLogin {...props} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/dashboard' component={Dashboard} />
        {protectedRoutes.includes(window.location.pathname) && (
          <Redirect to='/dashboard' />
        )}
        <Route component={PageNotFound} />
      </Switch>
      <IceBackground />
    </Router>
  );
};
