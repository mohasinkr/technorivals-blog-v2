import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Image from "next/image";
import { FC } from "react";

interface BlogPostProps {
  blok: {
    title: string;
    content: string;
    image: {
      filename: string;
      alt: string;
    };
    components: any[];
    [key: string]: any;
  };
}

const BlogPost: FC<BlogPostProps> = ({ blok }) => {
  return (
    <article {...storyblokEditable(blok)} className="blog-post">
      <h1 className="text-3xl font-bold mb-4">{blok.title}</h1>
      
      {blok.image?.filename && (
        <div className="relative w-full h-[400px] mb-6">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="prose max-w-none dark:prose-invert">
        {blok.content}
      </div>
      
      {blok.components?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </article>
  );
};

export default BlogPost;
