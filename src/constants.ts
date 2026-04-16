import { XAccount, Project } from './types';

export const MOCK_ACCOUNTS: XAccount[] = [
  {
    id: '1',
    handle: '@filmfare',
    display_name: 'Filmfare',
    followers: 6329093,
    category: 'TECH',
    status: 'active',
    owner_uid: 'mock',
    created_at: null
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Tech Influencers 2026',
    description: 'Main project for tracking top tech accounts in the EMEA region.',
    accountCount: 124,
    status: 'ACTIVE',
    lastModified: '2026-04-15',
  },
  {
    id: '2',
    name: 'News Aggregators',
    description: 'Global news outlets and independent journalists.',
    accountCount: 45,
    status: 'ACTIVE',
    lastModified: '2026-04-12',
  },
  {
    id: '3',
    name: 'Politics Archive',
    description: 'Historical data for political discourse tracking.',
    accountCount: 89,
    status: 'ARCHIVED',
    lastModified: '2026-03-01',
  },
  {
    id: '4',
    name: 'Entertainment Hub',
    description: 'Movie stars, musicians, and pop culture icons.',
    accountCount: 210,
    status: 'ACTIVE',
    lastModified: '2026-04-16',
  }
];
