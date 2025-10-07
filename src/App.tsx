import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/config';
import { useAuth } from './hooks/useAuth';
import { AuthService } from './services/authService';
import { ProtectedRoute } from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import ModuleI from './components/ModuleI';
import ModuleII from './components/ModuleII';
import ModuleIII from './components/ModuleIII';
import ModuleIV from './components/ModuleIV';
import ModuleV from './components/ModuleV';

function App() {
  const [currentModule, setCurrentModule] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: ssoLoading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check if user is authenticated via SSO or Firebase
  const isUserAuthenticated = isAuthenticated || isLoggedIn;
  const isAppLoading = ssoLoading || isLoading;

  const renderModule = () => {
    if (isAppLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isUserAuthenticated) {
      // If SSO user exists but not authenticated, show SSO login message
      if (user) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
              <p className="text-gray-600 mb-4">
                This app requires authentication through the main BcomBuddy platform.
              </p>
              <p className="text-sm text-gray-500">
                Please access this app through the BcomBuddy dashboard.
              </p>
            </div>
          </div>
        );
      }
      // Fallback to Firebase login
      return <Login onLogin={() => setIsLoggedIn(true)} />;
    }

    switch (currentModule) {
      case 'home':
        return <Home />;
      case 'module1':
        return <ModuleI />;
      case 'module2':
        return <ModuleII />;
      case 'module3':
        return <ModuleIII />;
      case 'module4':
        return <ModuleIV />;
      case 'module5':
        return <ModuleV />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isUserAuthenticated ? (
        <div className="flex min-h-screen bg-gray-50">
          {/* Show SSO user info in header if authenticated via SSO */}
          {isAuthenticated && user && (
            <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-2 z-50">
              <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
                <div className="text-sm">
                  <span className="font-semibold">Welcome, {user.name}!</span>
                  <span className="ml-2 text-gray-300">({user.email})</span>
                  <span className="ml-2 text-gray-400">Role: {user.role}</span>
                </div>
                <button 
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          
          <Sidebar 
            currentModule={currentModule} 
            onModuleChange={setCurrentModule} 
            onLogout={isAuthenticated ? logout : () => setIsLoggedIn(false)} 
          />
          <div className="flex-1 ml-80" style={{ marginTop: isAuthenticated ? '40px' : '0' }}>
            <main className="p-8">
              {renderModule()}
            </main>
          </div>
        </div>
      ) : (
        renderModule()
      )}
    </div>
  );
}

export default App;