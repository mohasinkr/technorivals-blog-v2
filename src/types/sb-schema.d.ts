import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetStoryblok {
  _uid?: string;
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface AuthorStoryblok {
  picture?: AssetStoryblok;
  _uid: string;
  component: "author";
  [k: string]: any;
}

export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (AuthorStoryblok | FeatureStoryblok | GridStoryblok | PageStoryblok | PostStoryblok | TeaserStoryblok)[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (AuthorStoryblok | FeatureStoryblok | GridStoryblok | PageStoryblok | PostStoryblok | TeaserStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface PostStoryblok {
  title?: string;
  author?: StoryblokStory<AuthorStoryblok> | string;
  image?: AssetStoryblok;
  intro?: string;
  long_text?: RichtextStoryblok;
  _uid: string;
  component: "post";
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
