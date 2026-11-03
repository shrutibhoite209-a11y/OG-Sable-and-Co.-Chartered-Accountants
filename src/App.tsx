import { FormEvent, useEffect, useRef, useState } from "react";
import logo from "./assets/og-sable-logo.png";

type IconName =
  | "arrow"
  | "audit"
  | "briefcase"
  | "building"
  | "calculator"
  | "chart"
  | "check"
  | "document"
  | "globe"
  | "instagram"
  | "linkedin"
  | "menu"
  | "message"
  | "payroll"
  | "shield"
  | "tax"
  | "users"
  | "x";

const iconPaths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  audit: <><path d="M9 11l2 2 4-4" /><path d="M5 3h14v18H5zM8 17h8" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
  building: <><path d="M4 21V5l8-3 8 3v16M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2M10 21v-3h4v3" /></>,
  calculator: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /><path d="M3 6l5-3 6 4 7-5" /></>,
  check: <><path d="M20 6L9 17l-5-5" /></>,
  document: <><path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  linkedin: <><path d="M6 9v10M6 5.5v.01M10 19V9M10 13.5a4 4 0 018 0V19M18 13v6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  message: <><path d="M21 11.5a8 8 0 01-11.8 7L3 21l2.5-6.1A8 8 0 1121 11.5z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
  payroll: <><path d="M4 5h16v14H4zM8 9h8M8 13h3M15 13h1M8 17h8" /><path d="M7 5V2M17 5V2" /></>,
  shield: <><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  tax: <><path d="M5 3h14v18H5zM9 8h6M8 16l8-8M9 9h.01M15 15h.01" /></>,
  users: <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8" /></>,
  x: <><path d="M6 6l12 12M18 6L6 18" /></>,
};

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  );
}

const services: Array<{
  icon: IconName;
  title: string;
  text: string;
  tags: string[];
  cta: string;
}> = [
  { icon: "tax", title: "Income Tax & Planning", text: "Returns, assessments and intelligent tax planning for individuals, businesses and HNIs.", tags: ["ITR filing", "TDS", "Tax notices"], cta: "Plan my taxes better" },
  { icon: "calculator", title: "GST Advisory", text: "End-to-end GST registration, returns, reconciliation, refunds and representation.", tags: ["Registration", "Returns", "Refunds"], cta: "Simplify my GST" },
  { icon: "audit", title: "Audit & Assurance", text: "Independent audits that strengthen controls, compliance and stakeholder confidence.", tags: ["Statutory", "Tax audit", "Internal"], cta: "Make my audit effortless" },
  { icon: "building", title: "Business Formation", text: "The right structure and seamless setup for companies, LLPs, firms and startups.", tags: ["Company", "LLP", "Startup"], cta: "Launch my business" },
  { icon: "document", title: "ROC & Compliance", text: "Timely MCA filings, secretarial records and ongoing corporate compliance management.", tags: ["ROC filing", "Annual return", "DIN"], cta: "Stay fully compliant" },
  { icon: "payroll", title: "Accounting & Payroll", text: "Reliable books, MIS reporting, payroll processing and virtual CFO support.", tags: ["Bookkeeping", "Payroll", "MIS"], cta: "Streamline my accounts" },
  { icon: "chart", title: "Finance & CFO Advisory", text: "Cash-flow planning, budgets, fundraising support and insights for better decisions.", tags: ["Virtual CFO", "Funding", "Forecasts"], cta: "Unlock smarter growth" },
  { icon: "briefcase", title: "Valuation & Due Diligence", text: "Clear, defensible valuations and financial due diligence for critical transactions.", tags: ["Valuation", "M&A", "Transactions"], cta: "Know the real value" },
  { icon: "globe", title: "International Tax & FEMA", text: "Cross-border tax, FEMA, transfer pricing and NRI compliance made straightforward.", tags: ["FEMA", "NRI tax", "Transfer pricing"], cta: "Go global confidently" },
];

