import RichTextRenderer from "@/src/components/Blog/RichTextRenderer";
import Tag from "@/src/components/Elements/Tag";
import siteMetadata from "@/src/utils/siteMetaData";
import {
  fetchBlogPost,
  fetchBlogPosts,
  StoryblokStory,
} from "@/src/lib/storyblok";
import { PostStoryblok } from "@/src/types/sb-schema";
import { slug as slugify } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

interface BlogPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all blog posts using our utility function
    const stories = await fetchBlogPosts();

    const paths = stories.map((story) => ({
      params: { slug: story.slug },
    }));

    return {
      paths,
      fallback: "blocking", // Show 404 if path not found
    };
  } catch (error) {
    console.error("Error fetching Storyblok paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as BlogPageParams;

    // Fetch a single blog post using our utility function
    const story = await fetchBlogPost(slug);

    if (!story) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: story,
        slug,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching Storyblok post:", error);
    return {
      notFound: true,
    };
  }
};

interface BlogPageComponentProps {
  blog: StoryblokStory<PostStoryblok>;
  slug: string;
}

const BlogPage: NextPage<BlogPageComponentProps> = ({ blog, slug }) => {
  if (!blog) {
    return notFound();
  }

  let imageList: string[] = [siteMetadata.socialBanner];
  if (blog.content.image?.filename) {
    imageList = [blog.content.image.filename];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.content.title || blog.name,
    description: blog.content.intro || "",
    image: imageList,
    datePublished: new Date(blog.first_published_at).toISOString(),
    dateModified: new Date(blog.published_at || blog.created_at).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog.content.author || siteMetadata.author,
        url: siteMetadata.twitter,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
          <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Tag
              name={blog.tag_list?.[0] || "uncategorized"}
              link={`/categories/${slugify(
                blog.tag_list?.[0] || "uncategorized"
              )}`}
              className="px-6 text-sm py-2"
            />
            <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6">
              {blog.content.title || blog.name}
            </h1>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40" />
          <Image
            src={blog.content.image?.filename || "/placeholder.jpg"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM+fWZcm3u0VCfpJb6YYjUOfHrUUUghZZ2P0AZ7p//9k="
            alt={blog.content.title || blog.name}
            width={1200}
            height={630}
            className="aspect-square w-full h-full object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        <div className="grid grid-cols-12 gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="border-[1px] border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg p-4 sticky top-6">
              <h2 className="text-lg font-semibold capitalize mb-4">
                Blog Details
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold">Published</h3>
                  <p>
                    {new Date(blog.first_published_at).toLocaleDateString()}
                  </p>
                </div>
                {blog.tag_list && blog.tag_list.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.tag_list.map((tag) => (
                        <Tag
                          key={tag}
                          name={tag}
                          link={`/categories/${slugify(tag)}`}
                          className="px-2 py-1 text-xs"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <RichTextRenderer blog={blog} />
        </div>
      </article>
    </>
  );
};

export default BlogPage;
