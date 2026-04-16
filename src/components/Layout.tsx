import React from 'react';
import { Button } from "@/components/ui/button.tsx";
import { Plus, Users as UsersIcon, FolderKanban, Settings, Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'accounts' | 'projects';
  setActiveTab: (tab: 'accounts' | 'projects') => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent-green/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md h-14">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8 h-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight">X MANAGER</span>
            </div>

            <nav className="flex items-center gap-6 h-full">
              <button 
                onClick={() => setActiveTab('accounts')}
                className={`h-full px-1 text-sm font-medium transition-all relative flex items-center ${activeTab === 'accounts' ? 'text-foreground after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:height-[2px] after:bg-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Accounts
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`h-full px-1 text-sm font-medium transition-all relative flex items-center ${activeTab === 'projects' ? 'text-foreground after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:height-[2px] after:bg-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Projects
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={user?.photoURL || ''} />
                <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-muted-foreground hidden md:block">{user?.displayName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground hover:text-destructive h-9 w-9" title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
            <div className="h-4 w-[1px] bg-border mx-1"></div>
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-add-account'))}
              className="bg-[#22c55e] hover:bg-[#1eb054] text-black font-semibold h-9 px-4 rounded-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Accounts Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and monitor your connected X profiles.
            </p>
          </div>
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 X Manager Dashboard. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
