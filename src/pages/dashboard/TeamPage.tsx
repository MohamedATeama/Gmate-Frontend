import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  capacity: number;
  projects: number;
  status: string;
  avatar: string;
}

const initialTeam: TeamMember[] = [
  {
    id: "1",
    name: "Marcus Thorne",
    email: "marcus@gmate.io",
    role: "Founder / CEO",
    department: "Management",
    capacity: 92,
    projects: 4,
    status: "Active Now",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    email: "sarah.j@gmate.io",
    role: "Lead Product Designer",
    department: "Design",
    capacity: 45,
    projects: 2,
    status: "Away - 2h",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Kevin Wood",
    email: "k.wood@gmate.io",
    role: "Senior Fullstack Dev",
    department: "Development",
    capacity: 78,
    projects: 5,
    status: "Active Now",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const departments = [
  "All",
  "Design",
  "Development",
  "Operations",
  "Management",
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [selectedDept, setSelectedDept] = useState("All");

  const handleDelete = (id: string) => {
    setTeam((prev) => prev.filter((member) => member.id !== id));
  };

  const filteredTeam =
    selectedDept === "All"
      ? team
      : team.filter((m) => m.department === selectedDept);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold">Team Management</h1>
        <Button onClick={() => {}} className="rounded-full">
          Add Member
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {departments.map((dept) => (
          <Button
            key={dept}
            size="sm"
            variant={selectedDept === dept ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedDept(dept)}
          >
            {dept}
          </Button>
        ))}
      </div>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="border-border bg-card text-foreground shadow-card rounded-2xl p-6 transition"
          >
            <div className="mb-4 flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-foreground text-lg font-bold">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.email}</p>
              </div>
            </div>

            <p className="text-foreground mb-3 text-sm font-medium">
              {member.role}
            </p>

            <div className="text-foreground mb-2 flex justify-between text-sm font-semibold">
              <span>Projects: {member.projects}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-bold uppercase">
                {member.status}
              </span>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(member.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
