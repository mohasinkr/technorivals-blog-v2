import { storyblokInit, apiPlugin } from "@storyblok/react";
import BlogPost from "@/src/components/Storyblok/BlogPost";

const components = {
  blog_post: BlogPost,
};

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    components,
  });
}

export function initStoryblokOnClient() {
  if (typeof window !== "undefined") {
    initStoryblok();
  }
}
