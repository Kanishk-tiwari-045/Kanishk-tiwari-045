import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// List of pinned repository names (in order of priority)
const pinnedRepoNames = [
  'Self_Metaverse',
  'Bail-Reckoner',
  'Contract-Smith',
  'BruDite_Internship',
  'CelebAL_Internship',
  'DSA-Practice',
];

// Tech stack mapping based on GitHub languages
const languageToTechMap = {
  JavaScript: 'JavaScript',
  TypeScript: 'TypeScript',
  Python: 'Python',
  Java: 'Java',
  'C++': 'C++',
  C: 'C',
  HTML: 'HTML',
  CSS: 'CSS',
  SCSS: 'SCSS',
  Shell: 'Bash',
  Dockerfile: 'Docker',
  Vue: 'Vue.js',
  Svelte: 'Svelte',
};

// Manual tech stack overrides for specific repos
const manualTechStacks = {
  'Self_Metaverse': ['React.js', 'Node.js', 'TypeScript', 'Phaser', 'Socket.io', 'WebRTC'],
  'Bail-Reckoner': ['Next.js', 'Tailwind CSS', 'Gemini API', 'MongoDB'],
  'Contract-Smith': ['Next.js', 'Ollama Mistral', 'Blockchain', 'MetaMask', 'Smart Contracts', 'Solidity'],
};

/**
 * Custom hook that uses a hybrid approach:
 * 1. First tries to load repos from local .md files (cached)
 * 2. Falls back to GitHub API if no cached data exists
 * 3. Prioritizes pinned repos
 */
const useGithubReposHybrid = (username = 'Kanishk-tiwari-045') => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('unknown'); // 'cache' or 'api'

  // Try to fetch from local markdown files first
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/repo-projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___pinned, frontmatter___date], order: [DESC, DESC] }
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              github
              external
              tech
              company
              pinned
            }
            excerpt(pruneLength: 200)
          }
        }
      }
    }
  `);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);

        // Check if we have cached markdown data
        if (data.allMarkdownRemark.edges.length > 0) {
          // Use cached data from markdown files
          console.log('📁 Loading repos from local cache');
          setSource('cache');
          
          const cachedRepos = data.allMarkdownRemark.edges.map(({ node }) => {
            const { frontmatter, excerpt } = node;
            return {
              title: frontmatter.title,
              description: excerpt || 'No description available',
              github: frontmatter.github,
              external: frontmatter.external || null,
              tech: frontmatter.tech || [],
              date: frontmatter.date,
              company: frontmatter.company || null,
              pinned: frontmatter.pinned || false,
            };
          });

          // Sort by pinned status first, then by date
          const sortedRepos = cachedRepos.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            
            // If both pinned, maintain order from pinnedRepoNames
            if (a.pinned && b.pinned) {
              const aName = a.github.split('/').pop();
              const bName = b.github.split('/').pop();
              return pinnedRepoNames.indexOf(aName) - pinnedRepoNames.indexOf(bName);
            }
            
            return new Date(b.date) - new Date(a.date);
          });

          setRepos(sortedRepos);
          setError(null);
          setLoading(false);
        } else {
          // No cached data, fetch from GitHub API
          console.log('🌐 No cache found, fetching from GitHub API');
          setSource('api');
          await fetchFromGithubAPI(username);
        }
      } catch (err) {
        console.error('Error loading repos:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchFromGithubAPI = async (username) => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories from GitHub');
        }

        const apiData = await response.json();

        // Process all repos (including forks)
        const processedRepos = await Promise.all(
          apiData
            .map(async repo => {
              let techStack = [];
              
              if (manualTechStacks[repo.name]) {
                techStack = manualTechStacks[repo.name];
              } else {
                try {
                  const langResponse = await fetch(repo.languages_url);
                  const languages = await langResponse.json();
                  const langNames = Object.keys(languages);
                  
                  techStack = langNames
                    .map(lang => languageToTechMap[lang] || lang)
                    .slice(0, 6);
                } catch (err) {
                  console.error(`Failed to fetch languages for ${repo.name}:`, err);
                  techStack = [];
                }
              }

              const isPinned = pinnedRepoNames.includes(repo.name);

              return {
                id: repo.id,
                title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                description: repo.description || 'No description available',
                github: repo.html_url,
                external: repo.homepage || null,
                tech: techStack,
                date: repo.created_at,
                updated: repo.updated_at,
                stars: repo.stargazers_count,
                company: null,
                pinned: isPinned,
              };
            })
        );

        // Sort by pinned status first, then by updated date
        const sortedRepos = processedRepos.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          
          if (a.pinned && b.pinned) {
            const aName = a.github.split('/').pop();
            const bName = b.github.split('/').pop();
            return pinnedRepoNames.indexOf(aName) - pinnedRepoNames.indexOf(bName);
          }
          
          return new Date(b.updated) - new Date(a.updated);
        });

        setRepos(sortedRepos);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching from GitHub API:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadRepos();
  }, [username, data]);

  return { repos, loading, error, source };
};

export default useGithubReposHybrid;
