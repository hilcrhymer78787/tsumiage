import { connect } from "react-redux";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function Header({ loginInfo }) {

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        // setAnchorElUser(event.currentTarget);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>TSUMIAGE</Typography>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar src={loginInfo.user_img} />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default connect(mapStateToProps)(Header);
