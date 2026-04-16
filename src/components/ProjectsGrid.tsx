import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from '@/types';
import { Users, Calendar, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { db, collection, query, where, onSnapshot, addDoc, Timestamp, deleteDoc, doc } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

export default function ProjectsGrid() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'projects'), where('owner_uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const handleAddProject = async () => {
    if (!user || !newName) return;
    try {
      await addDoc(collection(db, 'projects'), {
        name: newName,
        description: newDesc,
        owner_uid: user.uid,
        created_at: Timestamp.now()
      });
      setIsAddDialogOpen(false);
      setNewName('');
      setNewDesc('');
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green"></div></div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="bg-card border-border hover:border-accent-green/30 transition-all group relative">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-foreground group-hover:text-accent-green transition-colors">
                {project.name}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDeleteProject(project.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-muted-foreground line-clamp-2 mt-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>Active Project</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between hover:bg-accent-green/5 hover:text-accent-green text-muted-foreground">
              View Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Card className="bg-transparent border-dashed border-border hover:border-accent-green/50 transition-all cursor-pointer flex items-center justify-center p-8 group">
            <div className="text-center space-y-2">
              <div className="bg-secondary rounded-full h-12 w-12 flex items-center justify-center mx-auto border border-border group-hover:bg-accent-green/10 group-hover:border-accent-green/30 transition-all">
                <Plus className="h-6 w-6 text-muted-foreground group-hover:text-accent-green" />
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground">Create New Project</p>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Enter a name and description for your project group.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Project Name</label>
              <Input 
                value={newName} 
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Tech Influencers" 
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
              <Input 
                value={newDesc} 
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Brief description..." 
                className="bg-background border-border"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProject} className="bg-accent-green text-black font-bold">Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
