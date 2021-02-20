import { AppRouter } from './AppRouter';
import { useSelector } from 'react-redux';
import '@css/App.css';

const App = () => {
  const { isLoggedIn, userRole } = useSelector((state) => state.loginState);

  console.log('IS LOGGED IN:::: ', isLoggedIn, userRole);
  return (
    <div className='app-container'>
      <AppRouter isLoggedIn={isLoggedIn} userRole={userRole} />
    </div>
  );
};
export default App;
