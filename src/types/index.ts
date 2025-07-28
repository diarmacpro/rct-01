export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Bot {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'training';
  createdAt: string;
  lastActive: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}