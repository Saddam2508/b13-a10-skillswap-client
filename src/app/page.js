import HeroBanner from "@/components/banner";
import TopFreelancers from "@/components/home/TopFreelancers";
import HomeLatestTasks from "@/components/tasks/HomeLatestTasks";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <HeroBanner />
      <HomeLatestTasks />
      <TopFreelancers />
    </div>
  );
}
