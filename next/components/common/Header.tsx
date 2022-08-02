import { connect } from "react-redux";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Mypage from "@/components/common/Mypage";
import UserImg from "@/components/common/UserImg";
import { stateType } from "@/types/common/stateType";
const mapStateToProps = (state: stateType) => state;
const Header = (state: stateType) => {
  const [mypageDialog, setMypageDialog] = useState(false as boolean);
  return (
    <AppBar position="fixed" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography color="primary" variant="h6" sx={{ flexGrow: 1 }}>TSUMIAGE</Typography>
          <IconButton onClick={() => { setMypageDialog(true); }} sx={{ p: 0 }}>
            <UserImg
              fileName={state.loginInfo ? state.loginInfo.user_img : ''}
              size="40"
            />
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
