// App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Home from './pages/Home';
import Test from './components/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
