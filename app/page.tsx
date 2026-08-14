"use client";

import { FormEvent, useState } from "react";

const vehicles = [
  {
    status: "BRAND NEW",
    name: "Astra X5 GLX",
    type: "Compact crossover",
    price: "From ₱1,119,000",
    specs: ["1.5L Gasoline", "CVT", "5 Seats"],
    image:
      "https://images.unsplash.com/photo-1643306965448-88cccd3fb262?auto=format&fit=crop&w=1200&q=82",
  },
  {
    status: "BEST VALUE",
    name: "Terra Sport",
    type: "Mid-size SUV",
    price: "From ₱1,568,000",
    specs: ["2.4L Diesel", "6AT", "7 Seats"],
    image:
      "https://images.unsplash.com/photo-1672870657724-7a5bf1439a34?auto=format&fit=crop&w=1200&q=82",
  },
  {
    status: "CERTIFIED PRE-OWNED",
    name: "Urban Cross 2024",
    type: "Compact crossover",
    price: "From ₱898,000",
    specs: ["18K Mileage", "Automatic", "Warranty"],
    image:
      "https://images.unsplash.com/photo-1687942641231-507ef3027cc5?auto=format&fit=crop&w=1200&q=82",
  },
  {
    status: "FAMILY PICK",
    name: "Voyager Cross",
    type: "7-seat MPV crossover",
    price: "From ₱1,378,000",
    specs: ["1.5L Gasoline", "Automatic", "7 Seats"],
    image:
      "https://images.unsplash.com/photo-1672870659104-ae82f61a754b?auto=format&fit=crop&w=1200&q=82",
  },
];

const services = [
  ["01", "Vehicle selection", "Shortlist the right model and variant around your daily drive, family, and budget."],
  ["02", "Trade-in evaluation", "Get a clear, market-informed estimate and a simple path from your current car to the next."],
  ["03", "Financing guidance", "Compare practical down-payment and monthly options without the confusing fine print."],
  ["04", "Delivery coordination", "I handle the checklist, paperwork, updates, and a smooth handover around your schedule."],
  ["05", "After-sales support", "Your relationship does not end at release day. I remain your direct point of contact."],
];

