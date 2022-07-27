import React from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
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
function LoginLayout({ children, state }: Props) {
  if (state?.loginInfo !== false) return <></>;
  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      {children}
    </Container>
  );
}
export default connect(mapStateToProps)(LoginLayout);
