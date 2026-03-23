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
export interface ArticleQuery {
  tag?: string;
  feed?: boolean;
  author?: string;
  favorited?: string;
}
export interface CreateArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
