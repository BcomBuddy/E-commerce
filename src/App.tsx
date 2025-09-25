import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/config';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderModule = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isLoggedIn) {
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
      {isLoggedIn ? (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar 
            currentModule={currentModule} 
            onModuleChange={setCurrentModule} 
            onLogout={() => setIsLoggedIn(false)} 
          />
          <div className="flex-1 ml-80">
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