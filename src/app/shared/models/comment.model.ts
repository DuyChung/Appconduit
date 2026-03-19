import { Author } from "./author.model";

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
