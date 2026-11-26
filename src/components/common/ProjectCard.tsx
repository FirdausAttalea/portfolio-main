import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Trophy } from 'lucide-react';

interface Tool {
  name: string;
  src: string;
}

interface Project {
  id?: string;
  title: string;
  description: string;
  type: string;
  date?: string;
  role?: string;
  achievement?: string;
  image: string;
  icon?: string;
  link: string;
  tags?: string[];
  tools: Tool[];
}

interface ProjectCardProps {
  project: Project;
  maxTools?: number;
  buttonText?: string;
  buttonClass?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  maxTools,
  buttonText = 'View',
  buttonClass = 'btn-small',
}) => {
  const displayTools = maxTools ? project.tools.slice(0, maxTools) : project.tools;
  const remainingTools = maxTools ? project.tools.length - maxTools : 0;
  const cardRef = useRef<HTMLDivElement>(null);

  /* subtle 3-D tilt on hover */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * -10;
    card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  const destination = project.link && project.link !== '#'
    ? { external: project.link }
    : project.id === 'task-dashboard' || project.id === 'data-pipeline'
    ? { internal: `/coding/${project.id}` }
    : { internal: `/projects/${project.id}` };

  return (
    <div
      className="project-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-aos="fade-up"
      data-aos-duration="600"
    >
      {/* image */}
      <div className="project-img-wrap">
        <img src={project.image} alt={project.title} className="project-img" />
        <div className="project-img-overlay" />
        {/* type badge overlaid */}
        <span className="project-type-badge">{project.type}</span>
      </div>

      {/* body */}
      <div className="project-body">
        {/* tags */}
        {project.tags && (
          <div className="project-tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        )}

        <h4 className="project-card-title">{project.title}</h4>
        <p className="project-card-desc">{project.description}</p>

        {/* meta row */}
        {(project.date || project.role) && (
          <div className="project-meta-row">
            {project.date && <span className="project-meta-item">📅 {project.date}</span>}
            {project.role && <span className="project-meta-item">🎯 {project.role}</span>}
          </div>
        )}

        {/* achievement */}
        {project.achievement && (
          <div className="project-achievement">
            <Trophy size={13} />
            <span>{project.achievement}</span>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="project-footer">
        <div className="tools-list">
          {displayTools.map((tool, i) => (
            <img key={i} src={tool.src} alt={tool.name} title={tool.name} className="tool-logo" />
          ))}
          {remainingTools > 0 && <span className="more-tools">+{remainingTools}</span>}
        </div>

        {'external' in destination ? (
          <a href={destination.external} target="_blank" rel="noopener noreferrer" className={`${buttonClass} project-cta-btn`}>
            {buttonText} <ArrowUpRight size={15} />
          </a>
        ) : (
          <Link to={destination.internal!} className={`${buttonClass} project-cta-btn`}>
            {buttonText} <ArrowUpRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
