import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  background-color: var(--background);
  color: #fff;
  padding: 2rem 10%;

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    max-wid
  }

  ul {
    display: flex;
    gap: 1rem;
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
