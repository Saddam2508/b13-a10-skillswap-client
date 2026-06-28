import HeroBanner from "@/components/banner";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import TopFreelancers from "@/components/home/TopFreelancers";
import HomeLatestTasks from "@/components/tasks/HomeLatestTasks";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <HeroBanner />
      <HowItWorks />
      <HomeLatestTasks />
      <TopFreelancers />
      <PopularCategories />
    </div>
  );
}
