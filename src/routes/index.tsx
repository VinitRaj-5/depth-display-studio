import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Menu, Sparkles, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import buildingAsset from "@/assets/image1.jpeg.asset.json";
import founderAsset from "@/assets/image31.jpeg.asset.json";
import groupAsset from "@/assets/image11.jpeg.asset.json";
import groupTwoAsset from "@/assets/image24.jpeg.asset.json";
import resultsAsset from "@/assets/image35.jpeg.asset.json";
import BookScene from "@/components/BookScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Learning Room | Learn. Grow. Succeed." },
      { name: "description", content: "The Learning Room coaching institute in Uttasara, Petarwar, Bokaro. Better education, brighter future." },
      { property: "og:title", content: "The Learning Room | Learn. Grow. Succeed." },
      { property: "og:description", content: "Explore classes, student achievements, and the people behind The Learning Room in Petarwar, Bokaro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: buildingAsset.url },
      { name: "twitter:image", content: buildingAsset.url },
    ],
  }),
  component: Index,
});

const programs = [
  { number: "01", title: "Classes 10", detail: "JAC, CBSE & ICSE Boards", icon: BookOpen },
  { number: "02", title: "Classes 11–12", detail: "Science, Commerce & Arts", icon: GraduationCap },
  { number: "03", title: "Graduation", detail: "English Honours", icon: Sparkles },
  { number: "04", title: "Competitive Exams", detail: "Banking, SSC, Railway, UPSC, JPSC & more", icon: Target },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? (scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); observer.disconnect(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="The Learning Room, back to top">
          <span className="brand-mark">LR<span className="brand-mark-dot">.</span></span>
          <span className="brand-name">THE LEARNING <strong>ROOM</strong></span>
        </a>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>Our story</a>
          <a href="#programs" onClick={closeMenu}>Programs</a>
          <a href="#life" onClick={closeMenu}>Life here</a>
          <a href="#results" onClick={closeMenu}>Results</a>
          <a className="nav-contact" href="#visit" onClick={closeMenu}>Visit us <ArrowUpRight size={15} /></a>
        </nav>
        <Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <section id="top" className="hero" style={{ backgroundImage: `linear-gradient(90deg, var(--hero-shade) 0%, var(--hero-shade-mid) 55%, var(--hero-shade-edge) 100%), url(${buildingAsset.url})` }}>
        <div className="hero-grid" aria-hidden="true" />
        <BookScene />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A PLACE TO BECOME</div>
          <h1>The Learning<br /><em>Room.</em></h1>
          <p className="hero-tagline">Better education.<br />Brighter future.</p>
          <p className="hero-description">A place to learn deeply, grow confidently, and move towards what comes next.</p>
          <div className="hero-actions">
            <Button asChild variant="premium" size="lg"><a href="#programs">Explore our programs <ArrowUpRight /></a></Button>
            <a className="text-link" href="#about">Discover our story <ArrowRight size={17} /></a>
          </div>
        </div>
        <div className="hero-footer"><span>UTTASARA · PETARWAR · BOKARO</span><a href="#about" aria-label="Scroll to our story"><ArrowDown size={17} /> SCROLL TO EXPLORE</a><span>01 / 05</span></div>
      </section>

      <section id="about" className="intro section-shell">
        <div className="section-kicker reveal"><span>01 / THE PHILOSOPHY</span><span className="section-kicker-rule" /></div>
        <div className="intro-layout">
          <h2 className="display-heading reveal">Education is a<br /><em>beginning,</em><br />not a boundary.</h2>
          <div className="intro-side reveal"><span className="diamond-mark">✦</span><p>At The Learning Room, every lesson is a step towards possibility. We bring dedicated teaching, personal attention, and a belief in every student’s potential together under one roof.</p><span className="signature-line">LEARN &nbsp; / &nbsp; GROW &nbsp; / &nbsp; SUCCEED</span></div>
        </div>
      </section>

      <section id="programs" className="programs-section section-shell">
        <div className="section-kicker reveal"><span>02 / WHAT WE TEACH</span><span className="section-kicker-rule" /></div>
        <div className="section-heading-row reveal"><h2 className="display-heading">Find your<br /><em>next chapter.</em></h2><p>From the first big exams to ambitious new goals, there’s room to move forward here.</p></div>
        <div className="program-list">
          {programs.map(({ number, title, detail, icon: Icon }) => <div className="program-row reveal" key={number}><span className="program-number">{number}</span><span className="program-icon"><Icon size={23} strokeWidth={1.3} /></span><div className="program-text"><h3>{title}</h3><p>{detail}</p></div><ArrowUpRight className="program-arrow" size={25} strokeWidth={1.2} /></div>)}
        </div>
        <p className="program-footnote">ALSO AT THE LEARNING ROOM <span>Navodaya Vidyalaya · Netarhat School · Sainik School · English Communication</span></p>
      </section>

      <section id="life" className="life-section">
        <div className="life-header section-shell"><div className="section-kicker reveal"><span>03 / THE PEOPLE</span><span className="section-kicker-rule" /></div><div className="section-heading-row reveal"><h2 className="display-heading">More than<br /><em>a classroom.</em></h2><p>Learning happens together. So do the moments worth remembering.</p></div></div>
        <div className="photo-strip"><div className="photo-frame reveal"><img src={groupAsset.url} alt="Students and educators together at The Learning Room" loading="lazy" /><span>01 / TOGETHER</span></div><div className="photo-frame reveal"><img src={groupTwoAsset.url} alt="Students celebrating at The Learning Room" loading="lazy" /><span>02 / COMMUNITY</span></div></div>
      </section>

      <section className="founder-section section-shell"><div className="founder-photo reveal"><img src={founderAsset.url} alt="Vivek Kumar Verma, founder and educator" loading="lazy" /><span>THE PERSON BEHIND THE PURPOSE</span></div><div className="founder-copy reveal"><div className="section-kicker"><span>04 / A NOTE FROM OUR FOUNDER</span><span className="section-kicker-rule" /></div><span className="quote-mark">“</span><h2>Every student deserves someone who sees what they <em>can become.</em></h2><div className="founder-rule" /><p className="founder-name">Vivek Kumar Verma</p><p className="founder-role">Founder, Director & Educator<br />M.A. (English), B.Ed., CTET Qualified</p></div></section>

      <section id="results" className="results-section section-shell"><div className="section-kicker reveal"><span>05 / OUR STUDENTS</span><span className="section-kicker-rule" /></div><div className="section-heading-row reveal"><h2 className="display-heading">The work.<br /><em>The outcomes.</em></h2><p>We celebrate the effort behind every achievement. Meet some of our 2025–26 toppers.</p></div><div className="results-image reveal"><img src={resultsAsset.url} alt="The Learning Room 2025–26 toppers results poster" loading="lazy" /></div></section>

      <section id="visit" className="visit-section"><div className="visit-inner section-shell reveal"><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Come see what’s <em>possible.</em></h2><p>The Learning Room · Uttasara, Petarwar (Bokaro)</p><Button asChild variant="premium" size="lg"><a href="https://www.google.com/maps/search/?api=1&query=The+Learning+Room+Uttasara+Petarwar+Bokaro" target="_blank" rel="noopener noreferrer">Find us on the map <ArrowUpRight /></a></Button></div></section>
      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark">LR<span className="brand-mark-dot">.</span></span><span>THE LEARNING ROOM</span></div><span>LEARN / GROW / SUCCEED</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
