import HeroBanner from "@/components/banner";
import LatestTasks from "@/components/tasks";
export default function Home() {
  return (
    <div className=" dark:bg-black">
      <HeroBanner />
      <LatestTasks />
    </div>
  );
}
