import { User } from './user.model';

export interface AuthResponse {
  user: User;
  errors: Record<string, string[]>;
}
