import { useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

import * as S from './styles';
import { DropdownProps } from './types';

export function Dropdown({ options, onSelect, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);

    onSelect(option);
  };

  return (
    <S.DropdownContainer>
      <S.DropdownHeader onClick={toggleOpen}>
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
