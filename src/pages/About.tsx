import { Link } from "react-router-dom";

const values = [
  {
    title: "Clarity",
    description:
      "Every task has an owner, a deadline, and a place in the bigger picture.",
  },
  {
    title: "Efficiency",
    description:
      "Spend less time in meetings and more time getting work done.",
  },
  {
    title: "Collaboration",
    description: "Stay in sync with your team without the noise.",
  },
];

export default function About() {
  return (
    <>
      <section className="border-border bg-muted/30 border-b py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                About <span className="text-primary">GMATE</span>
              </h1>
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                GMATE is a modern task management platform designed for teams who
                value clarity, efficiency, and collaboration. Built with
                cutting-edge technology and a focus on user experience, we help
                teams achieve their goals faster and smarter.
              </p>
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Get in touch
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <img
                src="/assets/about-hero.svg"
                alt="Team collaboration and task boards"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-background border-b py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                <img
                  src="/assets/about-mission.svg"
                  alt="Our mission – focus and execution"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Our mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe that great work happens when everyone knows what to
                do, when it&apos;s due, and how it fits the bigger picture.
                GMATE brings tasks, deadlines, and collaboration into one place
                so your team can focus on execution—not hunting for updates.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you&apos;re a startup or an enterprise, we&apos;re here
                to help you ship on time and keep everyone aligned.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-b py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                What we stand for
              </h2>
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                Our product and culture are built around three principles that
                guide how we work and how we help you work.
              </p>
              <div className="space-y-4">
                {values.map((item) => (
                  <div
                    key={item.title}
                    className="border-border bg-background rounded-xl border p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
              <img
                src="/assets/about-values.svg"
                alt="Our values – clarity, efficiency, collaboration"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-background border-b py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to try GMATE?
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Join teams who ship faster with less friction.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/home"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              See features
            </Link>
            <Link
              to="/contact"
              className="border-border hover:bg-accent inline-flex rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
