/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const { EventEmitter } = require('events');

// Increase max listeners for browser environment
EventEmitter.defaultMaxListeners = 20;
