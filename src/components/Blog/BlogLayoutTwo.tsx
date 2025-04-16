import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PostStoryblok } from "@/src/types/sb-schema";
import { StoryblokStory } from "@/src/lib/storyblok";
import { slug } from "github-slugger";

const BlogLayoutTwo = ({ blog }: { blog: StoryblokStory<PostStoryblok> }) => {
  return (
    <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light">
      <Link
        href={`/blogs/${blog?.slug}`}
        className=" col-span-12  lg:col-span-4 h-full rounded-xl overflow-hidden"
      >
        <Image
          src={blog?.content.image?.filename || "/placeholder.jpg"}
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM+fWZcm3u0VCfpJb6YYjUOfHrUUUghZZ2P0AZ7p//9k="
          }
          alt={
            blog?.content.image?.alt ||
            blog?.content.title ||
            blog?.name ||
            "Blog image"
          }
          width={1200}
          height={630}
          className="aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="col-span-12  lg:col-span-8 w-full">
        <span className="inline-block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {blog?.tag_list?.[0] || "uncategorized"}
        </span>
        <Link href={`/blogs/${blog?.slug}`} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_6px]
                group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog?.content?.title || blog?.name}
            </span>
          </h2>
        </Link>

        <span className="inline-block w-full capitalize text-gray dark:text-light/50 font-semibold  text-xs sm:text-base">
          {/* {format(
            new Date(blog?.published_at || blog?.created_at),
            "MMMM dd, yyyy"
          )} */}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
