import { User } from './user.model';

export interface AuthResponse {
  user: User;
}
export interface AuthErrorResponse {
  body: string[];
}
export interface AuthErrorArticleResponse {
  errors: Record<string, string[]>;
}
