export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  preferences?: string[];
  role: 'USER' | 'ADMIN';
  createdAt: Date;
}
