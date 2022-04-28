export enum UserRoles {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRoles;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
