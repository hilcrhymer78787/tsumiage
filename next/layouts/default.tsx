import Container from "@mui/material/Container";
import Navigation from "@/components/common/Navigation";
import React from "react";
import Router from "next/router";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
type Props = {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  const loginInfo = useRecoilValue(loginInfoAtom);
  React.useEffect(() => {
    if (!loginInfo) {
      Router.push("/auth");
    };
  }, []);
  if (!loginInfo) return <></>;
  return (
    <>
      <Container sx={{ p: "70px 10px" }} maxWidth="xs">
        {children}
      </Container>
      <Navigation />
    </>
  );
}
export default Layout;
