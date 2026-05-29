import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import appLogo from './assets/octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white sticky-top">
        <div className="container py-3 d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <img src={appLogo} alt="OctoFit logo" width="48" height="48" className="rounded" />
            <div>
              <h1 className="h3 mb-1">OctoFit Tracker</h1>
              <p className="mb-0 text-muted">React 19 presentation tier</p>
            </div>
          </div>

          <nav className="d-flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-dark' : 'btn-outline-secondary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
