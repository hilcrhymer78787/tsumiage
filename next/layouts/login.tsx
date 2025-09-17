import { ReactNode, useEffect } from "react";

import Container from "@mui/material/Container";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useRouter } from "next/router";

function LoginLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { loginInfo } = useLoginInfo();

  useEffect(() => {
    if (!loginInfo) return;
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ p: "10px" }} maxWidth="xs">
      {children}
    </Container>
  );
}
export default LoginLayout;
