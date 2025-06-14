import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Analytics as AnalyticsIcon,
  Assignment as TasksIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: <AnalyticsIcon />,
    },
    {
      label: 'Tasks',
      path: '/tasks',
      icon: <TasksIcon />,
    },
    {
      label: 'Products',
      path: '/products',
      icon: <InventoryIcon />,
    },
    {
      label: 'PDF Editor',
      path: '/pdf-editor',
      icon: <DescriptionIcon />,
    },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              CRM
            </Avatar>
            CRM Dashboard
          </Typography>
          
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    minWidth: 100,
                    color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                    backgroundColor: isActive(item.path) ? 'primary.light' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive(item.path) 
                        ? 'primary.light' 
                        : 'action.hover',
                    },
                    fontWeight: isActive(item.path) ? 600 : 500,
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 1,
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              <Tooltip title="Logout">
                <IconButton 
                  onClick={handleLogout}
                  sx={{ 
                    ml: 2,
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'error.light',
                      color: 'error.main',
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{ color: 'text.secondary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 280,
            pt: 2,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navigation; 