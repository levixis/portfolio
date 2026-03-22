import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'TourHub',
    subtitle: 'Redefining Tour Booking Through',
    titleEmphasis: 'Technology',
    date: "Jan '26",
    image: '/tripyo-removebg-preview.png',
    description: 'Built a tour booking system with React, Node.js, Express, and MongoDB featuring advanced filtering, dynamic pricing, and automated email notifications. JWT authentication, role-based access, Cloudinary image uploads and Nodemailer integration.',
    highlights: ['Real-time status tracking & automated confirmations', 'Reduced manual processing time by 80%'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/levixis/TripYou',
    stats: [
      { number: '80%', label: 'Time Saved', sub: 'In manual processing' },
      { number: '5+', label: 'Integrations', sub: 'Third-party services' },
    ],
  },
  {
    title: 'FreelanceFlow',
    subtitle: 'Streamlining Freelance Workflows With',
    titleEmphasis: 'Precision',
    date: "Dec '25",
    image: '/freelance-removebg-preview.png',
    description: 'Developed a scalable time-tracking application for freelancers to efficiently log billable hours and manage project workflows. Full-stack MERN solution with multiple client profiles, variable hourly rates, and automated invoice generation.',
    highlights: ['Precise billable hour logging system', 'Reduced manual invoicing errors by 90%'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/levixis/FreelanceFlow',
    stats: [
      { number: '90%', label: 'Error Reduction', sub: 'In manual invoicing' },
      { number: '3x', label: 'Faster', sub: 'Invoice generation' },
    ],
  },
  {
    title: 'EzyPrint',
    subtitle: 'Modernizing Local Print Services Through',
    titleEmphasis: 'Innovation',
    date: "Jul '25",
    image: '/ezyp_doodle-removebg-preview.png',
    description: 'Developed a full-stack web application to solve the inefficiency of manual local printing services for students. Integrated secure document upload, dynamic pricing algorithms, and real-time order tracking using React.js and Firebase.',
    highlights: ['Reduced wait times by 40%', 'Google/Email authentication for secure access'],
    tech: ['React.js', 'Firebase', 'Google Auth'],
    github: 'https://github.com/levixis/EzyPrint',
    live: 'https://ezyyprint.web.app/',
    stats: [
      { number: '40%', label: 'Faster', sub: 'Reduced wait times' },
      { number: '2x', label: 'Efficiency', sub: 'Compared to manual' },
    ],
  },
];

export default function Projects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.3,
          scrollTrigger: { trigger: '#projects', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured <span className="accent">Projects</span></h2>
          <p className="section-subtitle">
            A collection of projects that showcase my skills in building modern, scalable web applications.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className="project-card" key={i}>
              <div className="project-visual">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className={`project-visual-image ${p.title === 'FreelanceFlow' ? 'freelance-img' : ''}`} 
                />
              </div>
              <div className="project-info">
                <span className="project-number">{String(i + 1).padStart(2, '0')} GITHUB</span>
                <h3 className="project-title">
                  {p.subtitle} <em>{p.titleEmphasis}</em>
                </h3>
                <p className="project-description">{p.description}</p>
                <div className="project-stats">
                  {p.stats.map((s, j) => (
                    <div key={j}>
                      <span className="project-stat-number">{s.number}</span>
                      <span className="project-stat-label">{s.label}</span>
                      <span className="project-stat-sub">{s.sub}</span>
                    </div>
                  ))}
                </div>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  <Magnetic>
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                      <i className="fab fa-github"></i> View Code
                    </a>
                  </Magnetic>
                  {p.live && (
                    <Magnetic>
                      <a href={p.live} target="_blank" rel="noreferrer" className="project-link live-link">
                        <i className="fas fa-external-link-alt"></i> Live Demo
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
