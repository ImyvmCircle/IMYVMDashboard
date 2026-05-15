import { notFound } from "next/navigation";
import { siteContent } from "@/resources/site-content";

export const dynamic = "force-dynamic";

export default function DevLabPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="portal-shell">
      <div className="portal-container">
        <header className="hero-panel">
          <div className="hero-content">
            <p className="eyebrow">{siteContent.devLab.eyebrow}</p>
            <h1 className="hero-title">{siteContent.devLab.title}</h1>
            <p className="hero-copy">{siteContent.devLab.copy}</p>
          </div>
        </header>

        <section className="section-panel">
          <div className="dev-grid">
            {siteContent.devLab.stats.map((label) => (
              <div className="stat-card" key={label}>
                <p className="stat-label">{label}</p>
                <p className="stat-value">{siteContent.labels.unavailable}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="layout-grid">
          <div className="section-panel">
            <SectionHeading eyebrow="Cards" title="内容卡片状态" />
            <div className="content-grid">
              {siteContent.devLab.cards.map((card) => (
                <PreviewCard {...card} key={card.title} />
              ))}
            </div>
          </div>

          <div className="section-panel">
            <SectionHeading eyebrow="Forms" title={siteContent.devLab.formTitle} />
            <div className="form-stack">
              <input className="form-control" placeholder={siteContent.form.playerNamePlaceholder} />
              <select className="form-control" defaultValue="none" disabled>
                <option value="none">{siteContent.labels.unavailable}</option>
              </select>
              <textarea className="form-control" placeholder={siteContent.form.contentPlaceholder} />
              <button className="button-primary">{siteContent.devLab.buttonLabel}</button>
            </div>
          </div>
        </section>

        <section className="section-panel">
          <SectionHeading eyebrow="States" title={siteContent.devLab.stateTitle} />
          <div className="content-grid">
            <PreviewCard {...siteContent.emptyStates.featuredBuild} />
            <article className="card error-card">
              <h3 className="card-title">{siteContent.devLab.unavailableState}</h3>
              <p className="card-copy">{siteContent.devLab.unavailableDescription}</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </header>
  );
}

function PreviewCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-copy">{description}</p>
    </article>
  );
}
