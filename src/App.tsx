import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import Layout from './components/Layout';
import AccountsTable from './components/AccountsTable';
import ProjectsGrid from './components/ProjectsGrid';
import LoginPage from './components/LoginPage';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'accounts' | 'projects'>('accounts');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#22c55e]"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Restrict access to specific email if requested
  const allowedEmail = 'alexvladimirovich888@gmail.com';
  if (user.email !== allowedEmail) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Access Denied</h1>
          <p className="text-[#a1a1aa]">Your account is not authorized to access this dashboard.</p>
          <button onClick={() => window.location.reload()} className="text-[#22c55e] hover:underline">Try another account</button>
        </div>
      </div>
    );
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'accounts' ? <AccountsTable /> : <ProjectsGrid />}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
