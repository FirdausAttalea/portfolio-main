import React, { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  Layers,
  Target,
  TrendingUp,
  Terminal,
  Activity,
  Cpu,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { getCodingProjectDetail } from '../data/codingProjectDetails';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: easeOut },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ── GSAP motion graphic — terminal aesthetic ── */
const CodingMotionGraphic: React.FC = () => {
  const mgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !mgRef.current) return;
    const ctx = gsap.context(() => {
      /* ring pulse */
      gsap.to('.cmg-ring', {
        scale: 1.6,
        opacity: 0,
        duration: 3,
        stagger: 0.8,
        repeat: -1,
        ease: 'power1.out',
      });
      /* floating bits */
      gsap.to('.cmg-bit', {
        y: 'random(-40, 40)',
        x: 'random(-30, 30)',
        opacity: 'random(0.3, 0.8)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { amount: 2 },
      });
      /* scanner line */
      gsap.fromTo('.cmg-scanner', 
        { top: '-10%' },
        { top: '110%', duration: 4, repeat: -1, ease: 'linear' }
      );
    }, mgRef);
    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="detail-motion-graphic coding-graphic-root" ref={mgRef} aria-hidden="true">
      <div className="cmg-scanner" style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(99,179,237,0.5), transparent)',
        zIndex: 2,
        boxShadow: '0 0 15px rgba(99,179,237,0.4)'
      }} />

      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="cmg-ring"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            width: 140 + i * 80,
            height: 140 + i * 80,
            borderRadius: '50%',
            border: '1px solid rgba(99,179,237,0.6)',
            opacity: 0.3 - i * 0.1,
            display: 'block',
          }}
        />
      ))}

      {/* Bit particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="cmg-bit"
          style={{
            position: 'absolute',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            color: 'rgba(255,255,255,0.4)',
            fontSize: '10px',
            fontFamily: 'monospace',
            display: 'block',
          }}
        >
          {Math.random() > 0.5 ? '0' : '1'}
        </span>
      ))}

      <svg className="detail-motion-grid" viewBox="0 0 600 400" fill="none">
        <defs>
          <linearGradient id="cmg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(99,179,237,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 350 L100 350 L100 250 L250 250 L250 150 L450 150 L450 50 L600 50"
          stroke="url(#cmg-grad)" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    custom={delay}
  >
    {children}
  </motion.div>
);

const CodingProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = getCodingProjectDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="project-detail-page coding-detail-theme">
      <header className="detail-hero">
        <motion.img
          src={project.image}
          alt={project.title}
          className="detail-hero-img"
          initial={{ scale: 1.1, filter: 'brightness(0.6)' }}
          animate={{ scale: 1, filter: 'brightness(0.5)' }}
          transition={{ duration: 1.5 }}
        />
        <div className="detail-hero-overlay" />
        <CodingMotionGraphic />

        <div className="container detail-hero-content">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <Reveal delay={0}>
              <Link to="/projects#coding-projects" className="detail-back">
                <ArrowLeft size={18} /> Systems & Engineering
              </Link>
            </Reveal>
            <motion.div className="detail-tags" variants={fadeUp} custom={1}>
              {project.tags.map((tag) => <span key={tag} className="detail-tag">{tag}</span>)}
            </motion.div>
            <motion.h1 variants={fadeUp} custom={2}>{project.title}</motion.h1>
            <motion.p className="detail-tagline" variants={fadeUp} custom={3}>{project.tagline}</motion.p>
          </motion.div>
        </div>
      </header>

      <div className="container detail-body">
        <div className="detail-facts" data-aos="fade-up">
          {project.facts.map((fact) => (
            <div key={fact.label} className="detail-fact">
              <span className="detail-fact-label">{fact.label}</span>
              <span className="detail-fact-value">{fact.value}</span>
            </div>
          ))}
        </div>

        <div className="detail-layout">
          <article className="detail-main">
            <section className="detail-section" data-aos="fade-up">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Terminal size={18} /></span>
                <h2>Executive Summary</h2>
              </div>
              {project.overview.map((p, i) => <p key={i}>{p}</p>)}
            </section>

            <section className="detail-section" data-aos="fade-up">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Target size={18} /></span>
                <h2>The Challenge</h2>
              </div>
              {project.problem.map((p, i) => <p key={i}>{p}</p>)}
              {project.problemPoints && (
                <ul className="detail-list coding-accent-list">
                  {project.problemPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
            </section>

            {project.researchStats && (
              <section className="detail-section" data-aos="fade-up">
                <div className="detail-section-head">
                  <span className="detail-section-icon"><Activity size={18} /></span>
                  <h2>Performance Baselines</h2>
                </div>
                <div className="detail-stats">
                  {project.researchStats.map((stat) => (
                    <div key={stat.label} className="detail-stat">
                      <span className="detail-stat-value">{stat.value}</span>
                      <span className="detail-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="detail-section" data-aos="fade-up">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Cpu size={18} /></span>
                <h2>Technical Solution</h2>
              </div>
              {project.solution.map((p, i) => <p key={i}>{p}</p>)}
              <div className="detail-features">
                {project.features?.map((f) => (
                  <div key={f.title} className="detail-feature coding-feature">
                    <ShieldCheck size={20} className="detail-feature-check" />
                    <div>
                      <h3>{f.title}</h3>
                      <p>{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {project.techStack && (
              <section className="detail-section" data-aos="fade-up">
                <div className="detail-section-head">
                  <span className="detail-section-icon"><Database size={18} /></span>
                  <h2>Infrastructure & Stack</h2>
                </div>
                <div className="detail-design-grid">
                  {project.techStack.map((stack) => (
                    <div key={stack.category} className="detail-design-card tech-card">
                      <span className="detail-design-label">{stack.category}</span>
                      <strong>{stack.items.join(' • ')}</strong>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="detail-section" data-aos="fade-up">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Layers size={18} /></span>
                <h2>Implementation Roadmap</h2>
              </div>
              <ol className="detail-process">
                {project.process?.map((step, i) => (
                  <li key={step.title} className="detail-process-step">
                    <span className="detail-process-index">{i + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <aside className="detail-sidebar">
            <div className="detail-sidebar-card" data-aos="fade-left">
              <h3>System Specs</h3>
              <ul className="detail-snapshot">
                {project.facts.map((f) => (
                  <li key={f.label}><span>{f.label}</span><strong>{f.value}</strong></li>
                ))}
              </ul>
              {project.tools && (
                <div className="detail-sidebar-tools">
                  {project.tools.map((t) => <img key={t.name} src={t.src} alt={t.name} title={t.name} />)}
                </div>
              )}
            </div>

            {project.kpis && (
              <div className="detail-sidebar-card detail-sidebar-meta" data-aos="fade-left" data-aos-delay="100">
                <h3>Target Metrics</h3>
                {project.kpis.map((kpi) => (
                  <div key={kpi.label} className="detail-meta-row">
                    <TrendingUp size={16} />
                    <span>{kpi.label}: <strong>{kpi.value}</strong></span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CodingProjectDetail;
