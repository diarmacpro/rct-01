export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface Bot {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  type: string;
  language: string;
  personality: string;
  status: 'active' | 'inactive' | 'training';
  createdAt: string;
  updatedAt: string;
  lastActive: string | null;
}

export interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (username: string, name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}