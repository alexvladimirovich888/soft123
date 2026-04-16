import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { XAccount } from '@/types';
import { MOCK_ACCOUNTS } from '@/constants';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AccountsTable() {
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
            <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-foreground hover:bg-accent">Unused First</Button>
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-9 bg-background border-border text-xs">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
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
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11">Followers</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11 text-center">Category</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground h-11 text-right">Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ACCOUNTS.map((account) => (
              <TableRow key={account.id} className="border-border hover:bg-white/[0.01] transition-colors group">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-full border border-border">
                      <AvatarImage src={account.avatarUrl} />
                      <AvatarFallback>{account.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-[#3b82f6] font-medium text-sm hover:underline cursor-pointer">{account.handle}</span>
                      {account.badge === 'GOLD' && (
                        <Badge className="bg-[#eab308]/10 text-[#eab308] border-none text-[9px] h-4 px-1 font-bold">GOLD</Badge>
                      )}
                      {account.badge === 'BLUE' && (
                        <Badge className="bg-[#3b82f6]/10 text-[#3b82f6] border-none text-[9px] h-4 px-1 font-bold">BLUE</Badge>
                      )}
                      <X className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer hover:text-foreground transition-opacity" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-semibold text-foreground">{account.displayName}</TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground">
                  {account.followers.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <span className="bg-secondary text-foreground text-[11px] font-medium px-2.5 py-1 rounded-md">
                    {account.category}
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {account.addedDate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-1 mt-6">
        <Button variant="outline" size="icon" className="h-8 w-8 bg-accent-green/10 border-accent-green/20 text-accent-green text-xs">1</Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-xs hover:bg-accent">2</Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-xs hover:bg-accent">3</Button>
        <span className="px-2 text-muted-foreground">...</span>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-xs hover:bg-accent">23</Button>
        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-accent">Next →</Button>
      </div>
    </div>
  );
}
