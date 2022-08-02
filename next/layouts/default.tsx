import React from "react";
import Navigation from "@/components/common/Navigation";
import Header from "@/components/common/Header";
import Container from "@mui/material/Container";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import Router from "next/router";
type Props = {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  const loginInfo = useRecoilValue(loginInfoAtom);
  React.useEffect(() => {
    if (!loginInfo) {
      Router.push("/login");
    };
  }, [])
  if (!loginInfo) return <></>;
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
export default Layout;
