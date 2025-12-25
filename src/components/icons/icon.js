import React from 'react';
import PropTypes from 'prop-types';
import {
  IconExternal,
  IconFolder,
  IconGitHub,
  IconInstagram,
  IconLeetcode,
  IconLinkedin,
  IconLoader,
  IconLogo,
  IconTwitter,
} from '@components/icons';

const Icon = ({ name }) => {
  switch (name) {
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Leetcode':
      return <IconLeetcode />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'Twitter':
      return <IconTwitter />;
    case 'X':
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
