import { siteContent } from "@/resources/site-content";

export function PortalActions() {
  return (
    <div className="stack" id="support">
      <section className="section-panel">
        <SectionHeading {...siteContent.sections.playerLookup} />
        <div className="form-row">
          <input
            className="form-control"
            disabled
            placeholder={siteContent.form.playerNamePlaceholder}
          />
          <button className="button-primary" disabled>
            {siteContent.form.lookupButton}
          </button>
        </div>

        <div className="card">
          <h3 className="card-title">{siteContent.emptyStates.playerLookup.title}</h3>
          <p className="card-copy">{siteContent.emptyStates.playerLookup.description}</p>
        </div>
      </section>

      <section className="section-panel">
        <SectionHeading {...siteContent.sections.support} />
        <div className="support-grid">
          {siteContent.supportLinks.map((link) => (
            <div className="card" key={link.title}>
              <h3 className="card-title">{link.title}</h3>
              <p className="card-copy">{link.description}</p>
            </div>
          ))}
        </div>

        <div className="form-stack">
          <select className="form-control" defaultValue="support" disabled name="type">
            <option value="support">{siteContent.form.supportOption}</option>
            <option value="application">{siteContent.form.applicationOption}</option>
          </select>
          <input
            className="form-control"
            disabled
            name="requestPlayerName"
            placeholder={siteContent.form.playerNamePlaceholder}
          />
          <input
            className="form-control"
            disabled
            name="contact"
            placeholder={siteContent.form.contactPlaceholder}
          />
          <textarea
            className="form-control"
            disabled
            name="content"
            placeholder={siteContent.form.contentPlaceholder}
          />
          <button className="button-primary" disabled>
            {siteContent.form.submitButton}
          </button>
        </div>

        <div className="card">
          <h3 className="card-title">{siteContent.emptyStates.submissions.title}</h3>
          <p className="card-copy">{siteContent.emptyStates.submissions.description}</p>
        </div>
      </section>
    </div>
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
