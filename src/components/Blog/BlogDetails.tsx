import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { slug } from "github-slugger";

interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

interface BlogPost {
  publishedAt: string;
  readingTime: ReadingTime;
  tags: string[];
}

interface BlogDetailsProps {
  blog: BlogPost;
  slug: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog, slug: blogSlug }) => {
  return (
    <div className="px-2 md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5 md:mx-10 rounded-lg">
      <time className="m-3">
        {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
      </time>
      <span className="m-3">
        {/* <ViewCounter slug={blogSlug} /> */}
      </span>
      <div className="m-3">{blog.readingTime.text}</div>
      <Link href={`/categories/${slug(blog.tags[0])}`} className="m-3">
        #{blog.tags[0]}
      </Link>
    </div>
  );
};

export default BlogDetails;
