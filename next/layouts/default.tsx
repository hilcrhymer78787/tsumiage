import {ReactNode, useEffect} from "react";

import Container from "@mui/material/Container";
import Navigation from "@/components/common/Navigation";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};
function Layout({ children }: Props) {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoAtom);
  useEffect(() => {
    if (!loginInfo) {
      router.push("/auth");
    }
  }, []);
  if (!loginInfo) return <></>;
  return (
    <>
      <Container sx={{ p: "70px 10px" }}>
        {children}
      </Container>
      <Navigation />
    </>
  );
}
export default Layout;
