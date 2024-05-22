import styled from 'styled-components';

export const CustomUl = styled.ul`
  display: flex;
  gap: 1rem;
  margin-left: 2rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

interface CustomListItemProps {
  checked?: boolean;
}
export const CustomListItem = styled.li`
  list-style: none;
  padding: 12px 28px;
  cursor: pointer;
  transition: 0.3s;

  ${(props: CustomListItemProps) =>
    props.checked
      ? 'border-bottom: 3px solid #ffffff;'
      : 'border-bottom: 3px solid transparent;'}

  a {
    text-decoration: none;
    color: #fff;
    font-size: 24px;
  }
`;
