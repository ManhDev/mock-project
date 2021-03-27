import { profile } from './profile';

export interface SingleArticle {
  article: {
    slug: String;
    title: String;
    description: String;
    body: String;
    tagList: string[];
    createdAt: String;
    updatedAt: String;
    favorited: boolean;
    favoritesCount: number;
    author: profile;
  };
}
