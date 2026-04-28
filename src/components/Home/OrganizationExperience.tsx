import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import organizationData from '../../data/organization.json';
import SectionHeader from '../common/SectionHeader';
import './OrganizationExperience.css';

const OrganizationExperienceTimeline: React.FC = () => {
  const calculateDuration = (period: string) => {
    const parts = period.split(' - ');
    const startStr = parts[0];
    const endStr = parts[1] === 'Present' ? new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : parts[1];
    
    const start = new Date(startStr);
    const end = new Date(endStr);
    
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    // Add 1 month to include both start and end months
    months += 1;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    let durationStr = '';
    if (years > 0) durationStr += `${years} yr${years > 1 ? 's' : ''} `;
    if (remainingMonths > 0) durationStr += `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    
    return durationStr.trim();
  };

  return (
    <section className="org-experience-timeline section">
      <div className="org-timeline-wrapper">
        <div className="org-timeline-bg-text">ORGANIZATION</div>
        <div className="container">
          <div className="section-header-row">
            <SectionHeader 
              icon={<Users size={20} />}
              iconClassName="org-icon"
              title="Organizational"
              titleSpan="Experience"
              subtitle="My journey in communities, volunteering, and organizational roles."
            />
            <NavLink to="/about#organization" className="btn btn-outline view-detail-btn org-view-btn">
              Lihat Detail <ArrowUpRight size={18} />
            </NavLink>
          </div>
        </div>

        <div className="org-timeline-scroll-container">
          <div className="org-timeline-items">
            <div className="org-timeline-rail"></div>
            {organizationData.map((org, index) => (
              <div key={index} className="org-timeline-item">
                <div className="org-timeline-node">
                  <div className="org-timeline-dot"></div>
                </div>
                <div className="org-timeline-content-card">
                  <div className="org-timeline-card-main">
                    <div className="org-timeline-logo-wrapper">
                      <img src={org.logo} alt={org.organization} className="org-timeline-logo" />
                    </div>
                    <div className="org-timeline-info">
                      <h3 className="org-timeline-role">{org.role}</h3>
                      <p className="org-timeline-company">{org.organization}</p>
                    </div>
                  </div>
                  
                  <div className="org-timeline-meta">
                    <div className="org-meta-left">
                      <span className="org-timeline-period">{org.period}</span>
                    </div>
                    <span className="org-timeline-duration">{calculateDuration(org.period)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationExperienceTimeline;
