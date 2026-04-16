export interface XAccount {
  id: string;
  handle: string;
  displayName: string;
  followers: number;
  category: string;
  addedDate: string;
  avatarUrl: string;
  badge?: 'GOLD' | 'BLUE' | 'NONE';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  accountCount: number;
  status: 'ACTIVE' | 'ARCHIVED';
  lastModified: string;
}
