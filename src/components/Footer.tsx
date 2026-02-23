import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-border bg-muted/40 border-t">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto md:mx-0 flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-sm font-black">G</span>
            </div>
            <span className="text-base font-bold">GMATE</span>
          </Link>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Contact Support
          </Link>
        </div>

        <div className="mx-auto md:mx-0 flex items-center gap-4">
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="#github"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <span className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GMATE Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
