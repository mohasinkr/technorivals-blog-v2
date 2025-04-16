import { AssetStoryblok, PostStoryblok } from "./sb-schema";
import { StoryblokStory } from "storyblok-generate-ts";

/**
 * Common interface for blog data that can be either from Storyblok or our adapted format
 */
export interface BlogData {
  // Basic blog information
  title?: string;
  description?: string;
  intro?: string; // Same as description in Storyblok
  
  // URL and slug
  url?: string;
  slug?: string;
  
  // Dates
  publishedAt?: string;
  updatedAt?: string;
  
  // Content
  body?: string | any; // Can be string or rich text object
  long_text?: any; // Storyblok rich text
  
  // Image - can be either Storyblok Asset or our adapted format
  image?: AssetStoryblok | {
    src?: string;
    filename?: string;
    blurDataURL?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  
  // Metadata
  tags?: string[];
  author?: string | StoryblokStory<any>;
  
  // Other properties
  isPublished?: boolean;
  readingTime?: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  
  // Allow additional properties
  [key: string]: any;
}

/**
 * Type guard to check if a blog is a Storyblok story
 */
export function isStoryblokStory(blog: any): blog is StoryblokStory<PostStoryblok> {
  return blog && blog.content && blog.uuid && blog.full_slug;
}

/**
 * Type guard to check if an image is a Storyblok asset
 */
export function isStoryblokAsset(image: any): image is AssetStoryblok {
  return image && image.filename && image.id !== undefined;
}
