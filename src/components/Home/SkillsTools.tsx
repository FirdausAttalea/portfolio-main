import React from 'react';
import { Layers, Database, BarChart2, Cpu, Wrench } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const SKILL_CATEGORIES = [
  {
    title: 'Product & Design',
    icon: <Layers className="category-icon" />,
    skills: [
      { name: 'PRD & User Stories', level: 'Advanced', icon: '/img/tools/figma-logo.png' },
      { name: 'Figma (High-Fidelity)', level: 'Advanced', icon: '/img/tools/figma-logo.png' },
      { name: 'FigJam', level: 'Advanced', icon: '/img/tools/figjam-logo.png' },
      { name: 'User Journey Mapping', level: 'Advanced', icon: '/img/tools/figma-logo.png' },
      { name: 'Wireframing', level: 'Advanced', icon: '/img/tools/figma-logo.png' },
      { name: 'Backlog Prioritization (MoSCoW)', level: 'Advanced', icon: '/img/tools/jira-logo.png' }
    ]
  },
  {
    title: 'Data & Analytics',
    icon: <Database className="category-icon" />,
    skills: [
      { name: 'SQL', level: 'Advanced', icon: '/img/tools/sql-logo.png' },
      { name: 'Power BI', level: 'Advanced', icon: '/img/tools/powerbi-logo.png' },
      { name: 'Tableau', level: 'Intermediate', icon: '/img/tools/tableau-logo.png' },
      { name: 'Python', level: 'Intermediate', icon: '/img/tools/python-logo.png' },
      { name: 'R', level: 'Intermediate', icon: '/img/tools/r-logo.png' },
      { name: 'Looker Studio', level: 'Intermediate', icon: '/img/tools/looker-logo.png' }
    ]
  },
  {
    title: 'Project Management',
    icon: <BarChart2 className="category-icon" />,
    skills: [
      { name: 'Jira', level: 'Advanced', icon: '/img/tools/jira-logo.png' },
      { name: 'Notion', level: 'Advanced', icon: '/img/tools/notion-logo.png' },
      { name: 'Trello', level: 'Advanced', icon: '/img/tools/trello-logo.png' },
      { name: 'Asana', level: 'Intermediate', icon: '/img/tools/asana-logo.png' },
      { name: 'Agile / Scrum', level: 'Advanced', icon: '/img/tools/jira-logo.png' },
      { name: 'Sprint Planning', level: 'Advanced', icon: '/img/tools/notion-logo.png' }
    ]
  },
  {
    title: 'Dev Exposure & Tools',
    icon: <Cpu className="category-icon" />,
    skills: [
      { name: 'GitHub', level: 'Intermediate', icon: '/img/tools/github-logo.png' },
      { name: 'Draw.io', level: 'Advanced', icon: '/img/tools/figma-logo.png' },
      { name: 'Bizagi', level: 'Intermediate', icon: '/img/tools/figma-logo.png' },
      { name: 'API Familiarity', level: 'Beginner', icon: '/img/tools/rest-api-logo.png' },
      { name: 'Google Workspace', level: 'Advanced', icon: '/img/tools/google-chat-logo.webp' },
      { name: 'Microsoft Office', level: 'Advanced', icon: '/img/tools/powerbi-logo.png' }
    ]
  }
];

const SkillsTools: React.FC = () => {
  return (
    <section className="skills-tools section">
      <div className="container">
        <SectionHeader 
          icon={<Wrench size={20} />}
          iconClassName="skills-icon"
          title="Skills &"
          titleSpan="Tools"
          subtitle="The product, design, and data tools I use to build impactful digital products."
        />

        <div className="skills-categories">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-category-header">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <div className="skills-grid-mini">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item-mini">
                    <img src={skill.icon} alt={skill.name} className="skill-icon-mini" />
                    <div className="skill-info-mini">
                      <p className="skill-name-mini">{skill.name}</p>
                      <span className={`skill-level-mini level-${skill.level.toLowerCase().split(' ')[0]}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsTools;
