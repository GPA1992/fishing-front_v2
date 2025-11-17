const swatches = [
  { name: "background", className: "bg-background text-text border-border" },
  { name: "surface", className: "bg-surface text-text border-border" },
  { name: "surfaceMuted", className: "bg-surfaceMuted text-text border-border" },
  { name: "border", className: "bg-border text-text border-border" },
  { name: "text", className: "bg-text text-surface border-border" },
  { name: "muted", className: "bg-muted text-surface border-border" },
  { name: "primary", className: "bg-primary text-surface border-border" },
  { name: "primaryStrong", className: "bg-primaryStrong text-surface border-border" },
  { name: "accent", className: "bg-accent text-text border-border" },
  { name: "accentStrong", className: "bg-accentStrong text-text border-border" },
  { name: "highlight", className: "bg-highlight text-text border-border" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12">
        <header className="space-y-3">
          <p className="text-sm text-muted">Tema padrão (CSS vars + Tailwind)</p>
          <h1 className="text-3xl font-semibold">Palette preview</h1>
          <p className="text-base text-muted">
            As cores abaixo usam as utilities geradas a partir das CSS variables
            definidas em <code>globals.css</code> e mapeadas no{" "}
            <code>tailwind.config.ts</code>.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map((swatch) => (
            <article
              key={swatch.name}
              className={`overflow-hidden rounded-2xl border bg-surface shadow-sm transition hover:-translate-y-0.5 ${swatch.className}`}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium capitalize">{swatch.name}</span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase text-muted">
                  {swatch.name}
                </span>
              </div>
              <div className="h-16 w-full border-t border-border bg-gradient-to-r from-surface via-transparent to-transparent" />
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Tipografia</h2>
            <p className="mt-2 text-muted">
              Texto padrão usa <code>text-text</code>; texto secundário usa{" "}
              <code>text-muted</code>.
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-lg font-semibold text-text">Heading / text-text</p>
              <p className="text-base text-muted">Secondary / text-muted</p>
              <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-surface transition hover:bg-primaryStrong">
                Botão primary
              </button>
              <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-text transition hover:bg-accentStrong">
                Botão accent
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surfaceMuted p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Área realçada</h2>
            <p className="mt-2 text-muted">
              Destaque leve usando <code>bg-highlight</code> e gradiente do tema.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-highlight">
              <div className="h-20 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3" />
              <div className="p-4 text-text">
                <p className="text-sm">Gradiente: gradient-1 → gradient-2 → gradient-3</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
