/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const { EventEmitter } = require('events');

// Increase max listeners for SSR environment
EventEmitter.defaultMaxListeners = 20;