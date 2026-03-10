import { Author } from './author.model';

export interface Article {
  image: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface CommentResponse {
  comments: Comment[];
}

export interface CreateCommentResponse {
  comment: Comment;
}

export interface ArticleQuery {
  tag?: string;
  feed?: boolean;
}
