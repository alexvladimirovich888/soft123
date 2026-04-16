import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { XAccount } from '@/types';
import { Search, ArrowUpDown, X, Eye, EyeOff, Plus, ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { db, collection, query, where, onSnapshot, addDoc, Timestamp, deleteDoc, doc } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';

export default function AccountsTable() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<XAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // New Account Form State
  const [newAccount, setNewAccount] = useState({
    handle: '',
    display_name: '',
    followers: 0,
    category: 'TECH',
    status: 'active' as const,
    email: '',
    password: '',
    two_fa_seed: '',
    notes: ''
  });

  useEffect(() => {
    const handleOpenDialog = () => setIsAddDialogOpen(true);
    window.addEventListener('open-add-account', handleOpenDialog);
    return () => window.removeEventListener('open-add-account', handleOpenDialog);
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'accounts'), where('owner_uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const accountsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as XAccount[];
      setAccounts(accountsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching accounts:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const toggleVisibility = (accountId: string, field: string) => {
    const key = `${accountId}-${field}`;
    setVisibleFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddAccount = async () => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'accounts'), {
        ...newAccount,
        owner_uid: user.uid,
        created_at: Timestamp.now()
      });
      setIsAddDialogOpen(false);
      setNewAccount({
        handle: '',
        display_name: '',
        followers: 0,
        category: 'TECH',
        status: 'active',
        email: '',
        password: '',
        two_fa_seed: '',
        notes: ''
      });
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm("Are you sure you want to delete this account?")) return;
    try {
      await deleteDoc(doc(db, 'accounts', id));
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const filteredAccounts = accounts.filter(acc => 
    acc.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-card p-4 rounded-lg border border-border">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center bg-background rounded-md border border-border px-2 h-9">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">SORT:</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-foreground hover:bg-accent">Recent</Button>
            <Button variant="secondary" size="sm" className="h-7 text-xs px-2 bg-accent-green/10 text-accent-green hover:bg-accent-green/20 border-none">
              Followers <ArrowUpDown className="ml-1 h-3 w-3" />
            </Button>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 bg-accent-green hover:bg-accent-green/90 text-black font-bold text-xs">
                <Plus className="h-4 w-4 mr-2" />
                ADD ACCOUNT
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border text-foreground max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New X Account</DialogTitle>
                <DialogDescription>Enter the details of the account you want to manage.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Handle</label>
                  <Input 
                    value={newAccount.handle} 
                    onChange={e => setNewAccount({...newAccount, handle: e.target.value})}
                    placeholder="@username" 
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Display Name</label>
                  <Input 
                    value={newAccount.display_name} 
                    onChange={e => setNewAccount({...newAccount, display_name: e.target.value})}
                    placeholder="Name" 
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Email</label>
                  <Input 
                    value={newAccount.email} 
                    onChange={e => setNewAccount({...newAccount, email: e.target.value})}
                    placeholder="email@example.com" 
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Password</label>
                  <Input 
                    type="password"
                    value={newAccount.password} 
                    onChange={e => setNewAccount({...newAccount, password: e.target.value})}
                    placeholder="••••••••" 
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Followers</label>
                  <Input 
                    type="number"
                    value={newAccount.followers} 
                    onChange={e => setNewAccount({...newAccount, followers: parseInt(e.target.value) || 0})}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
                  <Select value={newAccount.category} onValueChange={v => setNewAccount({...newAccount, category: v})}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="NEWS">News</SelectItem>
                      <SelectItem value="POLITICS">Politics</SelectItem>
                      <SelectItem value="INFLUENCER">Influencer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAccount} className="bg-accent-green text-black font-bold">Save Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search handle or name..."
            className="pl-9 bg-background border-border h-9 text-xs focus-visible:ring-accent-green"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-white/[0.02]">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11">Handle</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11">Display Name</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11">Credentials</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11">Followers</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11 text-center">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No accounts found. Add your first account to get started.
                </TableCell>
              </TableRow>
            ) : filteredAccounts.map((account) => (
              <TableRow key={account.id} className="border-border hover:bg-white/[0.01] transition-colors group">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-full border border-border">
                      <AvatarFallback className="bg-accent-green/10 text-accent-green">{account.display_name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[#3b82f6] font-medium text-sm hover:underline cursor-pointer">{account.handle}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">{account.display_name}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 group/field">
                      <span className="text-[11px] font-mono text-muted-foreground w-32 truncate">
                        {visibleFields[`${account.id}-email`] ? account.email : '••••••••••••'}
                      </span>
                      <button onClick={() => toggleVisibility(account.id, 'email')} className="text-muted-foreground hover:text-foreground">
                        {visibleFields[`${account.id}-email`] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 group/field">
                      <span className="text-[11px] font-mono text-muted-foreground w-32 truncate">
                        {visibleFields[`${account.id}-pass`] ? account.password : '••••••••'}
                      </span>
                      <button onClick={() => toggleVisibility(account.id, 'pass')} className="text-muted-foreground hover:text-foreground">
                        {visibleFields[`${account.id}-pass`] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">
                  {account.followers.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={account.status === 'active' ? 'bg-accent-green/10 text-accent-green border-none' : 'bg-destructive/10 text-destructive border-none'}>
                    {account.status === 'active' ? <ShieldCheck className="h-3 w-3 mr-1" /> : <ShieldAlert className="h-3 w-3 mr-1" />}
                    {account.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteAccount(account.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
