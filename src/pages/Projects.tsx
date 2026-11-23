import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, Rocket, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import projectsDataFallback from '../data/projects.json';
import deliverablesData from '../data/deliverables.json';
import SectionHeader from '../components/common/SectionHeader';
import ProjectCard from '../components/common/ProjectCard';

const DELIVERABLE_ID_MAP: Record<string, string> = {
  'Product Initiation Document': 'product-initiation-document',
  'Product Initiatives Document': 'product-initiation-document',
  'Product Journey': 'product-journey',
  'Product Execution': 'product-execution',
};

interface DeliverableItem {
  id?: string;
  title: string;
  subtitle?: string;
  part?: string;
  category?: string;
  description?: string;
  image: string;
  badge?: string;
  icon?: string;
  stats?: { label: string; value: string }[];
  highlights?: string[];
}

/* ── Interactive Aesthetic Deliverable Card with 3D Tilt ── */
const DeliverableCard: React.FC<{
  item: DeliverableItem;
  id: string;
  index: number;
}> = ({ item, id, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * -10;
    cardRef.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  return (
    <Link to={`/product/${id}`} className="deliverable-card-link">
      <div
        className="deliverable-card-enhanced"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-aos="fade-up"
        data-aos-delay={index * 130}
        data-aos-duration="650"
      >
        {/* Product Showcase Banner: Clean edge-to-edge image */}
        <div className="deliverable-banner">
          <img src={item.image} alt={item.title} className="deliverable-img" />
        </div>

        {/* Card Body */}
        <div className="deliverable-info-body">
          <div className="deliverable-header-meta">
            <span className="deliverable-index-pill">0{index + 1}</span>
            <span className="deliverable-category-pill">{item.category ?? 'PRD v1.0 Document'}</span>
          </div>

          <h3 className="deliverable-card-title">{item.title}</h3>
          {item.subtitle && <p className="deliverable-card-subtitle">{item.subtitle}</p>}

          {item.description && (
            <p className="deliverable-card-desc">{item.description}</p>
          )}

          {/* Highlights Chips */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="deliverable-highlight-chips">
              {item.highlights.slice(0, 3).map((h) => (
                <span key={h} className="deliverable-chip">
                  <Sparkles size={12} className="chip-icon" />
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Action CTA Button */}
          <div className="deliverable-card-footer">
            <div className="deliverable-meta-source">
              {/* <FileText size={14} /> */}
              <span>  </span>
            </div>
            <span className="deliverable-explore-btn">
              Explore Document <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>(projectsDataFallback);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch from server');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.warn('Backend server not active, using fallback JSON:', err);
      });
  }, []);

  return (
    <div className="projects-page container">
      {/* Deliverables Section: 3 Comprehensive PRD Product Deliverables */}
      <section id="deliverables" className="section-new deliverables-section-container">
        <div className="deliverables-header-wrapper">
          <SectionHeader
            icon={<Layers size={22} />}
            iconClassName="deliverables-icon"
            title="Product"
            titleSpan="Deliverables & PRD Set"
            subtitle="Explore the 3 core documentation rooms extracted from PRD v1.0: Test Plan, Product Journey, and Product Execution."
          />
        </div>

        {/* 3-Column Aesthetic Curated Grid */}
        <div className="deliverables-curated-grid">
          {deliverablesData.map((item: DeliverableItem, index) => {
            const deliverableId = item.id ?? DELIVERABLE_ID_MAP[item.title] ?? 'product-initiation-document';
            return (
              <DeliverableCard
                key={item.title}
                id={deliverableId}
                item={item}
                index={index}
              />
            );
          })}
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="section-new">
        <SectionHeader
          icon={<Rocket size={20} />}
          iconClassName="project-icon"
          title="Project"
          titleSpan="Showcase"
          subtitle="Highlighted digital products, competition winners, and system designs."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              buttonText="See Details"
              buttonClass="btn-small"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
