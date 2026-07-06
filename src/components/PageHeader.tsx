interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-white pb-14 pt-32 sm:pt-40">
      <div className="hero-streaks opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_30%_20%,black,transparent)]"
      />

      <div className="container-wide relative mx-auto px-5 sm:px-8 lg:px-10">
        <div className="hero-stagger max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
