import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  'Full-Stack Developer',
  'MERN Stack Developer',
  'React.js Developer',
  'Problem Solver',
];

// Helper to split text for staggered animations without premium plugins
const SplitText = ({ text }) => {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {word.split('').map((char, j) => (
            <span key={j} className="split-char" style={{ display: 'inline-block' }}>
              {char}
            </span>
          ))}
          {/* Add space between words */}
          {i !== text.split(' ').length - 1 && <span className="split-char" style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const typedRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Typing animation
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const type = () => {
      const current = roles[roleIndex];
      if (typedRef.current) {
        typedRef.current.textContent = current.substring(0, charIndex);
      }

      if (!isDeleting && charIndex < current.length) {
        charIndex++;
        typingTimeout = setTimeout(type, 80);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        typingTimeout = setTimeout(type, 40);
      } else if (!isDeleting) {
        isDeleting = true;
        typingTimeout = setTimeout(type, 2000);
      } else {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingTimeout = setTimeout(type, 400);
      }
    };
    typingTimeout = setTimeout(type, 1000);

    // GSAP High-End Hero Animations
    const ctx = gsap.context(() => {
      // Setup initial state
      gsap.set('.split-char', { yPercent: 120, opacity: 0, rotateZ: 5 });
      gsap.set(['.hero-greeting', '.hero-underline', '.hero-role', '.hero-desc', '.hero-buttons', '.hero-stats .stat', '.hero-image-wrapper', '.available-badge'], { clearProps: 'all' });
      
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      
      tl.from('.hero-greeting', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' })
        // Staggered text reveal on characters
        .to('.split-char', { yPercent: 0, opacity: 1, rotateZ: 0, duration: 0.9, stagger: 0.02 }, '-=0.4')
        .from('.hero-underline', { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'power3.inOut' }, '-=0.6')
        .from('.hero-role', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-stats .stat', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
        // Premium image reveal
        .from('.hero-image-wrapper', { scale: 0.9, opacity: 0, y: 50, duration: 1.5, ease: 'expo.out' }, '-=1.2')
        .from('.available-badge', { scale: 0, rotate: -45, opacity: 0, duration: 1, ease: 'back.out(1.5)' }, '-=0.8');

      // Counter animation
      document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        gsap.to(counter, {
          textContent: target,
          duration: 2,
          snap: { textContent: 1 },
          delay: 1.8,
          ease: 'power2.inOut'
        });
      });

      // Parallax effect on image wrapper
      gsap.to('.hero-image-wrapper', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-content',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
      
      // Secondary parallax on badge
      gsap.to('.available-badge', {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-content',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, heroRef);

    return () => {
      clearTimeout(typingTimeout);
      ctx.revert();
    };
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate "AVAILABLE FOR WORK" text in a circle
  const badgeText = "AVAILABLE FOR WORK • ";
  const badgeChars = badgeText.split('');

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">
            <span className="hero-sparkle">✦</span> HELLO ! <span className="hero-sparkle" style={{ fontSize: '0.9rem' }}>✦</span>
          </p>
          <h1 className="hero-name" style={{ overflow: 'hidden' }}>
            <span className="name-line"><SplitText text="I am Harshvardhan," /></span>
            <span className="name-line"><SplitText text="Software engineer" /></span>
          </h1>
          <span className="hero-underline">
            <svg viewBox="0 0 220 12">
              <path d="M2 8 C 40 2, 80 10, 120 5 C 160 0, 200 8, 218 4" />
            </svg>
          </span>
          <div className="hero-role">
            <span className="role-prefix">I'm a </span>
            <span className="typed-text" ref={typedRef}></span>
            <span className="cursor-blink">|</span>
          </div>
          <p className="hero-desc">
            Passionate about creating intuitive and engaging user
            experiences. Specialize in transforming ideas into beautifully
            crafted products.
          </p>
          <div className="hero-buttons">
            <Magnetic>
              <a href="#projects" className="btn btn-primary" onClick={e => scrollTo(e, '#projects')}>
                <span>See My Works</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-outline" onClick={e => scrollTo(e, '#contact')}>
                <span>Get In Touch</span>
              </a>
            </Magnetic>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number" data-target="3">0</span><span className="stat-plus">+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-target="4">0</span><span className="stat-plus">+</span>
              <span className="stat-label">Certificates</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-target="1">0</span>
              <span className="stat-label">Internship</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src="/cv_photo.png" alt="Harshvardhan" className="hero-image" />
            <div className="available-badge">
              <div className="badge-circle">
                <div className="badge-text">
                  {badgeChars.map((char, i) => (
                    <span key={i} style={{ transform: `rotate(${i * (360 / badgeChars.length)}deg)` }}>
                      {char}
                    </span>
                  ))}
                </div>
                <span className="badge-arrow">←</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse"><div className="wheel"></div></div>
        <p>Scroll Down</p>
      </div>
    </section>
  );
}
