import taverna_header from '../../../assets/taverna.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPagePath } from './utils';
import useMediaQuery from '@mui/material/useMediaQuery';

import * as S from './styles';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Home', 'Reservas'];

export function Header() {
  const location = useLocation();
  const { pathname } = location;
  const matches = useMediaQuery('(min-width:900px)');
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
    navigate(getPagePath(page));
  };

  return (
    <AppBar
      position="static"
      sx={{
        maxWidth: matches ? '90%' : '100%',
        margin: '0 auto',
        backgroundColor: 'var(--background)',
        ...(matches && { padding: '1rem 0', boxShadow: 'none' }),
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img height={40} src={taverna_header} alt="Logo da Taverna" />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <S.CustomUl>
              {pages.map((page) => (
                <S.CustomListItem
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  checked={pathname === getPagePath(page)}
                >
                  <Typography textAlign="center" fontSize={24}>
                    {page}
                  </Typography>
                </S.CustomListItem>
              ))}
            </S.CustomUl>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 'auto' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
