import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  overflow: visible;
  border-radius: var(--border-radius);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.08), transparent);
    transition: left 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    pointer-events: none;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-12px);
    
    &:before {
      left: 100%;
      opacity: 1;
    }
    
    .project-image {
      box-shadow: 0 20px 50px -15px rgba(100, 255, 218, 0.2),
                  0 10px 25px -10px var(--navy-shadow);
      
      &:after {
        opacity: 1;
        transform: scale(1.02);
      }
      
      a:before {
        opacity: 0;
        transform: scale(1.1);
      }
      
      .img {
        filter: grayscale(0%) contrast(1.15) brightness(110%);
        transform: scale(1.08);
      }
    }

    .project-description {
      background: linear-gradient(135deg, rgba(100, 255, 218, 0.03) 0%, var(--light-navy) 100%);
      border-left: 4px solid var(--green);
      transform: translateX(8px) translateY(-2px);
      box-shadow: 0 15px 40px -12px rgba(2, 12, 27, 0.7),
                  0 0 20px rgba(100, 255, 218, 0.1);
    }

    .project-title {
      color: var(--green);
      transform: translateX(5px);
      letter-spacing: 0.5px;
    }

    .project-overline {
      transform: translateX(5px);
      letter-spacing: 3px;
      opacity: 0.9;
    }

    .project-tech-list li {
      transform: translateY(-4px) scale(1.05);
      color: var(--green);
      box-shadow: 0 4px 8px rgba(100, 255, 218, 0.1);
    }

    .project-links a {
      transform: translateY(-3px) rotate(5deg) scale(1.15);
      color: var(--green);
      
      svg {
        filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.4));
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
      
      .project-image .img {
        transform: none;
      }
      
      .project-links a {
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 120px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    text-transform: uppercase;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    font-weight: 600;

    a {
      transition: color 0.3s ease;
      
      &:focus {
        color: var(--green);
        outline: 2px solid var(--green);
        outline-offset: 4px;
      }
    }

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    position: relative;
    z-index: 2;
    padding: 25px;
    padding-left: 28px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    border-left: 4px solid transparent;
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      padding: 6px 12px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
      // background-color: rgba(100, 255, 218, 0.05);
      border-radius: 4px;
      // border: 1px solid rgba(100, 255, 218, 0.1);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:nth-child(1) { transition-delay: 0s; }
      &:nth-child(2) { transition-delay: 0.05s; }
      &:nth-child(3) { transition-delay: 0.1s; }
      &:nth-child(4) { transition-delay: 0.15s; }
      &:nth-child(5) { transition-delay: 0.2s; }
      &:nth-child(6) { transition-delay: 0.25s; }
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 4px;

      &:focus {
        outline: 2px solid var(--green);
        outline-offset: 3px;
        background-color: rgba(100, 255, 218, 0.1);
      }

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(135deg, var(--green) 0%, transparent 50%, var(--green) 100%);
      border-radius: var(--border-radius);
      opacity: 0;
      z-index: -1;
      transform: scale(0.98);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      filter: blur(15px);
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      will-change: transform, filter;

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
