import GhostTag from './GhostTag';
import {GhostAuthor} from './GhostAuthor';

export default interface GhostPost {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  feature_image: string;
  excerpt: string;

  created_at_pretty: string;
  published_at_pretty: string;
  updated_at_pretty: string;

  created_at: string;
  published_at: string;
  updated_at: string;

  meta_title: string;
  meta_description: string;
  og_description: string;
  og_image: string;
  og_title: string;
  twitter_description: string;
  twitter_image: string;
  twitter_title: string;

  authors: GhostAuthor[];
  primary_author: GhostAuthor;

  tags: GhostTag[];
  primary_tag: GhostTag;

  plaintext: string;
  html: string;

  url: string;
  uuid: string;
  page: boolean;
  codeinjection_foot: string;
  codeinjection_head: string;
  comment_id;
}
