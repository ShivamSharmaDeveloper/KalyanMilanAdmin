import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/index';
import Login from './pages/auth/login';
import { LoginLayout } from './layouts/auth/layout';
import { Layout } from './layouts/dashboard/layout';
import UserManagement from './pages/customers';
import GameManagement from './pages/companies';
import WalletManagement from './pages/account';
import Settings from './pages/settings';
import ErrorPage from './pages/404';
import User from './pages/single-user';
import Game from './pages/single-game';
import DeclareResult from './pages/result';

function App() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  return (
    <>
      {isLoginRoute &&
        (<LoginLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </LoginLayout>)}
      {!isLoginRoute && (
        <>
          <Layout>
            <Routes>
              {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/games" element={<GameManagement />} />
              <Route path="/games/:id" element={<Game />} />
              <Route path="/withdraw" element={<WalletManagement />} />
              <Route path="/result" element={<DeclareResult />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Layout>
        </>
      )}
    </>
  );
}

export default App;
