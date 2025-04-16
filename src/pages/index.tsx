import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import { GetStaticProps, NextPage } from "next";
import { fetchBlogPosts, StoryblokStory } from "@/src/lib/storyblok";
import { PostStoryblok } from "@/src/types/sb-schema";

interface HomeProps {
  blogs: StoryblokStory<PostStoryblok>[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // Fetch blog posts using our utility function
    const blogs = await fetchBlogPosts();

    return {
      props: {
        blogs,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching Storyblok posts:", error);
    return {
      props: {
        blogs: [],
      },
      revalidate: 3600,
    };
  }
};

const Home: NextPage<HomeProps> = ({ blogs }) => {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  );
};

export default Home;
