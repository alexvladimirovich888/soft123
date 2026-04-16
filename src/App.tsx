import { useState } from 'react';
import Layout from './components/Layout';
import AccountsTable from './components/AccountsTable';
import ProjectsGrid from './components/ProjectsGrid';

export default function App() {
  const [activeTab, setActiveTab] = useState<'accounts' | 'projects'>('accounts');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'accounts' ? <AccountsTable /> : <ProjectsGrid />}
    </Layout>
  );
}
