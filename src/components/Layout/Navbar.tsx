import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Track scroll for navbar background effect
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About & Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/certifications', label: 'Certifications' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <nav className="container">
        <Link to="/" className="logo" onClick={closeMenu} aria-label="Go to homepage">
          <div className="logo-container">
            <img src="/favicon.png" alt="Portfolio logo" className="logo-img" />
            <span className="nav-status-dot" aria-hidden="true"></span>
          </div>
          <span className="logo-text">Firdaus<span>Attalea</span></span>
        </Link>

        <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu} aria-hidden="true"></div>

        <div className="nav-wrapper">
          <ul className={`nav-center ${isMenuOpen ? 'mobile-active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/projects" className="nav-cta-btn" onClick={closeMenu}>
              View Projects <ArrowUpRight size={14} />
            </Link>

            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
