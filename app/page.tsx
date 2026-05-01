// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';
import siteData from '@/lib/site-data';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--st-font-head',
});

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--st-font-body',
});

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useReveal();
  const [navActive, setNavActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavActive(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const css = `
    :root {
      --st-primary: #8B4513;
      --st-primary-light: #A0522D;
      --st-bg: #F5F0E8;
      --st-surface: #EDE8DE;
      --st-surface2: #E4DDD2;
      --st-text: #2A1A0E;
      --st-text-muted: #7A6A5A;
      --st-border: rgba(139,69,19,0.14);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--st-bg);
      color: var(--st-text);
      font-family: var(--st-font-body), 'Lato', sans-serif;
      overflow-x: hidden;
    }
    .st-head { font-family: var(--st-font-head), 'Playfair Display', serif; }

    /* ── NAV ── */
    .st-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 0 48px; height: 68px;
      display: flex; align-items: center; justify-content: space-between;
      transition: background 0.3s, border-color 0.3s;
      border-bottom: 1px solid transparent;
    }
    .st-nav.active {
      background: rgba(245,240,232,0.96);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--st-border);
    }
    .st-logo {
      font-size: 22px; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--st-text); font-weight: 300;
    }
    .st-logo span { color: var(--st-primary); font-weight: 700; }
    .st-nav-links { display: flex; gap: 36px; list-style: none; }
    .st-nav-links a {
      font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--st-text-muted); text-decoration: none; transition: color 0.2s;
    }
    .st-nav-links a:hover { color: var(--st-primary); }
    .st-nav-cta {
      background: var(--st-primary); color: #FFF;
      padding: 10px 24px; font-size: 12px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
      border-radius: 4px; transition: background 0.2s;
    }
    .st-nav-cta:hover { background: var(--st-primary-light); }
    .st-hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      background: none; border: none; padding: 4px;
    }
    .st-hamburger span { display: block; width: 24px; height: 2px; background: var(--st-text); }

    /* ── HERO — INSET / CARD ── */
    .st-hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 440px;
      align-items: center;
      gap: 72px;
      padding: 100px 64px 64px 80px;
      background: var(--st-bg);
    }
    .st-hero-copy {}
    .st-hero-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--st-primary); margin-bottom: 24px;
    }
    .st-hero-eyebrow::before {
      content: ''; display: block; width: 32px; height: 1px; background: var(--st-primary);
    }
    .st-hero-h1 {
      font-size: clamp(48px, 4.8vw, 74px);
      line-height: 1.08; color: var(--st-text);
      margin-bottom: 28px; font-style: italic;
    }
    .st-hero-h1 strong { font-style: normal; color: var(--st-primary); }
    .st-hero-sub {
      font-size: 17px; line-height: 1.7; color: var(--st-text-muted);
      max-width: 440px; margin-bottom: 40px; font-weight: 300;
    }
    .st-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 52px; }
    .st-btn-primary {
      background: var(--st-primary); color: #FFF;
      padding: 16px 36px; font-size: 13px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
      border-radius: 6px; transition: background 0.2s, transform 0.2s;
    }
    .st-btn-primary:hover { background: var(--st-primary-light); transform: translateY(-2px); }
    .st-btn-outline {
      border: 2px solid rgba(139,69,19,0.3); color: var(--st-text);
      padding: 14px 32px; font-size: 13px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
      border-radius: 6px; transition: border-color 0.2s, color 0.2s;
    }
    .st-btn-outline:hover { border-color: var(--st-primary); color: var(--st-primary); }
    .st-hero-stats {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border-top: 1px solid var(--st-border); padding-top: 32px; gap: 8px;
    }
    .st-stat-num {
      font-size: 30px; color: var(--st-primary); display: block; margin-bottom: 4px;
    }
    .st-stat-label {
      font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--st-text-muted);
    }

    /* ── HERO VIDEO CARD ── */
    .st-video-card {
      position: relative; border-radius: 20px; overflow: hidden;
      aspect-ratio: 9/16;
      box-shadow: 0 24px 60px rgba(139,69,19,0.18), 0 8px 20px rgba(139,69,19,0.1);
    }
    .st-video-card video {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .st-video-card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(42,26,14,0.85) 0%, transparent 50%);
    }
    .st-video-card-info {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 24px 24px 28px;
    }
    .st-video-card-label {
      font-size: 16px; font-weight: 700; color: #FFF; letter-spacing: 0.04em;
      margin-bottom: 4px;
    }
    .st-video-card-sub {
      font-size: 12px; color: rgba(255,255,255,0.7); letter-spacing: 0.06em;
    }
    .st-video-card-badge {
      position: absolute; top: 20px; left: 20px;
      background: var(--st-primary); color: #FFF;
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      padding: 5px 14px; border-radius: 20px;
    }

    /* ── SECTIONS ── */
    .st-section { padding: 96px 48px; }
    .st-section-inner { max-width: 1200px; margin: 0 auto; }
    .st-section-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--st-primary); margin-bottom: 16px;
      display: flex; align-items: center; gap: 12px;
    }
    .st-section-label::after {
      content: ''; display: block; flex: 1; max-width: 48px; height: 1px; background: var(--st-border);
    }
    .st-section-title {
      font-size: clamp(34px, 3.2vw, 48px); line-height: 1.15;
      color: var(--st-text); margin-bottom: 20px; font-style: italic;
    }
    .st-section-sub {
      font-size: 17px; line-height: 1.7; color: var(--st-text-muted); max-width: 520px; font-weight: 300;
    }

    /* ── PILLARS ── */
    .st-pillars { background: var(--st-surface); }
    .st-pillars-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 24px; margin-top: 56px;
    }
    .st-pillar-card {
      background: var(--st-bg); border-radius: 16px; padding: 36px 28px;
      border: 1px solid var(--st-border);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .st-pillar-card:hover {
      box-shadow: 0 8px 32px rgba(139,69,19,0.1);
      transform: translateY(-4px);
    }
    .st-pillar-num {
      font-size: 44px; color: var(--st-primary); display: block; margin-bottom: 16px; opacity: 0.5;
    }
    .st-pillar-title {
      font-size: 17px; font-weight: 700; color: var(--st-text); margin-bottom: 12px;
    }
    .st-pillar-desc { font-size: 14px; line-height: 1.7; color: var(--st-text-muted); font-weight: 300; }

    /* ── SERVICES ── */
    .st-services-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 20px; margin-top: 56px;
    }
    .st-service-card {
      background: var(--st-surface); border-radius: 16px; padding: 32px 28px;
      border: 1px solid var(--st-border);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .st-service-card:hover {
      box-shadow: 0 8px 32px rgba(139,69,19,0.1);
      transform: translateY(-3px);
    }
    .st-service-tag {
      font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--st-primary); margin-bottom: 12px; display: block;
    }
    .st-service-name { font-size: 19px; font-weight: 700; color: var(--st-text); margin-bottom: 10px; }
    .st-service-desc { font-size: 14px; line-height: 1.65; color: var(--st-text-muted); margin-bottom: 20px; font-weight: 300; }
    .st-service-meta {
      display: flex; gap: 16px; font-size: 11px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--st-text-muted);
    }
    .st-service-meta span {
      display: flex; align-items: center; gap: 6px;
    }
    .st-service-meta span::before {
      content: '·'; color: var(--st-primary);
    }
    .st-service-meta span:first-child::before { display: none; }

    /* ── PRICING ── */
    .st-pricing { background: var(--st-surface); }
    .st-pricing-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 24px; margin-top: 56px;
    }
    .st-price-card {
      background: var(--st-bg); border-radius: 20px; padding: 44px 36px;
      border: 1px solid var(--st-border);
      position: relative;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .st-price-card:hover {
      box-shadow: 0 12px 40px rgba(139,69,19,0.12);
      transform: translateY(-4px);
    }
    .st-price-card.featured {
      border-color: var(--st-primary);
      box-shadow: 0 12px 40px rgba(139,69,19,0.18);
    }
    .st-price-badge {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: var(--st-primary); color: #FFF;
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      padding: 4px 20px; border-radius: 20px; white-space: nowrap;
    }
    .st-price-name {
      font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--st-text-muted); margin-bottom: 16px;
    }
    .st-price-amount {
      font-size: 52px; font-weight: 900; color: var(--st-text); line-height: 1; margin-bottom: 4px;
    }
    .st-price-amount span { font-size: 18px; font-weight: 300; color: var(--st-text-muted); }
    .st-price-desc { font-size: 13px; color: var(--st-text-muted); margin-bottom: 28px; font-weight: 300; }
    .st-price-features { list-style: none; margin-bottom: 32px; }
    .st-price-features li {
      font-size: 14px; color: var(--st-text-muted); padding: 9px 0;
      border-bottom: 1px solid var(--st-border);
      display: flex; align-items: center; gap: 10px;
    }
    .st-price-features li::before { content: '✓'; color: var(--st-primary); font-weight: 700; }
    .st-price-cta {
      display: block; text-align: center; text-decoration: none;
      padding: 14px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
      border: 2px solid rgba(139,69,19,0.25); color: var(--st-text); border-radius: 8px;
      transition: all 0.2s;
    }
    .st-price-cta:hover, .st-price-card.featured .st-price-cta {
      background: var(--st-primary); border-color: var(--st-primary); color: #FFF;
    }

    /* ── CTA ── */
    .st-cta {
      background: var(--st-primary); padding: 100px 48px; text-align: center;
    }
    .st-cta-title {
      font-size: clamp(36px, 4vw, 60px); line-height: 1.1; margin-bottom: 24px;
      color: #FFF; font-style: italic;
    }
    .st-cta-sub {
      font-size: 18px; line-height: 1.65; color: rgba(255,255,255,0.8);
      max-width: 480px; margin: 0 auto 44px; font-weight: 300;
    }
    .st-btn-white {
      background: #FFF; color: var(--st-primary);
      padding: 18px 44px; font-size: 14px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
      border-radius: 6px; transition: all 0.2s; display: inline-block;
    }
    .st-btn-white:hover { background: var(--st-bg); transform: translateY(-2px); }

    /* ── FOOTER ── */
    .st-footer {
      background: var(--st-text); padding: 48px 48px 32px;
    }
    .st-footer-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 24px;
    }
    .st-footer-logo {
      font-size: 20px; letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(245,240,232,0.9); font-weight: 300;
    }
    .st-footer-logo span { color: #C8956A; font-weight: 700; }
    .st-footer-links { display: flex; gap: 24px; list-style: none; }
    .st-footer-links a {
      font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(245,240,232,0.5); text-decoration: none; transition: color 0.2s;
    }
    .st-footer-links a:hover { color: rgba(245,240,232,0.9); }
    .st-footer-copy {
      font-size: 12px; color: rgba(245,240,232,0.4); text-align: center;
      max-width: 1200px; margin: 24px auto 0;
      padding-top: 24px; border-top: 1px solid rgba(245,240,232,0.1);
    }

    /* ── REVEAL ── */
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── MOBILE ── */
    @media (max-width: 960px) {
      .st-nav { padding: 0 24px; }
      .st-nav-links, .st-nav-cta { display: none; }
      .st-hamburger { display: flex; }
      .st-hero {
        grid-template-columns: 1fr;
        padding: 96px 24px 48px;
        gap: 40px;
      }
      .st-video-card { max-width: 360px; margin: 0 auto; }
      .st-hero-stats { grid-template-columns: repeat(2, 1fr); }
      .st-pillars-grid { grid-template-columns: 1fr 1fr; }
      .st-services-grid { grid-template-columns: 1fr; }
      .st-pricing-grid { grid-template-columns: 1fr; }
      .st-section { padding: 64px 24px; }
      .st-cta { padding: 64px 24px; }
      .st-footer { padding: 40px 24px 24px; }
      .st-footer-inner { flex-direction: column; align-items: flex-start; }
    }
  `;

  return (
    <main className={`${playfair.variable} ${lato.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── NAV ── */}
      <nav className={`st-nav${navActive ? ' active' : ''}`}>
        <div className="st-logo"><span>STRETCH</span> Studio</div>
        <ul className="st-nav-links">
          <li><a href="#approach">Approach</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#book" className="st-nav-cta">Book Now</a>
        <button
          className="st-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO — INSET / CARD ── */}
      <section className="st-hero">
        {/* Left: Copy */}
        <div className="st-hero-copy">
          <p className="st-hero-eyebrow">Scottsdale, AZ · Assisted Stretching</p>
          <h1 className="st-hero-h1 st-head">
            Flexibility is<br />a skill.<br />
            <strong>Learn it.</strong>
          </h1>
          <p className="st-hero-sub">{siteData.hero.subtitle}</p>
          <div className="st-hero-actions">
            <a href="#book" className="st-btn-primary">Book First Session</a>
            <a href="#services" className="st-btn-outline">Our Services</a>
          </div>
          <div className="st-hero-stats">
            {siteData.stats.map((s, i) => (
              <div key={i}>
                <span className="st-stat-num st-head">{s.value}</span>
                <span className="st-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Video Card */}
        <div className="st-video-card">
          <video ref={videoRef} autoPlay muted loop playsInline>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          <div className="st-video-card-overlay" />
          <div className="st-video-card-badge">1-on-1 Sessions</div>
          <div className="st-video-card-info">
            <div className="st-video-card-label">Assisted Stretching</div>
            <div className="st-video-card-sub">Scottsdale · Certified Therapists</div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="st-section st-pillars" id="approach">
        <div className="st-section-inner">
          <p className="st-section-label reveal">Our Approach</p>
          <h2 className="st-section-title st-head reveal">
            Four ways we help<br />you move better.
          </h2>
          <p className="st-section-sub reveal">
            Every session is guided by science and tailored to your body — not a generic routine.
          </p>
          <div className="st-pillars-grid">
            {siteData.pillars.map((p, i) => (
              <div
                className="st-pillar-card reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="st-pillar-num st-head">0{i + 1}</span>
                <div className="st-pillar-title">{p.title}</div>
                <p className="st-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="st-section" id="services">
        <div className="st-section-inner">
          <p className="st-section-label reveal">Services</p>
          <h2 className="st-section-title st-head reveal">
            A session for<br />every need.
          </h2>
          <div className="st-services-grid">
            {siteData.services.map((s, i) => (
              <div
                className="st-service-card reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="st-service-tag">{s.tag}</span>
                <div className="st-service-name">{s.name}</div>
                <p className="st-service-desc">{s.desc}</p>
                <div className="st-service-meta">
                  <span>{s.duration}</span>
                  <span>{s.format}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="st-section st-pricing" id="pricing">
        <div className="st-section-inner">
          <p className="st-section-label reveal">Pricing</p>
          <h2 className="st-section-title st-head reveal">
            Invest in how<br />you feel every day.
          </h2>
          <div className="st-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div
                className={`st-price-card reveal${p.featured ? ' featured' : ''}`}
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {p.featured && <div className="st-price-badge">Best Value</div>}
                <div className="st-price-name">{p.name}</div>
                <div className="st-price-amount">
                  ${p.price}<span>/mo</span>
                </div>
                <p className="st-price-desc">{p.desc}</p>
                <ul className="st-price-features">
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <a href="#book" className="st-price-cta">Book Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="st-cta" id="book">
        <p
          className="reveal"
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '16px',
          }}
        >
          First Session
        </p>
        <h2 className="st-cta-title st-head reveal">
          Start feeling better<br />this week.
        </h2>
        <p className="st-cta-sub reveal">{siteData.cta.subtitle}</p>
        <a href="#contact" className="st-btn-white reveal">Book Your Session</a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="st-footer" id="contact">
        <div className="st-footer-inner">
          <div className="st-footer-logo"><span>STRETCH</span> Studio</div>
          <ul className="st-footer-links">
            <li><a href="#approach">Approach</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
          <div style={{ fontSize: '13px', color: 'rgba(245,240,232,0.5)' }}>
            {siteData.contact.address} · {siteData.contact.phone}
          </div>
        </div>
        <p className="st-footer-copy">© 2026 STRETCH Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}
