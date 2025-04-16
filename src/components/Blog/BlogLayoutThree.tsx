import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PostStoryblok } from "@/src/types/sb-schema";
import { StoryblokStory } from "@/src/lib/storyblok";

const BlogLayoutThree = ({ blog }: { blog: StoryblokStory<PostStoryblok> }) => {
  return (
    <div className="group flex flex-col items-center text-dark dark:text-light">
      <Link
        href={`/blogs/${blog.slug}`}
        className="h-full rounded-xl overflow-hidden"
      >
        <Image
          src={blog.content.image?.filename || "/placeholder.jpg"}
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM+fWZcm3u0VCfpJb6YYjUOfHrUUUghZZ2P0AZ7p//9k="
          }
          alt={
            blog.content.image?.alt ||
            blog.content.title ||
            blog.name ||
            "Blog image"
          }
          width={1200}
          height={630}
          className=" aspect-[4/3] w-full h-full object-cover object-center  group-hover:scale-105 transition-all ease duration-300 "
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {blog.tag_list?.[0] || "uncategorized"}
        </span>
        <Link href={`/blogs/${blog.slug}`} className="inline-block my-1">
          <h2 className="font-semibold capitalize  text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.content.title || blog.name}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm  sm:text-base">
          {format(
            new Date(blog.published_at || blog.created_at),
            "MMMM dd, yyyy"
          )}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
