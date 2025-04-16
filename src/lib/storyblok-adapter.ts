import { StoryblokStory } from "./storyblok";

/**
 * Adapts a Storyblok story to the blog format expected by the components
 * with robust null checking using short-circuiting
 */
export function adaptStoryblokToBlog(story: StoryblokStory) {
  // Safely access content with fallback to empty object
  const content = story?.content || {};

  // Placeholder image for when Storyblok image is missing
  const placeholderImage = "/placeholder.jpg";

  // Placeholder blur data URL
  const placeholderBlurDataURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM+fWZcm3u0VCfpJb6YYjUOfHrUUUghZZ2P0AZ7p//9k=";

  return {
    // Basic information with fallbacks
    title: content?.title || story?.name || "Untitled Post",
    publishedAt:
      story?.first_published_at ||
      story?.created_at ||
      new Date().toISOString(),
    updatedAt:
      story?.published_at || story?.created_at || new Date().toISOString(),
    description: content?.description || "",

    // Image with comprehensive null checking for Storyblok's image structure
    image: {
      // In Storyblok, images use 'filename' property
      src: content?.image?.filename || placeholderImage,

      // Always provide a blur data URL for better loading experience
      blurDataURL: placeholderBlurDataURL,

      // Try to get dimensions from various possible locations in the Storyblok data
      width:
        content?.image?.width ||
        content?.image?.dimensions?.width ||
        (content?.image?.dimension?.width
          ? parseInt(content?.image?.dimension?.width)
          : null) ||
        1200,
      height:
        content?.image?.height ||
        content?.image?.dimensions?.height ||
        (content?.image?.dimension?.height
          ? parseInt(content?.image?.dimension?.height)
          : null) ||
        630,

      // Get alt text from various possible locations
      alt:
        content?.image?.alt ||
        content?.image?.title ||
        content?.title ||
        story?.name ||
        "Blog post image",
    },

    // Other properties with fallbacks
    isPublished: story?.published_at ? true : false,
    author: content?.author || "Admin",
    tags:
      Array.isArray(content?.tags) && content.tags.length > 0
        ? content.tags
        : ["uncategorized"],
    // Handle different content formats from Storyblok
    body:
      typeof content?.content === "object"
        ? JSON.stringify(content.content) // Rich text comes as an object
        : content?.content || content?.body || "",
    toc: Array.isArray(content?.toc) ? content.toc : [], // Use TOC from Storyblok if available

    // URL and slug
    slug: story?.slug || "",
    url: story?.slug ? `/blogs/${story.slug}` : "/blogs",

    // Reading time (estimated)
    readingTime: {
      text: "5 min read",
      minutes: 5,
      time: 300000,
      words: 1000,
    },
  };
}

/**
 * Adapts an array of Storyblok stories to the blog format
 * with null checking to prevent errors
 */
export function adaptStoryblokStoriesToBlogs(
  stories: StoryblokStory[] | null | undefined
) {
  // Return empty array if stories is null or undefined
  if (!stories) return [];

  // Filter out any null or undefined stories before mapping
  return stories.filter((story) => story != null).map(adaptStoryblokToBlog);
}
