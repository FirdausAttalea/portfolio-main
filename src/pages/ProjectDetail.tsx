import React, { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  ArrowUpRight,
  Accessibility,
  CalendarDays,
  CheckCircle2,
  Clock,
  Layers,
  Lightbulb,
  Palette,
  Search,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Wrench,
} from 'lucide-react';
import { getProjectDetail } from '../data/projectDetails';

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOut } },
};

/* ── Richer GSAP motion graphic ───────────────────────────────── */
const MotionGraphic: React.FC = () => {
  const mgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !mgRef.current) return;
    const ctx = gsap.context(() => {
      /* ring pulse */
      gsap.to('.mg-ring', {
        scale: 1.5,
        opacity: 0,
        duration: 2.4,
        stagger: 0.6,
        repeat: -1,
        ease: 'power1.out',
      });
      /* floating particles */
      gsap.to('.mg-dot', {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { amount: 1.5 },
      });
      /* orbs drift */
      gsap.to('.detail-orb-a', {
        x: 30, y: -25, scale: 1.08,
        duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('.detail-orb-b', {
        x: -25, y: 20, scale: 0.94,
        duration: 16, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
      });
      gsap.to('.detail-orb-c', {
        rotate: 360, duration: 22, repeat: -1, ease: 'linear',
      });
    }, mgRef);
    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="detail-motion-graphic" ref={mgRef} aria-hidden="true">
      {/* colour orbs */}
      <div className="detail-orb detail-orb-a" />
      <div className="detail-orb detail-orb-b" />
      <div className="detail-orb detail-orb-c" />

      {/* pulsing rings */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="mg-ring"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            translate: '-50% -50%',
            width: 120 + i * 60,
            height: 120 + i * 60,
            borderRadius: '50%',
            border: '1px solid rgba(118,91,217,0.9)',
            opacity: 0.4 - i * 0.1,
            display: 'block',
          }}
        />
      ))}

      {/* floating dots */}
      {[
        { cx: '20%', cy: '30%', r: 5 },
        { cx: '75%', cy: '20%', r: 4 },
        { cx: '60%', cy: '70%', r: 6 },
        { cx: '15%', cy: '65%', r: 3.5 },
        { cx: '85%', cy: '55%', r: 4.5 },
        { cx: '45%', cy: '15%', r: 3 },
      ].map((dot, i) => (
        <span
          key={i}
          className="mg-dot"
          style={{
            position: 'absolute',
            left: dot.cx,
            top: dot.cy,
            width: dot.r * 2,
            height: dot.r * 2,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.75)',
            boxShadow: `0 0 ${dot.r * 3}px rgba(255,255,255,0.4)`,
            display: 'block',
          }}
        />
      ))}

      {/* SVG grid + path */}
      <svg className="detail-motion-grid" viewBox="0 0 600 400" fill="none">
        <defs>
          <linearGradient id="mg-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {[60, 120, 180, 240, 300].map((y, i) => (
          <motion.line
            key={`h-${y}`} x1="0" y1={y} x2="600" y2={y}
            stroke="url(#mg-line)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.8, delay: 0.4 + i * 0.12, ease: easeOut }}
          />
        ))}
        {[80, 160, 240, 320, 400, 480, 560].map((x, i) => (
          <motion.line
            key={`v-${x}`} x1={x} y1="0" x2={x} y2="400"
            stroke="url(#mg-line)" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.18 }}
            transition={{ duration: 1.8, delay: 0.5 + i * 0.08, ease: easeOut }}
          />
        ))}
        <motion.path
          d="M80 300 C160 260, 240 220, 320 180 S480 140, 560 100"
          stroke="rgba(255,255,255,0.4)" strokeWidth="2"
          strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.8, ease: easeOut }}
        />
        <motion.circle
          r="6" fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, delay: 0.8 }}
        >
          <animateMotion
            dur="4s" repeatCount="indefinite"
            path="M80 300 C160 260, 240 220, 320 180 S480 140, 560 100"
          />
        </motion.circle>
      </svg>
    </div>
  );
};

