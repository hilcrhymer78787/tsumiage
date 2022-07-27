import React from "react";
import Navigation from "@/components/common/Navigation";
import Header from "@/components/common/Header";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import { stateType } from "@/types/common/stateType";
const mapStateToProps = (state: stateType) => {
  return {
    state: state,
  };
};
type Props = {
  children: React.ReactNode;
  state: stateType;
}
function Layout({ children, state }: Props) {
  if (!state.loginInfo) return <></>;
  return (
    <>
      <Header />
      <Container sx={{ p: "70px 10px" }} maxWidth="xs">
        {children}
      </Container>
      <Navigation />
    </>
  );
}
export default connect(mapStateToProps)(Layout);
