import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button.tsx';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[#18181b] p-10 rounded-2xl border border-[#27272a] shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-[#22c55e]/10 rounded-2xl border border-[#22c55e]/20 mb-6">
            <span className="text-3xl font-black text-[#22c55e]">X</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">X Manager</h2>
          <p className="mt-2 text-sm text-[#a1a1aa]">
            Please sign in to access your dashboard.
          </p>
        </div>
        
        <div className="mt-8">
          <Button 
            onClick={login}
            className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-black font-bold h-12 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <LogIn className="h-5 w-5" />
            Sign in with Google
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-[#a1a1aa] uppercase tracking-widest font-semibold">
            Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
