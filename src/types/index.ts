// Common types for the application

export interface Blog {
  title: string;
  publishedAt: string;
  updatedAt: string;
  description: string;
  image: {
    src: string;
    [key: string]: any;
  };
  isPublished: boolean;
  author: string;
  tags: string[];
  body: string;
  toc: TableOfContents[];
  slug: string;
  url: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface TableOfContents {
  depth: number;
  value: string;
  url: string;
}

export interface SiteMetadata {
  title: string;
  author: string;
  headerTitle: string;
  description: string;
  language: string;
  theme: 'system' | 'dark' | 'light';
  siteUrl: string;
  siteLogo: string;
  socialBanner: string;
  email: string;
  github: string;
  twitter: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  dribbble: string;
  locale: string;
}

export interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}
