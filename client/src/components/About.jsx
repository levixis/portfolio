import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image-container', 
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '#about', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.about-text-col', 
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: '#about', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.about-info-item', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: '.about-info-grid', start: 'top 95%', toggleActions: 'play none none none' }
        }
      );
      // Image internal parallax
      gsap.to('.about-image', {
        y: 40,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-image-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About <span className="accent">Me</span></h2>
          <p className="section-subtitle">
            I have worked on a wide range of projects across different domains, continuously gaining hands-on experience and expanding my expertise with each new challenge.
          </p>
        </div>
        <div className="about-content">
          <div className="about-image-col">
            <div className="about-image-container">
              <div className="about-image-frame">
                <img src="/p1-removebg-preview.png" alt="Harshvardhan" className="about-image" />
              </div>
              <div className="about-image-decoration"></div>
            </div>
          </div>
          <div className="about-text-col">
            <h3 className="about-subtitle">Full-Stack Developer & Tech Enthusiast</h3>
            <p className="about-description">
              I'm a Computer Science & Engineering student at <strong>Lovely Professional University</strong>{' '}
              with a passion for building full-stack web applications. I specialize in the{' '}
              <span className="accent">MERN stack</span> (MongoDB, Express.js, React.js, Node.js) and love creating
              scalable, user-centric solutions.
            </p>
            <p className="about-description">
              With hands-on experience from my internship at <strong>Vanillakart</strong> and multiple
              real-world projects like TourHub, FreelanceFlow, and EzyPrint, I bring a strong foundation
              in both frontend elegance and backend architecture.
            </p>
            <div className="about-info-grid">
              <div className="about-info-item">
                <i className="fas fa-user"></i>
                <span><strong>Name:</strong> Harshvardhan</span>
              </div>
              <div className="about-info-item">
                <i className="fas fa-envelope"></i>
                <span><strong>Email:</strong> harshvardhanjha338@gmail.com</span>
              </div>
              <div className="about-info-item">
                <i className="fas fa-graduation-cap"></i>
                <span><strong>Degree:</strong> B.Tech CSE</span>
              </div>
              <div className="about-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span><strong>Location:</strong> Punjab, India</span>
              </div>
            </div>
            <div className="about-buttons">
              <Magnetic>
                <a href="#contact" className="btn btn-primary" onClick={e => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <i className="fas fa-paper-plane"></i>
                  <span>Get In Touch</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.linkedin.com/in/levixis/" target="_blank" rel="noreferrer" className="btn btn-outline">
                  <i className="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
