export type User = {
  id: number;
  email?: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  token?: string;
};

export type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  saveSession: (session: User) => void;
  removeSession: () => void;
};
