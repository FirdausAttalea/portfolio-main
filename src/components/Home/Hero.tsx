import React, { useEffect, useRef } from 'react';
import { ArrowRight, Mail, Trophy, Briefcase, GraduationCap } from 'lucide-react';
import { gsap } from 'gsap';
import Badge from '../common/Badge';
import Button from '../common/Button';

/* ── floating orbs background ───────────────────────────────── */
const HeroOrbs: React.FC = () => (
  <div className="hero-orbs" aria-hidden="true">
    <span className="hero-orb hero-orb-1" />
    <span className="hero-orb hero-orb-2" />
    <span className="hero-orb hero-orb-3" />
  </div>
);

/* ── animated stat chips beside the id-card ─────────────────── */
const statChips = [
  { icon: <Trophy size={14} />, label: '4× National Winner', color: '#f59e0b' },
  { icon: <Briefcase size={14} />, label: '1+ yr Experience', color: '#5838C2' },
  { icon: <GraduationCap size={14} />, label: 'GPA 3.79', color: '#10b981' },
];

const Hero: React.FC = () => {
  const heroRef   = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* text stagger */
      gsap.fromTo(
        '.hero-anim',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );
      /* id-card float-in */
      gsap.fromTo(
        '.id-card-wrapper',
        { opacity: 0, x: 48, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.4 }
      );
      /* id-card idle float */
      gsap.to('.id-card', {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.2,
      });
      /* stat chips stagger */
      gsap.fromTo(
        '.hero-stat-chip',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.14, ease: 'power2.out', delay: 0.9 }
      );
      /* orbs subtle pulse */
      gsap.to('.hero-orb-1', { scale: 1.15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-orb-2', { scale: 1.08, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero section" ref={heroRef}>
      <HeroOrbs />
      <div className="container">
        <div className="hero-content">
          {/* ── LEFT: Text ── */}
          <div className="hero-text" ref={textRef}>
            <div className="hero-badge hero-anim">
              <span className="badge-dot" />
              Available for new opportunities
            </div>

            <h1 className="hero-anim">Hi, I'm Firdaus 👋🏻</h1>

            <h2 className="hero-job-title hero-anim">
              Product Manager &amp; UX Designer
            </h2>

            <p className="hero-summary hero-anim">
              Information Systems graduate (GPA 3.79, Universitas Brawijaya) with 1+ year of hands-on
              experience across Product Management, Project Management, and UI/UX Design.
              4× National competition award winner.
            </p>

            <div className="hero-highlight-skills hero-anim">
              <Badge>Product Manager</Badge>
              <Badge>Product Designer</Badge>
              <Badge>Business Analyst</Badge>
              <Badge>Data Analytics</Badge>
              <Badge>UI/UX Designer</Badge>
            </div>

            <div className="hero-cta hero-anim">
              <Button to="/projects" variant="primary">
                View Portfolio <ArrowRight size={20} />
              </Button>
              <Button href="/#contact" variant="secondary">
                Contact Me <Mail size={20} />
              </Button>
            </div>
          </div>

          {/* ── RIGHT: Visual ── */}
          <div className="hero-visual" ref={visualRef}>
            {/* stat chips */}
            <div className="hero-stat-chips">
              {statChips.map((chip) => (
                <div
                  key={chip.label}
                  className="hero-stat-chip"
                  style={{ '--chip-color': chip.color } as React.CSSProperties}
                >
                  <span className="hero-stat-chip-icon" style={{ color: chip.color }}>
                    {chip.icon}
                  </span>
                  {chip.label}
                </div>
              ))}
            </div>

            {/* ID Card */}
            <div className="id-card-wrapper">
              <div className="id-card">
                <div className="id-card-shine" />

                <div className="id-card-top">
                  <div className="id-card-header">
                    <img src="/img/company/cimb-logo.png" alt="CIMB Niaga" className="id-card-logo" />
                  </div>
                  <div className="id-card-photo">
                    <img src="/img/profile/hero-firdaus.png" alt="Firdaus Attalea" />
                  </div>
                </div>

                <div className="id-card-bottom">
                  <div className="id-card-info">
                    <h3 className="id-card-name">Firdaus Attalea</h3>
                    <p className="id-card-role">Product Manager · IS UB'22</p>
                    <p className="id-card-location">South Jakarta, Indonesia</p>
                  </div>
                  {/* animated online dot */}
                  <div className="id-card-status">
                    <span className="id-status-dot" />
                    <span>Open to work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
