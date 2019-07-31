import React from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';

const LinkRoot = styled(GatsbyLink)`
  align-items: center;
  border-radius: ${(props) => props.theme.radius.default}px;
  color: ${(props) => props.theme.colors.primary};
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  margin: -${(props) => props.theme.space[0]}px -${(props) => props.theme.space[1]}px;
  padding: ${(props) => props.theme.space[0]}px ${(props) => props.theme.space[1]}px;
  text-decoration: none;
  transition: 0.5s;
  :focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.accent};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
  span {
    border-bottom: 1px solid ${(props) => props.theme.colors.brandBright};
    display: block;
    transition: inherit;
  }
  svg {
    fill: ${(props) => props.theme.colors.brandBright};
    margin-right: ${(props) => props.theme.space[1]}px;
  }
  :hover {
    span {
      border-bottom: 1px solid ${(props) => props.theme.colors.primary};
    }
    svg {
      fill: ${(props) => props.theme.colors.primary};
      transition: inherit;
    }
  }
`;

const Link = ({ children, ...restProps }) => {
	return <LinkRoot {...restProps}>{children}</LinkRoot>;
};

export default Link;