const testimonials = [
  {
    quote:
      "Adrian made the entire process feel calm and transparent. He found the right crossover for our budget and kept every promise.",
    name: "Mika & Paolo R.",
    vehicle: "Compact crossover • Quezon City",
  },
  {
    quote:
      "From trade-in to delivery, I always knew the next step. No pressure—just honest advice and incredibly responsive support.",
    name: "Denise L.",
    vehicle: "7-seat SUV • Makati",
  },
  {
    quote:
      "The financing options were explained in plain language. I drove home confident I had made the right choice.",
    name: "Carlo M.",
    vehicle: "Certified pre-owned • Pasig",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      {/* Sticky primary navigation */}
      <header className="site-header">
        <div className="header-inner shell">
          <a className="brand" href="#home" aria-label="Adrian Cruz Auto home" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">AC</span>
            <span className="brand-copy"><strong>ADRIAN CRUZ</strong><small>AUTOMOTIVE SALES</small></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
            <span className="sr-only">Toggle menu</span>
          </button>
          <nav id="primary-nav" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
            {[
              ["Home", "#home"], ["About", "#about"], ["Vehicles", "#vehicles"],
              ["Services", "#services"], ["Testimonials", "#testimonials"], ["Contact", "#contact"],
            ].map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          </nav>
          <a className="header-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      {/* Model-page inspired secondary navigation */}
      <nav className="section-nav" aria-label="Page sections">
        <div className="shell section-nav-inner">
          <span>FIND YOUR DRIVE</span>
          <div>
            <a href="#vehicles">Inventory</a>
            <a href="#services">How I help</a>
            <a href="#why-me">My advantage</a>
            <a href="#contact">Inquire</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-image" role="img" aria-label="Black premium crossover SUV parked beneath modern city architecture" />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="breadcrumb"><span>Home</span><i>/</i> Your personal automotive consultant</p>
          <div className="hero-copy">
            <p className="eyebrow light">NEW + PRE-OWNED VEHICLES</p>
            <h1>YOUR NEXT DRIVE,<br /><em>MADE SIMPLE.</em></h1>
            <p className="hero-lede">One dedicated advisor for vehicle selection, financing, trade-in, delivery, and everything after.</p>
            <div className="hero-actions">
              <a className="button button-red" href="#contact">Schedule a test drive <span>→</span></a>
              <a className="button button-ghost" href="#contact">Get a quote <span>→</span></a>
            </div>
          </div>
          <div className="hero-price">
            <span>FEATURED CROSSOVERS</span>
            <strong>FROM ₱1.119M</strong>
            <small>Flexible financing options available</small>
          </div>
        </div>
      </section>

      {/* Intro statement */}
      <section className="statement section-pad">
        <div className="shell statement-grid">
          <p className="section-index">01 — THE RIGHT FIT</p>
          <div>
            <p className="eyebrow">PERSONAL SERVICE. PROFESSIONAL RESULTS.</p>
            <h2>A BETTER CAR-BUYING EXPERIENCE STARTS WITH SOMEONE WHO LISTENS.</h2>
            <p className="large-copy">No crowded sales floor. No runaround. Just clear advice, thoughtful recommendations, and one person accountable from our first conversation to your first drive.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about section-pad" id="about">
        <div className="shell about-grid">
          <div className="portrait-wrap">
            <div className="portrait" role="img" aria-label="Professional portrait placeholder for Adrian Cruz">
              <span>PHOTO<br />PLACEHOLDER</span>
            </div>
            <div className="experience-badge"><strong>9+</strong><span>YEARS IN<br />AUTOMOTIVE</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">YOUR SALES PROFESSIONAL</p>
            <h2>HI, I&apos;M<br /><span>ADRIAN.</span></h2>
            <p>I help busy professionals and growing families choose new and certified pre-owned vehicles with confidence. My specialty is practical crossovers and SUVs—the vehicles that need to work as hard on weekdays as they do on weekends.</p>
            <p>Based in Metro Manila and affiliated with a leading authorized automotive group, I combine product knowledge with responsive, genuinely personal service.</p>
            <div className="trust-row">
              <div><strong>500+</strong><span>Happy deliveries</span></div>
              <div><strong>4.9/5</strong><span>Client rating</span></div>
              <div><strong>100%</strong><span>Direct support</span></div>
            </div>
            <div className="cert-line"><span aria-hidden="true">✓</span> Certified sales consultant &nbsp;•&nbsp; Authorized dealer group affiliate</div>
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section className="inventory section-pad" id="vehicles">
        <div className="shell">
          <div className="section-head">
            <div><p className="eyebrow light">CURRENT HIGHLIGHTS</p><h2>FEATURED<br />VEHICLES.</h2></div>
            <p>Handpicked options for city driving, family life, and everything in between. Availability and final pricing are confirmed upon inquiry.</p>
          </div>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <article className="vehicle-card" key={vehicle.name}>
                <div className="vehicle-image">
                  <img src={vehicle.image} alt={`${vehicle.name} ${vehicle.type} placeholder`} />
                  <span>{vehicle.status}</span>
                </div>
                <div className="vehicle-body">
                  <p>{vehicle.type}</p>
                  <h3>{vehicle.name}</h3>
                  <div className="spec-row">{vehicle.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
                  <div className="vehicle-bottom"><strong>{vehicle.price}</strong><a href="#contact" aria-label={`Inquire about ${vehicle.name}`}>Inquire <span>↗</span></a></div>
                </div>
              </article>
            ))}
          </div>
          <p className="inventory-note">Can&apos;t see your preferred model? <a href="#contact">Tell me what you&apos;re looking for →</a></p>
        </div>
      </section>

      {/* Services */}
      <section className="services section-pad" id="services">
        <div className="shell services-grid">
          <div className="services-title">
            <p className="eyebrow">END-TO-END SUPPORT</p>
            <h2>FROM SHORTLIST<br />TO <span>KEY TURN.</span></h2>
            <p>One point of contact keeps every detail moving—and keeps you informed.</p>
          </div>
          <div className="service-list">
            {services.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div><b aria-hidden="true">↗</b></article>
            ))}
          </div>
        </div>
      </section>

      {/* Value propositions — patterned after model feature chapters */}
      <section className="why" id="why-me">
        <div className="feature-panel feature-panel-one">
          <div className="feature-photo" role="img" aria-label="Premium crossover detail in an urban setting" />
          <div className="feature-copy"><p className="eyebrow light">01 / CLARITY</p><h2>ADVICE THAT<br />FITS YOUR LIFE.</h2><p>I translate specs, variants, and payment options into the things that actually matter to your daily drive.</p></div>
        </div>
        <div className="feature-panel feature-panel-two">
          <div className="feature-copy"><p className="eyebrow light">02 / ACCESS</p><h2>ONE MESSAGE.<br />ONE ANSWER.</h2><p>Get direct, timely updates from a person who knows your requirements—not a rotating inbox or call queue.</p></div>
          <div className="feature-photo" role="img" aria-label="Sleek SUV under contemporary bridge architecture" />
        </div>
        <div className="feature-panel feature-panel-three">
          <div className="feature-photo" role="img" aria-label="Modern crossover ready for delivery" />
          <div className="feature-copy"><p className="eyebrow light">03 / CARE</p><h2>SUPPORT BEYOND<br />THE HANDOVER.</h2><p>Service reminders, ownership questions, and future upgrades—I stay available long after release day.</p></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-pad" id="testimonials">
        <div className="shell">
          <div className="testimonials-head"><div><p className="eyebrow">CLIENT STORIES</p><h2>DRIVEN BY<br /><span>TRUST.</span></h2></div><div className="rating"><strong>4.9</strong><span>★★★★★<small>Average client rating</small></span></div></div>
          <div className="testimonial-grid">
            {testimonials.map((item) => <blockquote key={item.name}><span className="quote-mark">“</span><p>{item.quote}</p><footer><strong>{item.name}</strong><span>{item.vehicle}</span></footer></blockquote>)}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="contact section-pad" id="contact">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <p className="eyebrow light">START A CONVERSATION</p>
            <h2>LET&apos;S FIND<br />YOUR <span>NEXT DRIVE.</span></h2>
            <p>Tell me what you have in mind. I&apos;ll reply with clear next steps and options tailored to you.</p>
            <div className="direct-contact">
              <a href="tel:+639171234567"><small>CALL OR TEXT</small><strong>+63 917 123 4567</strong></a>
              <a href="mailto:hello@adriancruz.auto"><small>EMAIL</small><strong>hello@adriancruz.auto</strong></a>
              <a className="whatsapp" href="https://wa.me/639171234567" target="_blank" rel="noreferrer"><span>WA</span> Chat on WhatsApp <b>↗</b></a>
            </div>
          </div>
          <form className="lead-form" onSubmit={submitLead}>
            <div className="form-row"><label>Full name<input name="name" type="text" placeholder="Juan Dela Cruz" required autoComplete="name" /></label><label>Phone number<input name="phone" type="tel" placeholder="+63 9XX XXX XXXX" required autoComplete="tel" /></label></div>
            <div className="form-row"><label>Email address<input name="email" type="email" placeholder="you@email.com" required autoComplete="email" /></label><label>Vehicle interest<select name="vehicle" defaultValue=""><option value="" disabled>Select a vehicle</option>{vehicles.map((v) => <option key={v.name}>{v.name}</option>)}<option>Other / Not sure yet</option></select></label></div>
            <label>How can I help?<textarea name="message" rows={4} placeholder="Tell me about your preferred vehicle, budget, or target monthly payment." /></label>
            <label className="consent"><input type="checkbox" required /> <span>I agree to be contacted about my inquiry. My information will not be sold or shared.</span></label>
            <button className="button button-red form-submit" type="submit">Send my inquiry <span>→</span></button>
            {submitted && <p className="success" role="status">Thanks! Your sample inquiry has been captured. Connect this form to your preferred inbox or CRM before launch.</p>}
          </form>
        </div>
      </section>

      {/* Location */}
      <section className="location">
        <div className="map-placeholder" role="img" aria-label="Map placeholder for Metro Manila showroom location"><span className="map-pin">AC</span><span className="map-label"><strong>METRO MANILA</strong><small>Showroom visits by appointment</small></span></div>
      </section>

      <footer className="footer">
        <div className="shell footer-top">
          <div><a className="brand footer-brand" href="#home"><span className="brand-mark">AC</span><span className="brand-copy"><strong>ADRIAN CRUZ</strong><small>AUTOMOTIVE SALES</small></span></a><p>Your dedicated partner for new and certified pre-owned vehicles in Metro Manila.</p></div>
          <div><h3>Navigate</h3><a href="#about">About</a><a href="#vehicles">Vehicles</a><a href="#services">Services</a><a href="#contact">Contact</a></div>
          <div><h3>Connect</h3><a href="#">Facebook ↗</a><a href="#">Instagram ↗</a><a href="#">LinkedIn ↗</a><a href="tel:+639171234567">+63 917 123 4567</a></div>
          <div><h3>Hours</h3><p>Mon–Sat<br />8:30 AM–6:00 PM</p><p>Sunday by appointment</p></div>
        </div>
        <div className="shell footer-bottom"><p>© 2026 Adrian Cruz Automotive Sales. Sample site for demonstration.</p><div><a href="#">Privacy</a><a href="#">Terms</a></div><a href="#home">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
