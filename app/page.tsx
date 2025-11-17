import Image from "next/image";

const features = [
  {
    title: "Plan smarter",
    description:
      "Track tides, weather, and best times to cast with layouts that adapt to every screen.",
    icon: "/globe.svg",
  },
  {
    title: "Share locations",
    description:
      "Drop pins, add notes, and sync with friends without losing space on mobile.",
    icon: "/file.svg",
  },
  {
    title: "Stay notified",
    description:
      "Get alerts for changing wind or cloud cover with a compact card layout.",
    icon: "/window.svg",
  },
];

const stats = [
  { label: "Water temp", value: "63°F" },
  { label: "Tide", value: "Incoming" },
  { label: "Wind", value: "8 kt NW" },
  { label: "Sky", value: "Partly cloudy" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Tailwind breakpoints
            </p>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Responsive fishing dashboard
            </h1>
            <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
              Resize the window to see how grid columns and stacked content swap
              at <code>sm</code>, <code>md</code>, and <code>lg</code>{" "}
              breakpoints. Everything stays legible and balanced.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:-translate-y-0.5 hover:bg-cyan-300">
              Get started
            </button>
            <button className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-50 transition hover:border-cyan-400 hover:text-cyan-100">
              View docs
            </button>
          </div>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-500/10 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/60"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10">
                  <Image
                    src={feature.icon}
                    alt=""
                    aria-hidden
                    width={28}
                    height={28}
                    className="text-cyan-300"
                  />
                </span>
                <h2 className="text-lg font-semibold">{feature.title}</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/50">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                  Layout shift preview
                </p>
                <h3 className="text-xl font-semibold sm:text-2xl">
                  Conditions card
                </h3>
                <p className="text-sm text-slate-300">
                  Stacks on mobile, splits into two columns on <code>sm</code>,
                  and grows to a left + right rail at <code>lg</code>.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["base", "sm", "md", "lg", "xl"].map((bp) => (
                  <span
                    key={bp}
                    className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200"
                  >
                    {bp}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-cyan-200">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-4">
                <p className="text-sm font-semibold text-cyan-100">Smaller screens</p>
                <p className="mt-2 text-sm text-cyan-50/80">
                  Cards stack into a single column, and buttons align under the
                  title.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4">
                <p className="text-sm font-semibold text-emerald-50">
                  Medium & up
                </p>
                <p className="mt-2 text-sm text-emerald-50/80">
                  Two columns appear at <code>sm</code>, and the whole block
                  gains a side rail at <code>lg</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg shadow-black/50">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
              Quick reference
            </p>
            <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
              Breakpoint cheatsheet
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>
                <code>sm</code> — Cards shift to two columns for tablets.
              </li>
              <li>
                <code>md</code> — Navigation and actions sit side by side.
              </li>
              <li>
                <code>lg</code> — Content splits into a rail and detail view.
              </li>
              <li>
                <code>xl</code> — Spacing and typography scale up comfortably.
              </li>
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-cyan-200">
                  Layout preview
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <span className="h-12 rounded-lg bg-cyan-400/60 sm:col-span-2" />
                  <span className="h-12 rounded-lg bg-cyan-500/30" />
                  <span className="h-12 rounded-lg bg-cyan-500/30" />
                  <span className="h-12 rounded-lg bg-cyan-400/60" />
                  <span className="h-12 rounded-lg bg-cyan-500/30 sm:col-span-2" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-cyan-200">
                  Hover demo
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Cards lift with subtle shadows to show interactivity while
                  keeping a calm palette.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
