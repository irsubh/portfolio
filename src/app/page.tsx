import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/AboutSection";
import { getGithubContributions } from "@/lib/github";

export const revalidate = 3600; // Revalidate live GitHub activity hourly

export default async function Home() {
  const contributions = await getGithubContributions("amsubhm");

  return (
    <div className="w-full">
      <ProfileHeader initialContributions={contributions} />
      <AboutSection />
    </div>
  );
}
