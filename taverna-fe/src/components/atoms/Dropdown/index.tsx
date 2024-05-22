import { useEffect, useRef, useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

import * as S from './styles';
import { DropdownProps } from './types';

export function Dropdown({ options, onSelect, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);

    onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownHeader onClick={toggleDropdown}>
        {selected}
        <span className="dropdown-arrow">
          {isOpen ? <FaSortUp /> : <FaSortDown />}
        </span>
      </S.DropdownHeader>
      {isOpen && (
        <S.DropdownList>
          {options.map((option, index) => (
            <S.DropdownListItem
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option}
            </S.DropdownListItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
}

export default Dropdown;
