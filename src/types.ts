export interface XAccount {
  id: string;
  handle: string;
  display_name: string;
  followers: number;
  category: string;
  status: 'active' | 'banned';
  email?: string;
  password?: string;
  two_fa_seed?: string;
  notes?: string;
  owner_uid: string;
  project_id?: string;
  created_at: any;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  accountCount: number;
  status: 'ACTIVE' | 'ARCHIVED';
  lastModified: string;
}
