import React, { useEffect, useRef } from 'react';

import Items from './Items';

import { Container } from './styles';

interface Dropdown {
  toggler: JSX.Element;

  isOpen: boolean;
  onClose: () => void;

  disabled?: boolean;
  [props: string]: any;
}

const Dropdown: React.FC<Dropdown> = ({
  isOpen,
  toggler,
  disabled,
  children,
  onClose,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const closeOnEscape = (event: globalThis.KeyboardEvent): any => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && !disabled) {
      window.addEventListener('click', onClose);
      window.addEventListener('keydown', closeOnEscape);
    }

    return () => {
      window.removeEventListener('click', onClose);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  // Refactor idea: pass this ref to the toggler component.
  const togglerElement = containerRef.current?.children[0];

  const scrolled = window.scrollY;

  const boundings = togglerElement?.getBoundingClientRect() ?? {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const offset = {
    top: boundings.top + scrolled,
    right: boundings.right,
    bottom: boundings.bottom,
    left: boundings.left,
  };

  return (
    <Container ref={containerRef} {...props}>
      {toggler}
      <Items isOpen={isOpen} togglerOffset={offset} onClose={onClose}>
        {children}
      </Items>
    </Container>
  );
};

export default Dropdown;
