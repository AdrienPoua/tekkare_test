import DashboardLayout from './DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Orders from './pages/Orders';
import Rewards from './pages/Rewards';
import User from './pages/User';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="assets" element={<Assets />} />
        <Route path="orders" element={<Orders />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="user" element={<User />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
