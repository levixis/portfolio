import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techSkills = [
  { name: 'JavaScript', icon: 'fab fa-js-square' },
  { name: 'C++', icon: 'fas fa-code' },
  { name: 'C', icon: 'fas fa-terminal' },
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'React.js', icon: 'fab fa-react' },
  { name: 'Next.js', icon: 'fas fa-layer-group' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'Express.js', icon: 'fas fa-server' },
  { name: 'MongoDB', icon: 'fas fa-database' },
  { name: 'Tailwind CSS', icon: 'fas fa-wind' },
  { name: 'WordPress', icon: 'fab fa-wordpress' },
];

const softSkills = [
  { name: 'Problem Solving', icon: 'fas fa-puzzle-piece' },
  { name: 'Team Player', icon: 'fas fa-users' },
  { name: 'Adaptability', icon: 'fas fa-sync-alt' },
];

export default function Skills() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-card:not(.soft-skill)', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06,
          scrollTrigger: { trigger: '#skills', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.soft-skill', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15,
          scrollTrigger: { trigger: '.soft-skills-grid', start: 'top 95%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">&lt;skills&gt;</span>
          <h2 className="section-title">My <span className="accent">Skills</span></h2>
          <div className="section-line"></div>
        </div>

        <div className="skills-category">
          <h3 className="skills-category-title">
            <i className="fas fa-code"></i> Technical Skills
          </h3>
          <div className="skills-grid">
            {techSkills.map(skill => (
              <div className="skill-card" key={skill.name}>
                <div className="skill-icon"><i className={skill.icon}></i></div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3 className="skills-category-title">
            <i className="fas fa-brain"></i> Soft Skills
          </h3>
          <div className="skills-grid soft-skills-grid">
            {softSkills.map(skill => (
              <div className="skill-card soft-skill" key={skill.name}>
                <div className="skill-icon"><i className={skill.icon}></i></div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
