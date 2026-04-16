import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_PROJECTS } from '@/constants';
import { Users, Calendar, ArrowRight } from 'lucide-react';

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_PROJECTS.map((project) => (
        <Card key={project.id} className="bg-card border-border hover:border-accent-green/30 transition-all group">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-foreground group-hover:text-accent-green transition-colors">
                {project.name}
              </CardTitle>
              <Badge className={project.status === 'ACTIVE' ? 'bg-accent-green/10 text-accent-green border-none' : 'bg-muted text-muted-foreground border-none'}>
                {project.status}
              </Badge>
            </div>
            <CardDescription className="text-muted-foreground line-clamp-2 mt-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{project.accountCount} Accounts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{project.lastModified}</span>
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
      <Card className="bg-transparent border-dashed border-border hover:border-accent-green/50 transition-all cursor-pointer flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <div className="bg-secondary rounded-full h-12 w-12 flex items-center justify-center mx-auto border border-border">
            <span className="text-2xl text-muted-foreground">+</span>
          </div>
          <p className="text-sm font-medium text-muted-foreground">Create New Project</p>
        </div>
      </Card>
    </div>
  );
}
