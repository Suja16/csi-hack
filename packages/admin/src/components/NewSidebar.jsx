import 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Tooltip } from '@mui/material';
import { People, Settings, Archive } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ isSidebarOpen }) => {
    const location = useLocation();
    const menuItems = [
        { label: 'All Teams', icon: <People />, path: '/allteams' },
        { label: 'Add Evaluators', icon: <Settings />, path: '/evaluators' },
        { label: 'Statistics', icon: <Archive />, path: '/statistics' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: isSidebarOpen ? 'block' : 'none', sm: 'block' },
                width: isSidebarOpen ? 240 : 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isSidebarOpen ? 240 : 60,
                    boxSizing: 'border-box',
                    position: 'fixed',
                    top: 64, 
                    left: 0,
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 0 40px rgba(0, 0, 0, 0.03)',
                    overflowX: 'hidden',
                    transition: 'width 0.3s',
                },
            }}
            anchor="left"
        >
            <List>
                {menuItems.map((item, index) => (
                    <Tooltip title={item.label} placement="right" arrow key={index}>
                        <ListItem
                            button
                            component={Link}
                            to={item.path}
                            sx={{
                                marginBottom: isSidebarOpen ? '8px' : '16px',
                                backgroundColor: location.pathname === item.path ? '#f0f0f0' : 'transparent',
                                borderRadius: '8px', // Added borderRadius for rounded corners
                                '&:hover': {
                                    backgroundColor: '#e0e0e0', // Ensure hover color also has rounded corners
                                },
                                '& .MuiListItemText-root': {
                                    color: 'black',
                                },
                                '& .MuiListItemIcon-root': {
                                    color: '#6a778e',
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            {isSidebarOpen && <ListItemText primary={item.label} sx={{ whiteSpace: 'nowrap', minWidth: '0' }} />}
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Drawer>
    );
};

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;