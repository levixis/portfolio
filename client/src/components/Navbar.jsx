import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Magnetic>
          <a href="#home" className="nav-logo text-logo" onClick={e => handleNavClick(e, '#home')}>
            H<span className="accent">.</span>
          </a>
        </Magnetic>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`nav-link${activeSection === item.href.slice(1) ? ' active' : ''}`}
                onClick={e => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-socials">
          <Magnetic>
            <a href="https://github.com/levixis" target="_blank" rel="noreferrer" className="nav-social-link" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="https://www.linkedin.com/in/levixis/" target="_blank" rel="noreferrer" className="nav-social-link" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </Magnetic>
        </div>
        <div className={`hamburger${menuOpen ? ' active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
