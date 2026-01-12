import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MyWorkPage from './pages/Dashboard';
import AllProjectsPage from './pages/All_Projects';

// Mock workspace data dựa trên Workspace.md
const MOCK_WORKSPACE = {
  workspace_id: 'ws-1',
  name: 'PronaFlow Team',
};

function App() {
  // Quản lý route tạm thời để demo (Sau này dùng React Router)
  const [currentPath, setCurrentPath] = useState('/dashboard');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Component điều hướng chính */}
      <Sidebar 
        currentWorkspace={MOCK_WORKSPACE} 
        activePath={currentPath}
        onNavigate={setCurrentPath}
      />

      {/* Main Container - Khu vực hiển thị nội dung */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {/* Router logic giả định */}
          {currentPath === '/dashboard' && <MyWorkPage />}
          {currentPath === '/projects' && <AllProjectsPage />}
          
          {/* Navigation Helper cho demo */}
          <div className="fixed bottom-4 right-4 flex gap-2 z-50 bg-white p-2 rounded-full shadow-lg border border-slate-200">
             <button 
               onClick={() => setCurrentPath('/dashboard')}
               className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${currentPath === '/dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
             >
               Dashboard
             </button>
             <button 
               onClick={() => setCurrentPath('/projects')}
               className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${currentPath === '/projects' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
             >
               Projects
             </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;