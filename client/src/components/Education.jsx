import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Bachelor of Technology',
    school: 'Lovely Professional University, Phagwara, Punjab',
    field: 'Computer Science and Engineering · CGPA: 6.5',
    date: "Aug '23 – Present",
    icon: 'fas fa-university',
  },
  {
    degree: 'Intermediate (PCM)',
    school: 'KV No.2 Salt Lake, Kolkata, West Bengal',
    field: 'Percentage: 69%',
    date: "Mar '21 – May '22",
    icon: 'fas fa-school',
  },
  {
    degree: 'Matriculation',
    school: 'KV No.2 Salt Lake, Kolkata, West Bengal',
    field: 'Percentage: 78%',
    date: "Mar '19 – May '20",
    icon: 'fas fa-school',
  },
];

export default function Education() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.edu-card', 
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.2,
          scrollTrigger: { trigger: '#education', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section education" id="education">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">&lt;education&gt;</span>
          <h2 className="section-title">My <span className="accent">Education</span></h2>
          <div className="section-line"></div>
        </div>
        <div className="education-timeline">
          {education.map((e, i) => (
            <div className="edu-card" key={i}>
              <div className="edu-icon"><i className={e.icon}></i></div>
              <div className="edu-content">
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-school">{e.school}</p>
                <p className="edu-field">{e.field}</p>
                <span className="edu-date">{e.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
