import React, { useEffect, useRef, useState } from 'react';
import './Project2.css';

const projects = [
  {
    id: 1,
    title: 'SoulChamp — Youth Fitness & Tech Program',
    desc: 'SoulChamp is an immersive program for San Francisco youth combining fitness, technology, and life coaching to unlock potential and build community.',
    image: '/assets/soulchamp.png',
    tags: ['#react', '#next', '#tailwind'],
    link: 'https://soulchamp.vercel.app/',
  },
  {
    id: 2,
    title: 'Ecommerce NexaPhone Store',
    desc: 'NexaPhone — Shop the latest smartphones & accessories online. Best prices, fast delivery, and easy returns. Find your perfect phone today.',
    image: '/assets/nexaphone.png',
    tags: ['#react', '#ecommerce', '#tailwind'],
    link: 'https://nexaphone-website-latest.vercel.app/',
  },
  {
    id: 3,
    title: 'agency.ai | Digital Impact',
    desc: 'Cagency.ai is a digital agency offering advertising, content marketing, social media, and AI-powered solutions to help brands grow and connect online.',
    image: '/assets/agency.png',
    tags: ['#nextjs', '#react', '#tailwind css'],
    link: '#',
  },
];

const Project = () => {
  const cardRefs = useRef([]);
  const dotRefs  = useRef([]);
  const [visible, setVisible] = useState([]);
  const [active,  setActive]  = useState(0);

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => [...new Set([...prev, i])]);
          }
        },
        { threshold: 0.2 }
      );
      if (el) obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleDotClick = (i) => {
    setActive(i);
    const dot = dotRefs.current[i];
    if (dot) {
      dot.style.animation = 'none';
      dot.offsetHeight;
      dot.style.animation = '';
    }
  };

  return (
    <section id="project" className="proj-section">

      <div className="proj-header">
        <div className="proj-header-left">
          <p className="proj-eyebrow">Project</p>
          <h2 className="proj-title">
            Lets have a look at<br />
            my <span className="proj-highlight">Projects</span>
          </h2>
        </div>

      <div className="proj-header-right">
  <a target='_blank' href="https://www.fiverr.com/mujtabarashe618">View all</a>
</div>
       
      </div>

      <div className="proj-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`proj-card ${visible.includes(i) ? 'proj-card--visible' : ''}`}
            ref={el => (cardRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 0.15}s` }}
            onClick={() => handleDotClick(i)}
          >
            {/* Image */}
            <div className="proj-card-img-wrap">
              <img src={p.image} alt={p.title} className="proj-card-img" />
             <a className="proj-card-link-btn" href={p.link} target="_blank" rel="noopener noreferrer" title="View project" onClick={e => e.stopPropagation()}>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
    stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 4H5a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3"/>
    <path d="M12 3h5v5"/>
    <line x1="17" y1="3" x2="9" y2="11"/>
  </svg>
</a>
            </div>
            {/* Body */}
            <div className="proj-card-body">
              <h3 className="proj-card-title">{p.title}</h3>
              <p className="proj-card-desc">{p.desc}</p>
              <div className="proj-card-tags">
                {p.tags.map(tag => (
                  <span key={tag} className="proj-card-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="proj-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            ref={el => (dotRefs.current[i] = el)}
            className={`proj-dot ${i === active ? 'proj-dot--active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Project ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Project;