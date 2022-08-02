import React from "react";
import Container from "@mui/material/Container";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import Router from "next/router";
type Props = {
  children: React.ReactNode;
}
function LoginLayout({ children }: Props) {
  const loginInfo = useRecoilValue(loginInfoAtom);
  React.useEffect(() => {
    if (loginInfo) {
      Router.push("/");
    };
  }, [])
  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      {children}
    </Container>
  );
}
export default LoginLayout;
