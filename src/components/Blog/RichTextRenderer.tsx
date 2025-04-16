"use client";
import React from "react";
import {
  render,
  MARK_LINK,
  NODE_IMAGE,
  RenderOptions,
} from "storyblok-rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { StoryblokStory } from "@/src/lib/storyblok";
import { PostStoryblok } from "@/src/types/sb-schema";

interface RichTextRendererProps {
  blog: StoryblokStory<PostStoryblok>;
}

interface MarkLinkProps {
  href?: string;
  target?: string;
  linktype?: string;
  [key: string]: any;
}

interface NodeImageProps {
  src?: string;
  alt?: string;
  title?: string;
  [key: string]: any;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ blog }) => {
  if (!blog.content.long_text) {
    return <div className="text-center py-10">No content available</div>;
  }

  const options: RenderOptions = {
    markResolvers: {
      [MARK_LINK]: (children: React.ReactNode, props: MarkLinkProps) => {
        const { href, target, linktype } = props;

        if (linktype === "email") {
          return <a href={`mailto:${href}`}>{children}</a>;
        }

        if (href && href.match(/^(https?:)?\/\//)) {
          return (
            <a
              href={href}
              target={target || "_blank"}
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        }

        return <Link href={href || "/"}>{children}</Link>;
      },
    },
    nodeResolvers: {
      [NODE_IMAGE]: (_children: React.ReactNode, props: NodeImageProps) => {
        const { src, alt, title } = props;

        return (
          <div className="my-6 relative w-full h-auto aspect-video">
            <Image
              src={src || "/placeholder.jpg"}
              alt={alt || title || "Blog image"}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        );
      },
    },
    blokResolvers: {},
    defaultBlokResolver: (name: string, props: Record<string, any>) => {
      return (
        <div className="p-4 border border-gray-300 rounded-lg my-4">
          <p className="text-sm text-gray-500 mb-2">
            Embedded component: {name}
          </p>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(props, null, 2)}
          </pre>
        </div>
      );
    },
  };

  return (
    <div
      className="col-span-12 lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
    prose-blockquote:bg-accent/20
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg
    prose-figure:relative
    prose-figcaption:mt-1
    prose-figcaption:mb-2
    prose-li:marker:text-accent
    dark:prose-invert
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20
    dark:prose-li:marker:text-accentDark
    first-letter:text-3xl
    sm:first-letter:text-5xl"
    >
      {render(blog.content.long_text, options)}
    </div>
  );
};

export default RichTextRenderer;
