import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: 240px;
  font-family: 'Arial';
`;

export const DropdownHeader = styled.div`
  padding: 10px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #ccc;
  user-select: none;
  color: #000;

  .dropdown-arrow {
    float: right;
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const DropdownListItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #000;

  &:hover {
    background-color: #f1f1f1;
  }
`;
