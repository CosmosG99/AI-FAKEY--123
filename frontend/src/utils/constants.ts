// API Base URL - Update this when connecting to your backend
export const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'http://localhost:5000/api';

// Local Storage Keys
export const AUTH_TOKEN_KEY = 'fakecheck_auth_token';
export const USER_DATA_KEY = 'fakecheck_user_data';

// Verification Result Types
export const RESULT_TYPES = {
  TRUE: 'true',
  UNCERTAIN: 'uncertain',
  FALSE: 'false',
} as const;

// Result Colors (Dark Theme)
export const RESULT_COLORS = {
  [RESULT_TYPES.TRUE]: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500',
    icon: '🟢',
    label: 'Likely True'
  },
  [RESULT_TYPES.UNCERTAIN]: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500',
    text: 'text-yellow-400',
    badge: 'bg-yellow-500',
    icon: '🟡',
    label: 'Uncertain'
  },
  [RESULT_TYPES.FALSE]: {
    bg: 'bg-rose-500/20',
    border: 'border-rose-500',
    text: 'text-rose-400',
    badge: 'bg-rose-500',
    icon: '🔴',
    label: 'Likely False'
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  HISTORY: '/history',
  COMMUNITY: '/community',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  CONTACT: '/contact',
} as const;