function contactLink(service: string) {
  return `https://wa.me/917776977568?text=${encodeURIComponent(`Hello O G Sable & CO., I would like assistance with ${service}.`)}`;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatReply, setChatReply] = useState("Hi, I’m Sable IQ. Tell me what you’re working on and I’ll guide you to the right consultation.");
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (event: PointerEvent) => {
      cursorDot.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      cursorRing.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  function submitConsultation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello O G Sable & CO., I would like to book a consultation.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}`;
    window.open(`https://wa.me/917776977568?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="site-wrap min-h-screen bg-[var(--ivory)] text-[var(--navy)]">
      <div className="ambient-bg" aria-hidden="true"><span /><span /><span /></div>
      <div ref={cursorRing} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorDot} className="cursor-dot" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--ivory)/92] backdrop-blur-xl">
        <div className="shell flex h-20 items-center justify-between">
          <a href="#home" className="group flex items-center gap-3" aria-label="O G Sable & CO. home">
            <img src={logo} alt="" className="size-12 rounded-lg object-contain" />
            <span>
              <span className="block font-serif text-lg font-bold leading-none">O G Sable & CO.</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Chartered Accountants & Co.</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            <a className="nav-link" href="#services">Services</a>
            <a className="nav-link" href="#about">Why us</a>
            <a className="nav-link" href="#process">Our process</a>
            <button className="button button-dark" onClick={() => setFormOpen(true)}>Book a consultation <Icon name="arrow" size={18} /></button>
          </nav>
          <button className="icon-button md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav className="shell grid gap-2 border-t border-[var(--line)] py-4 md:hidden" aria-label="Mobile navigation">
            {["Services", "Why us", "Our process", "Contact"].map((item) => (
              <a key={item} className="rounded-xl px-4 py-3 font-semibold hover:bg-white" href={`#${item === "Why us" ? "about" : item === "Our process" ? "process" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <button className="button button-dark mt-2 w-full" onClick={() => { setMenuOpen(false); setFormOpen(true); }}>
              Book a consultation <Icon name="arrow" size={18} />
            </button>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden pb-16 pt-12 lg:pb-24 lg:pt-20">
          <div className="hero-orb" />
          <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <div className="eyebrow"><span className="size-2 rounded-full bg-[var(--gold)]" /> Clarity in every number</div>
              <h1 className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Sound advice.<br /><span className="text-[var(--gold)]">Stronger business.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
                We proudly serve startups, MSMEs, manufacturing enterprises, and professionals across India and abroad.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="button button-gold" href="#services">Explore our services <Icon name="arrow" size={18} /></a>
                <a className="button button-ghost" href={contactLink("a consultation")} target="_blank" rel="noreferrer"><Icon name="message" size={19} /> WhatsApp us</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[var(--muted)]">
                {["ICAI-led expertise", "Confidential & secure", "Responsive support"].map((item) => <span key={item} className="flex items-center gap-2"><span className="text-[var(--gold)]"><Icon name="check" size={17} /></span>{item}</span>)}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-[2rem] bg-[var(--navy)] shadow-2xl">
                <img
                  className="h-full w-full object-cover opacity-90"
                  src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000"
                  alt="Financial professionals discussing business strategy in a meeting"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold-light)]">Partners in progress</p>
                  <p className="mt-2 max-w-sm font-serif text-2xl">We simplify complexity, so you can focus on what comes next.</p>
                </div>
              </div>
              <div className="absolute -left-5 top-9 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-10">
                <div className="flex items-center gap-3">
                  <span className="icon-tile"><Icon name="shield" size={21} /></span>
                  <div><p className="text-sm font-bold">Trusted guidance</p><p className="text-xs text-[var(--muted)]">At every stage</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--line)] bg-white">
          <div className="shell grid divide-y divide-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[["10+", "Core service areas"], ["360°", "Financial perspective"], ["100%", "Commitment to compliance"]].map(([value, label]) => (
              <div key={label} className="flex items-center justify-center gap-4 py-7 sm:px-6">
                <strong className="font-serif text-3xl text-[var(--gold)]">{value}</strong><span className="max-w-28 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">What we do</p><h2>Expertise that moves<br />you forward.</h2></div>
              <p>From everyday compliance to high-stakes decisions, our integrated services keep your finances clear, compliant and ready for growth.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article key={service.title} className="service-card group">
                  <div className="flex items-start justify-between">
                    <span className="service-icon"><Icon name={service.icon} size={25} /></span>
                    <span className="text-xs font-semibold text-[var(--muted)]">0{index + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <a href={contactLink(service.title)} target="_blank" rel="noreferrer" className="service-link" aria-label={`Contact now for ${service.title}`}>
                    {service.cta} <Icon name="arrow" size={18} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section bg-[var(--navy)] text-white">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow eyebrow-dark">Why OG Sable & Co.</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">Beyond compliance.<br />Built around your goals.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">We combine rigorous professional standards with commercially practical thinking. You get direct advice, timely execution and a long-term partner who understands your business.</p>
              <button className="button button-gold mt-8" onClick={() => setFormOpen(true)}>Talk to an expert <Icon name="arrow" size={18} /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["shield", "Integrity first", "Transparent advice and uncompromising professional ethics."],
                ["users", "Partner-led care", "Senior attention and communication without the runaround."],
                ["chart", "Business-minded", "Advice shaped by commercial realities—not just regulation."],
                ["document", "Always current", "Proactive guidance as laws and requirements evolve."],
              ].map(([icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[.05] p-6 transition hover:-translate-y-1 hover:border-[var(--gold)]/50 hover:bg-white/[.08]">
                  <span className="text-[var(--gold-light)]"><Icon name={icon as IconName} size={24} /></span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section">
          <div className="shell">
            <div className="text-center"><p className="eyebrow justify-center">Simple by design</p><h2 className="mt-5 font-serif text-4xl sm:text-5xl">A clear path to clarity.</h2></div>
            <div className="relative mt-14 grid gap-8 md:grid-cols-3">
              <div className="absolute left-[16.5%] right-[16.5%] top-7 hidden border-t border-dashed border-[var(--gold)]/40 md:block" />
              {[
                ["01", "Tell us what you need", "Choose a service or message us. We’ll understand your context and priorities."],
                ["02", "Get a clear roadmap", "We outline the scope, documents, timelines and fees—without ambiguity."],
                ["03", "Consider it handled", "Our team executes, keeps you informed and stays ahead of every deadline."],
              ].map(([number, title, text]) => (
                <div key={number} className="relative text-center">
                  <span className="relative mx-auto grid size-14 place-items-center rounded-full border border-[var(--gold)] bg-[var(--ivory)] font-serif text-lg font-bold text-[var(--gold)]">{number}</span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[var(--muted)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="shell grid overflow-hidden rounded-[2rem] border border-[var(--line)] lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <p className="eyebrow">Find us in Pune</p>
              <h2 className="mt-4 font-serif text-4xl">Let’s talk numbers.</h2>
              <div className="mt-8 grid gap-5 text-sm">
                <div><p className="font-bold">O G Sable & CO. Chartered Accountants</p><p className="mt-1 text-[var(--muted)]">A/2, Kudale Patil Vihar, Anand Nagar,<br />Sinhagad Road, Pune – 411051</p></div>
                <a className="contact-row" href="tel:+917776977568"><span className="service-icon"><Icon name="message" size={20} /></span><span><small>Call or WhatsApp</small><strong>+91 77769 77568</strong></span></a>
                <a className="contact-row" href="mailto:caomkarsable@gmail.com"><span className="service-icon"><Icon name="document" size={20} /></span><span><small>Email us</small><strong>caomkarsable@gmail.com</strong></span></a>
              </div>
            </div>
            <iframe
              className="min-h-[25rem] w-full border-0"
              title="O G Sable & CO. office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=A%2F2%2C%20Kudale%20Patil%20Vihar%2C%20Anand%20Nagar%2C%20Sinhagad%20Road%2C%20Pune%20411051&output=embed"
            />
          </div>
        </section>

        <section id="contact" className="px-4 pb-4">
          <div className="relative mx-auto max-w-[87rem] overflow-hidden rounded-[2rem] bg-[var(--gold)] px-6 py-14 text-[var(--navy)] sm:px-10 lg:px-16">
            <div className="absolute -right-20 -top-28 size-80 rounded-full border-[60px] border-white/10" />
            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div><p className="text-xs font-bold uppercase tracking-[0.2em]">Let’s get started</p><h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Good decisions begin with a conversation.</h2></div>
              <div className="flex flex-wrap gap-3">
                <button className="button button-dark" onClick={() => setFormOpen(true)}><Icon name="message" size={19} /> Book consultation</button>
                <a className="button bg-white text-[var(--navy)] hover:bg-[var(--ivory)]" href="mailto:caomkarsable@gmail.com?subject=Consultation%20request">Email us <Icon name="arrow" size={18} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--navy)] text-white">
        <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3"><img src={logo} alt="" className="size-12 rounded-lg bg-white object-contain" /><div><p className="font-serif text-lg font-bold">O G Sable & CO.</p><p className="text-[10px] uppercase tracking-widest text-white/45">Chartered Accountants</p></div></div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">Tax, assurance and advisory expertise for stronger businesses and confident financial decisions.</p>
          </div>
          <div><p className="footer-title">Quick links</p><div className="mt-4 grid gap-3 text-sm text-white/55"><a href="#services">Services</a><a href="#about">Why us</a><a href="#process">Our process</a></div></div>
          <div>
            <p className="footer-title">Connect</p>
            <div className="mt-4 grid gap-3 text-sm text-white/55"><a href="mailto:caomkarsable@gmail.com">caomkarsable@gmail.com</a><a href={contactLink("a consultation")} target="_blank" rel="noreferrer">+91 77769 77568</a><span>Pune, Maharashtra · India</span></div>
            <div className="mt-6 flex items-center gap-2" aria-label="Social media">
              <a className="social-link" href={contactLink("a consultation")} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><Icon name="message" size={18} /></a>
              <a className="social-link" href="https://www.instagram.com/theogfinance?cplk=MWJtMnl2bXh4azgyZg==" target="_blank" rel="noreferrer" aria-label="Follow The OG Finance on Instagram"><Icon name="instagram" size={18} /></a>
              <a className="social-link" href="https://www.linkedin.com/in/omkarsable?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" aria-label="Connect with Omkar Sable on LinkedIn"><Icon name="linkedin" size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10"><div className="shell flex flex-col gap-2 py-5 text-xs text-white/35 sm:flex-row sm:justify-between"><span>© 2025 OG Sable Chartered Accountants & Co.</span><span>Professional advice. Personal attention.</span></div></div>
      </footer>

      <div className="fixed bottom-5 right-5 z-40">
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-header flex items-center justify-between border-b border-[var(--line)] p-4"><div className="flex items-center gap-3"><span className="ai-pulse">IQ</span><div><strong className="text-sm">Sable IQ</strong><p className="text-xs text-[var(--muted)]">Your smart CA concierge</p></div></div><button className="icon-button" onClick={() => setChatOpen(false)} aria-label="Close chat"><Icon name="x" size={18} /></button></div>
            <div className="p-4"><div className="chat-bubble">{chatReply}</div><p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Quick questions</p><div className="mt-2 grid gap-2">
              {[
                ["Can I reduce my tax burden?", "A focused tax consultation can uncover legitimate savings and prevent surprises. Book a call so our CA can review your situation."],
                ["I’m starting a new business", "The right structure saves time, tax and compliance effort later. Book a consultation to choose the best setup."],
                ["My GST or ROC filing is due", "Let’s protect you from delays and penalties. Book a priority consultation and share your deadline with our team."],
                ["I need audit support", "We can make your audit clear, organised and efficient. Book a consultation to discuss the scope and documents needed."],
                ["I need a virtual CFO", "A consultation will help us understand your cash flow, reporting and growth goals before recommending the right support."],
                ["I’m an NRI / have global income", "Cross-border matters need advice tailored to your facts. Book a confidential consultation with our tax team."],
                ["I’m not sure what I need", "That’s exactly what the first conversation is for. Share a few details and our CA will point you in the right direction."],
              ].map(([question, reply]) => <button key={question} className="chat-option" onClick={() => setChatReply(reply)}>{question}<Icon name="arrow" size={15} /></button>)}
            </div><button className="button button-green mt-4 w-full" onClick={() => setFormOpen(true)}>Book a consultation</button></div>
          </div>
        )}
        <button className="chat-launcher" onClick={() => setChatOpen(!chatOpen)} aria-label="Open Sable IQ"><Icon name={chatOpen ? "x" : "message"} size={25} /><span className="hidden sm:inline">{chatOpen ? "Close" : "Ask Sable IQ"}</span></button>
      </div>

      {formOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="consultation-title" onMouseDown={() => setFormOpen(false)}>
          <div className="modal-card" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between"><div><p className="eyebrow">Free first conversation</p><h2 id="consultation-title" className="mt-2 font-serif text-3xl">Book a consultation</h2><p className="mt-2 text-sm text-[var(--muted)]">Submit your details and continue directly on WhatsApp.</p></div><button className="icon-button" onClick={() => setFormOpen(false)} aria-label="Close form"><Icon name="x" /></button></div>
            <form className="mt-7 grid gap-4" onSubmit={submitConsultation}>
              <label className="field-label">Your name<input className="form-field" name="name" required placeholder="Full name" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">Phone number<input className="form-field" name="phone" type="tel" required placeholder="+91" /></label>
                <label className="field-label">Email address<input className="form-field" name="email" type="email" required placeholder="you@email.com" /></label>
              </div>
              <label className="field-label">Service required<select className="form-field" name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
              <button className="button button-green mt-2 w-full" type="submit"><Icon name="message" size={19} /> Continue on WhatsApp</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
