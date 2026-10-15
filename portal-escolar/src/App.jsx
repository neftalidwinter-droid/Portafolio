import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
 
  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);
 
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }
 
  if (currentUser.role === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }
 
  return <UserDashboard user={currentUser} onLogout={handleLogout} />;
}
 
export default App;