/* ── Scroll-reveal wrapper ────────────────────────────────────── */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    custom={delay}
  >
    {children}
  </motion.div>
);

/* ── Main page component ─────────────────────────────────────── */
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectDetail(id);
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="project-detail-page">
      {/* ── Hero header ── */}
      <header className="detail-hero">
        <motion.img
          src={project.image}
          alt={project.title}
          className="detail-hero-img"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeOut }}
        />
        <div className="detail-hero-overlay" />
        <MotionGraphic />

        <div className="container detail-hero-content">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0}>
              <Link to="/projects" className="detail-back">
                <ArrowLeft size={18} /> Back to Projects
              </Link>
            </motion.div>
            <motion.div className="detail-tags" variants={fadeUp} custom={1}>
              {project.tags.map((tag) => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </motion.div>
            <motion.h1 variants={fadeUp} custom={2}>{project.title}</motion.h1>
            <motion.p className="detail-tagline" variants={fadeUp} custom={3}>
              {project.tagline}
            </motion.p>
            {project.outcome && (
              <motion.div className="detail-hero-award" variants={fadeUp} custom={4}>
                <Trophy size={16} /> {project.outcome}
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="detail-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden="true"
        >
          <motion.div
            className="detail-scroll-dot"
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </header>

      {/* ── Body ── */}
      <div className="container detail-body">
        {/* facts strip */}
        <motion.div
          className="detail-facts"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {project.facts.map((fact) => (
            <motion.div key={fact.label} className="detail-fact" variants={scaleIn}>
              <span className="detail-fact-label">{fact.label}</span>
              <span className="detail-fact-value">{fact.value}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="detail-layout">
          {/* ── MAIN ARTICLE ── */}
          <article className="detail-main">
            <Reveal className="detail-section">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Sparkles size={18} /></span>
                <h2>Overview</h2>
              </div>
              {project.overview.map((p, i) => <p key={i}>{p}</p>)}
            </Reveal>

            <Reveal className="detail-section">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Target size={18} /></span>
                <h2>Problem</h2>
              </div>
              {project.problem.map((p, i) => <p key={i}>{p}</p>)}
              {project.problemPoints && (
                <ul className="detail-list">
                  {project.problemPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
            </Reveal>

            {project.research && (
              <Reveal className="detail-section">
                <div className="detail-section-head">
                  <span className="detail-section-icon"><Search size={18} /></span>
                  <h2>Research and Insights</h2>
                </div>
                {project.research.map((p, i) => <p key={i}>{p}</p>)}

                {project.researchStats && (
                  <motion.div
                    className="detail-stats"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                  >
                    {project.researchStats.map((stat) => (
                      <motion.div
                        key={stat.label}
                        className="detail-stat"
                        variants={scaleIn}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      >
                        <span className="detail-stat-value">{stat.value}</span>
                        <span className="detail-stat-label">{stat.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {project.personas && (
                  <div className="detail-personas">
                    {project.personas.map((persona, idx) => (
                      <motion.div
                        key={persona.name}
                        className="detail-persona"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: idx * 0.1, ease: easeOut }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      >
                        <div className="detail-persona-head">
                          <span className="detail-persona-icon"><UserRound size={18} /></span>
                          <div>
                            <h3>{persona.name}</h3>
                            <span>{persona.detail}</span>
                          </div>
                        </div>
                        <p><strong>Goal.</strong> {persona.goal}</p>
                        <p><strong>Pain points.</strong> {persona.painPoints}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Reveal>
            )}

            <Reveal className="detail-section">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Lightbulb size={18} /></span>
                <h2>Solution</h2>
              </div>
              {project.solution.map((p, i) => <p key={i}>{p}</p>)}

              {project.features && (
                <motion.div
                  className="detail-features"
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {project.features.map((feature) => (
                    <motion.div
                      key={feature.title}
                      className="detail-feature"
                      variants={scaleIn}
                      whileHover={{ y: -4, borderColor: 'var(--accent)', transition: { duration: 0.2 } }}
                    >
                      <CheckCircle2 size={18} className="detail-feature-check" />
                      <div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </Reveal>

            <Reveal className="detail-section">
              <div className="detail-section-head">
                <span className="detail-section-icon"><UserRound size={18} /></span>
                <h2>My Role</h2>
              </div>
              {project.role.map((p, i) => <p key={i}>{p}</p>)}
            </Reveal>

            {(project.process || project.deliverables) && (
              <Reveal className="detail-section">
                <div className="detail-section-head">
                  <span className="detail-section-icon"><Layers size={18} /></span>
                  <h2>Process and Deliverables</h2>
                </div>
                {project.process && (
                  <ol className="detail-process">
                    {project.process.map((step, i) => (
                      <motion.li
                        key={step.title}
                        className="detail-process-step"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.08, ease: easeOut }}
                      >
                        <span className="detail-process-index">{i + 1}</span>
                        <div>
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                )}
                {project.deliverables && (
                  <ul className="detail-list">
                    {project.deliverables.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </Reveal>
            )}

            {project.designSystem && (
              <Reveal className="detail-section">
                <div className="detail-section-head">
                  <span className="detail-section-icon"><Palette size={18} /></span>
                  <h2>Design System</h2>
                </div>
                <div className="detail-design-grid">
                  {project.designSystem.typeface && (
                    <div className="detail-design-card">
                      <span className="detail-design-label">Typeface</span>
                      <strong>{project.designSystem.typeface}</strong>
                    </div>
                  )}
                  {project.designSystem.colors && (
                    <div className="detail-design-card">
                      <span className="detail-design-label">Color system</span>
                      <div className="detail-color-list">
                        {project.designSystem.colors.map((color) => (
                          <span key={color} className="detail-color-item">
                            {color.startsWith('#') && (
                              <span
                                className="detail-color-dot"
                                style={{ background: color.split(' ')[0] }}
                              />
                            )}
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {project.designSystem.notes && (
                  <ul className="detail-list">
                    {project.designSystem.notes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                )}
              </Reveal>
            )}

            <Reveal className="detail-section">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Accessibility size={18} /></span>
                <h2>Accessibility and Design Approach</h2>
              </div>
              {project.accessibility.map((p, i) => <p key={i}>{p}</p>)}
            </Reveal>

            <Reveal className="detail-section detail-vision">
              <div className="detail-section-head">
                <span className="detail-section-icon"><Sparkles size={18} /></span>
                <h2>Vision and Hope</h2>
              </div>
              {project.vision.map((p, i) => <p key={i}>{p}</p>)}
            </Reveal>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="detail-sidebar">
            <motion.div
              className="detail-sidebar-card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <h3>Project Snapshot</h3>
              <ul className="detail-snapshot">
                {project.facts.map((fact) => (
                  <li key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </li>
                ))}
              </ul>

              {project.tools && (
                <>
                  <h4 className="detail-sidebar-subtitle">Tools</h4>
                  <div className="detail-sidebar-tools">
                    {project.tools.map((tool) => (
                      <img key={tool.name} src={tool.src} alt={tool.name} title={tool.name} />
                    ))}
                  </div>
                </>
              )}

              {project.outcome && (
                <div className="detail-award">
                  <Trophy size={20} />
                  <div>
                    <span>Achievement</span>
                    <strong>{project.outcome}</strong>
                  </div>
                </div>
              )}

              <Link to="/projects" className="detail-sidebar-cta">
                Explore other projects <ArrowUpRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="detail-sidebar-card detail-sidebar-meta"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            >
              <h3>At a Glance</h3>
              <div className="detail-meta-row">
                <CalendarDays size={16} />
                <span>{project.facts.find((f) => f.label === 'Created')?.value ?? 'Project case study'}</span>
              </div>
              {project.facts.find((f) => f.label === 'Duration') && (
                <div className="detail-meta-row">
                  <Clock size={16} />
                  <span>{project.facts.find((f) => f.label === 'Duration')?.value}</span>
                </div>
              )}
              <div className="detail-meta-row">
                <Wrench size={16} />
                <span>{project.tags.join(' / ')}</span>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
