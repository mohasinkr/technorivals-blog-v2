import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import { fetchBlogPosts, StoryblokStory } from "@/src/lib/storyblok";
import { PostStoryblok } from "@/src/types/sb-schema";
import { slug as slugify } from "github-slugger";
import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";

interface CategoryPageParams extends ParsedUrlQuery {
  slug: string;
}

interface CategoryPageProps {
  blogs: StoryblokStory<PostStoryblok>[];
  categories: string[];
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all blog posts
    const blogs = await fetchBlogPosts();
    
    // Extract all unique categories
    const categories = new Set<string>();
    categories.add("all"); // Add "all" category
    
    blogs.forEach(blog => {
      if (blog.tag_list) {
        blog.tag_list.forEach(tag => {
          categories.add(slugify(tag));
        });
      }
    });
    
    // Create paths for each category
    const paths = Array.from(categories).map(category => ({
      params: { slug: category }
    }));
    
    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error("Error generating category paths:", error);
    return {
      paths: [{ params: { slug: "all" } }],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  try {
    const { slug } = params as CategoryPageParams;
    
    // Fetch all blog posts
    const allBlogs = await fetchBlogPosts();
    
    // Extract all unique categories
    const categories = new Set<string>();
    categories.add("all"); // Add "all" category
    
    allBlogs.forEach(blog => {
      if (blog.tag_list) {
        blog.tag_list.forEach(tag => {
          categories.add(slugify(tag));
        });
      }
    });
    
    // Filter blogs by category
    const filteredBlogs = slug === "all" 
      ? allBlogs 
      : allBlogs.filter(blog => 
          blog.tag_list && blog.tag_list.some(tag => slugify(tag) === slug)
        );
    
    return {
      props: {
        blogs: filteredBlogs,
        categories: Array.from(categories).sort(),
        slug
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching category data:", error);
    return {
      props: {
        blogs: [],
        categories: ["all"],
        slug: params?.slug as string || "all"
      },
      revalidate: 3600
    };
  }
};

const CategoryPage: NextPage<CategoryPageProps> = ({ blogs, categories, slug }) => {
  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">#{slug}</h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={categories} currentSlug={slug} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} />
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl">No posts found in this category.</p>
            <Link href="/" className="mt-4 inline-block underline">
              Return to home
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default CategoryPage;
