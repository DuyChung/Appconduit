export interface Author {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
  followCount: number;
  favorited: number;
}
