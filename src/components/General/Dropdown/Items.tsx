import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ItemsContainer as Container } from './styles';

const portalTarget = document.getElementById('portal_target');

interface ItemsContainer {
  isOpen: boolean;
  togglerOffset: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  onClose: () => void;
}
const ItemsContainer: React.FC<ItemsContainer> = ({
  isOpen,
  togglerOffset,
  children,
  onClose,
}) => {
  const [largestOption, setLargestOption] = useState<any>(5);
  const items = React.Children.toArray(children) as JSX.Element[];

  useEffect(() => {
    if (items.length)
      setLargestOption(
        items.reduce((largest, curr) => {
          const currentLength = String(curr.props?.children).length ?? 20;

          if (currentLength >= largestOption) {
            largest = currentLength < 20 ? currentLength : 20;
          }
          return largest;
        }, 5),
      );
  }, []);

  const style = togglerOffset
    ? {
        top: togglerOffset.top,
        right: `calc(100vw - ${togglerOffset.right}px + 8px)`,
      }
    : {};

  if (portalTarget)
    return ReactDOM.createPortal(
      <Items
        style={style}
        isOpen={isOpen}
        largestOption={largestOption}
        items={items}
        onClose={onClose}
      />,
      portalTarget,
    );

  return <></>;
};

interface Items {
  style: {
    [key: string]: string | number | undefined;
  };
  onClose: () => void;

  isOpen: boolean;
  largestOption: number;

  items: JSX.Element[];
}

const Items: React.FC<Items> = ({
  style,
  isOpen,
  largestOption,
  items,
  onClose,
}) => {
  return (
    <Container
      isOpen={isOpen}
      style={style}
      onClick={onClose}
      largestOption={largestOption}
    >
      {items.map((item, index) =>
        item.type === React.Fragment ? (
          item.props.children.map((child: any, childIndex: number) => (
            <li
              key={`dropdown_items_container__${style.top}#${style.right}#${
                index + 1
              }#${childIndex + 1}`}
            >
              {child}
            </li>
          ))
        ) : (
          <li
            key={`dropdown_items_container__${style.top}#${style.right}#${
              index + 1
            }`}
          >
            {item}
          </li>
        ),
      )}
    </Container>
  );
};

export default ItemsContainer;
