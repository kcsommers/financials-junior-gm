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
import Dashboard from './pages/Dashboard';
import TrophiesPage from './pages/TrophiesPage';
import SeasonPage from './pages/SeasonPage';
import { TeacherLogin } from './pages/login/TeacherLogin.jsx';
import { StudentLogin } from './pages/login/StudentLogin.jsx';
import TeacherDashboard from './pages/TeacherDashboard';
import PageNotFound from './components/page-not-found';
import TeacherPortal from './pages/portal/Teacher';
import Signup from './pages/Signup';
import { IceBackground } from '@components';
import { UserRoles } from '@data/auth/auth';

const protectedRoutes = [
  '/home',
  '/team',
  '/budget',
  '/season',
  '/scout',
  '/trophies',
  '/teacher/home',
];

export const AppRouter = ({ isLoggedIn, shouldRedirect, onLogin }) => {
  return isLoggedIn && !shouldRedirect ? (
    <Router>
      <Switch>
        <Route
          exact
          path={['/home']}
          render={(props) => <HomePage {...props} />}
        />
        <Route exact path='/team' render={(props) => <TeamPage {...props} />} />
        <Route
          exact
          path='/scout'
          render={(props) => <ScoutPage {...props} />}
        />
        <Route
          exact
          path='/budget'
          render={(props) => <BudgetPage {...props} />}
        />
        <Route
          exact
          path='/season'
          render={(props) => <SeasonPage {...props} />}
        />
        <Route
          exact
          path='/trophies'
          render={(props) => <TrophiesPage {...props} />}
        />
        <Route
          exact
          path='/teacher/home'
          render={(props) => (
            <TeacherPortal screen={<TeacherDashboard {...props} />} />
          )}
        />
        <Route
          exact
          path='/login/teacher'
          render={(props) => <TeacherLogin {...props} onLogin={onLogin} />}
        />
        <Route
          exact
          path='/login/student'
          render={(props) => <StudentLogin {...props} onLogin={onLogin} />}
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
          render={(props) => <TeacherLogin {...props} onLogin={onLogin} />}
        />
        <Route
          exact
          path='/login/student'
          render={(props) => <StudentLogin {...props} onLogin={onLogin} />}
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
