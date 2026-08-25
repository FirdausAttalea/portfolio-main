import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Rocket } from 'lucide-react';
import projectsDataFallback from '../data/projects.json';
import deliverablesData from '../data/deliverables.json';
import SectionHeader from '../components/common/SectionHeader';
import ProjectCard from '../components/common/ProjectCard';

const Projects: React.FC = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<any[]>(projectsDataFallback);

  useEffect(() => {
    // Fetch data dari API Backend Express (PostgreSQL)
    fetch('http://localhost:5000/api/projects')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.warn('Backend server tidak aktif atau error, menggunakan fallback JSON:', err);
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="projects-page container">
      {/* Deliverables Section */}
      <section id="deliverables" className="section-new fade-in visible">
        <SectionHeader 
          icon={<Layers size={20} />}
          iconClassName="deliverables-icon"
          title="Product"
          titleSpan="Deliverables"
          subtitle="Showcasing Product deliverables and outcomes from my latest work."
        />
        
        <div className="deliverables-slider-container">
          <button className="slider-nav-btn prev" onClick={() => scroll('left')}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="deliverables-slider" ref={sliderRef}>
            {deliverablesData.map((item, index) => (
              <div key={index} className="deliverable-card">
                <div className="deliverable-banner">
                  <img src={item.image} alt={item.title} className="deliverable-img" />
                </div>
                <div className="deliverable-info">
                  <div className="deliverable-text">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <button className="see-btn">
                    See <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav-btn next" onClick={() => scroll('right')}>
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-new fade-in visible">
        <SectionHeader 
          icon={<Rocket size={20} />}
          iconClassName="project-icon"
          title="Project"
          titleSpan="Showcase"
          subtitle="Highlighted projects, from career milestones to personal growth."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id || index} 
              project={project} 
              buttonText="See Project"
              buttonClass="btn-small"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
