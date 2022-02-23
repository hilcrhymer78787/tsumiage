import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Mypage from '@/components/common/Mypage';
const mapStateToProps = (state: any) => {
    return {
        loginInfo: state.loginInfo,
    };
};
function Header({ loginInfo }) {
    const [mypageDialog, setMypageDialog] = useState(false as boolean);

    return (
        <AppBar position="fixed" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography color="primary" variant="h6" sx={{ flexGrow: 1 }}>TSUMIAGE</Typography>
                    <IconButton onClick={()=>{setMypageDialog(true);}} sx={{ p: 0 }}>
                        <Avatar src={loginInfo.user_img} />
                    </IconButton>
                </Toolbar>
            </Container>
            <Dialog open={mypageDialog} onClose={() => { setMypageDialog(false); }}>
                {mypageDialog &&
                    <Mypage />
                }
            </Dialog>
        </AppBar>
    );
};
export default connect(mapStateToProps)(Header);
