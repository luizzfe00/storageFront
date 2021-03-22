import React from 'react';

import { NonStyledAnchor, NonStyledLink } from './styles';

interface NonStyleLink {
  path: string;
  isExternal?: boolean;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';

  [props: string]: any;
}

const NonStyleLink: React.FC<NonStyleLink> = ({
  path,
  isExternal = false,
  text,
  onClick,
  disabled = false,
  target,

  ...props
}: NonStyleLink) => (
  <>
    {isExternal ? (
      <NonStyledAnchor
        href={path}
        target={target}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {props.children}
        {text}
      </NonStyledAnchor>
    ) : (
      <NonStyledLink to={path} onClick={onClick} disabled={disabled} {...props}>
        {props.children}
        {text}
      </NonStyledLink>
    )}
  </>
);

export default NonStyledLink;
