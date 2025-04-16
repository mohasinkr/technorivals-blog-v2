import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Tag from "../Elements/Tag";
import { slug } from "github-slugger";
import { PostStoryblok } from "@/src/types/sb-schema";
import { StoryblokStory } from "@/src/lib/storyblok";

const HomeCoverSection = ({
  blogs,
}: {
  blogs: StoryblokStory<PostStoryblok>[];
}) => {
  // Use the first blog post (already sorted by Storyblok)
  const blog = blogs[0];

  // Use useEffect to log data after component mounts
  useEffect(() => {
    console.log("Image filename:", blog.content?.image?.filename);
    console.log("Full blog data:", JSON.stringify(blog, null, 2));
  }, [blog]);

  // Check if blog exists
  if (!blog) {
    console.error("No blog data available");
    return <div>No blog posts available</div>;
  }

  // Default placeholder image if no image is available
  const placeholderImage = "/blogs/placeholder.jpg";

  // Get the image URL, ensuring it's a full URL
  const imageUrl = blog.content.image?.filename || placeholderImage;
  console.log("Using image URL:", imageUrl);
  // Default blur data URL for better loading experience
  const placeholderBlurDataURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM+fWZcm3u0VCfpJb6YYjUOfHrUUUghZZ2P0AZ7p//9k=";

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-10
            "
        />
        {/* Image debugging is done in useEffect */}
        <Image
          src={imageUrl}
          placeholder="blur"
          blurDataURL={placeholderBlurDataURL}
          alt={
            blog.content.image?.alt || blog.content.title || "Blog cover image"
          }
          fill
          className="w-full h-full object-center object-cover rounded-3xl z-0"
          sizes="100vw"
          priority
          unoptimized={true}
        />

        <div className="w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-20 text-light">
          <Tag
            link={`/categories/${slug(blog.tag_list?.[0] || "uncategorized")}`}
            name={blog.tag_list?.[0] || "uncategorized"}
          />
          <Link href={`/blogs/${blog.slug}`} className="mt-6">
            <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
              <span
                className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
              >
                {blog.content.title || blog.name}
              </span>
            </h1>
          </Link>
          <p className="hidden sm:inline-block mt-4 md:text-lg lg:text-xl font-in">
            {blog.content.intro || ""}
          </p>
        </div>
      </article>
    </div>
  );
};

export default HomeCoverSection;
