/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';

import Backdrop from '../../Backdrop';
import Debounce from '../Debounce';
import { InputInterface } from '../Input';

import Container, { Dropdown, DropdownMenu, DropdownItem } from './styles';

import './styles.css';

interface Elements {
  [name: string]: string;
}

interface ComboBoxProps
  extends Omit<InputInterface, 'onChange' | 'onSelect' | 'onClick'> {
  value?: string;
  block?: boolean;
  title: string;
  elements: any[];
  valueProp?: string;
  nameProp?: string;
  className?: string;
  noBottomRadius?: boolean;
  debounce?: boolean;
  filterOnly?: boolean;
  noResultPlaceholder?: string;
  exactSearch?: boolean;
  readOnly?: boolean;
  fullSizeOptions?: boolean;
  maxWidth?: string;
  [x: string]: any;
  onChange?: (newValue: string) => void;
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  value,
  block = false,
  title,
  elements,
  onChange,
  valueProp = 'value',
  nameProp = 'name',
  className = '',
  noResultPlaceholder,
  exactSearch = false,
  filterOnly = true,
  debounce = false,
  readOnly = false,
  noBottomRadius = false,
  fullSizeOptions,
  maxWidth,
  onSelect,
  ...props
}: ComboBoxProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredElements, setFilteredElements] = useState(elements ?? []);
  const [isOpen, setIsOpen] = useState(false);
  const itemsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredElements(elements);
  }, [elements]);

  useEffect(() => {
    if (value) setSearchQuery(value);
  }, [value]);

  const toggleComboBox = () => setIsOpen(!isOpen);
  const openComboBox = () => setIsOpen(true);

  const filterChangeHandler = (newValue: string) => {
    if (filterOnly) {
      if (exactSearch) {
        setFilteredElements(
          elements.filter(
            (element) =>
              element[nameProp].toLowerCase() === newValue.toLowerCase(),
          ),
        );
      } else {
        setFilteredElements(
          elements.filter((element) =>
            element[nameProp].toLowerCase().includes(newValue.toLowerCase()),
          ),
        );
      }
    }

    setSearchQuery(newValue);
    if (onChange) onChange(newValue);
  };

  const onSelectItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    onSelect(event);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();
    // This event will only be executed when its target is not one of its children
    const isChild = event.currentTarget.contains(event.relatedTarget as Node);
    if (!searchQuery && !isChild) setIsOpen(false);
  };

  return (
    <>
      <Container
        block={block}
        maxWidth={maxWidth}
        className={`combobox ${className}`.trim()}
        onBlur={handleBlur}
      >
        <Dropdown>
          <ComboBoxInput
            searchQuery={searchQuery}
            placeholder={title}
            noBottomRadius={noBottomRadius || isOpen}
            debounce={debounce}
            onClick={openComboBox}
            openDropdown={openComboBox}
            onChange={filterChangeHandler}
            readOnly={readOnly}
            data-toggle="dropdown"
            {...props}
          />
          <DropdownMenu
            isOpen={isOpen}
            ref={itemsContainer}
            noTranslate={fullSizeOptions}
          >
            {filteredElements.filter(Boolean).length ? (
              filteredElements.map((element) => (
                <DropdownItemContainer
                  key={`${title}-combobox-${element[valueProp]}`}
                  value={element[valueProp]}
                  onClick={onSelectItem}
                >
                  {element[nameProp]}
                </DropdownItemContainer>
              ))
            ) : (
              <DropdownItemContainer disabled>
                {noResultPlaceholder ?? 'Nenhum item encontrado'}
              </DropdownItemContainer>
            )}
          </DropdownMenu>
        </Dropdown>
      </Container>
      {isOpen && (
        <Backdrop onClick={toggleComboBox} backgroundColor="transparent" />
      )}
    </>
  );
};

interface DropdownItemProps {
  value?: any;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode | React.ReactNode[];
}

const DropdownItemContainer: React.FC<DropdownItemProps> = ({
  value,
  disabled = false,
  onClick,
  children,
}: DropdownItemProps) => (
  <DropdownItem
    onClick={onClick}
    disabled={disabled}
    value={value}
    type="button"
    tabIndex={0}
  >
    {children}
  </DropdownItem>
);

interface ComboBoxInputProps {
  readOnly: boolean;
  searchQuery: string;
  placeholder?: string;
  noBottomRadius: boolean;
  debounce: boolean;
  onClick: (event?: React.MouseEvent<HTMLInputElement>) => void;
  openDropdown: () => void;
  onChange: (newValue: string) => void;
  [x: string]: any;
}

const ComboBoxInput: React.FC<ComboBoxInputProps> = ({
  readOnly,
  searchQuery,
  placeholder,
  noBottomRadius,
  debounce,
  openDropdown,
  onClick,
  onChange,
  ...props
}: ComboBoxInputProps) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.preventDefault) event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();

    const { value: newValue } = event.target;
    onChange(newValue);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') event.preventDefault();
  };

  const borderRadius = noBottomRadius ? '10px 10px 0 0' : '10px';

  return (
    <Debounce
      block
      name="debounce"
      type="search"
      borderRadius={borderRadius}
      debounceTimeout={debounce ? 600 : 0}
      value={searchQuery}
      placeholder={placeholder}
      readOnly={readOnly}
      onKeyPress={onKeyPress}
      onFocus={openDropdown}
      onClick={onClick}
      onChange={changeHandler}
      {...props}
    />
  );
};

export type ComboBoxElements = Elements;
export default ComboBox;
