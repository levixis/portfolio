import Magnetic from './Magnetic';

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-brand-name">Harsh</h3>
            <p className="footer-brand-desc">
              Creating beautiful, functional designs that make a difference.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <div className="footer-links">
              <a href="#home" onClick={e => scrollTo(e, '#home')}>Home</a>
              <a href="#about" onClick={e => scrollTo(e, '#about')}>About</a>
              <a href="#projects" onClick={e => scrollTo(e, '#projects')}>Projects</a>
              <a href="#contact" onClick={e => scrollTo(e, '#contact')}>Contact</a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-socials">
              <Magnetic>
                <a href="https://github.com/levixis" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.linkedin.com/in/levixis/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:harshvardhanjha338@gmail.com" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Harshvardhan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
