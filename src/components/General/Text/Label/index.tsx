import React, { LabelHTMLAttributes } from 'react';

import { ChildrenContainer, Container, Label } from './styles';

interface Label extends LabelHTMLAttributes<HTMLLabelElement> {
  block?: boolean;
  text: string | JSX.Element;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  inline?: boolean;
  reverseInline?: boolean;
  verticalAligned?: boolean;
  spaceBetween?: boolean;
  textAlign?: string;
  childrenHeight?: string;
  childrenWidth?: string;
  gap?: number;
  gridArea?: string;
  reverse?: boolean;

  alignChildren?: 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start';
  [prop: string]: any;
}

const LabelComponent: React.FC<Label> = ({
  text,
  block = false,
  color,
  fontSize,
  fontWeight,
  textAlign,
  inline = false,
  reverse = false,
  spaceBetween,
  verticalAligned,
  children,
  childrenHeight,
  childrenWidth,
  gap,
  gridArea,
  className,
  alignChildren,
  ...props
}: Label) => {
  return !children ? (
    <Label
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      gap={gap}
      className={className}
      {...props}
    >
      {text}
    </Label>
  ) : (
    <Container
      block={block}
      inline={inline}
      reverse={reverse}
      spaceBetween={Boolean(spaceBetween)}
      verticalAligned={Boolean(verticalAligned)}
      className={className}
      gap={gap}
      gridArea={gridArea}
    >
      <Label
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign={textAlign}
        {...props}
      >
        {text}
      </Label>
      <ChildrenContainer
        childrenHeight={childrenHeight}
        childrenWidth={childrenWidth}
        alignSelf={alignChildren}
      >
        {children}
      </ChildrenContainer>
    </Container>
  );
};

export default LabelComponent;
