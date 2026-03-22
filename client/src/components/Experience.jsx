import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.experience-card', 
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '#experience', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.timeline-dot', 
        { scale: 0 },
        { scale: 1, duration: 0.5,
          scrollTrigger: { trigger: '#experience', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work <span className="accent">Experience</span></h2>
          <p className="section-subtitle">
            Professional experience and milestones in my journey as a developer.
          </p>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="experience-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">Web Development Intern</h3>
                    <p className="exp-company">
                      <i className="fas fa-building"></i>{' '}
                      Vanillakart (Subsidiary of Envity Brushflicks Creative Hub Pvt. Ltd.)
                    </p>
                  </div>
                  <span className="exp-duration">
                    Sep '25 – Nov '25
                  </span>
                </div>
                <p className="exp-description">
                  Completed a 2-month internship focused on building and managing client websites,
                  combining MERN stack development with WordPress solutions.
                </p>
                <div className="exp-tech">
                  {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'WordPress'].map(t => (
                    <span className="tech-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
