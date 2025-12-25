import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion, useGithubReposHybrid } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;
    width: 100%;
    max-width: 1200px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 8px;
        transition: var(--transition);

        &:hover {
          color: var(--green);
          transform: translateY(-3px);
        }

        &.external {
          svg {
            width: 20px;
            height: 20px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

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

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const { repos, loading, error, source } = useGithubReposHybrid();
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  // Log the data source for debugging
  useEffect(() => {
    if (!loading) {
      console.log(`Projects loaded from: ${source}`);
    }
  }, [loading, source]);

  // Specific projects to show in order
  const noteworthyProjectNames = [
    'Frictionless-Pay',
    'Spotify_Clone',
    'HackVoice',
    'MiniSparkCPP',
    'Legal_Redline_Sandbox',
    'placement_cell_official',
  ];

  // Filter and order projects based on the specific list
  const projectsToShow = repos
    .filter(repo => {
      const repoName = repo.github.split('/').pop();
      return noteworthyProjectNames.includes(repoName);
    })
    .sort((a, b) => {
      const aName = a.github.split('/').pop();
      const bName = b.github.split('/').pop();
      return noteworthyProjectNames.indexOf(aName) - noteworthyProjectNames.indexOf(bName);
    })
    .slice(0, 6);

  const projectInner = project => {
    const { github, external, title, tech, description } = project;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external || github} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description">
            <p>{description}</p>
          </div>
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        view the archive
      </Link>

      {loading && <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading projects...</p>}
      
      {error && (
        <p style={{ textAlign: 'center', marginTop: '50px', color: 'var(--red)' }}>
          Error loading projects. Please try again later.
        </p>
      )}

      {!loading && !error && repos.length > 0 && (
        <>
          <ul className="projects-grid">
            {prefersReducedMotion ? (
              <>
                {projectsToShow &&
                  projectsToShow.map((project, i) => (
                    <StyledProject key={project.id || i}>{projectInner(project)}</StyledProject>
                  ))}
              </>
            ) : (
              <TransitionGroup component={null}>
                {projectsToShow &&
                  projectsToShow.map((project, i) => (
                    <CSSTransition
                      key={project.id || i}
                      classNames="fadeup"
                      timeout={300}
                      exit={false}>
                      <StyledProject
                        key={project.id || i}
                        ref={el => (revealProjects.current[i] = el)}
                        style={{
                          transitionDelay: `${i * 100}ms`,
                        }}>
                        {projectInner(project)}
                      </StyledProject>
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            )}
          </ul>

          <a 
            href="https://github.com/Kanishk-tiwari-045?tab=repositories" 
            target="_blank" 
            rel="noreferrer"
            className="more-button"
          >
            View More Projects
          </a>
        </>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
