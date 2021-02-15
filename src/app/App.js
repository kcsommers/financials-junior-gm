import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Season from './pages/Season';
import ScoutPage from './pages/ScoutPage';
import { IceBackground } from '@components';
import BudgetPage from './pages/BudgetPage';
import Dashboard from './pages/Dashboard';
import TeacherLogin from './pages/login/Teacher.jsx';
import StudentLogin from './pages/login/Student.jsx';
import TeacherDashboard from './pages/TeacherDashboard';
import Sign from './components/Sign';
import PageNotFound from './components/page-not-found';
import TeacherPortal from './pages/portal/Teacher';
import StudentPortal from './pages/portal/Student';
import { getStudent } from './dummy-data';
import { setStudent } from '@redux/actions';
import '@css/App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getStudent()
      .then((s) => dispatch(setStudent(s)))
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route
            exact
            path="/home"
            render={(props) => (
              <StudentPortal
                screen={
                  <HomePage />
                }
              />
            )}
          />
          <Route
            exact
            path="/team"
            render={(props) => (
              <StudentPortal
                screen={
                  <TeamPage />
                }
              />
            )}
          />
          <Route
            exact
            path="/scout"
            render={(props) => (
              <StudentPortal
                screen={
                  <ScoutPage />
                }
              />
            )}
          />
          <Route
            exact
            path="/sign"
            render={(props) => (
              <StudentPortal
                screen={
                  <Sign />
                }
              />
            )}
          />
          <Route
            exact
            path="/budget"
            render={(props) => (
              <StudentPortal
                screen={
                  <BudgetPage />
                }
              />
            )}
          />
          <Route
            exact
            path="/season"
            render={(props) => (
              <StudentPortal
                screen={
                  <Season />
                }
              />
            )}
          />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/login/teacher' component={TeacherLogin} />
          <Route exact path='/login/student' component={StudentLogin} />
          {/* <Route exact path='/teacher/home' component={TeacherDashboard} /> */}
          <Route
            exact
            path="/teacher/home"
            render={(props) => (
              <TeacherPortal
                screen={
                  <TeacherDashboard {...props}/>
                }
              />
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
        <IceBackground />
      </Router>
    </div>
  );
};
export default App;