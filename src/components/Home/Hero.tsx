import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for new opportunities
            </div>
            <h1>Hi, I'm Firdaus 👋🏻</h1>
            <h2 className="hero-job-title">Product Manager & UX Designer</h2>
            <p className="hero-summary">
              Fresh Information Systems graduate (GPA 3.79, Universitas Brawijaya) with 1+ year of hands-on
              experience as a Product Manager and Project Manager intern. Multiple national UI/UX competition winner.
            </p>

            <div className="hero-highlight-skills">
              <Badge>Product Manager</Badge>
              <Badge>Product Designer</Badge>
              <Badge>Business Analyst</Badge>
              <Badge>Data Analytics</Badge>
              <Badge>UI/UX Designer</Badge>
            </div>

            <div className="hero-cta">
              <Button to="/projects" variant="primary">
                View Portfolio <ArrowRight size={20} />
              </Button>
              <Button href="/#contact" variant="secondary">
                Contact Me <Mail size={20} />
              </Button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="id-card-wrapper">
              <div className="id-card">
                <div className="id-card-shine"></div>
                
                <div className="id-card-top">
                  <div className="id-card-header">
                    <img src="/img/company/cimb-logo.png" alt="Portfolio" className="id-card-logo" />
                    <img src="/img/qr-code.png" alt="QR Code" className="id-card-qr-img" />
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
