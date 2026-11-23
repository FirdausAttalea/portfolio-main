import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  ArrowUpRight,
  Target,
  Layers,
  Search,
  UserRound,
  CheckCircle2,
  CalendarDays,
  ShieldCheck,
  Compass,
  GitPullRequest,
  Sparkles,
  ShieldAlert,
  Play,
  Wrench,
  FileText,
  Clock,
  ChevronRight,
  ListFilter,
  Check,
} from 'lucide-react';
import { getDeliverableDetail, deliverableDetails } from '../data/deliverableDetails';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: easeOut },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

/* ── GSAP Motion Graphic for Product Room Hero ── */
const DeliverableMotionGraphic: React.FC<{ themeColor?: string }> = ({ themeColor = 'rgba(88,56,194,0.9)' }) => {
  const graphicRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !graphicRef.current) return;
    const ctx = gsap.context(() => {
      // Rotating outer dashed ring
      gsap.to('.d-hero-ring-dashed', {
        rotation: 360,
        duration: 38,
        repeat: -1,
        ease: 'none',
      });
      // Floating indicator points
      gsap.to('.d-hero-node', {
        y: 'random(-14, 14)',
        x: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.25,
      });
      // Concentric pulsing radar rings
      gsap.to('.d-hero-pulse-ring', {
        scale: 1.45,
        opacity: 0,
        duration: 2.8,
        stagger: 0.7,
        repeat: -1,
        ease: 'power1.out',
      });
    }, graphicRef);

    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="deliverable-hero-motion" ref={graphicRef} aria-hidden="true">
      {/* Background radial gradient blobs */}
      <span className="d-hero-blob d-hero-blob-1" />
      <span className="d-hero-blob d-hero-blob-2" />

      {/* Pulsing rings */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="d-hero-pulse-ring"
          style={{
            width: 140 + i * 70,
            height: 140 + i * 70,
            borderColor: themeColor,
          }}
        />
      ))}

      {/* Rotating dashed ring */}
      <div className="d-hero-ring-dashed" />

      {/* Floating nodes with connecting SVG geometry */}
      <svg className="d-hero-grid-svg" viewBox="0 0 700 450" fill="none">
        <defs>
          <linearGradient id="d-line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 60 380 Q 220 280 360 220 T 660 120"
          stroke="url(#d-line-grad)"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: easeOut }}
        />
        {[
          { cx: 120, cy: 340, r: 6 },
          { cx: 280, cy: 250, r: 5 },
          { cx: 440, cy: 190, r: 7 },
          { cx: 580, cy: 140, r: 5 },
        ].map((node, idx) => (
          <circle
            key={idx}
            className="d-hero-node"
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="#ffffff"
            opacity="0.85"
          />
        ))}
      </svg>
    </div>
  );
};

/* ── Icon Resolver ── */
const SectionIcon: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case 'Target':
      return <Target size={18} />;
    case 'Layers':
      return <Layers size={18} />;
    case 'Search':
      return <Search size={18} />;
    case 'UserRound':
      return <UserRound size={18} />;
    case 'CheckCircle2':
      return <CheckCircle2 size={18} />;
    case 'CalendarDays':
      return <CalendarDays size={18} />;
    case 'ShieldAlert':
      return <ShieldAlert size={18} />;
    case 'ShieldCheck':
      return <ShieldCheck size={18} />;
    case 'Play':
      return <Play size={18} />;
    case 'Wrench':
      return <Wrench size={18} />;
    case 'Sparkles':
      return <Sparkles size={18} />;
    default:
      return <FileText size={18} />;
  }
};

const DeliverableDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const deliverable = getDeliverableDetail(id);
  const reduce = useReducedMotion();
  const [activeSectionIdx, setActiveSectionIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSectionIdx(null);
  }, [id]);

  if (!deliverable) {
    return <Navigate to="/projects" replace />;
  }

  const scrollToSection = (index: number) => {
    setActiveSectionIdx(index);
    const element = document.getElementById(`doc-section-${index}`);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="deliverable-detail-page">
      {/* ── Document Switcher Header Navigation ── */}
      <div className="doc-room-nav-bar">
        <div className="container doc-room-nav-inner">
          <span className="doc-room-nav-title">
            <Layers size={16} /> PRD Documentation Rooms:
          </span>
          <div className="doc-room-tabs">
            {deliverableDetails.map((doc) => {
              const isActive = doc.id === deliverable.id;
              return (
                <Link
                  key={doc.id}
                  to={`/product/${doc.id}`}
                  className={`doc-room-tab ${isActive ? 'active' : ''}`}
                >
                  <span className="doc-tab-badge">{doc.partBadge.split('•')[0].trim()}</span>
                  <span className="doc-tab-label">{doc.title}</span>
                  {isActive && <Check size={14} className="doc-tab-active-icon" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <header className="detail-hero">
        <motion.img
          src={deliverable.image}
          alt={deliverable.title}
          className="detail-hero-img"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeOut }}
        />
        <div className="detail-hero-overlay" />
        <DeliverableMotionGraphic />

        <div className="container detail-hero-content">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0}>
              <Link to="/projects#deliverables" className="detail-back">
                <ArrowLeft size={18} /> Back to Products &amp; Deliverables
              </Link>
            </motion.div>

            <motion.div className="detail-tags" variants={fadeUp} custom={1}>
              <span className="detail-part-badge">{deliverable.partBadge}</span>
              {deliverable.tags.map((tag) => (
                <span key={tag} className="detail-tag">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h1 variants={fadeUp} custom={2}>
              {deliverable.title}
            </motion.h1>

            <motion.p className="detail-tagline" variants={fadeUp} custom={3}>
              {deliverable.subtitle}
            </motion.p>

            <motion.p className="detail-purpose" variants={fadeUp} custom={4}>
              {deliverable.heroPurpose}
            </motion.p>
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

      {/* ── BODY ── */}
      <div className="container detail-body">
        {/* Key Metrics Banner */}
        {deliverable.keyMetrics && (
          <div className="deliverable-key-metrics-grid" data-aos="fade-up" data-aos-duration="600">
            {deliverable.keyMetrics.map((km) => (
              <div key={km.label} className="deliverable-key-metric-card">
                <span className="metric-val">{km.value}</span>
                <span className="metric-lbl">{km.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Facts strip */}
        <motion.div
          className="detail-facts"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {deliverable.facts.map((fact) => (
            <motion.div key={fact.label} className="detail-fact" variants={scaleIn}>
              <span className="detail-fact-label">{fact.label}</span>
              <span className="detail-fact-value">{fact.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Jump Anchor Bar */}
        <div className="doc-section-quickjump" data-aos="fade-up">
          <span className="quickjump-label">
            <ListFilter size={15} /> Jump to Section:
          </span>
          <div className="quickjump-pills">
            {deliverable.sections.map((sec, sIdx) => (
              <button
                key={sec.heading}
                className={`quickjump-pill ${activeSectionIdx === sIdx ? 'active' : ''}`}
                onClick={() => scrollToSection(sIdx)}
              >
                {sec.heading.replace(/^\d+\.\s*/, '')}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-column layout */}
        <div className="detail-layout">
          {/* Main article with PRD sections */}
          <article className="detail-main">
            {deliverable.sections.map((section, idx) => (
              <motion.section
                id={`doc-section-${idx}`}
                key={section.heading}
                className="detail-section deliverable-detail-section"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.05, ease: easeOut }}
              >
                <div className="detail-section-head">
                  <span className="detail-section-icon">
                    <SectionIcon icon={section.icon} />
                  </span>
                  <div className="section-heading-group">
                    <h2>{section.heading}</h2>
                    {section.badge && <span className="section-pill-badge">{section.badge}</span>}
                  </div>
                </div>

                {/* Paragraphs */}
                {section.paragraphs && (
                  <div className="section-prose">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                )}

                {/* Bullets */}
                {section.bullets && (
                  <ul className="detail-list">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {/* Feature Cards Grid */}
                {section.features && (
                  <div className="detail-features">
                    {section.features.map((feature) => (
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
                  </div>
                )}

                {/* Step Flow (for Product Journey & Rollout) */}
                {section.flowSteps && (
                  <div className="deliverable-flow-container">
                    {section.flowSteps.map((step) => (
                      <div key={step.step} className="deliverable-flow-step">
                        <div className="flow-step-number">{step.step}</div>
                        <div className="flow-step-content">
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tables (Test Plan, Strategy, Lifecycle, Sprints, Risks) */}
                {section.table && (
                  <div className="deliverable-table-wrap">
                    <table className="deliverable-data-table">
                      <thead>
                        <tr>
                          {section.table.headers.map((th) => (
                            <th key={th}>{th}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Stats row */}
                {section.stats && (
                  <div className="detail-stats">
                    {section.stats.map((stat) => (
                      <motion.div
                        key={stat.label}
                        className="detail-stat"
                        variants={scaleIn}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <span className="detail-stat-value">{stat.value}</span>
                        <span className="detail-stat-label">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            <motion.div
              className="detail-sidebar-card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <h3>Document Snapshot</h3>
              <ul className="detail-snapshot">
                {deliverable.facts.map((fact) => (
                  <li key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>{fact.value}</strong>
                  </li>
                ))}
              </ul>

              <div className="detail-award">
                <FileText size={20} />
                <div>
                  <span>Source Specification</span>
                  <strong>{deliverable.source.part}: {deliverable.source.document}</strong>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: '2px 0 0' }}>
                    Status: {deliverable.source.status} ({deliverable.source.version})
                  </p>
                </div>
              </div>

              {/* Other deliverables navigation */}
              <div className="deliverables-sidebar-links">
                <h4>Other PRD Rooms</h4>
                <Link
                  to="/product/product-initiation-document"
                  className={`deliverable-side-link ${deliverable.id === 'product-initiation-document' ? 'active' : ''}`}
                >
                  <ShieldCheck size={14} /> Part A: Test Plan <ChevronRight size={14} />
                </Link>
                <Link
                  to="/product/product-journey"
                  className={`deliverable-side-link ${deliverable.id === 'product-journey' ? 'active' : ''}`}
                >
                  <Compass size={14} /> Part B: Product Journey <ChevronRight size={14} />
                </Link>
                <Link
                  to="/product/product-execution"
                  className={`deliverable-side-link ${deliverable.id === 'product-execution' ? 'active' : ''}`}
                >
                  <GitPullRequest size={14} /> Part C: Product Execution <ChevronRight size={14} />
                </Link>
              </div>

              <Link to="/projects#deliverables" className="detail-sidebar-cta">
                Back to All Deliverables <ArrowUpRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="detail-sidebar-card detail-sidebar-meta"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            >
              <h3>PRD Alignment</h3>
              <div className="detail-meta-row">
                <CalendarDays size={16} />
                <span>Source: C:\Users\Lenovo\portfolio-main\PRD.md</span>
              </div>
              <div className="detail-meta-row">
                <Clock size={16} />
                <span>Target Release: Q3 2026 (MVP)</span>
              </div>
              <div className="detail-meta-row">
                <Target size={16} />
                <span>{deliverable.tags.slice(0, 3).join(' • ')}</span>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DeliverableDetail;
