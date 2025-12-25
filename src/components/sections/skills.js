import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  max-width: 1200px;

  .inner {
    display: flex;
    flex-direction: column;
  }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    row-gap: 35px;
    margin-top: 50px;
    justify-content: center;

    @media (max-width: 768px) {
      gap: 15px;
      row-gap: 30px;
    }
  }
`;

const StyledSkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 12px;
  position: relative;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(100, 255, 218, 0.15), rgba(100, 255, 218, 0.02));
    z-index: 0;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-shadow: 
      0 0 20px rgba(100, 255, 218, 0.3),
      inset 0 0 30px rgba(100, 255, 218, 0.1);

    @media (max-width: 768px) {
      width: 75px;
      height: 75px;
    }
  }

  &:hover::before {
    opacity: 1;
    transform: scale(1) rotateY(180deg) rotateX(15deg);
    animation: spherePulse 1.5s ease-in-out infinite;
  }

  @keyframes spherePulse {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(100, 255, 218, 0.3),
        inset 0 0 30px rgba(100, 255, 218, 0.1);
      transform: scale(1) rotateY(180deg) rotateX(15deg);
    }
    50% {
      box-shadow: 
        0 0 40px rgba(100, 255, 218, 0.5),
        inset 0 0 50px rgba(100, 255, 218, 0.2);
      transform: scale(1.05) rotateY(180deg) rotateX(15deg);
    }
  }

  &:hover {
    transform: translateY(-12px);
  }

  .skill-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    filter: grayscale(100%);
    opacity: 0.6;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0 0 transparent);
      transition: filter 1s ease;
    }

    @media (max-width: 768px) {
      width: 45px;
      height: 45px;
    }
  }

  &:hover .skill-icon {
    filter: grayscale(0%) brightness(1.1);
    opacity: 1;
    transform: scale(1.3) rotate(8deg);
    
    img {
      filter: drop-shadow(0 4px 8px rgba(100, 255, 218, 0.4));
    }
  }

  .skill-name {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--slate);
    text-align: center;
    font-weight: 500;
    position: relative;
    z-index: 1;
    transition: all 0.2s ease;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      font-size: 11px;
    }
  }

  &:hover .skill-name {
    color: var(--green);
    font-weight: 600;
    transform: scale(1.1);
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const allSkills = [
    { name: 'C', icon: 'c.svg' },
    { name: 'C++', icon: 'cpp.svg' },
    { name: 'Python', icon: 'python.svg' },
    { name: 'Java', icon: 'java.svg' },
    { name: 'JavaScript', icon: 'javascript.svg' },
    { name: 'TypeScript', icon: 'typescript.svg' },
    { name: 'React', icon: 'react.svg' },
    { name: 'Next.js', icon: 'nextjs.svg' },
    { name: 'HTML5', icon: 'html5.svg' },
    { name: 'CSS3', icon: 'css3.svg' },
    { name: 'Tailwind', icon: 'tailwindcss.svg' },
    { name: 'Bootstrap', icon: 'bootstrap.svg' },
    { name: 'Node.js', icon: 'nodejs.svg' },
    { name: 'Express', icon: 'express.svg' },
    { name: 'FastAPI', icon: 'fastapi.svg' },
    { name: 'Firebase', icon: 'firebase.svg' },
    { name: 'MongoDB', icon: 'mongodb.svg' },
    { name: 'PostgreSQL', icon: 'postgresql.svg' },
    { name: 'Supabase', icon: 'supabase.svg' },
    { name: 'Mongoose', icon: 'mongoose.svg' },
    { name: 'Prisma', icon: 'prisma.svg' },
    { name: 'Socket.io', icon: 'socketio.svg' },
    { name: 'WebRTC', icon: 'webrtc.svg' },
    { name: 'VS Code', icon: 'vscode.svg' },
    { name: 'AWS', icon: 'AWS.svg' },
    { name: 'Google Cloud', icon: 'Google Cloud.svg' },
    { name: 'Docker', icon: 'docker.svg' },
    { name: 'Git', icon: 'git.svg' },
    { name: 'GitHub', icon: 'github.svg' },
    { name: 'Linux', icon: 'linux.svg' },
    { name: 'Postman', icon: 'postman.svg' },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills & Technologies</h2>

      <div className="inner">
        <p>
          Here are the technologies and tools I work with to bring ideas to life.
        </p>

        <div className="skills-grid">
          {allSkills.map(({ name, icon }, i) => (
            <StyledSkillCard key={i}>
              <div className="skill-icon">
                <img
                  src={`/tech-icons/${icon}`}
                  alt={name}
                  loading="lazy"
                />
              </div>
              <div className="skill-name">{name}</div>
            </StyledSkillCard>
          ))}
        </div>
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
