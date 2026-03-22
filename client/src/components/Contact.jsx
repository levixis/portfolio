import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-info', 
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '#contact', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.contact-form-wrapper', 
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: '#contact', start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.contact-item', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1,
          scrollTrigger: { trigger: '.contact-details', start: 'top 95%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setSending(false);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In <span className="accent">Touch</span></h2>
          <p className="section-subtitle">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-subtitle">Let's work together</h3>
            <p className="contact-text">
              Feel free to reach out through any of these channels. I'll get back to you as soon as possible!
            </p>
            <div className="contact-details">
              <a href="mailto:harshvardhanjha338@gmail.com" className="contact-item">
                <div className="contact-item-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">harshvardhanjha338@gmail.com</span>
                </div>
              </a>
              <a href="tel:+917001856694" className="contact-item">
                <div className="contact-item-icon"><i className="fas fa-phone"></i></div>
                <div>
                  <span className="contact-item-label">Phone</span>
                  <span className="contact-item-value">+91 7001856694</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/levixis/" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item-icon"><i className="fab fa-linkedin"></i></div>
                <div>
                  <span className="contact-item-label">LinkedIn</span>
                  <span className="contact-item-value">linkedin.com/in/levixis</span>
                </div>
              </a>
              <a href="https://github.com/levixis" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item-icon"><i className="fab fa-github"></i></div>
                <div>
                  <span className="contact-item-label">GitHub</span>
                  <span className="contact-item-value">github.com/levixis</span>
                </div>
              </a>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text" id="name" placeholder=" " required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
                <div className="form-group">
                  <input
                    type="email" id="email" placeholder=" " required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  id="message" rows="5" placeholder=" " required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                ></textarea>
                <label htmlFor="message">Send Message *</label>
              </div>
              <button type="submit" className="btn-submit" disabled={sending}>
                {sending ? 'Sending...' : 'Submit'}
              </button>
              {status === 'success' && (
                <p className="form-status success"><i className="fas fa-check-circle"></i> Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="form-status error"><i className="fas fa-exclamation-circle"></i> Failed to send. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
