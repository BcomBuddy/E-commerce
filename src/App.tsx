import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ModuleI from './components/ModuleI';
import ModuleII from './components/ModuleII';
import ModuleIII from './components/ModuleIII';
import ModuleIV from './components/ModuleIV';
import ModuleV from './components/ModuleV';

function App() {
  const [currentModule, setCurrentModule] = useState('home');

  const renderModule = () => {
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      <div className="flex-1 ml-80">
        <main className="p-8">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}

export default App;