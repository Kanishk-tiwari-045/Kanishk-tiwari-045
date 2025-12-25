import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledSkillsSection = styled.section`
  max-width: 900px;

  .inner {
    display: flex;
    flex-direction: column;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 30px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 20px;
    }
  }
`;

const StyledSkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 15px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
  }

  .skill-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
    color: var(--green);
    transition: var(--transition);
    
    svg {
      width: 100%;
      height: 100%;
    }
  }

  &:hover .skill-icon {
    color: var(--lightest-slate);
    transform: scale(1.1) rotate(5deg);
    animation: bounce 0.6s ease;
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(1.1) rotate(5deg) translateY(0);
    }
    50% {
      transform: scale(1.1) rotate(5deg) translateY(-10px);
    }
  }

  .skill-name {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--slate);
    text-align: center;
    font-weight: 500;
  }

  &:hover .skill-name {
    color: var(--lightest-slate);
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

  const skillsData = [
    { name: 'C++', icon: 'Folder' },
    { name: 'Python', icon: 'Folder' },
    { name: 'JavaScript', icon: 'Folder' },
    { name: 'TypeScript', icon: 'Folder' },
    { name: 'HTML', icon: 'Folder' },
    { name: 'React.js', icon: 'External' },
    { name: 'Node.js', icon: 'GitHub' },
    { name: 'Express.js', icon: 'External' },
    { name: 'Next.js', icon: 'External' },
    { name: 'Django', icon: 'Folder' },
    { name: 'Tailwind', icon: 'Star' },
    { name: 'Bootstrap', icon: 'Star' },
    { name: 'MongoDB', icon: 'Folder' },
    { name: 'PostgreSQL', icon: 'Folder' },
    { name: 'AWS', icon: 'External' },
    { name: 'Docker', icon: 'External' },
    { name: 'Git', icon: 'GitHub' },
    { name: 'Linux', icon: 'External' },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills & Technologies</h2>

      <div className="inner">
        <p>
          Here are the technologies and tools I work with to bring ideas to life. I'm always
          learning and expanding my skill set to stay current with the latest industry trends.
        </p>

        <div className="skills-grid">
          {skillsData.map(({ name, icon }, i) => (
            <StyledSkillCard key={i}>
              <div className="skill-icon">
                <Icon name={icon} />
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
