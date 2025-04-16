import { getStoryblokApi, ISbStoriesParams } from "@storyblok/react";
import { PostStoryblok } from "@/src/types/sb-schema";

// Custom StoryblokStory interface that extends ISbStoryData but allows for generic content type
export interface StoryblokStory<T = any> {
  content: T;
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string;
  first_published_at: string;
  sort_by_date: string | null;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number | null;
  group_id: string;
  alternates: any[];
  release_id: null;
  language: string;
}

export interface StoryblokApiOptions extends ISbStoriesParams {
  starts_with?: string;
  is_startpage?: boolean;
  with_tag?: string;
  sort_by?: string;
  per_page?: number;
  page?: number;
}

/**
 * Determine which version to use based on environment
 * - Use 'draft' for development
 * - Use 'published' for production
 */
export function getVersionByEnvironment(): "draft" | "published" {
  // Check if we're in development mode
  const isDevelopment =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

  return isDevelopment ? "draft" : "published";
}

/**
 * Singleton pattern for Storyblok API instance
 * This ensures we use a single instance across the application
 */
let storyblokApiInstance: ReturnType<typeof getStoryblokApi> | null = null;

/**
 * Get the Storyblok API instance (singleton pattern)
 * Storyblok is already initialized in _app.tsx
 */
export function getStoryblokApiInstance() {
  // Return the existing instance if we already have one
  if (storyblokApiInstance) {
    return storyblokApiInstance;
  }

  // Otherwise create and store a new instance
  try {
    storyblokApiInstance = getStoryblokApi();
    return storyblokApiInstance;
  } catch (error) {
    console.error("Error getting Storyblok API instance:", error);
    throw new Error(
      "Failed to get Storyblok API instance. Make sure it's initialized in _app.tsx"
    );
  }
}

/**
 * Reset the Storyblok API instance
 * This can be useful if you need to reinitialize Storyblok with different parameters
 */
export function resetStoryblokApiInstance() {
  storyblokApiInstance = null;
}

/**
 * Fetch multiple stories from Storyblok
 * @param options - Options for the Storyblok API call
 * @returns Array of Storyblok stories
 */
export const fetchStories = async (
  options: StoryblokApiOptions = {}
): Promise<StoryblokStory[]> => {
  try {
    // Get the Storyblok API instance
    const storyblokApi = getStoryblokApiInstance();

    // Determine version based on environment
    const defaultOptions: ISbStoriesParams = {
      version: "draft", // Automatically use draft for dev, published for prod
    };

    const { data } = await storyblokApi.get("cdn/stories", {
      ...defaultOptions,
      ...options,
    } as ISbStoriesParams);

    return data?.stories || [];
  } catch (error) {
    console.error("Error fetching stories from Storyblok:", error);
    return [];
  }
};

/**
 * Fetch a single story from Storyblok by its full slug
 * @param fullSlug - The full slug of the story
 * @param options - Additional options for the Storyblok API call
 * @returns A single Storyblok story or null if not found
 */
export const fetchStory = async (
  fullSlug: string,
  options: StoryblokApiOptions = {}
): Promise<StoryblokStory | null> => {
  try {
    // Make sure fullSlug is not null or undefined
    if (!fullSlug) {
      console.error("Error: fullSlug is required for fetchStory");
      return null;
    }

    // Get the Storyblok API instance
    const storyblokApi = getStoryblokApiInstance();

    // Determine version based on environment
    const defaultOptions: ISbStoriesParams = {
      version: getVersionByEnvironment(), // Automatically use draft for dev, published for prod
    };

    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      ...defaultOptions,
      ...options,
    } as ISbStoriesParams);

    return data?.story || null;
  } catch (error) {
    console.error(`Error fetching story ${fullSlug} from Storyblok:`, error);
    return null;
  }
};

/**
 * Fetch all blog posts from Storyblok
 * @param options - Additional options for the Storyblok API call
 * @returns Array of blog post stories
 */
export const fetchBlogPosts = async (
  options: StoryblokApiOptions = {}
): Promise<StoryblokStory<PostStoryblok>[]> => {
  return fetchStories({
    starts_with: "posts",
    // Sort by first_published_at in descending order by default
    sort_by: "first_published_at:desc",
    ...options, // Allow overriding the default sort
  });
};

/**
 * Fetch a single blog post from Storyblok by its slug
 * @param slug - The slug of the blog post (without the "posts/" prefix)
 * @param options - Additional options for the Storyblok API call
 * @returns A single blog post story or null if not found
 */
export const fetchBlogPost = async (
  slug: string,
  options: StoryblokApiOptions = {}
): Promise<StoryblokStory | null> => {
  // Check if slug is provided
  if (!slug) {
    console.error("Error: slug is required for fetchBlogPost");
    return null;
  }

  try {
    return await fetchStory(`posts/${slug}`, options);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
};
