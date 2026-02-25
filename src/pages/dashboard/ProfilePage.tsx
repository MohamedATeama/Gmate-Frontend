import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsSection from "@/components/StatsSection";
import ProfileCard from "@/components/ProfileCard";
import CompletedProjects from "@/components/CompletedProjects";

export default function ProfilePage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Your account information.
          </p>
        </div>
        <Button size="default" asChild>
          <Link
            to="/dashboard/profile/edit"
            className="inline-flex items-center gap-2"
          >
            <Pencil className="size-4" />
            Edit profile
          </Link>
        </Button>
      </div>

      <ProfileCard />

      <div className="">
        <StatsSection />
      </div>

      <CompletedProjects />
    </div>
  );
}
