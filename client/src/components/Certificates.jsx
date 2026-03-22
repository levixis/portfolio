import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  { title: 'Web Development Internship', issuer: 'Vanillakart', date: "Nov '25", icon: 'fas fa-briefcase', link: 'https://drive.google.com/file/d/1Ao9KPNvWMOJE32IUFyMUhBTv21Y4Yy39/view' },
  { title: 'C++ Programming: OOPs & DSA', issuer: 'CSE Pathshala', date: "Aug '25", icon: 'fas fa-laptop-code', link: 'https://drive.google.com/file/d/1LztTBCzUvKfcjniVKSlKh_8o60Vq20sI/view' },
  { title: 'MERN Stack Fundamentals', issuer: 'Great Learning', date: "Feb '26", icon: 'fas fa-certificate', link: 'https://www.mygreatlearning.com/certificate/FOVONKIC' },
  { title: 'ChatGPT-4 Prompt Engineering', issuer: 'Infosys Springboard', date: "Aug '25", icon: 'fas fa-robot', link: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_014157693153288192147/1-5a0b9c18-5977-4d97-b677-ed1712c3bb81.pdf' },
  { title: 'Master Generative AI', issuer: 'Infosys Springboard', date: "Jun '25", icon: 'fas fa-brain', link: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_014157710267834368237/1-bf9bd357-ce94-495a-9cca-804f2d0629bb.pdf' },
  { title: 'Privacy & Security in Online Social Media', issuer: 'NPTEL', date: "Apr '25", icon: 'fas fa-shield-alt', link: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs79/Course/NPTEL25CS79S54310104404481446.pdf' },
];

export default function Certificates() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-card', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12,
          scrollTrigger: { trigger: '#certificates', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section certificates" id="certificates">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">&lt;certificates&gt;</span>
          <h2 className="section-title">My <span className="accent">Certificates</span></h2>
          <div className="section-line"></div>
        </div>
        <div className="cert-grid">
          {certs.map((c, i) => (
            <a href={c.link} target="_blank" rel="noreferrer" className="cert-card" key={i}>
              <div className="cert-card-inner">
                <div className="cert-icon"><i className={c.icon}></i></div>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <span className="cert-date">{c.date}</span>
                <div className="cert-view">
                  <span className="cert-view-text">View Credential</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
