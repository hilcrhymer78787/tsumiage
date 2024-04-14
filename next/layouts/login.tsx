import Container from "@mui/material/Container";
import React from "react";
import { loginInfoAtom } from "@/data/user";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
type Props = {
  children: React.ReactNode;
}
function LoginLayout({ children }: Props) {
  const router = useRouter();
  const loginInfo = useRecoilValue(loginInfoAtom);
  React.useEffect(() => {
    if (loginInfo) {
      router.push("/");
    };
  }, []);
  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      {children}
    </Container>
  );
}
export default LoginLayout;
