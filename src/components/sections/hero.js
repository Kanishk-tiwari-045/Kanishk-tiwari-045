import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: var(--nav-height) 0 100px 0;
  margin-bottom: 50px;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    padding-bottom: 50px;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding-bottom: 50px;
    margin-bottom: 50px;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 80px;
    width: 100%;
    max-width: 1000px;
    margin-top: 20px;
    align-items: center;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 768px) {
      margin: 0 0 30px 0;
    }

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;

    @media (max-width: 768px) {
      max-width: none;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 70px;

    @media (max-width: 768px) {
      margin-top: 40px;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 40px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h2 className="numbered-heading">Who am I</h2>;
  const two = <h1>Hi, my name is</h1>;
  const three = <h2 className="big-heading">Kanishk Tiwari.</h2>;
  const four = <h3 className="big-heading">I build things for the web.</h3>;
  const five = (
    <div className="hero-content">
      <div>
        <p>I'm a final year student pursuing my B.Tech in <a href="#about">CSE at JK Lakshmipat University</a>, Jaipur (CGPA 8.15), where I've developed strong expertise in Full Stack Development, AI and ML.</p>


        <p>I'm proud to be a <a href="#about">2x Hackathon Winner</a>, having secured Bronze in <a href="#about">Formidium Hackathon 2024</a> (50k prize) and 1st position in <a href="#about">LNMIIT HackCrux 2025</a>. I've also completed 3 freelance Dev projects, demonstrating my ability to deliver quality work independently.</p>
        
        <a
          className="email-link"
          href="/#projects"
          rel="noreferrer">
          Check out my projects!
        </a>
      </div>

      <StyledPic>
        <div className="wrapper">
          <StaticImage
            className="img"
            src="../../../content/images/me.jpg"
            width={500}
            quality={95}
            formats={['AUTO', 'WEBP', 'AVIF']}
            alt="Headshot"
          />
        </div>
      </StyledPic>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection id="about">
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
