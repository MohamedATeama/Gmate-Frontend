import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const defaultProfile = {
  name: "Mohamed",
  email: "mohamed@gmail.com",
  bio: "Productive and focused on delivering great results.",
};

export default function EditProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState(defaultProfile);
  const [_avatarFile, _setAvatarFile] = useState<File | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);
  const [password, setPassword] = useState({ new: "", confirm: "" });
  const [accountSaved, setAccountSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setAccountSaved(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      _setAvatarFile(file);
      setAvatarFileName(file.name);
    }
    setAccountSaved(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    setPasswordSaved(false);
  };

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountSaved(true);
    setTimeout(() => {
      setAccountSaved(false);
      navigate("/dashboard/profile");
    }, 1500);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new.length < 8) return;
    if (password.new !== password.confirm) return;
    setPasswordSaved(true);
    setPassword({ new: "", confirm: "" });
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-foreground text-2xl font-bold">Update your account</h1>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/profile" className="inline-flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back to profile
          </Link>
        </Button>
      </div>

      {/* Update user data */}
      <section className="border-border bg-card shadow-card rounded-xl border p-6">
        <h2 className="text-foreground mb-6 text-lg font-semibold">
          Update user data
        </h2>
        <form onSubmit={handleUpdateAccount} className="space-y-5">
          <div className="formRowClass">
            <Label htmlFor="email" className="labelClass">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              disabled
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="you@example.com"
            />
          </div>
          <div className="formRowClass">
            <Label htmlFor="name" className="labelClass">
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Your name"
            />
          </div>
          <div className="formRowClass">
            <Label htmlFor="bio" className="labelClass">
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              rows={3}
              placeholder="A short bio about you"
            />
          </div>
          <div className="formRowClass">
            <Label className="labelClass">Avatar image</Label>
            <div className="flex w-full max-w-md flex-wrap items-center gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="default"
                size="default"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
              <span className="text-muted-foreground text-sm">
                {avatarFileName ?? "No file chosen"}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" asChild>
              <Link to="/dashboard/profile">Cancel</Link>
            </Button>
            <Button type="submit">
              {accountSaved ? "Saved" : "Update account"}
            </Button>
          </div>
        </form>
      </section>

      {/* Update password */}
      <section className="border-border bg-card shadow-card rounded-xl border p-6">
        <h2 className="text-foreground mb-6 text-lg font-semibold">
          Update password
        </h2>
        <form onSubmit={handleUpdatePassword} className="space-y-5">
          <div className="formRowClass">
            <Label htmlFor="newPassword" className="labelClass">
              New password
            </Label>
            <Input
              id="newPassword"
              name="new"
              type="password"
              value={password.new}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              minLength={8}
            />
          </div>
          <div className="formRowClass">
            <Label htmlFor="confirmPassword" className="labelClass">
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              name="confirm"
              type="password"
              value={password.confirm}
              onChange={handlePasswordChange}
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPassword({ new: "", confirm: "" })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                password.new.length < 8 || password.new !== password.confirm
              }
            >
              {passwordSaved ? "Saved" : "Update password"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
