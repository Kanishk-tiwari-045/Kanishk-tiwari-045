/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { EventEmitter } = require('events');
const fs = require('fs-extra');

// Increase max listeners to prevent warnings with many markdown files
EventEmitter.defaultMaxListeners = 20;

exports.onPostBuild = async () => {
  // Copy tech-icons to public folder for production builds
  const sourceDir = path.join(__dirname, 'content/images/tech-icons');
  const destDir = path.join(__dirname, 'public/tech-icons');
  
  if (fs.existsSync(sourceDir)) {
    await fs.copy(sourceDir, destDir);
    console.log('✅ Tech icons copied to public folder');
  }

  // Copy resume.pdf to public folder
  const resumeSource = path.join(__dirname, 'content/resume.pdf');
  const resumeDest = path.join(__dirname, 'public/resume.pdf');
  
  if (fs.existsSync(resumeSource)) {
    await fs.copy(resumeSource, resumeDest);
    console.log('✅ Resume PDF copied to public folder');
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // No custom pages needed - using static pages only
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/utils/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    // Suppress deprecation warnings from babel-plugin-lodash
    infrastructureLogging: {
      level: 'error',
    },
  });
};
