import HeroBanner from "@/components/banner";
import HomeLatestTasks from "@/components/tasks/HomeLatestTasks";

export default function Home() {
  return (
    <div className="dark:bg-black">
      <HeroBanner />
      <HomeLatestTasks />
    </div>
  );
}
