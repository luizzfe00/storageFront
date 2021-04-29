import React from 'react';

import {
  ItemContainerButton,
  ItemContainerLink,
  ItemContainerAnchor,
} from './styles';

interface DropdownItem {
  as?: 'button' | 'link' | 'anchor';
  to?: string;
  href?: string;
  target?: string;
  onClick?: (event: React.MouseEvent) => void;
  [prop: string]: any;
}

const DropdownItem: React.FC<DropdownItem> = ({
  as = 'button',
  to,
  href,
  target,
  onClick,
  children,
  ...props
}) => {
  if (as === 'button') {
    return (
      <ItemContainerButton type="button" onClick={onClick} {...props}>
        {children}
      </ItemContainerButton>
    );
  }

  if (as === 'link') {
    return (
      <ItemContainerLink to={to ?? ''} {...props}>
        {children}
      </ItemContainerLink>
    );
  }

  return (
    <ItemContainerAnchor href={href} target={target} {...props}>
      {children}
    </ItemContainerAnchor>
  );
};

export default DropdownItem;
